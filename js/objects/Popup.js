/*global $, chrome, Settings */
/*jslint browser: true, regexp: true */
var Popup = function () {
    'use strict';
    this.settings = new Settings();

    this.channels = JSON.parse(localStorage.getItem('channels')) || [];

    this.templates = {
        liveChannel : 'liveChannel',
        offlineChannel : 'offlineChannel'
    };

    this.streams = [];

    var templateName;

    for (templateName in this.templates) {
        if (this.templates.hasOwnProperty(templateName)) {
            this.templates[templateName] = $('[data-template="' + this.templates[templateName] + '"]')[0].innerHTML;
        }
    }
};

Popup.prototype = {

    show : function () {
        'use strict';
        var elements = {
                live : $('.channels .live'),
                offline : $('.channels .offline'),
                actions : {
                    settings : $('[data-action=settings]'),
                    offline : $('[data-action=offline]'),
                    live : $('[data-action=live]')
                }
            },
            self = this,
            i,
            channelsHTML = '';

        for (i = 0; i < this.channels.length; i += 1) {
            channelsHTML += this.templates.offlineChannel
                .replace(/\{name\}/g, this.channels[i].name)
                .replace(/\{favorite\}/g, this.channels[i].favorite ? 'yellow' : 'basic')
                .replace('{voice}', this.channels[i].voice || '');
        }

        elements.offline.find('table')
            .append(channelsHTML);

        this.emptyMessage();

        this.channelActions();

        this.updateCounters();

        $.merge(elements.actions.live, elements.actions.offline)
            .unbind('click').click(function (e) {
                var element = $(e.currentTarget),
                    action = element.data('action'),
                    toHide = {
                        live : elements.offline,
                        offline : elements.live
                    };

                if (element.hasClass('active')) {
                    return false;
                }

                element.parent().find('.active')
                    .removeClass('active');
                element
                    .addClass('active');

                toHide[action]
                    .removeClass('transition visible')
                    .attr('style', 'display: block')
                    .hide();
                elements[action]
                    .transition('fade down');
            });

        elements.actions.settings
            .unbind('click').click(function () {
                self.settings.show();
            });

        $(document)
            .unbind('channelsChanged').one('channelsChanged', function () {
                self.update();
            });

        if (this.channels.length) {
            elements.live.find('.emptyMessage')
                .hide();

            chrome.runtime.sendMessage({message : 'getStreams'});
        } else {
            elements.live
                .removeClass('loading');
        }
    },

    showStreams : function () {
        'use strict';
        var elements = {
                live : $('.channels .live'),
                offline : $('.channels .offline'),
                actions : {
                    live : $('[data-action=live]'),
                    offline : $('[data-action=offline]')
                }
            },
            stream,
            channel,
            i,
            streamsHTML = '';

        for (i = 0; i < this.streams.length; i += 1) {
            stream = this.streams[i];

            elements.offline.find('tr[data-name=' + stream.channel.name + ']')
                .remove();

            channel = this.channels[this.channelPosition(stream.channel.name)];

            streamsHTML += this.templates.liveChannel
                .replace('{name}', stream.channel.name)
                .replace('{logo}', stream.channel.logo)
                .replace(/\{favorite\}/g, channel.favorite ? 'yellow' : 'basic')
                .replace('{viewers}', stream.viewers.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1,'))
                .replace('{status}', stream.channel.status || stream.game)
                .replace('{live}', stream.live)
                .replace(/\{url\}/g, stream.channel.url || 'http://twitch.tv/' + stream.channel.name)
                .replace('{display_name}', stream.channel.display_name)
                .replace('{game}', stream.game)
                .replace('{voice}', channel.voice || '');
        }

        elements.live.find('table')
            .append(streamsHTML);

        this.emptyMessage();

        this.channelActions();

        this.updateCounters();

        elements.live
            .hide()
            .removeClass('loading');

        if (elements.actions.live.hasClass('active')) {
            elements.live
                .transition({
                    animation : 'fade down',
                    onComplete : function () {
                        elements.live
                            .removeClass('transition visible')
                            .attr('style', 'display: block');
                    }
                });
        }
    },

    channelActions : function () {
        'use strict';
        var self = this,
            actions = {
                options : $('[data-action=channelOptions]'),
                voice : $('[data-action=channelVoice]'),
                favorite : $('[data-action=channelFavorite]'),
                remove : $('[data-action=channelRemove]'),
                testVoice : $('[data-action=testVoice]')
            };

        actions.options
            .unbind('click').click(function (e) {
                var dimmer = $(e.currentTarget).parents('tr').find('.ui.dimmer'),
                    settings = self.settings.settings;

                if ($.inArray(settings.voice, ['googleEn', 'googleRu']) === -1  || !settings.enableVoice) {
                    dimmer.find('[data-action=channelVoice]').parent()
                        .hide();
                }

                if (settings.enableVoice && $.inArray(settings.voice, ['googleEn', 'googleRu']) !== -1) {
                    dimmer.find('[data-action=channelVoice]').parent()
                        .show();
                }

                $('.ui.dimmer')
                    .dimmer('hide');

                dimmer
                    .dimmer('show');
            });

        actions.favorite
            .unbind('click').click(function (e) {
                var element = $(e.currentTarget),
                    p = self.channelPosition(element.parents('tr').data('name'));

                self.channels[p].favorite = !self.channels[p].favorite;

                element
                    .toggleClass('yellow')
                    .toggleClass('basic');

                element.parents('tr').find('.card')
                    .toggleClass('yellow');

                self.save();
            });

        actions.remove
            .unbind('click').click(function (e) {
                var element = $(e.currentTarget),
                    p = self.channelPosition(element.parents('tr').data('name')),
                    noRepeat = false;

                self.channels.splice(p, 1);

                self.save();

                element.parents('tr')
                    .transition('fade');

                element.parents('tr').children('td')
                    .animate({ padding: 0 })
                    .wrapInner('<div/>')
                    .children()
                    .slideUp(300, function () {
                        if (!noRepeat) {
                            element.parents('tr')
                                .remove();

                            self.emptyMessage();

                            self.updateCounters();

                            noRepeat = true;
                        }
                    });
            });

        actions.voice
            .unbind('change').change(function (e) {
                var element = $(e.currentTarget),
                    p = self.channelPosition(element.parents('tr').data('name'));

                self.channels[p].voice = element.val().trim();

                self.save();
            });

        actions.testVoice
            .unbind('click').click(function (e) {
                var p = self.channelPosition($(e.currentTarget).parents('tr').data('name'));

                chrome.runtime.sendMessage({
                    message : 'testVoice',
                    voice : self.channels[p].voice || self.channels[p].name,
                    type : self.settings.voice
                });
            });
    },

    channelPosition : function (channelName) {
        'use strict';
        var i;

        for (i = 0; i < this.channels.length; i += 1) {
            if (this.channels[i].name === channelName) {
                return i;
            }
        }

        return -1;
    },

    emptyMessage : function () {
        'use strict';
        var elements = {
                messages : {
                    live : $('.channels .live .emptyMessage'),
                    offline : $('.channels .offline .emptyMessage')
                },
                counts : {
                    live : $('.channels .live .channel').length,
                    offline : $('.channels .offline .channel').length
                }
            },
            type;

        for (type in elements.messages) {
            if (elements.messages.hasOwnProperty(type)) {
                if (!elements.counts[type]) {
                    elements.messages[type]
                        .fadeIn(300);
                } else {
                    elements.messages[type]
                        .fadeOut(300);
                }
            }
        }
    },

    save : function () {
        'use strict';
        localStorage.setItem('channels', JSON.stringify(this.channels));
    },

    updateCounters : function () {
        'use strict';
        var elements = {
                counts : {
                    live : $('.channels .live .channel').length,
                    offline : $('.channels .offline .channel').length
                },
                counters : {
                    live : $('[data-action=live] .counter'),
                    offline : $('[data-action=offline] .counter')
                }
            },
            counter,
            visible,
            count;

        for (counter in elements.counters) {
            if (elements.counters.hasOwnProperty(counter)) {
                visible = !elements.counters[counter].is(':hidden');
                count = elements.counts[counter];

                elements.counters[counter]
                    .text(elements.counts[counter]);

                if ((count && !visible) || (!count && visible)) {
                    elements.counters[counter]
                        .transition('fade down');
                }
            }
        }
    },

    update : function () {
        'use strict';
        $('.channels > div > table')
            .empty();

        $('.channels > div')
            .removeClass('transition visible')
            .attr('style', 'display: block')
            .hide();

        $('.channels > div.live')
            .addClass('loading')
            .show();

        $('[data-action=live]')
            .click();

        $('.channels .emptyMessage')
            .hide();

        this.channels = JSON.parse(localStorage.getItem('channels')) || [];

        this.show();

        this.updateCounters();
    }

};
