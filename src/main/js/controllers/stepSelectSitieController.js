app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.occupiedSession = 0;
	$scope.quantitySelected = {"id":0,"number":0};
	$scope.sitiesSelected = new Array();
	$scope.quantities = [{"id":1,"number":1},{"id":2,"number":2},{"id":3,"number":3},{"id":4,"number":4}];
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	
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
			
			if(nameSection == "CENTER") {
				$scope.sizeCenter = columnSection * 24 + "px";
				$scope.sizeCenterNro = columnSection * 24;
			}
			if(nameSection == "LEFT"){
				$scope.sizeLeft = columnSection * 24 + "px";
				$scope.sizeLeftNro =  columnSection * 24;
			}
			if(nameSection == "RIGHT") {
				$scope.sizeRight = columnSection * 24 + "px";
			}
		};
		
		
		return sitiesTemp;
	}
	
	
	//TODO: 27-8 la idea seria mejorarlo lo mejor posible
	// evaluar si conviene tener solo un listado de sities, o por separado
	$scope.sitiesList = function(){
     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 4}],"center": [
{"row": 20,"column": 15,"occupied": [{"row": 1,"column": 4},{"row": 1,"column": 5},{"row": 6,"column": 7},{"row": 3,"column": 2}, {"row": 5,"column": 4},    ]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};

		//movieService.getSities().then(function(sities){
			
     	sitiesLeftTemp = renderTypeSection(sities.showTime.left[0], "LEFT");
     	sitiesCenterTemp = renderTypeSection(sities.showTime.center[0], "CENTER");
     	sitiesRightTemp = renderTypeSection(sities.showTime.right[0], "RIGHT");
     	//left
//			var showTimeLeftRow = sities.showTime.left[0].row;
//			var showTimeLeftColumn = sities.showTime.left[0].column;
//			
//			var sitiesLeftTemp = new Array();
//			for(var i=0;i<showTimeLeftRow;i++){
//				for(var j=0;j<showTimeLeftColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					sitie.url = "resources/img/seat_gray.gif";
//					sitie.occupied = free;
//					sitiesLeftTemp.push(sitie);
//				};
//				$scope.sizeLeft = showTimeLeftColumn * 24 + "px";
//				$scope.sizeLeftNro =  showTimeLeftColumn * 24;
//			};

		//center
//			var showTimeCenterRow = sities.showTime.center[0].row;
//			var showTimeCenterColumn = sities.showTime.center[0].column;
//		
//			var sitiesCenterTemp = new Array();
//			var mapCenter = {};
//			for(var p=0;p<sities.showTime.center[0].occupied.length;p++){
//				var row = sities.showTime.center[0].occupied[p].row;
//				var column = sities.showTime.center[0].occupied[p].column;
//				mapCenter[row+"-"+column] = true;
//			}
//			for(var i=0;i<showTimeCenterRow;i++){
//				for(var j=0;j<showTimeCenterColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					if( i+"-"+j in mapCenter){
//						sitie.url = "resources/img/seat_red.gif";
//						sitie.occupied = occupedOther;
//					} else {
//						sitie.url = "resources/img/seat_gray.gif";
//						sitie.occupied = free;
//					}
//					sitiesCenterTemp.push(sitie);
//				};
//				$scope.sizeCenter = showTimeCenterColumn * 24 + "px";
//				$scope.sizeCenterNro = showTimeCenterColumn * 24;
//			};
		
		// right
//			var showTimeRightRow = sities.showTime.right[0].row;
//			var showTimeRightColumn = sities.showTime.right[0].column;
//			
//			var sitiesRightTemp = new Array();
//			for(var i=0;i<showTimeRightRow;i++){
//				for(var j=0;j<showTimeRightColumn;j++){
//					var sitie = new Object();
//					sitie.row = i;
//					sitie.column = j;
//					sitie.url = "resources/img/seat_gray.gif";
//					sitie.occupied = free;
//					sitiesRightTemp.push(sitie);
//				};
//				$scope.sizeRight = showTimeRightColumn * 24 + "px";
//			};
			
			$scope.sitiesLeft = sitiesLeftTemp;
			$scope.sitiesCenter = sitiesCenterTemp;
			$scope.sitiesRight = sitiesRightTemp;
		//});
	};
	
//	$scope.fin1 = function(sitiesSelected){
//		console.log(sitiesSelected);
//	};
	
	/*
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			return;
		}
		if($scope.quantitySelected.number <= $scope.occupiedSession){
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
	$scope.sitiesList();
});
