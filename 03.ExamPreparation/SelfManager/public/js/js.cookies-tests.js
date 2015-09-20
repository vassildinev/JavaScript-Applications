import Cookies from '../bower_components/js.cookie/index.js';

var pesho = function () {
    Cookies.set('pesho', {
        age: 30,
        grade: -10
    });
};

export {pesho};