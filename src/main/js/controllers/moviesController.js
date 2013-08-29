app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.movies = [{"id":1, "name": "Que paso ayer 1", "url":"./resources/img/movies/1.jpg"},
	                 {"id":2, "name":"Metegol", "url": "./resources/img/movies/2.jpg"},
					 {"id":3, "name": "Que paso ayer 2", "url":"./resources/img/movies/3.jpg"},
	                 {"id":4, "name":"Metegol 1", "url": "./resources/img/movies/4.jpg"},
						{"id":5, "name": "Que paso ayer 2", "url":"./resources/img/movies/5.jpg"},
						{"id":6, "name":"Metegol 1", "url": "./resources/img/movies/6.jpg"}];
	
	
//	$scope.moviesList = function(){
//		movieService.getMovies().then(function(movies){
//			$scope.movies = movies;
//		});
//	};
//	
//	$scope.moviesList();
	
});
