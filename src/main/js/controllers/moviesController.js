app.moviesModule = angular.module('moviesController',['ui.bootstrap']);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.moviesAll;
	$scope.noOfPages = 1;
	$scope.currentPage = 1;
	$scope.maxSize = 6;
	$scope.no_picture = "./resources/img/no-picture.jpg";
	
	/**
	 * Get movies
	 */
	$scope.moviesList = function(){
		movieService.getMovies().then(function(movies){
			if(movies == ""){
    			$scope.moviesAll = new Array();
    		} else {
    			$scope.moviesAll = movies;
    			$scope.noOfPages = Math.floor($scope.moviesAll.length / $scope.maxSize) + 1;
    			
    			if(($scope.moviesAll.length % $scope.maxSize) == 0) {
    				$scope.noOfPages = $scope.noOfPages - 1;
    			}
    			$scope.pageChanged(1);
    		}
		});
	};
	

	/**
	 * Observed a change in attribute "currentPage" this element html: pagination
	 */
	$scope.$watch('currentPage', function(newPage){
		$scope.watchPage = newPage;
	});
	
	/**
	 * Makes change of page
	 */
	$scope.pageChanged = function(page) {
	
		$scope.callbackPage = page;
	
		if($scope.moviesAll) {
		  	$scope.movies  = $scope.moviesAll.slice((page - 1) * 6, page * 6);
		}
	};
	
	$scope.moviesList();
});
