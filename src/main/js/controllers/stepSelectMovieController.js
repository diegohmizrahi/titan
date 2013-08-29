app.moviesModule = angular.module('stepSelectMovieController',[]);
app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, movieService) {

	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	
	$scope.updateTheaterSelected = function(theaterSelected){
		if(theaterSelected.id == 1){
			$scope.movies = [{"id":1,"name": "Jobs",},{"id":2,"name":"Mi villano Favorito 2"}];
		} else {
			$scope.movies = [{"id":3,"name": "Que paso ayer 1"},{"id":4,"name":"Metegol"}];
		}
//		movieService.getMovies().then(function(response) {
//			$scope.movies = response;
//		});
//		theaterService.getMovies($scope.filter.theaterSelected).then(function(){
//			
//		});
		//TODO:28-8 hay que hacer la logica cuando venga del backend
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
				"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
				"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
				"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
				"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
				"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";
	    
		$scope.filter.movieSelected = false;
		$scope.filter.showTimeSelected = false;
	};

	$scope.updateMovieSelected = function(movieSelected){
		if(movieSelected.id == 1 || movieSelected.id == 3){
			$scope.showTimes = [{"name": "miercoles 20:20"},{"name":"miercoles 22"}];
		} else {
			$scope.showTimes = [{"name": "jueves 20:20"},{"name":"sabado 22"}];
		}
		$scope.filter.showTimeSelected = false;
//		movieService.getTime($scope.filter.theaterSelected,$scope.filter.movieSelected).then(function(){
//			
//		});
		
	};
	
});
