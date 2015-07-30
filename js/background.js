/*global chrome, Background */
var background = new Background();

chrome.runtime.onMessage.addListener(
    function (request) {
        'use strict';
        switch (request.message) {
        case 'getStreams':
            background.getStreams();
            break;
        case 'importUserFollows':
            background.importUserFollows(request.user);
            break;
        case 'addChannel':
            background.addChannel(request.channel);
            break;
        case 'testVoice':
            background.voice(request.voice, request.type);
            break;
        }
    }
);
