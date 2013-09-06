app.directivesModule = angular.module('utilsDirective',[])

.directive('makeChairs', function () {
    return {
      restrict: 'A',
      template: '<ul class="chair">' +
      			  '<li class="chairValue">{{chairValue}}</li>' +
                  '<li ng-repeat="chair in chairs" ng-class="chair" ng-click="toggle($index)">' +
                  '</li>' +
                  
                '</ul>',
      scope: {
    	chairValue: '=',
        max: '=',
        onChairSelected: '&'
        
      },
      link: function (scope, elem, attrs) {
    	  
        var updateChairs = function() {
          scope.chairs = [];
          for (var  i = 0; i < scope.max; i++) {
        	  scope.chairs.push({filled: i < scope.chairValue, empty: i >= scope.chairValue});
          }
        };

        scope.toggle = function(index) {
	        if(index == 0){
	        	return;
	        }
			if(scope.chairValue == (index + 1)){
				scope.chairValue = index;
				scope.onChairSelected({chair: index});
			} else {
				scope.chairValue = index + 1;
				scope.onChairSelected({chair: index + 1});
			}
        };

        scope.$watch('chairValue', function(oldVal, newVal) {
        	if (newVal) {
        		updateChairs();
          }
        });
      }
    };
  });

