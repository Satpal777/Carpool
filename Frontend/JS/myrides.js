app.controller('myridesCtrl', function ($scope, $http, $rootScope, $location) {
    if(!localStorage.loggedin){
        $location.path('/login')
    }
    $scope.refresh = () => {
        var myridepublished = [];
        $http.get(`http://localhost:3000/api/get-ridesByuid?uid=${localStorage.id}`).then((res) => {
            for (let i = 0; i < res.data.resultFound; i++) {
                myridepublished.push(
                    {
                        srnum: i,
                        rid:res.data.rides[i]._id,
                        dest: res.data.rides[i].dest,
                        from: res.data.rides[i].from,
                        datetime: res.data.rides[i].datetime
                    }
                )
            }
            $scope.myridepublished = myridepublished;
        })

        var myreqsride = [];
        $http.get(`http://localhost:3000/api/get-sharedridesBypid?pid=${localStorage.id}`).then((res) => {
            for(let i=0;i<res.data.rides.length;i++){
                $http.get(`http://localhost:3000/api/get-ridesByid?_id=${res.data.rides[i].rid}`).then((response) => {
                    myreqsride.push(
                        {
                            srnum: i+1,
                            from:response.data.rides.from,
                            dest:response.data.rides.dest,
                            name: response.data.rides.firstName+" "+response.data.rides.lastName,
                            email:response.data.rides.email,
                            mno:response.data.rides.mno,
                            datetime:response.data.rides.datetime
                        }
                    )
                $scope.myreqsride = myreqsride;
                })
                    
            }
        })
    }
    $scope.refresh()
});




