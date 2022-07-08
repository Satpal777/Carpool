app.controller('signupCtrl', function ($scope, $http, $location, $rootScope) {



    $scope.addUser = () => {
        var data = {
            "firstName": $scope.fn,
            "lastName": $scope.ln,
            "email": $scope.email,
            "password": $scope.password,
            "mno": $scope.mno,
            "licenseno": $scope.lno,
            "tmc": $scope.tmc
        }
        $http.post(`http://localhost:3000/api/add-user`, JSON.stringify(data)).then(function (response) {
            console.log(response)
            if (response.status >= 200 && response.status < 300) {
                if (typeof (Storage) !== "undefined") {
                    localStorage.id = response.data.user._id;
                    localStorage.loggedin = true;
                    localStorage.username = response.data.user.firstName + " " + response.data.user.lastName
                }
                
            $rootScope.refresh()
            $location.path("")
            }
            else {
                console.log(response.data.message)
            }
        });
    }
});
