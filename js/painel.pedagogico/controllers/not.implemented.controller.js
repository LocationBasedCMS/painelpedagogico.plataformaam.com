var PainelPedagogico = angular.module('PainelPedagogico');
PainelPedagogico.controller('NotImplemented', ['$location', 'UserSessionService', function ($location, UserSessionService) {
        if (!UserSessionService.isLogged()) {
            $location.path('/login');
        }
    }]);
