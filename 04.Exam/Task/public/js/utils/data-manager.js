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

                    return username;
                });
            },

            logIn: function (user) {
                var hash = CryptoJS.SHA1(user.username + user.password).toString();

                var requestUser = {
                    username: user.username,
                    passHash: hash
                };

                return jsonRequester.put('api/auth', {
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
        },

        cookies: {
            getAll: function () {
                var authorizationKey = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
                var headers = {
                    'x-auth-key': authorizationKey
                };

                var options = {
                    headers: headers
                };

                return jsonRequester.get('api/cookies')
                    .then(function (response) {
                        var cookies = response.result;
                        return cookies;
                    });
            },

            likeOrDislike: function (state, id) {
                var headers = {
                    'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
                };

                return jsonRequester.put('api/cookies/' + id, {
                    headers: headers,
                    data: {
                        type: state
                    }
                })
                    .then(function (response) {
                        var updatedCookie = response.result;
                        return updatedCookie;
                    });
            },

            share: function (cookie) {
                var headers = {
                    'x-auth-key': localStorage.getItem(LOCAL_STORAGE_AUTH_KEY)
                };

                return jsonRequester.post('api/cookies', {
                    headers: headers,
                    data: cookie
                });
            }
        },

        categories: {
            getAll: function () {
                var authorizationKey = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);
                var headers = {
                    'x-auth-key': authorizationKey
                };

                var options = {
                    headers: headers
                };

                return jsonRequester.get('api/categories')
                    .then(function (response) {
                        var categories = response.result;
                        return categories;
                    });
            }
        }
    };

    return dataManager;
}());

export {dataManager};