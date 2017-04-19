(function () {
    var services = angular.module("common.services");
    services.factory("authenticationFactory", ['$injector', 'loginResource', 'libFactory', '$rootScope', 'authTokenFactory', authenticationService]);

    function authenticationService($injector, loginResource, libFactory, $rootScope, authTokenFactory) {


        function login(username, password) {
            console.log(loginResource);
            return loginResource.save({
                username: username,
                password: password
            }, function success(response, headers) {
                debugger
                authTokenFactory.setUserDetails(response[0].toJSON());

            }, function error(response) {
                debugger
            }).$promise;
        }

        function logout() {
            try {
                authTokenFactory.reset();

            } catch (error) {}

        }

        function isLoggedIn() {
            try {
                var token = authTokenFactory.getToken();
                var user = authTokenFactory.getUserDetails();
                if (token && isTokenValid(token) && user && !libFactory._.isEmpty(user)) {
                    $rootScope.$broadcast(AUTH.authEvent.userInformationUpdate, user);
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        }


        function getUserDetails() {
            return authTokenFactory.getUserDetails();
        }

        function getUserAuthorizedRole() {

            try {
                var user = authTokenFactory.getUserDetails();
                return user.role;
            } catch (error) {
                return undefined;
            }
        }

        function isAuthorized(authorizedRoles) {
            var isAuthorized = false;
            try {
                var userRole = getUserAuthorizedRole();
                if (userRole) {
                    isAuthorized = authorizedRoles.some(function (role) {
                        return role.toLowerCase() == userRole.toLowerCase();
                    });

                } else {
                    $rootScope.$broadcast(AUTH.authEvent.fetchUserDetailsFail);
                }
                return isAuthorized;
            } catch (error) {
                $rootScope.$broadcast(AUTH.authEvent.somethingWrong);
                return false;
            }
        }

        function hasToken() {
            try {
                var token = authTokenFactory.getToken();
                if (token) {
                    return true;
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }

        }

        function extractToken(token) {
            if (token.includes(AUTH.bearer)) {
                var splitArray = token.split(" ");
                token = splitArray[1];
            }
            return token;
        }

        function manageRefreshToken(token) {

            var currentToken = authTokenFactory.getToken();
            token = extractToken(token);
            if (currentToken) {
                if (currentToken != token) {
                    authTokenFactory.setToken(token);
                }
            }
        }

        function blackListToken(token) {
            debugger;
            token = extractToken(token);
            if (!$rootScope.blackListToken) {
                $rootScope.blackListToken = [];
            }
            $rootScope.blackListToken.push(token);
        }

        function isTokenValid(token) {
            debugger;
            token = extractToken(token);
            var isTokenValid = true;
            if ($rootScope.blackListToken) {
                var index = libFactory._.indexOf($rootScope.blackListToken, token);
                if (index > -1) {
                    isTokenValid = false;
                }
            }
            return isTokenValid;
        }

        function isExternalUrl(url) {
            var isExternalUrl = false;
            if (url.includes(CONFIG.url.base)) {
                isExternalUrl = true;
            }
            return isExternalUrl;
        }

        function resetLocalStorage() {
            try {
                authTokenFactory.reset();

            } catch (error) {

            }

        }

        return {
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            getUserDetails: getUserDetails,
            getUserAuthorizedRole: getUserAuthorizedRole,
            isAuthorized: isAuthorized,
            hasToken: hasToken,
            manageRefreshToken: manageRefreshToken,
            blackListToken: blackListToken,
            isTokenValid: isTokenValid,
            isExternalUrl: isExternalUrl,
            resetLocalStorage: resetLocalStorage
        };
    }
}());
