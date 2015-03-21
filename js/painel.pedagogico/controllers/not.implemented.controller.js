
var PainelPedagogico = angular.module('PainelPedagogico');


//CONTROLLER NOT IMPLEMENTED - FOR THE PROVIDEDS ROUTES
PainelPedagogico.controller('NotImplemented', ['$scope','$location', 'UserSessionService', function ($scope,$location, UserSessionService) {
        console.log('NotImplemented');
        if (!UserSessionService.isLogged()) {
            $location.path('/login');
        }
    }]);
