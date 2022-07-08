app.controller('loginCtrl', function ($scope, $http, $rootScope, $location) {


    $scope.validation = () => {
        var data = {
            "email": $scope.email,
            "password": $scope.pass
        }
        $http.post(`http://localhost:3000/api/get-userbyemail`, JSON.stringify(data)).then((res) => {
            if (res.data.authenticated == true) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.id = res.data.user._id;
                    localStorage.loggedin = true;
                    localStorage.username = res.data.user.firstName + " " + res.data.user.lastName
                }
                $rootScope.refresh()
                $location.path("")
            }
        })
    }

});