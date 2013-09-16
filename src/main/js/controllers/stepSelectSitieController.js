app.moviesModule = angular.module('stepSelectSitieController',[]);

// 12-9 -> Alternative 2
app.moviesModule.controller('sitiesCtrl2', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;

	/**
	 * Create areas of theater
	 */
	$rootScope.createSections = function(sections){
		$scope.sections = app.utils.parseSectionCinema(sections);
		
	};
	
	/**
	 * Checks whether the button can display see
	 */
	$scope.showNext = function(){
		var count = 0;
		var isEquals = false;
		for (var key in $scope.sitiesSelected) {
			count++;
		}
		if(count == $scope.quantity) {
			isEquals = true;
		}
		return isEquals;
	};
});
//@Deprecated 12-9 -> Alternative 1
app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	var sectionLeft = "Left", sectionCenter = "Center", sectionRight = "Right";
	
	/**
	 * Create areas of theater
	 */
//	$rootScope.createSections = function(sections){
	$scope.createSections = function(sections){
		
		$scope.sections = new Array();
		$scope.sizeScreen = 0;
		$scope.occupiedSession = 0;
		$scope.quantity = 1;
		$scope.sitiesSelected = new Array();
		$scope.mapSitiesSelected = {};
		if(sections.left) {
			renderTypeSection(sections.left, sectionLeft);
		}
		if(sections.center) {
			renderTypeSection(sections.center, sectionCenter);
		}
		if(sections.right) {
			renderTypeSection(sections.right, sectionRight);
		}
 
     	$scope.sizeScreen = $scope.sizeScreen + ($scope.sections.length * 20 ) - 20 ;
	};

	/**
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			delete $scope.mapSitiesSelected[sitie.row+"-"+sitie.col+"-"+sitie.nameSection];
			return;
		}
		if($scope.quantity <= $scope.occupiedSession){
			return;
		}
		if(!(sitie.occupied == occupiedOther)) {
			$scope.occupiedSession += 1;
			sitie.occupied = occupiedMy;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			$scope.mapSitiesSelected[sitie.row+"-"+sitie.col+"-"+sitie.nameSection] = sitie;
			return;
		}
		
	};

	/**
	 * Render section in the teather
	 */
	function renderTypeSection(section, nameSection ){
		var rowSection = section.rows;
		var columnSection = section.cols;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.takenSeats) {
			for(var i=0;i<section.takenSeats.length;i++){
				var row = section.takenSeats[i].row;
				var column = section.takenSeats[i].column;
				mapOcuppied[row+"-"+column] = true;
			}
		}
		
		for(var i=0;i<rowSection;i++){
			for(var j=0;j<columnSection;j++){
				var sitie = new Object();
				sitie.row = i;
				sitie.col = j;
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
	
});
