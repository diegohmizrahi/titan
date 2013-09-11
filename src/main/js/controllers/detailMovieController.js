app.moviesModule = angular.module('detailMovieController',[]);

app.moviesModule.controller('detailMovieCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.no_picture = "./resources/img/no-picture.jpg";
	
	//Only if the url have parameters
	if($routeParams.idMovie != 0) {
		movieService.getMovie($routeParams.idMovie).then(function(movie){
			$scope.movie = movie;
		});
	};
});

