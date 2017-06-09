
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
							value: '{{data.name}}'
						},
						{
							title: 'Required',
							center: true,
							value: '<md-icon ng-show="data.validations.required">check</md-icon>'
						},
						{
							title: 'Validations',
							value: '<div ng-repeat="(key,value) in data.validations" ng-hide="key==\'required\'">Vaild {{key}}</div>'
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
							title: 'Message',
							value: '<div ng-repeat="message in data.messages">{{message}}</div>'
						}
					]
				};
            }
        };
    });
})();

angular.module('fs-angular-import').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/importconfig.html',
    "<fs-lister ls-options=\"lsOptions\"></fs-lister>"
  );


  $templateCache.put('views/directives/importresult.html',
    "<fs-alert fs-type=\"success\" ng-show=\"result.success.count\"><div ng-hide=\"result.success.message\">{{result.success.count}} Successfully imported</div><div ng-show=\"result.success.message\">{{result.success.message}}</div></fs-alert><fs-alert fs-type=\"info\" ng-show=\"result.duplicate.count\"><div ng-hide=\"result.duplicate.message\">Ignored {{result.duplicate.count}}<ng-pluralize count=\"result.duplicate.count\" when=\"{ one: 'duplicate', other: 'duplicates' }\"></ng-pluralize></div><div ng-show=\"result.duplicate.message\">{{result.duplicate.message}}</div></fs-alert><fs-alert fs-type=\"error\" ng-show=\"result.fail.count\"><div ng-hide=\"result.fail.message\">{{result.fail.count}} failed to import</div><div ng-show=\"result.fail.message\">{{result.fail.message}}</div></fs-alert><div ng-show=\"result.messages.length\"><fs-lister ls-options=\"lsOptions\"></fs-lister></div>"
  );

}]);
