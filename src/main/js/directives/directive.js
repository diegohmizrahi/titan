app.directivesModule = angular.module('utilsDirective',[])

.directive('makeChairs', function () {
    return {
    	
    	restrict: 'A',
    	template: '<ul class="chair">' +
      			  	'<li class="chairValue">{{chairValue}}</li>' +
      			  	'<li ng-repeat="chair in chairs" ng-class="chair" ng-click="toggle($index)"></li>' +
      			  '</ul>',
		scope: {
			chairValue: '=',
			max: '=',
			onChairSelected: '&'
		    
		},
		link: function (scope, elem, attrs) {
    	  
			/**
			 * Update view of chairs
			 */
	        var updateChairs = function() {
				scope.chairs = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.chairs.push({
						filled : i < scope.chairValue,
						empty : i >= scope.chairValue
					});
				}
			};
	
			/**
			 * Rearranges the seats according to the information
			 */
			scope.toggle = function(index) {
				if (index == 0) {
					return;
				}
				if (scope.chairValue == (index + 1)) {
					scope.chairValue = index;
					scope.onChairSelected({
						chair : index
					});
				} else {
					scope.chairValue = index + 1;
					scope.onChairSelected({
						chair : index + 1
					});
				}
			};
	
			/**
    		 * Observed a change in variable "chairValue"
    		 */
	        scope.$watch('chairValue', function(oldVal, newVal) {
	        	if (newVal) {
	        		updateChairs();
	          }
	        });
		}
    };
})
.directive('ngWidth', function() {
	return function(scope, elem, attrs) {
	    attrs.$observe('ngWidth', function(width) {
	        elem.attr('width', width);
	    });
	};
})
.directive('ngHeight', function() {
	return function(scope, elem, attrs) {
	    attrs.$observe('ngHeight', function(height) {
	        elem.attr('height', height);
        });
    };
}) 
.directive('cinema', function () {
    return {
    	restrict: 'E',
		template: 
					'<div id="divImgCinema">' + 
						'<img alt="" ng-src="{{imgScreen}}"  ng-style="{\'width\': sizeScreen}">' + 
					'</div>' +
					'<div id="divSectionCinema" ng-style="{\'padding-right\': section.padding_right}" ng-repeat="section in sections">' + 
      					'<div ng-style="{\'width\': section.size}">' +
	    					'<span class="ng-scope" ng-repeat="sitie in section.sities">' +
	    						'<img ng-src="{{sitie.url}}" ng-width="{{ngSize}}" ng-height="{{ngSize}}" ng-click="updateSitie(sitie)">' +
	    					'</span>' +
	    				'</div>' +
    			   '</div>',
    	scope: {
	    	sectors: '=',
	    	max:'=',
	    	ngSize:'=',
	    	selected: '=',
    	},
          
    	link: function (scope, elem, attrs) {
    	  
    		//Verifies the existence of the required properties
    		if(!attrs.imgFree || !attrs.imgSelected || !attrs.imgTaken || !attrs.max ||
    				!attrs.ngSize || !attrs.sectors || !attrs.selected ) {
    			throw Error(NOT_POSSESS_ALL_THE_REQUIRED_PROPERTIES);
    		}
    		
    		/**
    		 * Update view cinema and sities
    		 */
    		var updateView = function() {
    			
				var sectors = scope.sectors;
				scope.takenSession = 0;
				scope.sizeScreen = 0;
				scope.sections = new Array();
				scope.selected = {};
				
				for(var s=0;s<sectors.length;s++) {
	    		  
					var sitiesTemp = new Array();
				
					// Map chairs occupied for others
					var mapTakenSeats = {};
					if (sectors[s].takenSeats) {
						for ( var i = 0; i < sectors[s].takenSeats.length; i++) {
							var row = sectors[s].takenSeats[i].row;
							var column = sectors[s].takenSeats[i].column;
							mapTakenSeats[row + "-" + column] = true;
						}
					}
	  		  
					// Make the seats with their status
					for(var i=0;i<sectors[s].rows;i++){
						for ( var j = 0; j < sectors[s].cols; j++) {
							var sitie = new Object();
							sitie.row = i;
							sitie.col = j;
							sitie.nameSection = sectors[s].name;
							sitie.url = attrs.imgFree;
							if (i + "-" + j in mapTakenSeats) {
								sitie.url = attrs.imgTaken;
								sitie.taken = takenOther;
							} else {
								sitie.url = attrs.imgFree;
								sitie.taken = free;
							}
							sitiesTemp.push(sitie);
						}
						
						scope.sections.sities = sitiesTemp;
					}
					
					//Make the section and their sizes
					var section = new Object();
					section.nameSection = sectors[s].name;
					section.sities = sitiesTemp;
					section.size = sectors[s].cols * scope.ngSize;
					section.padding_right = scope.ngSize;
					scope.sizeScreen += section.size;
					scope.sections.push(section);
					
				}
				
				//Adjusts the size of the movie screen to the measure according to cinema
				scope.sizeScreen = scope.sizeScreen + (scope.sectors.length * scope.ngSize ) - scope.ngSize ;
				scope.imgScreen = attrs.imgScreen;
    		};
    		
    		var takenOther = "OTHER", takenMy = "MY", free = "FREE";  
    		/**
    		 * Updated site occupied for purchase
    		 */
			scope.updateSitie = function(sitie){

				if (sitie.taken == takenMy) {
					scope.takenSession -= 1;
					sitie.taken = free;
					sitie.url = attrs.imgFree;
					delete scope.selected[sitie.row + "-"+ sitie.col + "-"+ sitie.nameSection];
					return;
				}
				if (scope.max <= scope.takenSession) {
					return;
				}
				if (!(sitie.taken == takenOther)) {
					scope.takenSession += 1;
					var sitieNew = new Object();
					sitieNew.row = sitie.row;
					sitieNew.col = sitie.col;
					sitieNew.nameSection = sitie.nameSection;
					scope.selected[sitieNew.row + "-"+ sitieNew.col + "-"+ sitieNew.nameSection] = sitieNew;
					sitie.taken = takenMy;
					sitie.url = attrs.imgSelected;
					return;
				}
    		};
    		
    		/**
    		 * Observed a change in variable "sectors"
    		 */
    		scope.$watch('sectors', function(oldVal, newVal) {
	        	if (oldVal) {
	        		updateView();
	          }
	        });
    	}
    };
  });
