var app = angular.module('myApp', ["ngRoute"]);
app.config(function ($routeProvider) {
$routeProvider
 .when("/", {
   templateUrl: "home.html"
 })
 .when("/publishRides", {
   templateUrl: "publishRide.html",
   controller:"publishRideCtrl"
 })
 .when("/searchRides", {
   templateUrl: "searchRide.html",
   controller: "searchrideCtrl"
 })
 .when("/searchRides/request/:id", {
  templateUrl: "requestRide.html",
  controller: "requestrideCtrl"
})
.when("/myrides/rideinfo/:id", {
  templateUrl: "rideinfo.html",
  controller: "rideinfoCtrl"
})
 .when("/login", {
   templateUrl: "login.html",
   controller:"loginCtrl"
 })
 .when("/signup", {
  templateUrl: "signup.html",
  controller:"signupCtrl"
})
.when("/myrides", {
  templateUrl: "myrides.html",
  controller:"myridesCtrl"
})
.when("/admin", {
  templateUrl: "admin/",
  controller:"adminCtrl"
})
 .when("/aboutUs", {
   templateUrl: "aboutUs.html",
   controller:"aboutusCtrl"
 });
 
});