app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.templates =
        [ { name: 'filtroSesiones', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'tablaSesiones', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
});
