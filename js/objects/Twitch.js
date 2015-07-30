/*global $ */
/*jslint browser: true */
Number.prototype.toHms = function (s) {
    'use strict';
    s = s || false;

    var hours   = Math.floor(this / 3600),
        minutes = Math.floor((this - (hours * 3600)) / 60),
        seconds = this - (hours * 3600) - (minutes * 60);

    hours = hours ? hours + 'h ' : '';
    minutes = (!minutes && hours) || (!minutes && !hours && s) ? '' : !minutes && !hours ? '1m' : minutes + 'm ';
    seconds = !s || !seconds ? '' : seconds + 's';

    return (hours + minutes + seconds).trim();
};

var Twitch = function () {
    'use strict';
    this.userFollows = [];
    this.streams = [];
};

Twitch.prototype = {

    getStreams : function (channels) {
        'use strict';
        if (!channels.length) {
            return false;
        }

        this.streams = [];

        var self = this,
            data = {
                channel : channels.join(','),
                limit : 100,
                offset : 0,
                r : Math.random()
            };

        (function streams() {
            $.ajax({
                url : 'https://api.twitch.tv/kraken/streams',
                data : data,
                type : 'GET',
                success : function (response) {
                    self.streams = self.streams.concat(response.streams);

                    if (response.streams.length === data.limit && self.streams.length < response._total) {
                        data.offset += data.limit;

                        streams();

                        return false;
                    }

                    self.streams = self.streams.map(function (stream) {
                        return {
                            game : stream.game,
                            viewers : stream.viewers,
                            start_at : stream.created_at,
                            live : Math.floor((new Date() - new Date(stream.created_at)) / 1000).toHms(),
                            channel : {
                                status : stream.channel.status,
                                name : stream.channel.name,
                                display_name : stream.channel.display_name,
                                logo : stream.channel.logo,
                                url : stream.channel.url
                            }
                        };
                    });

                    self.streams.sort(function (a, b) {
                        return b.viewers - a.viewers;
                    });

                    $(document)
                        .trigger('successGetStreams');
                },
                error : function () {
                    $(document)
                        .trigger('errorGetStreams');
                }
            });
        }());
    },

    getUserFollows : function (user) {
        'use strict';
        if (!user) {
            return false;
        }

        var self = this,
            data = {
                limit : 100,
                offset : 0
            };

        this.userFollows = [];

        (function follows() {
            $.ajax({
                url : 'https://api.twitch.tv/kraken/users/' + user + '/follows/channels',
                data : data,
                type : 'GET',
                success : function (response) {
                    self.userFollows = self.userFollows.concat(response.follows);

                    if (response.follows.length === data.limit && self.userFollows.length < response._total) {
                        data.offset += data.limit;

                        follows();

                        return false;
                    }

                    self.streams = self.userFollows.map(function (follow) {
                        return {
                            name : follow.channel.name
                        };
                    });

                    $(document)
                        .trigger('successGetUserFollows');
                },
                error : function () {
                    $(document)
                        .trigger('errorGetUserFollows');
                }
            });
        }());
    },

    checkChannel : function (channel) {
        'use strict';
        if (!channel) {
            return false;
        }

        $.ajax({
            url : 'https://api.twitch.tv/kraken/channels/' + channel,
            type : 'GET',
            success : function () {
                $(document)
                    .trigger('successCheckChannel');
            },
            error : function () {
                $(document)
                    .trigger('errorCheckChannel');
            }
        });
    }

};
