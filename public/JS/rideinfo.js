app.controller('rideinfoCtrl', function ($scope,$rootScope, $http, $routeParams, $location) {

    $(document).ready(function () {
        $('#rideinfoTable').DataTable();
    });

    var rid = $routeParams.id
    if (!localStorage.loggedin) {
        $location.path('/login')
    }
    if (localStorage.id) {
        const url = `${$rootScope.myurl}/api/getuserById?_id=${localStorage.id}`
        $http.get(url).then((res) => {
            $scope.fn = res.data.users.firstName
            $scope.ln = res.data.users.lastName
            $scope.email = res.data.users.email
            $scope.mno = res.data.users.mno
        })
    }
    $http.get(`${$rootScope.myurl}/api/get-ridesById?_id=${rid}`).then((res) => {
        $scope.ridedata = {
            from: res.data.rides.from,
            dest: res.data.rides.dest,
            datetime: res.data.rides.datetime,
            avlseats: res.data.rides.avlseats,
            seats: res.data.rides.seats
        }
    })
    var pdata = [];
    $http.get(`${$rootScope.myurl}/api/get-sharedridesByrid?rid=${rid}`).then((res) => {
        for (var i = 0; i < res.data.rides.length; i++){
            pdata.push({
                pno: i + 1,
                pmail:res.data.rides[i].pmail,
                pmno: res.data.rides[i].pmno,
                pname: res.data.rides[i].pname
            })
        }
        $scope.pdata = pdata
    })
});



