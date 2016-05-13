(function () {

    var app = angular.module('mpdClient', ['ngRoute', 'ngAnimate']);

    app.controller('StatusController', function ($scope, $route, $routeParams, $location, $http) {
        $http.get('/state').success(function (data) {
            $scope.playing= data.state == "play";
            $scope.repeat= data.repeat != 0;
            if($scope.repeat){
                $scope.randomStyle = "{'color':'#0ce3ac'}";
            }else{
                $scope.randomStyle = "{'color':'#ddd'}";
            }
        });
    });
    app.controller('PlaylistController', function ($scope, $route, $routeParams, $location, $http) {
        $http.get('/api/playlist').success(function (data) {
            $scope.tracks = data;
        });
    });
})();