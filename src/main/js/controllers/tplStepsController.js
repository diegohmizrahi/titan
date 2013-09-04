app.moviesModule = angular.module('tplStepsController',[]);


app.moviesModule.controller('stepsCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {

	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}];
	$scope.labelButton = "NEXT";
	$scope.filter = {};
	
	//Only if the url does not have parameters
	if (!$routeParams.movie) { 
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};
	
	
	//Running when called through the browser url with parameters.
    //Make the combo box with data
	if($routeParams.movie && $routeParams.theater && $routeParams.showTime) {
		
		$scope.filter = {};
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
			
			for(var i=0;i<$scope.theaters.length;i++){
				if($scope.theaters[i].id == $routeParams.theater){
					$scope.filter.theaterSelected = $scope.theaters[i];
					break;
				}
			}
			theaterService.getMovies($routeParams.theater).then(function(movies){
				$scope.movies = movies;
				
				for(var i=0;i<$scope.movies.length;i++){
					if($scope.movies[i].id == $routeParams.movie){
						$scope.filter.movieSelected = $scope.movies[i];
						$scope.description = $scope.movies[i].description;
						break;
					}
				}

				theaterService.getShowTimeofMovies($routeParams.theater,$routeParams.movie).then(function(showTimes){
					
					$scope.showTimes = new Array();
					
					for(var i=0;i<showTimes.length;i++){
						$scope.showTimes.push(showTimes[i].showTime);
					}
					
					for(var i=0;i<$scope.showTimes.length;i++){
						if($scope.showTimes[i].id == $routeParams.showTime){
							$scope.filter.showTimeSelected = $scope.showTimes[i];
							break;
						}
					}
				});
			});
		});
	}
	
	/**
	 * Replace and navigate url browser
	 */
	$scope.navigateUrl = function(){
		$scope.templates[1].state = true;
		$rootScope.createSections($scope.filter.showTimeSelected);
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
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
	};
	
	/**
	 * Get showTimes for theater and movie selected
	 */
	$scope.updateMovieSelected = function(){
		
		var theaterId = $scope.filter.theaterSelected.id;
		var movieId = $scope.filter.movieSelected.id;

		theaterService.getShowTimeofMovies(theaterId,movieId).then(function(showTimes){
			
			$scope.showTimes = new Array();
			
			for(var i=0;i<showTimes.length;i++){
				$scope.showTimes.push(showTimes[i].showTime);
			}
			
		});

		for(var i=0;i<$scope.movies.length;i++){
			if(movieId == $scope.movies[i].id){
				$scope.description = $scope.movies[i].description;
				break;
			}
		}
		
		$scope.filter.showTimeSelected = false;
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
	};
	
	/**
	 * Next step is Select Method Payment
	 */
	$scope.nextStep = function(sitiesSelected){
		$scope.filter.sitiesSelectedText = "";
		$scope.filter.quantitySelected = 0;
		for (var key in sitiesSelected) {
			$scope.filter.sitiesSelectedText = $scope.filter.sitiesSelectedText + sitiesSelected[key].nameSection  + ": " +  
				"(" + (sitiesSelected[key].row + 1)+ "," + (sitiesSelected[key].column + 1) + ") ";
			$scope.filter.quantitySelected++;
		}
		$scope.templates[2].state = true;
	};
	
	/**
	 * Last step is Payment
	 */
	$scope.lastStep = function(info) {
		$rootScope.open(info);
	};
	
});
