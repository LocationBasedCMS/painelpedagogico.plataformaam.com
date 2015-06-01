var PainelPedagogico = angular.module('PainelPedagogico');

PainelPedagogico.controller('CompositeSelectedController', [
    '$scope', '$route', '$routeParams', '$location', 'CompositeService', 'UserSessionService',
    function ($scope, $route, $routeParams, $location, CompositeService, UserSessionService) {
        //MAP CONFIGURATION
        angular.extend($scope, {
            center: {
                lat: -20.281,
                lng: -40.310,
                zoom: 12
            },
            markers: new Array(),
            defaults: {
                scrollWheelZoom: false
            },
            controls: {
                draw: {}
            },
            paths: new Array(),
        });


        var fnDrawVirtualSpace = function (virtualspace,iColor) {
            console.log('fnDrawVirtualSpace', virtualspace);
            if (virtualspace != null) {
                $scope.paths.push(
                        {
                            color: iColor,
                            weight: 2,
                            latlngs: [
                                {
                                    lat: parseFloat(virtualspace.startLatitude),
                                    lng: parseFloat(virtualspace.startLongitude)
                                },
                                {
                                    lat: parseFloat(virtualspace.stopLatitude),
                                    lng: parseFloat(virtualspace.startLongitude)
                                },
                                {
                                    lat: parseFloat(virtualspace.stopLatitude),
                                    lng: parseFloat(virtualspace.stopLongitude)
                                },
                                {
                                    lat: parseFloat(virtualspace.startLatitude),
                                    lng: parseFloat(virtualspace.stopLongitude)
                                },
                                {
                                    lat: parseFloat(virtualspace.startLatitude),
                                    lng: parseFloat(virtualspace.startLongitude)
                                },
                            ],
                        });
            }
        };

        var fnCenterMap = function (virtualspace) {
            if (virtualspace != null) {
                $scope.center.lat = (parseFloat(virtualspace.startLatitude) + parseFloat(virtualspace.stopLatitude)) / 2;
                $scope.center.lng = (parseFloat(virtualspace.startLongitude) + parseFloat(virtualspace.stopLongitude)) / 2;
            } else {
                console.log('fnCenterComposite', 'Erro , espaço virutal nullo');
            }

        };

        var fnAddMakersPublication = function (publication) {
            var latitude = parseFloat(publication.latitude);
            var longitude = 0 + parseFloat(publication.longitude);
            $scope.markers.push({
                lat: latitude,
                lng: longitude,
                message: publication.user0.name + " : " + publication.upi0.title,
                focus: false,
                draggable: false

            });
        };



        //SESSION TEST
        if (!UserSessionService.isLogged()) {
            $location.path('/login');
        } else {
            $scope.user = UserSessionService.getUser();
        }

        //LOCATION TEST
        $scope.composite = {};
        $scope.compositeUsers = [];
        $scope.compositePublications = [];

        //GET COMPOSITE BY ID
        CompositeService.getCompositeById($routeParams.composite, function (composite, index) {
            if (composite != null) {
                $scope.composite = composite;
                //GET USERS
                
                CompositeService.getCompositeUsers(composite, function (users) {
                    $scope.compositeUsers = users;
                });
                
                //GET BASES
                
                CompositeService.getCompositeBase(composite,function(bases){
                    angular.forEach(bases, function(base,key){
                        fnDrawVirtualSpace(base.virtualspace0,'#FF5050');
                    });
                });
                
                //GET PUBLICATIONS
                CompositeService.getCompositePublication(composite, function (publications) {
                    $scope.compositePublications = publications;
                    angular.forEach(publications, function (publication) {
                        fnAddMakersPublication(publication);

                    });
                });
                
                fnCenterMap(composite.virtualspace0);
                fnDrawVirtualSpace(composite.virtualspace0,'#800050');
                console.log(composite);
                
            } else {
                console.log('CompositeSelectedController', 'error', 'Composite Not Found');
                $location.path('/panel');
            }
        });












    }]);