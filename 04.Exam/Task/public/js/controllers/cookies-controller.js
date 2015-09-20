import * as toastr from '../../bower_components/toastr/toastr.js';

import {dataManager} from '../utils/data-manager.js';
import {templatesManager} from '../utils/templates-manager.js';
import {validator} from '../utils/validator.js';

var cookiesController = (function () {
    var cookiesController = {
        setLikeOrDislike: function (state, id) {
            dataManager.cookies.likeOrDislike(state, id);
        },

        loadShareCookiePage: function (context) {
            $('#cookies-tools').hide();
            var compiledTemplate = templatesManager.load('share-cookie-template');
            context.$element().html(compiledTemplate());
            $('#btn-share-new-cookie').on('click', function () {
                var cookieText = $('#tb-text').val();
                var cookieCategory = $('#tb-category').val();
                var cookieImg = $('#tb-image').val();

                if (validator.isCookiePropertyValid(cookieText) &&
                    validator.isCookiePropertyValid(cookieCategory) &&
                    (validator.isUrlValid(cookieImg) || cookieImg === '')) {
                    var cookieToShare = {
                        text: cookieText,
                        category: cookieCategory,
                        img: cookieImg
                    };

                    dataManager.cookies.share(cookieToShare)
                        .then(function () {
                            toastr.success("Your fortune cookie has been successfully shared. Let the likes begin!");
                            context.redirect('#/home');
                        });
                } else {
                    toastr.error('An almighty error occurred! - "Cookie text and category must be between 6 and 30 characters and url must be valid"');
                }
            })
        }
    };

    return cookiesController;
}());

export {cookiesController}