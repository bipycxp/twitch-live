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

var client_id = 'YOUR_CLIENT_ID';

function setRequestHeaders (request) {
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', client_id);
}

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

        var self = this;
        var limit = 100;
        var offset = 0;

        (function streams() {
          var requestedChannels = channels.slice(offset, limit + offset);

          if (!requestedChannels.length) {
            $(document)
              .trigger('successGetStreams');

            return true;
          }

          $.ajax({
            url : 'https://api.twitch.tv/helix/users',
            data : { login: requestedChannels },
            type : 'GET',
            beforeSend: function (request) {
              setRequestHeaders(request)
            },
            success : function (response) {
              $.ajax({
                url : 'https://api.twitch.tv/kraken/streams',
                data : {
                  channel: response.data.map(function (channel) {
                    return channel.id;
                  }),
                  limit : limit,
                  offset : 0
                },
                type : 'GET',
                beforeSend: function (request) {
                  setRequestHeaders(request)
                },
                success : function (response) {
                  self.streams = self.streams.concat(response.streams);

                  offset += limit

                  if (channels.length > offset) {
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
            },
            error : function () {
              $(document)
                .trigger('errorCheckChannel');
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
            url : 'https://api.twitch.tv/helix/users',
            data : { login: user },
            type : 'GET',
            beforeSend: function (request) {
              setRequestHeaders(request)
            },
            success : function (response) {
              $.ajax({
                url : 'https://api.twitch.tv/kraken/users/' + response.data[0].id + '/follows/channels',
                data : data,
                type : 'GET',
                beforeSend: function (request) {
                  setRequestHeaders(request)
                },
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
        url : 'https://api.twitch.tv/helix/users',
        data : { login: channel },
        type : 'GET',
        beforeSend: function (request) {
          setRequestHeaders(request)
        },
        success : function (response) {
          $.ajax({
            url : 'https://api.twitch.tv/kraken/channels/' + response.data[0].id,
            type : 'GET',
            beforeSend: function (request) {
              setRequestHeaders(request)
            },
            success : function () {
              $(document)
                .trigger('successCheckChannel');
            },
            error : function () {
              $(document)
                .trigger('errorCheckChannel');
            }
          });
        },
        error : function () {
          $(document)
            .trigger('errorCheckChannel');
        }
      });
    }

};
