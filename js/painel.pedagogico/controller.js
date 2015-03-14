
var PainelPedagogico = angular.module('PainelPedagogico', ['ngRoute']);

PainelPedagogico.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
        $scope.login_user = {
            login: 'bernauuudo',
            password: 'senhaminha'
        };
        $scope.result = null;



        $scope.doLogin = function () {
            $scope.result = 'executando...';
            var login = $scope.login_user.login;
            var password = $scope.login_user.password;
            if (login != "" && password != "") {

                $http({
                    method: 'GET',
                    responseType : 'json',
                    
                    url: "http://api.plataformaam.com/v1/index.php/api/User", //?filter=[{"property": "login", "value" : "'+login+'", "operator": "="}]',
                    
                    headers: {
                        "HTTP_X_REST_USERNAME": login,
                        "HTTP_X_REST_PASSWORD": password,
                        "X_REST_USERNAME": login,
                        "X_REST_PASSWORD": password,                        
                        "Accept": 'application/json;odata=verbose'
                    }
                    
                }).success(function (data) {
                    $scope.result = data;
                }).error(function (data) {
                    $scope.result = "Error "+data;
                });
            }else{
                $scope.result = null;
            }
        }


    }]);