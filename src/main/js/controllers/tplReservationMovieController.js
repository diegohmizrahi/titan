app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {
	
	$scope.templates =
        [ { name: 'filtroSesiones', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'tablaSesiones', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
	$scope.updateTheaterSelected = function(){
		$scope.$$childHead.movies = [{"id":1, "name": "Que paso ayer 1", "url":"./resources/img/movies/1.jpg"},
		                 {"id":2, "name":"Metegol", "url": "./resources/img/movies/2.jpg"}];
	};
	
	/**
	 * Get all theaters
	 */ 
	$scope.getTheaters = function() {
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};
	
	$scope.getTheaters();
});
