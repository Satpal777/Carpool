app.controller('searchrideCtrl', function ($scope, $http, $rootScope, $location) {
    if(!localStorage.loggedin){
        $location.path('/login')
    }
    $scope.refresh = () => {
        var ridepublished = [];
        $http.get(`http://localhost:3000/api/get-all-rides`).then((res) => {
            for (let i = 0,j=0; i < res.data.resultFound; i++) {
                if(res.data.rides[i].avlseats>0){
                    if(res.data.rides[i].destcity==undefined)
                        var ridesDestcity = ""
                    else
                        var ridesDestcity = res.data.rides[i].destcity

                    if(res.data.rides[i].deststate==undefined)
                     var deststate = ""
                    else
                    var deststate =  res.data.rides[i].deststate    
                    
                ridepublished.push(
                    {
                        rideid:res.data.rides[i]._id,
                        srnum: j,
                        by:res.data.rides[i].firstName + " " + res.data.rides[i].lastName,
                        email:res.data.rides[i].email,
                        mno:res.data.rides[i].mno,
                        from: res.data.rides[i].from,
                        fromsc:res.data.rides[i].fromcity + " " + res.data.rides[i].fromstate,
                        dest: res.data.rides[i].dest,
                        destsc:ridesDestcity + " " + deststate,
                        datetime: res.data.rides[i].datetime,
                        avlseats:res.data.rides[i].avlseats
                    }
                )
                j++
            }
            }
            $scope.ridepublished = ridepublished;
            console.log($scope.ridepublished, res)
        })
        $(document).ready(function () {
            $('#myTable').DataTable();
        });
    }

    $scope.refresh()
    
    
    
});



