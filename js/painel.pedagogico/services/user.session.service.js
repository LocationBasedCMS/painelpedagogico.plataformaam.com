var PainelPedagogico = angular.module('PainelPedagogico');



//DEVE SER REIMPLEMENTADO PARA GARANTIR A SEGURANÇA
PainelPedagogico.service('UserSessionService', ['$http',function ($http) {

        //PRIVATES VALUES
        var logged = false;
        var user = null;

        var UserSessionService = {
            registerUser: function (aUser) {
                logged = true;
                user = aUser;
            },
            //EFETUA LOGOUT
            unregisterUser: function () {
                logged = false;
                user = null;
            },
            //INFORMA USUÁRIO
            getUser: function () {
                return user;
            },
            isLogged: function () {
                return logged;
            },
            doLogin: function (login, password) {
                var myHeaders = {
                    "HTTP_X_REST_USERNAME": login,
                    "HTTP_X_REST_PASSWORD": password,
                    "X_REST_CORS": 'Yes',
                };
                $http.get('http://api.plataformaam.com/v2/index.php/api/User?filter=[{"property": "login", "value" : "' + login + '", "operator": "="}]',
                    {
                        headers: myHeaders,
                    }
                ).success(function (response) {
                    if (response.success && response.data.totalCount == 1) {
                        UserSessionService.registerUser(response.data.user[0]);
                    } else {
                        UserSessionService.unregisterUser();
                        console.log("LOGIN ERROR:", response);
                    }
                }).error(function (error) {
                    console.log("LOGIN ERROR:", error);
                    UserSessionService.unregisterUser();
                });
            }


        };
        return UserSessionService;

    }]);


