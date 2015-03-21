var PainelPedagogico = angular.module('PainelPedagogico');

PainelPedagogico.controller('CompositeController', ['$scope', '$http', '$location', 'UserSessionService', 'PanelService', function ($scope, $location, UserSessionService, PanelService) {
        console.log('CompositeController');
        if (!UserSessionService.isLogged()) {
            $location.path('/login');
        } else {
            $scope.user = UserSessionService.getUser();
            
            
            
            
        }

    }]);