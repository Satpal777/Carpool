app.controller('publishRideCtrl', function ($scope, $http, $rootScope, $location) {
   
    if(!localStorage.loggedin){
        $location.path('/login')
    }
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
   
    $scope.tosearching = () => {
        var prsearchresult = [];
        $http.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${$scope.prsearch}&apiKey=[YOUR_API_KEY]`).then((res) => {
            for (let i = 0; i < res.data.features.length; i++) {
                prsearchresult.push({
                    address: res.data.features[i].properties.formatted,
                    lat: res.data.features[i].properties.lat,
                    lon: res.data.features[i].properties.lon,
                    place_id: res.data.features[i].properties.place_id,
                    city: res.data.features[i].properties.city,
                    state: res.data.features[i].properties.state,
                    country: res.data.features[i].properties.country
                })
            }
            $scope.prsearchresult = prsearchresult
            $scope.showit = true
        })
    }
    $scope.storedloc = (val) => {
        $scope.prsearch = val.address
        $scope.toaddress = val
        console.log($scope.toaddress)
        $scope.showit = false
    }
    $scope.storeone = (val) =>{
        $scope.toaddress = {"address":val}
        $scope.showit = false
    }

    $scope.dessearching = () => {
        var desprsearchresult = [];
        $http.get(`https://api.geoapify.com/v1/geocode/autocomplete?text=${$scope.desprsearch}&apiKey=[YOUR_API_KEY]`).then((res) => {
            for (let i = 0; i < res.data.features.length; i++) {
                desprsearchresult.push({
                    address: res.data.features[i].properties.formatted,
                    lat: res.data.features[i].properties.lat,
                    lon: res.data.features[i].properties.lon,
                    place_id: res.data.features[i].properties.place_id,
                    city: res.data.features[i].properties.city,
                    state: res.data.features[i].properties.state,
                    country: res.data.features[i].properties.country
                })
            }
            $scope.desprsearchresult = desprsearchresult
            $scope.desshowit = true
        })
    }
    $scope.desstoredloc = (val) => {
        $scope.desprsearch = val.address
        $scope.desaddress = val
        console.log($scope.desaddress)
        $scope.desshowit = false
    }
    $scope.desstoreone = (val) =>{
        $scope.desaddress = {"address":val}
        $scope.desshowit = false
    }

    $scope.addRide = () => {
        var data = {
            "UID":localStorage.id,
            "firstName": $scope.fn,
            "lastName": $scope.ln,
            "email": $scope.email,
            "mno": $scope.mno,
            "licenseno": $scope.lno,
            "from": $scope.toaddress.address,
            "fromlat":$scope.toaddress.lat,
            "fromlan":$scope.toaddress.lan,
            "fromstate":$scope.toaddress.state,
            "fromcity":$scope.toaddress.city,
            "dest":$scope.desaddress.address,
            "destlat":$scope.desaddress.lat,
            "destlan":$scope.desaddress.lan,
            "deststate":$scope.desaddress.state,
            "destcity":$scope.desaddress.city,
            "datetime": $scope.datetime,
            "seats": $scope.seats
        }
        $http.post(`http://localhost:3000/api/add-ride`, JSON.stringify(data)).then((res) => {
            if(res.status>=200 && res.status<300){
                $scope.alert=true; 
                $scope.link="http://localhost:5500/Frontend/index.html#!/searchRides/request/"+res.data.ride._id;
            }
        })
    }
});




