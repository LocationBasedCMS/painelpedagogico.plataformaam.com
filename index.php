<!DOCTYPE html>
<html lang="pt-br" ng-app="PainelPedagogico">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>   Painel Pedagógico </title>

        <!-- Folhas de Estilo --> 

        <link href="./js/libs/bootstrap-3.2.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="./js/libs/bootstrap-3.2.0/dist/css/bootstrap-theme.min.css" rel="stylesheet" />

        <link href="./css/responsive/dashboard.css" rel="stylesheet" />
        <link href="./css/responsive/xs/xs-dashboard.css" rel="stylesheet" />
        <link href="./css/responsive/sm/sm-dashboard.css" rel="stylesheet" />
        <link href="./css/responsive/md/md-dashboard.css" rel="stylesheet" />
        <link href="./css/responsive/lg/lg-dashboard.css" rel="stylesheet" />

        <link href="./css/ui/login.css" rel="stylesheet" />






    </head>
    <body>
        <div ng-view></div>


        <!-- Scripts de JS :: BIBLIOTECAS-->
        <script src="./js/libs/jquery-2.1.1/jquery.min.js" ></script>
        <script src="./js/libs/bootstrap-3.2.0/dist/js/bootstrap.min.js"></script>
        <script src="./js/libs/angular-1.4.0/angular.min.js"></script>
        <script src="./js/libs/angular-1.4.0/angular-route.min.js"></script>
        
        <!-- Scripts de JS :: APLICACAO-->
        <script src="./js/painel.pedagogico/controller.js"></script>
        <script src="./js/painel.pedagogico/configurations.js"></script>
        <script src="./js/painel.pedagogico/filters.js"></script>
        <script src="./js/painel.pedagogico/services.js"></script>
        

    </body>
</html>
