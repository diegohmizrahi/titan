app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	//var occupedSession = 0;
	$scope.occupedSession = 0;
	$scope.quantity = 0;
	$scope.sitiesSelected = new Array();
	//TODO: 27-8 la idea seria mejorarlo lo mejor posible
	// evaluar si conviene tener solo un listado de sities, o por separado
	$scope.sitiesList = function(){
//     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 2}],"center": [
//{"row": 20,"column": 4,"occupied": [{"row": 1,"column": 5}]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};
     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 4}],"center": [
{"row": 20,"column": 15,"occupied": [{"row": 1,"column": 4}]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};

		//movieService.getSities().then(function(sities){
			
			var showTimeLeftRow = sities.showTime.left[0].row;
			var showTimeLeftColumn = sities.showTime.left[0].column;
			
			var sitiesLeftTemp = new Array();
			for(var i=0;i<showTimeLeftRow;i++){
				for(var j=0;j<showTimeLeftColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesLeftTemp.push(sitie);
				};
				$scope.sizeLeft = showTimeLeftColumn * 24 + "px";
				$scope.sizeLeftNro =  showTimeLeftColumn * 24;
			};

			var showTimeCenterRow = sities.showTime.center[0].row;
			var showTimeCenterColumn = sities.showTime.center[0].column;
			
			var sitiesCenterTemp = new Array();
			for(var i=0;i<showTimeCenterRow;i++){
				for(var j=0;j<showTimeCenterColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesCenterTemp.push(sitie);
				};
				$scope.sizeCenter = showTimeCenterColumn * 24 + "px";
				$scope.sizeCenterNro = showTimeCenterColumn * 24;
			};
			
			var showTimeRightRow = sities.showTime.right[0].row;
			var showTimeRightColumn = sities.showTime.right[0].column;
			
			var sitiesRightTemp = new Array();
			for(var i=0;i<showTimeRightRow;i++){
				for(var j=0;j<showTimeRightColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesRightTemp.push(sitie);
				};
				$scope.sizeRight = showTimeRightColumn * 24 + "px";
			};
			
			$scope.sitiesLeft = sitiesLeftTemp;
			$scope.sitiesCenter = sitiesCenterTemp;
			$scope.sitiesRight = sitiesRightTemp;
		//});
	};
	
	//TODO: falta el tema de que si ya esta ocupado por otro, q no lo desocupe.
	// y que cuante dependiendo de la cantidad de entradas que compro
	// solo comienzo de verificacion, esto debe mejorar!!
	$scope.updateSitie = function(sitie){
		
		if(sitie.occuped){
			$scope.occupedSession -= 1;
			sitie.occuped = false;
			sitie.url = "resources/img/seat_gray.gif";
			return;
		}
		if($scope.quantity <= $scope.occupedSession){
			return;
		}
		if(!sitie.occuped) {
			$scope.occupedSession += 1;
			sitie.occuped = true;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			return;
		}
		
	};
	$scope.sitiesList();
});
