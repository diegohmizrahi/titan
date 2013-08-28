app.moviesModule = angular.module('tplStepsController',[]);

app.moviesModule.controller('reservationdddCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	var sitiesSelectedA;
	$scope.filter = {};
	//$scope.filter.theaterSelected = false;
	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}];
	
	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	$scope.movies = [{"id":1,"name": "Que paso ayer 1"},{"id":2,"name":"Metegol"}];
	$scope.times = [{"id":1,"name": "miercoles 20:20"},{"id":2,"name":"miercoles 22"}];
	
	if($routeParams.movie && $routeParams.theater && $routeParams.showTime) {
		
		for(var i=0;i<$scope.theaters.length;i++){
			if($scope.theaters[i].id == $routeParams.theater){
				$scope.filter.theaterSelected = $scope.theaters[0];
				break;
			}
		}

		for(var i=0;i<$scope.movies.length;i++){
			if($scope.movies[i].id == $routeParams.movie){
				$scope.filter.movieSelected = $scope.movies[0];
				break;
			}
		}
		
		for(var i=0;i<$scope.times.length;i++){
			if($scope.times[i].id == $routeParams.showTime){
				$scope.filter.timeSelected = $scope.times[0];
				break;
			}
		}
		
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
		"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
		"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
		"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
		"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
		"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";

		$scope.templates[1].state = true;
	};
	
	$scope.fin = function() {
		console.log($rootScope);
		console.log($scope);
		console.log("ddddd");
	};
	
	$scope.fin1 = function(sitiesSelected){
		//console.log(sitiesSelected);
		var test = " Theater: " + $scope.filter.theaterSelected.name + " Movie: " + $scope.filter.movieSelected.name + " Time: " +
		$scope.filter.timeSelected.name + " Sities: " ;
		for(var i=0;i<sitiesSelected.length;i++){
			test = test + "(" + sitiesSelected[i].row + "," + sitiesSelected[i].column + ")";
		}
		alert(test);
		sitiesSelectedA = sitiesSelected;
		$scope.templates[2].state = true;
	};
	
	$scope.end = function(formaPagos){
		console.log(formaPagos);
	};
});
