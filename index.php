<!DOCTYPE html>
<html lang="pt-br" ng-app="PainelPedagogico">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>   Painel Pedagógico </title>

        <!-- Folhas de Estilo --> 

        <link href="http://painelpedagogico.plataformaam.com/js/libs/bootstrap-3.2.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/js/libs/bootstrap-3.2.0/dist/css/bootstrap-theme.min.css" rel="stylesheet" />

        <link href="http://painelpedagogico.plataformaam.com/css/responsive/dashboard.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/css/responsive/xs/xs-dashboard.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/css/responsive/sm/sm-dashboard.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/css/responsive/md/md-dashboard.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/css/responsive/lg/lg-dashboard.css" rel="stylesheet" />
        <link href="http://painelpedagogico.plataformaam.com/css/ui/login.css" rel="stylesheet" />
        <link rel="stylesheet" href="http://painelpedagogico.plataformaam.com/css/font-awesome-4.3.0/css/font-awesome.min.css" />
        
        <!-- Maps -->
        <link rel="stylesheet" href="http://painelpedagogico.plataformaam.com/js/libs/leafletjs/leaflet.css">
        
        <base href="/"></base>
        
        






    </head>
    <body>
        <div ng-view></div>


        <!-- Scripts de JS :: BIBLIOTECAS-->
        <script src="http://painelpedagogico.plataformaam.com/js/libs/jquery-2.1.1/jquery.min.js" ></script>
        <script src="http://painelpedagogico.plataformaam.com/js/libs/bootstrap-3.2.0/dist/js/bootstrap.min.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/libs/angular-1.4.0/angular.min.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/libs/angular-1.4.0/angular-route.min.js"></script>
        
        <!-- Scripts de JS :: MAPS-->
        <script src="http://painelpedagogico.plataformaam.com/js/libs/leafletjs/leaflet.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/libs/leafletjs/angular-leaflet-directive.min.js"></script>

        
        <!-- Scripts de JS :: APLICACAO-->
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/configurations.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/filters.js"></script>
                
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/services.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/controller.js"></script>
        
        <!-- USER SESSION -->
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/controllers/login.controller.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/services/user.session.service.js"></script>

        
        
        
        <!-- COMPOSITE -->
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/controllers/composite.controller.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/controllers/composite.selected.controller.js"></script>
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/services/composite.service.js"></script>
        
        <!-- NOT IMPLEMENTED -->
        <script src="http://painelpedagogico.plataformaam.com/js/painel.pedagogico/controllers/not.implemented.controller.js"></script>

        

    </body>
</html>
