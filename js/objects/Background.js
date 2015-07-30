/*global $, chrome, Twitch, SpeechSynthesisUtterance, speechSynthesis */
/*jslint browser: true */
var Background = function () {
    'use strict';
    this.twitch = new Twitch();

    this.channels = JSON.parse(localStorage.getItem('channels')) || [];
    this.settings = JSON.parse(localStorage.getItem('settings'));

    if (!this.settings) {
        this.settings = {
            enableNotifications : true,
            enableVoice : false,
            voice : 'googleEn'
        };

        this.save();
    }

    this.now = [];

    var self = this;

    try {
        JSON.parse(localStorage.getItem('channels'));
    } catch (e) {
        localStorage.clear();
    }

    localStorage.setItem('version', chrome.app.getDetails().version);

    this.notification();

    setInterval(function () {
        self.notification();
    }, 5000);
};

Background.prototype = {

    getStreams : function () {
        'use strict';
        var channels = [],
            self = this,
            i;

        this.updateFromStorage();

        for (i = 0; i < this.channels.length; i += 1) {
            channels.push(this.channels[i].name);
        }

        this.twitch.getStreams(channels);

        $(document)
            .unbind('successGetStreams').one('successGetStreams', function () {
                chrome.runtime.sendMessage({
                    message : 'successGetStreams',
                    streams : self.twitch.streams
                });
            })
            .unbind('errorGetStreams').one('errorGetStreams', function () {
                chrome.runtime.sendMessage({
                    message : 'errorGetStreams'
                });
            });
    },

    importUserFollows : function (user) {
        'use strict';
        var self = this;

        if (!user) {
            chrome.runtime.sendMessage({
                message : 'errorImportUserFollows'
            });

            return false;
        }

        this.twitch.getUserFollows(user);

        $(document)
            .unbind('successGetUserFollows').one('successGetUserFollows', function () {
                var channelName,
                    i,
                    pushedCount = 0;

                self.updateFromStorage();

                for (i = 0; i < self.twitch.userFollows.length; i += 1) {
                    channelName = self.twitch.userFollows[i].channel.name;

                    if (self.channelPosition(channelName) === -1) {
                        self.channels.push({name : channelName});

                        chrome.runtime.sendMessage({
                            message : 'analytics',
                            type : 'Channel',
                            value : channelName
                        });

                        pushedCount += 1;
                    }
                }

                self.save();

                if (pushedCount) {
                    chrome.runtime.sendMessage({
                        message : 'successImportUserFollows'
                    });
                } else {
                    chrome.runtime.sendMessage({
                        message : 'errorImportUserFollows',
                        description : 'noPushed'
                    });
                }
            })
            .unbind('errorGetUserFollows').one('errorGetUserFollows', function () {
                chrome.runtime.sendMessage({
                    message : 'errorImportUserFollows'
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

    save : function () {
        'use strict';
        localStorage.setItem('channels', JSON.stringify(this.channels));
        localStorage.setItem('settings', JSON.stringify(this.settings));
    },

    addChannel : function (channel) {
        'use strict';
        channel = channel.toLowerCase();

        if (!channel) {
            chrome.runtime.sendMessage({
                message : 'errorAddChannel'
            });

            return false;
        }

        this.updateFromStorage();

        if (this.channelPosition(channel) !== -1) {
            chrome.runtime.sendMessage({
                message : 'errorAddChannel',
                description : 'channelExists'
            });

            return false;
        }

        var self = this;

        this.updateFromStorage();

        this.twitch.checkChannel(channel);

        $(document)
            .unbind('successCheckChannel').one('successCheckChannel', function () {
                self.channels.push({
                    name : channel
                });

                self.save();

                chrome.runtime.sendMessage({
                    message : 'analytics',
                    type : 'Channel',
                    value : channel
                });

                chrome.runtime.sendMessage({
                    message : 'successAddChannel'
                });
            })
            .unbind('errorCheckChannel').one('errorCheckChannel', function () {
                chrome.runtime.sendMessage({
                    message : 'errorAddChannel'
                });
            });
    },

    updateFromStorage : function () {
        'use strict';
        this.channels = JSON.parse(localStorage.getItem('channels')) || [];
        this.settings = JSON.parse(localStorage.getItem('settings')) || {};
    },

    voice : function (voices, type) {
        'use strict';
        type = type || this.settings.voice;

        var message,
            text;

        if (type === 'googleEn') {
            if (Array.isArray(voices)) {
                if (voices.length >= 3) {
                    text = voices[0] + ',' + voices[1] + ' and more are online';
                } else if (voices.length === 2) {
                    text = voices[0] + ' and ' + voices[1] + ' are online';
                } else {
                    text = voices[0] + ' is online';
                }
            } else {
                text = voices;
            }

            message = new SpeechSynthesisUtterance();

            message.rate = 0.9;
            message.text = text;

            speechSynthesis.speak(message);
        } else {
            $('<audio autoplay><source src="/audio/' + type + '.mp3"></audio>')
                .appendTo('body');
        }
    },

    notification : function () {
        'use strict';
        var self = this,
            channels = [],
            i;

        this.updateFromStorage();

        for (i = 0; i < this.channels.length; i += 1) {
            channels.push(this.channels[i].name);
        }

        if (channels.length) {
            this.twitch.getStreams(channels);
        } else {
            chrome.browserAction.setBadgeText({
                text : ''
            });

            return false;
        }

        $(document)
            .unbind('successGetStreams').one('successGetStreams', function () {
                var streams = [],
                    voices = [],
                    channel;

                for (i = 0; i < self.twitch.streams.length; i += 1) {
                    streams.push(self.twitch.streams[i].channel.name);
                }

                if (!streams.length) {
                    chrome.browserAction.setBadgeText({
                        text : ''
                    });

                    return false;
                }

                chrome.browserAction.setBadgeBackgroundColor({
                    color : '#333'
                });

                chrome.browserAction.setBadgeText({
                    text : streams.length.toString()
                });

                function callback(id) {
                    return id;
                }

                for (i = 0; i < streams.length; i += 1) {
                    channel = self.channels[self.channelPosition(streams[i])];

                    if ($.inArray(channel.name, self.now) === -1 && channel.favorite) {
                        if (self.settings.enableNotifications) {
                            chrome.notifications.create(
                                Math.floor(Math.random() * 1000).toString() + '{tl}' + channel.name,
                                {
                                    type    : 'basic',
                                    title   : chrome.app.getDetails().name,
                                    message : channel.name.charAt(0).toUpperCase() + channel.name.substr(1) + ' is online',
                                    iconUrl : '/img/icons/notification.png'
                                },
                                callback
                            );
                        }

                        if (self.settings.enableVoice) {
                            voices.push(channel.voice || channel.name);
                        }
                    }
                }

                chrome.notifications.onClicked.addListener(function (id) {
                    window.open('http://twitch.tv/' + id.replace(/^\d+\{tl\}/, ''));
                });

                if (voices.length) {
                    self.voice(voices);
                }

                self.now = streams;
            });
    }

};
