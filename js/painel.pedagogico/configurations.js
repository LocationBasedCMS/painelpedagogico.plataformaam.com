var PainelPedagogico = angular.module('PainelPedagogico');

PainelPedagogico.config(function($routeProvider, $locationProvider) {
    $routeProvider
            .when('/login', {
                templateUrl: 'painel.pedagogico/login-form.html',
                controller: 'LoginController'

            })
            .when('/panel', {
                templateUrl: 'painel.pedagogico/login-form.html',
                controller: 'LoginController'

            })            
            .otherwise({
                templateUrl: 'painel.pedagogico/login-form.html',
                controller: 'LoginController'
            });


    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
});


