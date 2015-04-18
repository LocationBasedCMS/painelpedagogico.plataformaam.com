var PainelPedagogico = angular.module('PainelPedagogico');

//DEVE SER REIMPLEMENTADO PARA GARANTIR A SEGURANÇA
PainelPedagogico.service('CompositeService', ['$http', 'UserSessionService', '$rootScope', function ($http, UserSessionService, $rootScope) {
        var composites = [];
        var loadComposites = function (callback) {
            if (UserSessionService.isLogged( )) {
                var user = UserSessionService.getUser();
                $http.get('http://api.plataformaam.com/v2/index.php/api/VComComposite?filter=[{"property": "id", "value" : "1", "operator": "<>"}]',
                        {
                            headers: {"HTTP_X_REST_USERNAME": user.login, "HTTP_X_REST_PASSWORD": user.password, "X_REST_CORS": 'Yes'}
                        }
                ).success(function (response) {
                    if (response.success && response.data.totalCount > 0) {
                        composites = response.data.vComComposite;
                        if (angular.isFunction(callback)) {
                            callback(composites);
                        }

                    } else {
                        composites = null;
                    }
                }).error(function (error) {
                    console.log("ERRO", error)
                });
            }

        };

        var fnGetCompositeById = function (compositeId, Callback) {
            if (compositeId == null || !UserSessionService.isLogged()) {
                Callback(null);
            } else {
                //TESTA SE JÀ OCORREU A CARGHA DOS COMPOSITES
                if (composites == null || composites.length == 0) {
                    loadComposites(function () {
                        fnGetCompositeById(compositeId, Callback);
                    });
                } else {
                    angular.forEach(composites, function (value, key) {
                        if (value.id == compositeId) {
                            Callback(value, key);
                        }
                    });
                }
            }
        };


        var fnGetCompositeUsers = function (composite, Callback) {
            if (composite != null) {

                var roles = [];
                angular.forEach(composite.vComUserRoles, function (value, key) {
                    roles.push(value.id);

                });
                if (roles.length == 0) {
                    Callback(null);
                } else {
                    var user = UserSessionService.getUser();
                    var filter = [{
                            "property": "id",
                            "value": roles,
                            "operator": "in"
                        }];

                    $http.get('http://painelpedagogico.plataformaam.com/v1/index.php/api/VComUserRole?filter=' + filter,
                            {
                                headers: {"HTTP_X_REST_USERNAME": user.login, "HTTP_X_REST_PASSWORD": user.password, "X_REST_CORS": 'Yes'}
                            }
                    ).success(function (response) {
                        if (response.success && response.data.totalCount > 0) {
                            var users = [];
                            var lookup = [];
                            responseRoles = response.data.vComUserRole;
                            //PERCORRE CADA PAPEL
                            angular.forEach(responseRoles, function (responseRole) {
                                var responseUsers = responseRole.users;
                                //TESTA CADA USUÁRIO DE CADA PAPEL
                                angular.forEach(responseUsers, function (responseUser) {
                                    if (lookup[responseUser.id] == undefined) {
                                        lookup[responseUser.id] = responseUser.id;
                                        users.push(responseUser);

                                    }
                                });
                            });
                            Callback(users);
                        } else {
                            Callback(null);
                        }

                    }).error(function (error) {
                        console.log("ERRO", error)
                        Callback(null);
                    });
                }
            } else {
                Callback(null);
            }

        };


        var fnGetCompositePublication = function (composite, Callback) {
            if (composite != null) {
                var bases = [];
                angular.forEach(composite.vComBases, function (value) {
                    bases.push(value.id);
                });
                if (bases.length == 0) {
                    Callback(null);
                } else {
                    var user = UserSessionService.getUser();
                    var filter = [{
                            "property": "vcombase",
                            "value": bases,
                            "operator": "in"
                        }];

                    $http.get('http://painelpedagogico.plataformaam.com/v1/index.php/api/VComUPIPublication?filter=' + filter,
                            {
                                headers: {"HTTP_X_REST_USERNAME": user.login, "HTTP_X_REST_PASSWORD": user.password, "X_REST_CORS": 'Yes'}
                            }
                    ).success(function (response) {
                            if (response.success && response.data.totalCount > 0) {
                                Callback(response.data.vComUPIPublication);
                            }else{
                                Callback(null);
                            }
                    }).error(function (error) {
                        console.log("ERRO", error)
                        Callback(null);
                    });



                }
            }
        };




        var CompositeService = {
            load: function (callback) {
                loadComposites(callback);
            },
            getComposites: function () {
                return composites;
            },
            getCompositesCount: function () {
                if (composites == null)
                    return 0;
                return composites.length;
            },
            getCompositeById: function (compositeId, CallBack) {
                fnGetCompositeById(compositeId, CallBack);
            },
            getCompositeUsers: function (composite, CallBack) {
                fnGetCompositeUsers(composite, CallBack);
            },
            getCompositePublication: function (composite, CallBack) {
                fnGetCompositePublication(composite, CallBack);
            }
        };
        return CompositeService;

    }]);


