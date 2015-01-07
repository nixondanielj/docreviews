var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'home/home.html',
            controller: 'HomeController',
            controllerAs: 'homeCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);