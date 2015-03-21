var PainelPedagogico = angular.module('PainelPedagogico');

//DEVE SER REIMPLEMENTADO PARA GARANTIR A SEGURANÇA
PainelPedagogico.service('CompositeService', ['$http', 'UserSessionService', function ($http, UserSessionService) {
        var composites = null;
        var loadComposites = function () {
            if (UserSessionService.isLogged( )) {
                var user = UserSessionService.getUser();
                $http.get('http://painelpedagogico.plataformaam.com/v1/index.php/api/VComComposite?filter=[{"property": "id", "value" : "1", "operator": "<>"}]',
                        {
                            headers: {"HTTP_X_REST_USERNAME": user.login, "HTTP_X_REST_PASSWORD": user.password, "X_REST_CORS": 'Yes'}
                        }
                    ).success(function (response) {
                        if (response.success && response.data.totalCount > 0) {
                            PanelService.composites = response.data.vComComposite;
                        } else {
                            PanelService.composites = null;
                        }
                    }).error(function (error) {
                        console.log("ERRO", error)
                    });
            }
        };

        /*
         
         
         
         
         }
         
         ;
         };
         */
        var CompositeService = {
            load: function () {
                loadComposites();
            },
            getCompositesList: function () {
                return composites;
            },
        };
        return CompositeService;

    }]);


