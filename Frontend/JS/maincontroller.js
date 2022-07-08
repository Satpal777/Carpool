app.controller('myCtrl', function ($scope, $rootScope, $http) {
  $rootScope.refresh = () => {
    if (localStorage.loggedin) {
      $scope.loggedin = true
      $scope.username = localStorage.username
    }
    else
      $scope.loggedin = false

    if (localStorage.id) {
      const url = `http://localhost:3000/api/getuserById?_id=${localStorage.id}`

      $http.get(url).then((res) => {
        $scope.fn = res.data.users.firstName
        $scope.ln = res.data.users.lastName
        $scope.lno = res.data.users.licenseno
        $scope.email = res.data.users.email
        $scope.mno = res.data.users.mno
      })
    }
  }

  $rootScope.refresh();

  $scope.logout = () => {
    localStorage.clear();
    $rootScope.refresh();
  }

  $scope.toggle = () => {
    if ($scope.menu == true)
      $scope.menu = false
    else {
      $scope.menu = true
    }
  }

  $scope.updateProfile = () => {

    

    let bodyContent = JSON.stringify({
      "email":$scope.email,
      "firstName":$scope.fn,
      "lastName":$scope.ln,
      "mno":$scope.mno,
      "licenseno":$scope.lno
    });

    $http.put(`http://localhost:3000/api/update-user?_id=${localStorage.id}`,bodyContent).then((response)=>{
      $rootScope.refresh()
    })

    
  }


  $scope.deactivateAccount = () => {
    $http.delete(`http://localhost:3000/api/delete_user?_id=${localStorage.id}`).then((res) => {
      localStorage.clear()
      $scope.toggle()
      $rootScope.refresh()
    });
  }

});

