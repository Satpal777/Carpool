app.controller('requestrideCtrl', function ($scope, $http, $routeParams, $location) {
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


    function calculateCost(slat, slon, dlat, dlon, map) {
        $http.get(`https://api.geoapify.com/v1/routing?waypoints=${slat},${slon}|${dlat},${dlon}&mode=drive&apiKey=[YOUR_API_KEY]`).then((res) => {
            L.Routing.control({
                waypoints: [
                    L.latLng(slat, slon),
                    L.latLng(dlat, dlon)
                ]
            }).addTo(map);
            $scope.time = res.data.features[0].properties.time
            d = Number($scope.time);
            var h = Math.floor(d / 3600);
            var m = Math.floor(d % 3600 / 60);
            var s = Math.floor(d % 3600 % 60);

            var hDisplay = h > 0 ? h + (h == 1 ? "" : "") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? "" : "") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? "" : "") : "";

            $scope.time = hDisplay + ":" + mDisplay + ":" + sDisplay;

            $scope.distance = res.data.features[0].properties.distance
            const cost = () => {
                $scope.distance = Number($scope.distance) / 1000
            }
            const tc = () => {
                $scope.totalcost = ($scope.fuelPrice * ($scope.distance / 50)) / ($scope.driverseats+1)
            }
            $scope.calc = () => {
                cost()
                tc()
                console.log($scope.distance, $scope.totalcost, $scope.fuelPrice)
            }



            // Avg 12km =>  1l
            // then $scope.distance => ?
            // 1l => 90 INR
            // xl = ?


        })

    }
    function addMarker(lat, lon, str, map) {
        var greenIcon = L.icon({
            iconUrl: './images/car-sharing.png',
            iconSize: [38, 38]
        });
        const marker = L.marker([lat, lon], { icon: greenIcon });
        marker.bindTooltip(str).openTooltip();
        marker.addTo(map);
    }

    function loadMap(source, dest, str1, str2, callfun) {
        console.log("Map loaded in RR.html")
        var mapOptions = {
            center: [source.lat, source.lon],
            zoom: 7
        }
        var map = new L.map('mymap', mapOptions);
        var layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        });
        map.addLayer(layer)
        calculateCost(source.lat, source.lon, dest.lat, dest.lon, map)
        callfun(source.lat, source.lon, "Strating from: " + str1, map)
        callfun(dest.lat, dest.lon, "Destination: " + str2, map)
    }

    const geocoding = async (myfun) => {
        var urlfrom = $scope.fromtext
        await $http.get(`https://api.geoapify.com/v1/geocode/search?text=${urlfrom}&lang=en&limit=1&format=json&apiKey=[YOUR_API_KEY]`).then((res) => {
            $scope.source = {
                lat: res.data.results[0].lat,
                lon: res.data.results[0].lon
            }
        })
        var urlto = $scope.desttext
        await $http.get(`https://api.geoapify.com/v1/geocode/search?text=${urlto}&lang=en&limit=1&format=json&apiKey=[YOUR_API_KEY]`).then((res) => {
            $scope.dest = {
                lat: res.data.results[0].lat,
                lon: res.data.results[0].lon
            }
        })
        await myfun($scope.source, $scope.dest, $scope.fromtext, $scope.desttext, addMarker)
    }

    var rideId = $routeParams.id
    $http.get(`http://localhost:3000/api/get-ridesById?_id=${rideId}`).then((res) => {
        $scope.UID = res.data.rides.UID
        $scope.drivername = res.data.rides.firstName + " " + res.data.rides.lastName
        $scope.driveremail = res.data.rides.email
        $scope.drivermno = res.data.rides.mno
        $scope.fromtext = res.data.rides.from
        if (res.data.rides.fromcity != undefined) {
            $scope.fromtext += "," + res.data.rides.fromcity
        }
        if (res.data.rides.fromcity != undefined) {
            $scope.fromtext += "," + res.data.rides.fromstate
        }

        $scope.desttext = res.data.rides.dest
        if (res.data.rides.destcity != undefined)
            $scope.desttext += "," + res.data.rides.destcity
        if (res.data.rides.deststate != undefined)
            $scope.desttext += "," + res.data.rides.deststate

        $scope.driverdatetime = res.data.rides.datetime
        $scope.driverseats = res.data.rides.seats
        $scope.avlseats = res.data.rides.avlseats
        geocoding(loadMap)
    })

    $scope.submitride = () => {
        var data = JSON.stringify({
            rid: $routeParams.id,
            did: $scope.UID,
            pid: localStorage.id,
            dmno: $scope.drivermno,
            pmno: $scope.mno,
            dname: $scope.drivername,
            pname: $scope.fn + " " + $scope.ln,
            dmail: $scope.driveremail,
            pmail: $scope.email
        })
        $http.post(`http://localhost:3000/api/add-sharedride`, data).then((res) => {
            var avlseats = JSON.stringify({
                avlseats:$scope.avlseats-1
            })
            $http.put(`http://localhost:3000/api/update-ride?_id=${$routeParams.id}`,avlseats).then((response) => {
                $location.path('')
            })
        })
    }
});



