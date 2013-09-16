app.moviesModule = angular.module('tplStepsController',[]);


app.moviesModule.controller('stepsCtrl', function($rootScope,$routeParams, $scope, $location,theaterService,showTimeService) {

	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}
        , { name: 'stepPaymentConfirmation', url: 'resources/tpl/stepPaymentConfirmation.html' , state: false}];
	$scope.filter = {};
	$scope.showButton = false;
	
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
						$scope.summary = $scope.movies[i].summary;
						break;
					}
				}

				showTimeService.getShowTimeofMovies($routeParams.theater,$routeParams.movie).then(function(showTimes){
					
					$scope.showTimes = new Array();
					
					for(var i=0;i<showTimes.length;i++){
						$scope.showTimes.push(showTimes[i]);
					}
					
					for(var i=0;i<$scope.showTimes.length;i++){
						if($scope.showTimes[i].id == $routeParams.showTime){
							$scope.filter.showTimeSelected = $scope.showTimes[i];
							break;
						}
					}
					
					$scope.templates[1].state = true;
					$rootScope.createSections($scope.filter.showTimeSelected);
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
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
	};
	
	/**
	 * Make url to switch screens
	 */
	$scope.updateShowTimeSelected = function(){
		$scope.navigateUrl();
	};
	
	/**
	 * Next step is Select Method Payment
	 */
	$scope.nextStep = function(sitiesSelected){
		$scope.filter.sitiesSelectedText = "";
		$scope.filter.quantitySelected = 0;
		$scope.filter.sitiesSelected = sitiesSelected;
		for (var key in sitiesSelected) {
			$scope.filter.sitiesSelectedText = $scope.filter.sitiesSelectedText + sitiesSelected[key].nameSection  + ": " +  
				"(" + (sitiesSelected[key].row + 1)+ "," + (sitiesSelected[key].col + 1) + ") ";
			$scope.filter.quantitySelected++;
		}
		$scope.templates[2].state = true;
	};
	
	/**
	 * Last step is Payment
	 */
	$scope.lastStep = function(info) {
		$scope.templates[0].state = false;
		$scope.templates[1].state = false;
		$scope.templates[2].state = false;
		$scope.templates[3].state = true;
		$rootScope.showPaymentConfirmation(info);
	};
	
});
