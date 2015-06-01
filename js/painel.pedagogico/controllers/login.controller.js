var PainelPedagogico = angular.module('PainelPedagogico');
PainelPedagogico.controller('LoginController', ['$scope','$location', 'UserSessionService', function ($scope,$location, UserSessionService) {
        $scope.login_user = {
            login: 'bernauuudo',
            password: 'qw'
        };        

        //FUNCOES 
        $scope.doLogin = function () {
            $scope.message = 'Tentando efetuar login...';
            UserSessionService.doLogin($scope.login_user.login,$scope.login_user.password );
        };

        //Observa se o LOgin foi Efetuado 
        $scope.$watch(function(){
            return UserSessionService.isLogged();
        }, function (newVal) {
            if( newVal ){
                $location.path('/panel');
            } else{
                $scope.message = '';
            }
        });        
        
        
        //TODO remoer login automático
        $scope.doLogin();
    }]);