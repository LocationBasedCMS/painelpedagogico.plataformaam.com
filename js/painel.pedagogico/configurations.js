
var PainelPedagogico = angular.module('PainelPedagogico', ['ngRoute']);


PainelPedagogico.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
    $routeProvider
            .when('/login', {
                templateUrl: 'painel.pedagogico/login-form.html',
                controller: 'LoginController'
            })
            .when('/panel', {
                templateUrl: 'painel.pedagogico/panel.html',
                controller: 'CompositeController'
            })
            
            .when('/panel/composite/:composite', {
                templateUrl: 'painel.pedagogico/panel-composite.html',
                controller: 'CompositeController'
            })
            .when('/panel/composite/:composite/user/:user', {
                templateUrl: 'painel.pedagogico/not-implemented.html',
                controller: 'NotImplemented'
            })
            .when('/panel/composite/:composite/publication/:publication/', {
                templateUrl: 'painel.pedagogico/not-implemented.html',
                controller: 'NotImplemented'
            })
            .when('/other', {
                templateUrl: 'painel.pedagogico/not-implemented.html',
                controller: 'NotImplemented'
            })            
            .otherwise({
                templateUrl: 'painel.pedagogico/login-form.html',
                controller: 'LoginController'
            });

});


