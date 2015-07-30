/*global $, jQuery */
/*jslint browser: true */

/**
 * Modified SocialShare.
 *
 * Original: https://github.com/AyumuKasuga/SocialShare
 */
(function ($) {
    'use strict';

    function get_class_list(elem) {
        if (elem.classList) {
            return elem.classList;
        }

        return $(elem).attr('class').match(/\S+/gi);
    }

    $.fn.ShareLink = function (opt) {
        var defaults = {
                title: '',
                text: '',
                image: '',
                url: window.location.href,
                class_prefix: ''
            },
            options = $.extend({}, defaults, opt),
            class_prefix_length = options.class_prefix.length,
            templates = {
                twitter: 'https://twitter.com/intent/tweet?url={url}&text={text}',
                facebook: 'https://www.facebook.com/sharer.php?s=100&p[title]={title}&p[summary]={text}&p[url]={url}&p[images][0]={image}',
                vk: 'https://vkontakte.ru/share.php?url={url}&title={title}&description={text}&image={image}&noparse=true',
                plus: 'https://plus.google.com/share?url={url}'
            };

        function link(network) {
            var url = templates[network];
            url = url.replace('{url}', encodeURIComponent(options.url));
            url = url.replace('{title}', encodeURIComponent(options.title));
            url = url.replace('{text}', encodeURIComponent(options.text));
            url = url.replace('{image}', encodeURIComponent(options.image));
            return url;
        }

        /*jslint unparam:true */
        this.each(function (num, elem) {
            var classlist = get_class_list(elem),
                i,
                cls,
                final_link;

            function openWindow() {
                var screen_width = screen.width,
                    screen_height = screen.height,
                    popup_width = options.width || (screen_width - (screen_width * 0.2)),
                    popup_height = options.height || (screen_height - (screen_height * 0.2)),
                    left = (screen_width / 2) - (popup_width / 2),
                    top = (screen_height / 2) - (popup_height / 2),
                    parameters = 'toolbar=0,status=0,width=' + popup_width + ',height=' + popup_height + ',top=' + top + ',left=' + left;

                return window.open($(elem).attr('href'), '', parameters) && false;
            }

            for (i = 0; i < classlist.length; i += 1) {
                cls = classlist[i];

                if (cls.substr(0, class_prefix_length) === options.class_prefix && templates[cls.substr(class_prefix_length)]) {
                    final_link = link(cls.substr(class_prefix_length));

                    $(elem).attr('href', final_link).click(openWindow);
                }
            }
        });
    };
}(jQuery));
