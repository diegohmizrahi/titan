app.moviesModule = angular.module('stepSelectMovieController',[]);

app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, theaterService,showTimeService) {

	$scope.filter = {};
	$scope.showButton = true;
	
	/**
	 * Get all theaters
	 */ 
	$scope.getTheaters = function() {
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};

	/**
	 * Get Movies for theater selected
	 */
	$scope.updateTheaterSelected = function(){
		theaterService.getMovies($scope.filter.theaterSelected.id).then(function(movies){
			$scope.movies = movies;
		});
		$scope.filter.movieSelected = false;
		$scope.filter.showTimeSelected = false;
	};
	
	/**
	 * Get showTimes for theater and movie selected
	 */
	$scope.updateMovieSelected = function(){
		
		var theaterId = $scope.filter.theaterSelected.id;
		var movieId = $scope.filter.movieSelected.id;

		showTimeService.getShowTimeofMovies(theaterId,movieId).then(function(showTimes){
			
			$scope.showTimes = new Array();
			
			for(var i=0;i<showTimes.length;i++){
				$scope.showTimes.push(showTimes[i]);
			}
		});

		for(var i=0;i<$scope.movies.length;i++){
			if(movieId == $scope.movies[i].id){
				$scope.summary = $scope.movies[i].summary;
				break;
			}
		}
		
		$scope.filter.showTimeSelected = false;
	};
	
	/**
	 * Make url to switch screens
	 */
	$scope.updateShowTimeSelected = function(){
	};
	
	/**
	 * Replace and navigate url browser
	 */
	$scope.navigateUrl = function(){
		var urlParams = "/steps?theater="+$scope.filter.theaterSelected.id +
						"&movie="+$scope.filter.movieSelected.id +
						"&showTime="+$scope.filter.showTimeSelected.id;
		$location.url(urlParams);
	};
	
	$scope.getTheaters();
});
