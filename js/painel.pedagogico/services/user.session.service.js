var PainelPedagogico = angular.module('PainelPedagogico');



//DEVE SER REIMPLEMENTADO PARA GARANTIR A SEGURANÇA
PainelPedagogico.service('UserSessionService', ['$http',function ($http) {

        //PRIVATES VALUES
        var logged = false;
        var user = null;

        var UserSessionService = {
            registerUser: function (aUser,password) {
                logged = true;
                user = aUser;
                user.password = password;
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
                if( !angular.isUndefined(login) && !angular.isUndefined(password) && login != '' && password != ''  ){
                    var myHeaders = {
                        'HTTP_X_REST_CORS': 'Yes',
                        'HTTP_X_REST_USERNAME': login,
                        'HTTP_X_REST_PASSWORD': password
                    };
                    $http.get('http://api.plataformaam.com/v3/index.php/api/User?filter=[{"property": "login", "value" : "' + login + '", "operator": "="}]',
                    //$http.get('http://api.plataformaam.com/v2/teste.php',
                        {
                            headers: myHeaders,
                        }
                    ).success(function (response) {
                        if (response.success && response.data.totalCount == 1) {
                            UserSessionService.registerUser(response.data.user[0],password);
                        } else {
                            UserSessionService.unregisterUser();
                            console.log("LOGIN ERROR:", response);
                        }
                    }).error(function (error) {
                        console.log("LOGIN ERROR:", error);
                        UserSessionService.unregisterUser();
                    });
                }else{
                        console.log("LOGIN WARNING:","Defina usuário e senha.");
                        UserSessionService.unregisterUser();
                }
            }
        };
        return UserSessionService;

    }]);


