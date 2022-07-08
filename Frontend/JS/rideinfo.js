app.controller('rideinfoCtrl', function ($scope, $http, $routeParams, $location) {

    $(document).ready(function () {
        $('#rideinfoTable').DataTable();
    });

    var rid = $routeParams.id
    if (!localStorage.loggedin) {
        $location.path('/login')
    }
    if (localStorage.id) {
        const url = `http://localhost:3000/api/getuserById?_id=${localStorage.id}`
        $http.get(url).then((res) => {
            $scope.fn = res.data.users.firstName
            $scope.ln = res.data.users.lastName
            $scope.email = res.data.users.email
            $scope.mno = res.data.users.mno
        })
    }
    $http.get(`http://localhost:3000/api/get-ridesById?_id=${rid}`).then((res) => {
        $scope.ridedata = {
            from: res.data.rides.from,
            dest: res.data.rides.dest,
            datetime: res.data.rides.datetime,
            avlseats: res.data.rides.avlseats,
            seats: res.data.rides.seats
        }
    })
    var pdata = [];
    $http.get(`http://localhost:3000/api/get-sharedridesByrid?rid=${rid}`).then((res) => {
        console.log(res)
        for (var i = 0; i < res.data.rides.length; i++){
            pdata.push({
                pno: i + 1,
                pmail: "meet@gmail.com",
                pmno: "2956478152",
                pname: "Meet Prajapati"
            })
        }
        $scope.pdata = pdata
        console.log($scope.pdata , pdata)
    })
});



