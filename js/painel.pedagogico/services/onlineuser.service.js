var PainelPedagogico = angular.module('PainelPedagogico');
//DEVE SER REIMPLEMENTADO PARA GARANTIR A SEGURANÇA
PainelPedagogico.service('OnlineUserService',['$http','UserSessionService',  function ($http, UserSessionService) {
    var url = 'http://api.plataformaam.com/v3/index.php/api/OnlineUser';
    
    
    var fnGetUserLocation = function(user,Callback){
        if( !angular.isUndefined(user)  ){
            var sessionUser = UserSessionService.getUser();
            var myFilter =    [{
                property  : "id",
                value     : user.id,
                operator  : "="
            }];
            $http.get(url,
                    {
                        headers: {
                            "HTTP_X_REST_USERNAME": sessionUser.login, 
                            "HTTP_X_REST_PASSWORD": sessionUser.password, 
                            "HTTP_X_REST_CORS": 'Yes'
                        }                               

                    }
            ).success(function (response) {
                    if (response.success && response.data.totalCount > 0) {
                        Callback(response.data.onlineUser);
                    }else{
                        console.log("WARNING",'No online User');
                        Callback(null);
                    }
            }).error(function (error) {
                console.log("ERROR", error);
                Callback(null);
            });        
        }else{
            console.log('WARNING', 'fnGetUserLocation user is NULL or undefined');
            if( angular.isFunction(Callback)){
                Callback(null);
            }
        }
    };
        
        
        
    var OnlineUserService = {
        userPosition : [],
        getUserPosition : function(user,Callback){
                fnGetUserLocation(user,Callback);
        }
    };
    return OnlineUserService;
        
}]);