import $ from 'jquery';
import Handlebars from 'handlebars';

var templatesManager = (function () {
    var templatesManager = {
        load: function (id) {
            var template = $('#' + id).html();
            var compiledTemplate = Handlebars.compile(template);

            return compiledTemplate;
        }
    };

    return templatesManager;
}());

export {templatesManager};