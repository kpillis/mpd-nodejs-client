(function () {

    var app = angular.module('mpdClient', ['ngRoute', 'ngAnimate']);

    app.controller('CurrentController', function ($scope, $interval, $http) {
        $interval(function () {
            $http.get('/api/current').success(function (data) {
                $scope.currentSong = data;
            })
        }, 1000);
    });

    app.controller('SeekerController', function ($scope, $interval, $http) {
        $interval(function () {
            $http.get('/api/seek-percent').success(function (data) {
                $scope.seekPercent = (data.elapsed / data.total) * 100;
            })
        }, 1000);
    });

    app.controller('StatusController', function ($scope, $interval, $http) {
        $interval(function () {
            $http.get('/api/status').success(function (data) {
                $scope.status = data;
                $scope.playing = data.state == "play";
                $scope.repeat = data.repeat != 0;
                if ($scope.repeat) {
                    $scope.repeatStyle = "color:#0ce3ac";
                } else {
                    $scope.repeatStyle = "color:#ddd";
                }
                $scope.random = data.random != 0;
                if ($scope.random) {
                    $scope.randomStyle = "color:#0ce3ac";
                } else {
                    $scope.randomStyle = "color:#ddd";
                }
            });
        }, 1000);
    });
    app.controller('PlaylistController', function ($scope, $interval, $http) {
        $scope.Math = window.Math;
        $interval(function () {
            $http.get('/api/playlist').success(function (data) {
                var tracks = data;
                $http.get('/api/status').success(function (data) {
                    tracks.forEach(function(item){
                        if(item.Pos == data.song){
                            item.selected = "selected";
                        }else{
                            item.selected = "";
                        }
                        item.song = data.song;
                    });
                    $scope.tracks = tracks;
                });

            });
        }, 1500);
    });
})();