var PainelPedagogico = angular.module('PainelPedagogico');

PainelPedagogico.controller('CompositeController',
        ['$scope', '$location', '$timeout', 'CompositeService', 'UserSessionService',
            function ($scope, $location, $timeout, CompositeService, UserSessionService) {
                if (!UserSessionService.isLogged()) {
                    $location.path('/login');
                    
                } else {
                    $scope.user = UserSessionService.getUser();
                }

                $scope.composites =[];
                CompositeService.load(function(){
                    $scope.composites = CompositeService.getComposites();
                });

            }]);