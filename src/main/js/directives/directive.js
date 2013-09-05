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
  })

//.directive('ngpopup', function($compile) {
//	return {
//		restrict: 'C',
//		scope: {
//			controller: '='
//		},
//		controller: function($scope, $element, $attrs, $templateCache) {
//			$scope.$on('open_ngpopup', function(e, args) {
//                if (args.id != $attrs.popupid) return;
//
//                var template = $templateCache.get(args.template);
//                $("#curtain").html($compile(template)($scope)).fadeIn(180);
//                
//                $("#curtain .close").bind('click', function() {
//                    $("#curtain").fadeOut(180, function() {
//                    	$(this).empty();
//                    });
//                    $scope.$parent.$broadcast('didclose_ngpopup', {popupid:$attrs.popupid, controller:$scope.controller});
//                });
//            });
//		}	
//	}
//});
