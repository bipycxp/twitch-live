/*global $, chrome */
/*jslint browser: true */
var Settings = function () {
    'use strict';
    this.settings = JSON.parse(localStorage.getItem('settings')) || {};

    this.templates = {
        settingsMessage : 'settingsMessage'
    };

    this.timeoutId = null;
    this.channelsChanged = false;

    var templateName;

    for (templateName in this.templates) {
        if (this.templates.hasOwnProperty(templateName)) {
            this.templates[templateName] = $('[data-template="' + this.templates[templateName] + '"]')[0].innerHTML;
        }
    }

    $('.share').ShareLink({
        title: chrome.app.getDetails().name,
        text: chrome.app.getDetails().description,
        url: 'https://chrome.google.com/webstore/detail/' + chrome.app.getDetails().id,
        width: 640,
        height: 480
    });
};

Settings.prototype = {

    show : function () {
        'use strict';
        var elements = {
                ui : {
                    dimmer : $('.ui.dimmer.settings'),
                    tab : $('.settings .ui.pointing.menu .item'),
                    dropdown : $('.settings .ui.dropdown'),
                    checkbox : $('.settings .ui.checkbox')
                },
                actions : {
                    addChannel : $('[data-action=addChannel]'),
                    importChannels : $('[data-action=importChannels]')
                }
            },
            self = this;

        this.channelsChanged = false;

        $('.ui.dimmer')
            .dimmer('hide');

        elements.ui.dimmer
            .dimmer('show')
            .dimmer({
                onHide : function () {
                    if (self.channelsChanged) {
                        $(document)
                            .trigger('channelsChanged');
                    }
                }
            });

        elements.actions.addChannel
            .unbind('click').click(function (e) {
                self.addChannel($(e.currentTarget));
            });

        elements.actions.importChannels
            .unbind('click').click(function (e) {
                self.importChannels($(e.currentTarget));
            });

        $(document)
            .unbind('keyup').keyup(function (event) {
                var key = event.keyCode || event.which;

                if (key === 13) {
                    $('.settings:visible .active.tab .ui.button')
                        .click();
                }

                return false;
            });

        elements.ui.checkbox
            .unbind('change').change(function (e) {
                var element = $(e.currentTarget);

                self.settings[element.data('name')] = element.is('.checked');

                self.save();
            });

        /*jslint unparam: true*/
        elements.ui.dropdown
            .dropdown({
                onChange : function (value, text, element) {
                    element = $(element).parents('.ui.dropdown');

                    self.settings[element.data('name')] = value;

                    self.save();

                    chrome.runtime.sendMessage({
                        message : 'testVoice',
                        voice : self.settings.voice === 'googleEn' ? 'hello' : 'привет',
                        type : $(element).data('value')
                    });
                }
            });
        /*jslint unparam: false*/

        elements.ui.tab
            .tab();
        elements.ui.checkbox
            .checkbox();

        this.restore();
    },

    addChannel : function (button) {
        'use strict';
        var self = this;

        button
            .addClass('loading');

        chrome.runtime.sendMessage({
            message : 'addChannel',
            channel : button.parent().find('input').val().trim()
        });

        $(document)
            .one('successAddChannel', function () {
                button
                    .removeClass('loading');

                button.parent().find('input')
                    .val('');

                self.message({
                    color : 'green',
                    text : 'Success',
                    tabName : 'addChannel'
                });

                self.channelsChanged = true;
            })
            .one('errorAddChannel', function (event) {
                button
                    .removeClass('loading');

                if (event.description === 'channelExists') {
                    self.message({
                        color : 'yellow',
                        icon : 'warning sign',
                        text : 'Channel exists',
                        tabName : 'addChannel'
                    });
                } else {
                    self.message({
                        color : 'red',
                        icon : 'warning sign',
                        text : 'Error',
                        tabName : 'addChannel'
                    });
                }
            });
    },

    importChannels : function (button) {
        'use strict';
        var self = this;

        button
            .addClass('loading');

        chrome.runtime.sendMessage({
            message : 'importUserFollows',
            user : button.parent().find('input').val().trim()
        });

        $(document)
            .one('successImportUserFollows', function () {
                button
                    .removeClass('loading');

                button.parent().find('input')
                    .val('');

                self.message({
                    color : 'green',
                    text : 'Success',
                    tabName : 'importChannels'
                });

                self.channelsChanged = true;
            })
            .one('errorImportUserFollows', function (event) {
                button
                    .removeClass('loading');

                if (event.description === 'noPushed') {
                    self.message({
                        color : 'yellow',
                        text : 'Not pushed',
                        tabName : 'importChannels'
                    });
                } else {
                    self.message({
                        color : 'red',
                        text : 'Error',
                        tabName : 'importChannels'
                    });
                }
            });
    },

    save : function () {
        'use strict';
        localStorage.setItem('settings', JSON.stringify(this.settings));
    },

    restore : function () {
        'use strict';
        var item,
            elem;

        for (item in this.settings) {
            if (this.settings.hasOwnProperty(item)) {
                elem = $('.settings [data-name=' + item + ']');

                if (elem.is('.toggle') && this.settings[item]) {
                    elem
                        .checkbox('check');
                } else if (elem.is('.dropdown')) {
                    elem
                        .dropdown('set text', this.settings[item]);
                }
            }
        }
    },

    message : function (options) {
        'use strict';
        var tab = $('.tab[data-tab=' + options.tabName + ']'),
            icons = {
                green : 'checkmark',
                yellow : 'warning sign',
                red : 'warning sign'
            };

        clearTimeout(this.timeoutId);

        tab.find('.notice')
            .hide(200, function () {
                tab.find('.notice:first')
                    .remove();
            });

        tab.append(
            this.templates.settingsMessage
                .replace('{color}', options.color)
                .replace('{icon}', icons[options.color])
                .replace('{text}', options.text)
        );

        tab.find('.notice')
            .transition('fade');

        this.timeoutId = setTimeout(function () {
            tab.find('.notice')
                .hide(200, function () {
                    tab.find('.notice')
                        .remove();
                });
        }, 3000);
    }

};
