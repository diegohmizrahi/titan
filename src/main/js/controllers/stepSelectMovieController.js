app.moviesModule = angular.module('stepSelectMovieController',[]);

app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, theaterService,showTimeService) {

	$scope.filter = {};
	var urlParams = "/steps?";
	$scope.labelButton = "BUY";
	
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
			urlParams += "theater="+$scope.filter.theaterSelected.id;
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

		urlParams += "&movie="+movieId;
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
		urlParams += "&showTime="+$scope.filter.showTimeSelected.id;
	};
	
	/**
	 * Replace and navigate url browser
	 */
	$scope.navigateUrl = function(){
		$location.url(urlParams);
	};
	
	$scope.getTheaters();
});
