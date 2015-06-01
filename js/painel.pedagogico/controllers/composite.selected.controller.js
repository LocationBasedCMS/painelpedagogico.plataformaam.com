var PainelPedagogico = angular.module('PainelPedagogico');

PainelPedagogico.controller('CompositeSelectedController', [
    '$scope', '$route', '$routeParams', '$location', 'CompositeService', 'UserSessionService','OnlineUserService',
    function ($scope, $route, $routeParams, $location, CompositeService, UserSessionService, OnlineUserService) {
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
                            weight: 1,
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
            $scope.markers.push({
                lat: parseFloat(publication.latitude),
                lng: parseFloat(publication.longitude),
                message: publication.user0.name + " : " + publication.upi0.title,
                focus: false,
                draggable: false
                
            });
        };

        var fnAddMakersOnlineUser = function (value) {
            console.log('DEBUG','fnAddMakersOnlineUser',value);
            $scope.markers.push({
                lat: parseFloat(value.latitude),
                lng: parseFloat(value.longitude),
                message: value.user_name + " : " + value.time,
                focus: false,
                draggable: false,
                icon:{
                    iconUrl: 'img/icons/map_avatar.png',
                    iconSize:     [32, 32],
                    iconAnchor:   [16,16],
                    popupAnchor:  [0, -16]
                }
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





        
        var fnGetUserPosition = function(user){
            OnlineUserService.getUserPosition(user,function(userpositions){
                if( !angular.isUndefined(userpositions) && userpositions!= null  ){
                    //Caminho do usuário 
                    var userPositons = {
                        color: "#0000FF",
                        type: "polyline",
                        weight: 3,
                        latlngs: []
                    };
                    $scope.last_position = {};
                    angular.forEach(userpositions,function(value,key){
                        $scope.last_position = value;
                        userPositons.latlngs.push({
                            lat: parseFloat(value.latitude),
                            lng: parseFloat(value.longitude)
                        });
                        
                    });

                    
                    
                    
                    
                    angular.extend($scope.paths.push(userPositons));
                    fnAddMakersOnlineUser($scope.last_position);
                } else{
                    console.log('WARNING','fnGetUserPosition','Sem posições registradas');
                }
            });
            
        };
        

        $scope.getUserPosition  = function(user){
            fnGetUserPosition(user);
        };
    }]);