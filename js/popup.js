/*globals $, chrome, Popup */
/*jslint browser: true */
var popup = new Popup();

popup.show();

chrome.runtime.onMessage.addListener(
    function (request) {
        'use strict';
        switch (request.message) {
        case 'successGetStreams':
            popup.streams = request.streams;
            popup.showStreams();
            break;
        default:
            if (typeof request.message === 'string') {
                $(document).trigger({
                    type : request.message,
                    description : request.description
                });
            }
            break;
        }
    }
);
