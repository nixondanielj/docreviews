app.controller('HomeController', ['$http', function($http){
    var ctrl = this;
    var socket = io.connect();
    this.message = 'this is the home page';
    this.socketAuth = false;
    this.webreqAuth = false;
    this.refreshStatus = function(){
        $http.get('/status').success(function(){
            ctrl.webreqAuth = true;
        }).error(function(){
            ctrl.webreqAuth = false;
        });
        socket.emit('test');
    };
    socket.on('authed', function(){
        ctrl.socketAuth = true;
    });
}]);