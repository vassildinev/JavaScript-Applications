// moment js test

import moment from 'bower_components/moment/moment.js';

(function () {
    var now = moment("20181031", "YYYYMMDD").fromNow();
    console.log(now);
}());