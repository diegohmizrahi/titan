app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.moviesList = function(){
		movieService.getMovies().then(function(movies){
			$scope.movies = movies;
		});
	};
	
	$scope.moviesList();
	
});
