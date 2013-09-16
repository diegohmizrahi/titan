app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {
	
	$scope.templates =
        [ { name: 'gridMovies', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
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
