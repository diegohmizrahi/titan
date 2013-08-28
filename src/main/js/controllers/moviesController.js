app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.movies = [{"id":1, "name": "Que paso ayer 1", "url":"http://imdb-poster.b0.upaiyun.com/001/436/562.jpg!cover?_upt=e411d3601377739936"},
	                 {"id":2, "name":"Metegol", "url": "http://imdb-poster.b0.upaiyun.com/001/245/526.jpg!cover?_upt=b611d8c71377737023"},
					 {"id":3, "name": "Que paso ayer 2", "url":"http://imdb-poster.b0.upaiyun.com/000/129/387.jpg!cover?_upt=837dda1b1377736906"},
	                 {"id":4, "name":"Metegol 1", "url": "http://imdb-poster.b0.upaiyun.com/000/443/536.jpg!cover?_upt=7db2cb831377737192"},
						{"id":5, "name": "Que paso ayer 2", "url":"http://imdb-poster.b0.upaiyun.com/000/114/709.jpg!cover?_upt=d146ccf31377737214"},
						{"id":6, "name":"Metegol 1", "url": "http://imdb-poster.b0.upaiyun.com/000/268/380.jpg!cover?_upt=22d38ae31377737331"}];
	
	
//	$scope.moviesList = function(){
//		movieService.getMovies().then(function(movies){
//			$scope.movies = movies;
//		});
//	};
//	
//	$scope.moviesList();
	
});
