'use strict';

	angular.module('app')
	.controller('DemoCtrl', function ($scope,$http) {

	    $http.get('http://tuition.local.firestitch.com/api/import/config/student')
        .then(function(response) {
        	$scope.config = response.data.data.config;
        });

	    $scope.import = function() {

	    	return $http.get('http://tuition.local.firestitch.com/api/import/student')
	        .then(function(response) {
	        	$scope.result = response.data.data.result;
	        });
	    }
	});
