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

	        $scope.result = {
	        	success: {
	        		message: '',
	        		count: 23
	        	},
	        	fail: {
	        		message: 'Something bad happened',
	        		count: 2
	        	},
	        	duplicate: {
	        		message: '',
	        		count: 4
	        	},
		        messages: [
		        	{
		        		row: 3,
		        		preview: 'Jane Doe',
		        		messages: ['Invalid email']
		        	},
		        	{
		        		row: 5,
		        		preview: 'John Doe',
		        		messages: ['Missing email','Missing phone']
		        	}
		        ]
	        };
	    }
	});
