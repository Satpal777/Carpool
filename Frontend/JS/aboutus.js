app.controller('aboutusCtrl', function ($scope, $http, $rootScope, $location) {
    if(!localStorage.loggedin){
        $location.path('/login')
    }
});



