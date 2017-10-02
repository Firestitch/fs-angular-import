(function () {
    'use strict';

    angular.module('fs-angular-import',['fs-angular-lister','fs-angular-alert'])
    .directive('fsImportConfig', function() {
        return {
            templateUrl: 'views/directives/importconfig.html',
            restrict: 'E',
            scope: {
               config: "=fsConfig"
            },
            controller: function($scope) {

            	$scope.$watch('config',function(config) {
            		if(config) {
            			$scope.lsOptions.instance.data.set(config.fields);
					}
            	});

				$scope.lsOptions = {
					paging: false,
					columns: [
						{
							title: 'Name',
							value: '{{data.name}} <div class="description">{{data.description}}</div>'
						},
						{
							title: 'Required',
							center: true,
							value: '<md-icon ng-show="data.validations.required">check</md-icon>'
						},
						{
							title: 'Validations',
							value: '<div ng-repeat="(key,value) in data.validations" ng-hide="key==\'required\'">\
									<span ng-if="key==\'values\'">Valid values: {{value.join(", ")}}</span>\
									<span ng-if="key!=\'values\'">Valid {{key}}</span>\
									</div>'
						}
					]
				}
            }
        };
    })
    .directive('fsImportResult', function($q) {
        return {
            templateUrl: 'views/directives/importresult.html',
            restrict: 'E',
            scope: {
               result: "=fsResult"
            },
            controller: function($scope) {

            	$scope.$watch('result',function(result) {
            		if(result) {
            			$scope.lsOptions.instance.data.set(result.messages);
					}
            	});

				$scope.lsOptions = {
					paging: false,
					columns: [
						{
							title: 'Row',
							center: true,
							width: '1%',
							value: '{{data.row}}'
						},
						{
							title: 'Preview',
							value: '{{data.preview}}'
						},
						{
							title: 'Reason',
							value: '<div ng-repeat="message in data.messages">{{message}}</div>'
						}
					]
				};
            }
        };
    });
})();