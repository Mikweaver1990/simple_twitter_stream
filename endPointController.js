var grabber = angular.module("grabber", []);
grabber.controller("endPointController", function($scope, $http) {

  $scope.home = "Top 5 hastags updating display";
  $scope.response = 0;
  const getTweetData = async () => {
    $http.get("http://localhost:3121/api/v1/tweet-stats").then(
          function successCallback(response) {
            $scope.response = response.data;
          },
          function errorCallback(response) {
            console.log("Unable to perform get request");
          }
        );
  };
  var intervalId = window.setInterval(function(){
    const test = getTweetData();
  }, 1000);

});