import * as toastr from 'toastr';
import CryptoJS from 'cryptojs';

import {jsonRequester} from './json-requester.js';

var dataManager = (function () {
    const LOCAL_STORAGE_USERNAME = 'logged-in-user-username';
    const LOCAL_STORAGE_AUTH_KEY = 'logged-in-user-auth-key';

    var dataManager = {
        users: {
            register: function (user) {
                var hash = CryptoJS.SHA1(user.username + user.password).toString();

                var requestUser = {
                    username: user.username,
                    passHash: hash
                };

                return jsonRequester.post('api/users', {
                    data: requestUser
                }).then(function (response) {
                    var user = response.result;
                    var username = user.username;
                    var authenticationKey = user.authKey;

                    localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
                    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, authenticationKey);

                    return user;
                });
            },

            logIn: function(user) {
                var hash = CryptoJS.SHA1(user.username + user.password).toString();

                var requestUser = {
                    username: user.username,
                    passHash: hash
                };

                return jsonRequester.put('api/users/auth', {
                    data: requestUser
                }).then(function (response) {
                    var user = response.result;
                    var username = user.username;
                    var authenticationKey = user.authKey;

                    localStorage.setItem(LOCAL_STORAGE_USERNAME, username);
                    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, authenticationKey);

                    return user;
                });
            }
        }
    };

    return dataManager;
}());

export {dataManager};