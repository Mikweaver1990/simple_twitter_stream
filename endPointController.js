'use strict';

google.load('visualization', '1', {packages: ['corechart']});
// Load angular google charts module
google.setOnLoadCallback(function () {
    angular.bootstrap(document.body, ['myApp']);
});

// Add google chart dependance
var myApp = angular.module("myApp", ['googlechart.directives']);

myApp.factory('Data', function() {
    return {
        message: "Test",
        topFive: [
                    {hashtag:'test', count:0},
                    {hashtag:'test', count:0},
                    {hashtag:'test', count:0},
                    {hashtag:'test', count:0},
                    {hashtag:'test', count:0},
                   ]
    }
});

// Main controller
myApp.controller('endPointController', ['$scope', '$http', '$filter', 'Data', function($scope, $http, $filter, Data) {
    
    // Defining app scope
    $scope.app = {}
    $scope.app.data = Data; 
    $scope.app.message = "Top 5 hastags updating display"; 
    $scope.app.tempData = {};
    $scope.app.topFive = Data.topFive;

    const getTweetData = async () => {
      $http.get("http://localhost:3121/api/v1/tweet-stats").then(
            function successCallback(response) {
                $scope.app.TempData = response.data;
                $scope.app.topFive = [];
                $.each($scope.app.TempData, function (i, member) {
                    
                    for (var i in member) {
                        $scope.app.topFive.push({ 
                        hashtag : member[i][0],
                        count : member[i][1],
                         });
                     }
                    });
            },
            function errorCallback(response) {
              console.log("Unable to perform get request");
            }
          );
    };
    var initial = getTweetData();
    var intervalId = window.setInterval(function(){
      var test = getTweetData();
    }, 5000);
    // Define table data

    // Define chart dataTable
    var chart1 = {};
    chart1.type = "PieChart";
    chart1.displayed = false;
    chart1.cssStyle = "height:600px; width:100%;";
    console.log($scope.app.topFive);
    chart1.data =  {
        "cols": [
            {id: "hashtag", label: "Hashtag", type: "string"},
            {id: "count", label: "Count", type: "number"}
        ], 
        "rows": [
            {c: [
                {v: "Top 1"},
                {v: $scope.app.topFive[0].count}
            ]},
            {c: [
                {v: "Top 2"},
                {v: $scope.app.topFive[1].count}
            ]},
            {c: [
                {v: "Top 3"},
                {v: $scope.app.topFive[2].count}
            ]},
            {c: [
                {v: "Top 4"},
                {v: $scope.app.topFive[3].count}
            ]},
            {c: [
                {v: "Top 5"},
                {v: $scope.app.topFive[4].count}
            ]}
    ]};

    // Define chart options
    chart1.options = {
        "title": "Breakdown",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
            "title": "counts", "gridlines": {"count": 10}
        },
        "hAxis": {
            "title": "hashtag"
        }
    };
    $scope.chart = chart1;
}]);