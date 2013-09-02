app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
//	 $scope.chair = 1;
	$scope.sections = new Array();
	$scope.sizeScreen = 0;
	$scope.occupiedSession = 0;
	$scope.quantity = 1;
	//$scope.quantitySelected = {"id":0,"number":0};
	$scope.sitiesSelected = new Array();
	//$scope.quantities = [{"id":1,"number":1},{"id":2,"number":2},{"id":3,"number":3},{"id":4,"number":4}];
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	
	/**
	 * Create areas of theater
	 */
	$scope.createSections = function(){
     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 4}],"center": [
	{"row": 20,"column": 15,"occupied": [{"row": 1,"column": 4},{"row": 1,"column": 5},{"row": 6,"column": 7},{"row": 3,"column": 2}, {"row": 5,"column": 4}    ]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};

		//movieService.getSities().then(function(sities){
			
     	renderTypeSection(sities.showTime.left[0], "LEFT");
     	renderTypeSection(sities.showTime.center[0], "CENTER");
     	renderTypeSection(sities.showTime.right[0], "RIGHT");
 
     	$scope.sizeScreen = $scope.sizeScreen + ($scope.sections.length * 20 ) - 20 ;

	};
	
//	$scope.fin1 = function(sitiesSelected){
//		console.log(sitiesSelected);
//	};
//	
	/**
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			return;
		}
//		if($scope.quantitySelected.number <= $scope.occupiedSession){
//			return;
//		}
		if($scope.quantity <= $scope.occupiedSession){
			return;
		}
		if(!(sitie.occupied == occupiedOther)) {
			$scope.occupiedSession += 1;
			sitie.occupied = occupiedMy;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			return;
		}
		
	};
	
//	$scope.updateSpinner = function(value){
//		$scope.quantity = value;
//	};
	
	    $scope.saveRatingToServer = function(rating) {
	      //$window.alert('Rating selected - ' + rating);
	    };
	/**
	 * Render section in the teather
	 */
	function renderTypeSection(section, nameSection ){
		var rowSection = section.row;
		var columnSection = section.column;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.occupied) {
			for(var i=0;i<section.occupied.length;i++){
				var row = section.occupied[i].row;
				var column = section.occupied[i].column;
				mapOcuppied[row+"-"+column] = true;
			}
		}
		
		for(var i=0;i<rowSection;i++){
			for(var j=0;j<columnSection;j++){
				var sitie = new Object();
				sitie.row = i;
				sitie.column = j;
				sitie.nameSection = nameSection;
				if( i+"-"+j in mapOcuppied){
					sitie.url = "resources/img/seat_red.gif";
					sitie.occupied = occupiedOther;
				} else {
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occupied = free;
				}
				sitiesTemp.push(sitie);
			};
		};
		
		var section = new Object();
		section.nameSection = nameSection;
		section.sities = sitiesTemp;
		section.size = columnSection * 24;
		
		$scope.sizeScreen += section.size;
		$scope.sections.push(section);
	}
	
	$scope.createSections();
});
