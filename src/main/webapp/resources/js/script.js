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

app.directivesModule = angular.module('utilsDirective',[])

.directive('makeChairs', function () {
    return {
    	
    	restrict: 'A',
    	template: '<ul class="chair">' +
      			  	'<li class="chairValue">{{chairValue}}</li>' +
      			  	'<li ng-repeat="chair in chairs" ng-class="chair" ng-click="toggle($index)"></li>' +
      			  '</ul>',
		scope: {
			chairValue: '=',
			max: '=',
			onChairSelected: '&'
		    
		},
		link: function (scope, elem, attrs) {
    	  
			/**
			 * Update view of chairs
			 */
	        var updateChairs = function() {
				scope.chairs = [];
				for ( var i = 0; i < scope.max; i++) {
					scope.chairs.push({
						filled : i < scope.chairValue,
						empty : i >= scope.chairValue
					});
				}
			};
	
			/**
			 * Rearranges the seats according to the information
			 */
			scope.toggle = function(index) {
				if (index == 0) {
					return;
				}
				if (scope.chairValue == (index + 1)) {
					scope.chairValue = index;
					scope.onChairSelected({
						chair : index
					});
				} else {
					scope.chairValue = index + 1;
					scope.onChairSelected({
						chair : index + 1
					});
				}
			};
	
			/**
    		 * Observed a change in variable "chairValue"
    		 */
	        scope.$watch('chairValue', function(oldVal, newVal) {
	        	if (newVal) {
	        		updateChairs();
	          }
	        });
		}
    };
})
.directive('ngWidth', function() {
	return function(scope, elem, attrs) {
	    attrs.$observe('ngWidth', function(width) {
	        elem.attr('width', width);
	    });
	};
})
.directive('ngHeight', function() {
	return function(scope, elem, attrs) {
	    attrs.$observe('ngHeight', function(height) {
	        elem.attr('height', height);
        });
    };
}) 
.directive('cinema', function () {
    return {
    	restrict: 'E',
		template: 
					'<div id="divImgCinema">' + 
						'<img alt="" ng-src="{{imgScreen}}"  ng-style="{\'width\': sizeScreen}">' + 
					'</div>' +
					'<div id="divSectionCinema" ng-style="{\'padding-right\': section.padding_right}" ng-repeat="section in sections">' + 
      					'<div ng-style="{\'width\': section.size}">' +
	    					'<span class="ng-scope" ng-repeat="sitie in section.sities">' +
	    						'<img ng-src="{{sitie.url}}" ng-width="{{ngSize}}" ng-height="{{ngSize}}" ng-click="updateSitie(sitie)">' +
	    					'</span>' +
	    				'</div>' +
    			   '</div>',
    	scope: {
	    	sectors: '=',
	    	max:'=',
	    	ngSize:'=',
	    	selected: '=',
    	},
          
    	link: function (scope, elem, attrs) {
    	  
    		//Verifies the existence of the required properties
    		if(!attrs.imgFree || !attrs.imgSelected || !attrs.imgTaken || !attrs.max ||
    				!attrs.ngSize || !attrs.sectors || !attrs.selected ) {
    			throw Error(NOT_POSSESS_ALL_THE_REQUIRED_PROPERTIES);
    		}
    		
    		/**
    		 * Update view cinema and sities
    		 */
    		var updateView = function() {
    			
				var sectors = scope.sectors;
				scope.takenSession = 0;
				scope.sizeScreen = 0;
				scope.sections = new Array();
				scope.selected = {};
				
				for(var s=0;s<sectors.length;s++) {
	    		  
					var sitiesTemp = new Array();
				
					// Map chairs occupied for others
					var mapTakenSeats = {};
					if (sectors[s].takenSeats) {
						for ( var i = 0; i < sectors[s].takenSeats.length; i++) {
							var row = sectors[s].takenSeats[i].row;
							var column = sectors[s].takenSeats[i].column;
							mapTakenSeats[row + "-" + column] = true;
						}
					}
	  		  
					// Make the seats with their status
					for(var i=0;i<sectors[s].rows;i++){
						for ( var j = 0; j < sectors[s].cols; j++) {
							var sitie = new Object();
							sitie.row = i;
							sitie.col = j;
							sitie.nameSection = sectors[s].name;
							sitie.url = attrs.imgFree;
							if (i + "-" + j in mapTakenSeats) {
								sitie.url = attrs.imgTaken;
								sitie.taken = takenOther;
							} else {
								sitie.url = attrs.imgFree;
								sitie.taken = free;
							}
							sitiesTemp.push(sitie);
						}
						
						scope.sections.sities = sitiesTemp;
					}
					
					//Make the section and their sizes
					var section = new Object();
					section.nameSection = sectors[s].name;
					section.sities = sitiesTemp;
					section.size = sectors[s].cols * scope.ngSize;
					section.padding_right = scope.ngSize;
					scope.sizeScreen += section.size;
					scope.sections.push(section);
					
				}
				
				//Adjusts the size of the movie screen to the measure according to cinema
				scope.sizeScreen = scope.sizeScreen + (scope.sectors.length * scope.ngSize ) - scope.ngSize ;
				scope.imgScreen = attrs.imgScreen;
    		};
    		
    		var takenOther = "OTHER", takenMy = "MY", free = "FREE";  
    		/**
    		 * Updated site occupied for purchase
    		 */
			scope.updateSitie = function(sitie){

				if (sitie.taken == takenMy) {
					scope.takenSession -= 1;
					sitie.taken = free;
					sitie.url = attrs.imgFree;
					delete scope.selected[sitie.row + "-"+ sitie.col + "-"+ sitie.nameSection];
					return;
				}
				if (scope.max <= scope.takenSession) {
					return;
				}
				if (!(sitie.taken == takenOther)) {
					scope.takenSession += 1;
					var sitieNew = new Object();
					sitieNew.row = sitie.row;
					sitieNew.col = sitie.col;
					sitieNew.nameSection = sitie.nameSection;
					scope.selected[sitieNew.row + "-"+ sitieNew.col + "-"+ sitieNew.nameSection] = sitieNew;
					sitie.taken = takenMy;
					sitie.url = attrs.imgSelected;
					return;
				}
    		};
    		
    		/**
    		 * Observed a change in variable "sectors"
    		 */
    		scope.$watch('sectors', function(oldVal, newVal) {
	        	if (oldVal) {
	        		updateView();
	          }
	        });
    	}
    };
  });
/**
  describe('$httpBasedService', function () {
  var svc,
      httpBackend;
  
  beforeEach(function (){  
    //load the module.
    module('theaterService');
    
    //get your service, also get $httpBackend
    //$httpBackend will be a mock, thanks to angular-mocks.js
    inject(function($httpBackend, $httpBasedService) {
      svc = $httpBasedService;      
      httpBackend = $httpBackend;
    });
  });
  
  //make sure no expectations were missed in your tests.
  //(e.g. expectGET or expectPOST)
  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should send the msg and return the response.', function (){
    //set up some data for the http call to return and test later.
    var returnData =  [{"id":1 }] ;
    
    //expectGET to make sure this is called once.
    //httpBackend.expectGET('somthing.json?msg=wee').respond(returnData);
    httpBackend.expectGET('./resources/json/mock.json').respond(returnData);
    
    //create an object with a functio to spy on.
    var test = {
      handler: function() {}
    };
    
    //set up a spy for the callback handler.
    spyOn(test, 'handler');
    
    //make the call.
    var returnedPromise = svc.getTheaters();
    
    //use the handler you're spying on to handle the resolution of the promise.
    returnedPromise.then(test.handler);
    
    //flush the backend to "execute" the request to do the expectedGET assertion.
    httpBackend.flush();
    
    //check your spy to see if it's been called with the returned value.  
    expect(test.handler).toHaveBeenCalledWith(returnData);
  });
  
}); */
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
app.factory('movieService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get all movies
    	 */
	    getMovies:  function(){
	        var status = $http.get(app.constantsGlobal.REST_MOVIES).
	            then(function(response) {
	               return response.data;
	            });
	        return status;
	    },
    
	    /**
	     * Get detail of movie passed as argument
	     */
    	getMovie: function(idMovie){
    		 var status = $http.get(app.constantsGlobal.REST_MOVIES+ "/"+idMovie).
	            then(function(response) {
	                return response.data;
	            });
	        return status;
    	}
    };
});app.factory('paymentsService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Confirm cinema ticket
    	 */
    	paymentReservation:  function(info){

    		var stringSities = "";
    		for (var key in info.sitiesSelected) {
    			stringSities = stringSities + "&seat="+info.sitiesSelected[key].row+","+
    							info.sitiesSelected[key].col + "," + info.sitiesSelected[key].nameSection;
    		}
    		
    		var status = $http.post(app.constantsGlobal.REST_PAYMENTS  +
    				"?schedule="+info.showTimeSelected.id +
    				"&email="+ info.email +
    				"&dni="+info.dni +
    				stringSities).
            then(function(response) {
            	return response.data;
            });
	        return status;
	    }
    };
});
app.factory('showTimeService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get showTimes for theater and movie selected
    	 */
    	getShowTimeofMovies:  function(theaterId,movieId){
	    	var status = $http.get(app.constantsGlobal.REST_SHOW_TIMES + "?movie="+ movieId +"&theater="+theaterId).
	    	then(function(response) {
	    		return response.data;
	    	});
	    	return status;
	    }
    };
});
app.moviesModule = angular.module('stepPaymentConfirmationController',[]);

app.moviesModule.controller('paymentConfirmationCtrl', function($rootScope,$scope) {

	
	/**
	 * Show payment confirmation
	 */
	$rootScope.showPaymentConfirmation = function(information){
		$scope.info = information;
	};
	
});
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
app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,paymentsService) {
	
	$scope.methodsPayment = [{"id":1,"name":"Amex"},
	                         {"id":2,"name":"Cabal"},
	                         {"id":3,"name":"Mastercard"},
	                         {"id":4,"name":"Visa"}];
	
	
	/**
	 * After select method payment then call service paymentReservation
	 */
	$scope.lastStep = function () {
		paymentsService.paymentReservation($scope.filter).then(function(confirmation){
			
			$scope.filter.confirmation = new Object();
			$scope.filter.confirmationCode = confirmation.code;
			if($scope.$parent.lastStep){
				$scope.$parent.lastStep($scope.filter);
			}
		});
	};
});
app.moviesModule = angular.module('stepSelectSitieController',[]);

// 12-9 -> Alternative 2
app.moviesModule.controller('sitiesCtrl2', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;

	/**
	 * Create areas of theater
	 */
	$rootScope.createSections = function(sections){
		$scope.sections = app.utils.parseSectionCinema(sections);
		
	};
	
	/**
	 * Checks whether the button can display see
	 */
	$scope.showNext = function(){
		var count = 0;
		var isEquals = false;
		for (var key in $scope.sitiesSelected) {
			count++;
		}
		if(count == $scope.quantity) {
			isEquals = true;
		}
		return isEquals;
	};
});
//@Deprecated 12-9 -> Alternative 1
app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	var sectionLeft = "Left", sectionCenter = "Center", sectionRight = "Right";
	
	/**
	 * Create areas of theater
	 */
//	$rootScope.createSections = function(sections){
	$scope.createSections = function(sections){
		
		$scope.sections = new Array();
		$scope.sizeScreen = 0;
		$scope.occupiedSession = 0;
		$scope.quantity = 1;
		$scope.sitiesSelected = new Array();
		$scope.mapSitiesSelected = {};
		if(sections.left) {
			renderTypeSection(sections.left, sectionLeft);
		}
		if(sections.center) {
			renderTypeSection(sections.center, sectionCenter);
		}
		if(sections.right) {
			renderTypeSection(sections.right, sectionRight);
		}
 
     	$scope.sizeScreen = $scope.sizeScreen + ($scope.sections.length * 20 ) - 20 ;
	};

	/**
	 * Updated site occupied for purchase
	 */
	$scope.updateSitie = function(sitie){
		
		if(sitie.occupied == occupiedMy){
			$scope.occupiedSession -= 1;
			sitie.occupied = free;
			sitie.url = "resources/img/seat_gray.gif";
			delete $scope.mapSitiesSelected[sitie.row+"-"+sitie.col+"-"+sitie.nameSection];
			return;
		}
		if($scope.quantity <= $scope.occupiedSession){
			return;
		}
		if(!(sitie.occupied == occupiedOther)) {
			$scope.occupiedSession += 1;
			sitie.occupied = occupiedMy;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			$scope.mapSitiesSelected[sitie.row+"-"+sitie.col+"-"+sitie.nameSection] = sitie;
			return;
		}
		
	};

	/**
	 * Render section in the teather
	 */
	function renderTypeSection(section, nameSection ){
		var rowSection = section.rows;
		var columnSection = section.cols;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.takenSeats) {
			for(var i=0;i<section.takenSeats.length;i++){
				var row = section.takenSeats[i].row;
				var column = section.takenSeats[i].column;
				mapOcuppied[row+"-"+column] = true;
			}
		}
		
		for(var i=0;i<rowSection;i++){
			for(var j=0;j<columnSection;j++){
				var sitie = new Object();
				sitie.row = i;
				sitie.col = j;
				sitie.nameSection = nameSection;
				if( i+"-"+j in mapOcuppied){
					sitie.url = "resources/img/seat_red.gif";
					sitie.occupied = occupiedOther;
				} else {
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occupied = free;
				}
				sitiesTemp.push(sitie);
			};
		};
		
		var section = new Object();
		section.nameSection = nameSection;
		section.sities = sitiesTemp;
		section.size = columnSection * 24;
		
		$scope.sizeScreen += section.size;
		$scope.sections.push(section);
	}
	
});
app.factory('theaterService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Get all theaters
    	 */ 
	    getTheaters:  function(){
    		var status = $http.get(app.constantsGlobal.REST_THEATERS). 
            then(function(response) {
            	return response.data;
            });
	        return status;
	    },
	    
	    /**
		 * Get Movies for theater parameters
		 */
	    getMovies:  function(theaterId){
	    	var status = $http.get(app.constantsGlobal.REST_THEATERS + "/" + theaterId + "/movies").
	    	then(function(response) {
	    		return response.data;
	    	});
	    	return status;
	    }
    };
});app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {
	
	$scope.templates =
        [ { name: 'gridMovies', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
	/**
	 * Get all theaters
	 */ 
	$scope.getTheaters = function() {
		theaterService.getTheaters().then(function(theaters){
			$scope.theaters = theaters;
		});
	};
	
	$scope.getTheaters();
});
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
