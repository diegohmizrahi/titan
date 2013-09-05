app.moviesModule = angular.module('detailMovieController',[]);

app.moviesModule.controller('detailMovieCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
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
                  '<li ng-repeat="chair in chairs" ng-class="chair" ng-click="toggle($index)">' +
                  '</li>' +
                  
                '</ul>',
      scope: {
    	chairValue: '=',
        max: '=',
        onChairSelected: '&'
        
      },
      link: function (scope, elem, attrs) {
    	  
        var updateChairs = function() {
          scope.chairs = [];
          for (var  i = 0; i < scope.max; i++) {
        	  scope.chairs.push({filled: i < scope.chairValue, empty: i >= scope.chairValue});
          }
        };

        scope.toggle = function(index) {
	        if(index == 0){
	        	return;
	        }
			if(scope.chairValue == (index + 1)){
				scope.chairValue = index;
				scope.onChairSelected({chair: index});
			} else {
				scope.chairValue = index + 1;
				scope.onChairSelected({chair: index + 1});
			}
        };

        scope.$watch('chairValue', function(oldVal, newVal) {
        	if (newVal) {
        		updateChairs();
          }
        });
      }
    };
  })

//.directive('ngpopup', function($compile) {
//	return {
//		restrict: 'C',
//		scope: {
//			controller: '='
//		},
//		controller: function($scope, $element, $attrs, $templateCache) {
//			$scope.$on('open_ngpopup', function(e, args) {
//                if (args.id != $attrs.popupid) return;
//
//                var template = $templateCache.get(args.template);
//                $("#curtain").html($compile(template)($scope)).fadeIn(180);
//                
//                $("#curtain .close").bind('click', function() {
//                    $("#curtain").fadeOut(180, function() {
//                    	$(this).empty();
//                    });
//                    $scope.$parent.$broadcast('didclose_ngpopup', {popupid:$attrs.popupid, controller:$scope.controller});
//                });
//            });
//		}	
//	}
//});
'use strict';

/* Filters */

//angular.module('filters', [])
//.filter('picUrlAlt', function($http) {
//  return function(input) {
//	  //return input ? '\u2713' : '\u2718';
////	  return "./resources/img/no-picture.jpg";
//	  return input ? input : "./resources/img/no-picture.jpg";
//  };
//})
//.filter('trailerUrlAlt', function() {
//	  return function(input) {
//	   // return input ? '\u2713' : '\u2718';
//		//  return "./resources/img/no-picture.jpg";
//		  return input ? input : "./resources/img/no-picture.jpg";
//	  };
//	});

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
  
});app.moviesModule = angular.module('moviesController',[]);

app.moviesModule.controller('moviesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.moviesList = function(){
		movieService.getMovies().then(function(movies){
			$scope.movies = movies;
		});
	};
	
	$scope.moviesList();
	
});
app.factory('movieService', function($http) {

	var borrar = "./resources/json/mock.json";
    return {

	    getMovies:  function(){
	        var status = $http.get(borrar).
	            then(function(response) {
	               // return response.data;
	            	var a = [ {
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/1.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		}, 
	            		{
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/2.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		},
	            		{
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/3.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		},
	            		{
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/4.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		},
	            		{
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/5.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		}]
	            	return a;
	            });
	        return status;
	    },
    
    	getMovie: function(idMovie){
    		 var status = $http.get(borrar).
	            then(function(response) {
	               // return response.data;
	                var a = {
	                	      "id": 1,
		                      "title": "Los indestructibles",
		                      "imdbId": "aksdjfk",
		                      "summary": "La primera parte del filme parte con una operaci n de rescate de The Expendables contra piratas somal es que toman como rehenes a la tripulaci n de un barco estadounidense.",
		                      "actors": "Jet Li, Bruce Willis, etc",
		                      "picUrl": "./resources/img/movies/2.jpg",
		                      "trailerUrl": "http://www.youtube.com/embed/30v_FQxGmaA",
		                      "genre": "Accion",
		                      "director": "Sylvester Stallone",
		                      "year": 2010,
		                      "cinemaType": "3D"
	            		};
	                return a;
	            });
	        return status;
    	},
    	
    	getSities: function(){
    		var urlBorrar = "urldespues";
    		var status = $http.get(urlBorrar).
            then(function(response) {
                return response.data;
            });
    		return status;
    	}
    };
});app.moviesModule = angular.module('stepSelectMovieController',[]);

app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, theaterService) {

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

//app.moviesModule.controller('childController',updateTheaterSelected(function($scope){
//	//$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
//	console.log("continua");
//	
//		if($scope.id == 1){
//			$scope.movies = [{"id":1,"name": "Jobs",},{"id":2,"name":"Mi villano Favorito 2"}];
//		} else {
//			$scope.movies = [{"id":3,"name": "Que paso ayer 1"},{"id":4,"name":"Metegol"}];
//		}
//		console.log("cambio de teatro");
//}));
app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.methodsPayment = [{"id":1,"name":"Amex"},
	                         {"id":2,"name":"Cabal"},
	                         {"id":3,"name":"Mastercard"},
	                         {"id":4,"name":"Visa"}];
	
	  $scope.lastStep = function (info) {
	    $scope.shouldBeOpen = true;
	    console.log(info);
	  };

	  $scope.close = function () {
	    $scope.shouldBeOpen = false;
	  };

	  $scope.items = ['item1', 'item2'];

	  $scope.opts = {
	    backdropFade: true,
	    dialogFade:true
	  };
});
app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {

	$scope.quantity = 1;
	var occupiedOther = "OTHER", occupiedMy = "MY", free = "FREE";  
	
	/**
	 * Create areas of theater
	 */
	$rootScope.createSections = function(sections){
		
		$scope.sections = new Array();
		$scope.sizeScreen = 0;
		$scope.occupiedSession = 0;
		$scope.quantity = 1;
		$scope.sitiesSelected = new Array();
		$scope.mapSitiesSelected = {};
		renderTypeSection(sections.left[0], "LEFT");
     	renderTypeSection(sections.center[0], "CENTER");
     	renderTypeSection(sections.right[0], "RIGHT");
 
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
			delete $scope.mapSitiesSelected[sitie.row+"-"+sitie.column+"-"+sitie.nameSection];
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
			$scope.mapSitiesSelected[sitie.row+"-"+sitie.column+"-"+sitie.nameSection] = sitie;
			return;
		}
		
	};

	/**
	 * Render section in the teather
	 */
	function renderTypeSection(section, nameSection ){
		var rowSection = section.row;
		var columnSection = section.column;
		var sitiesTemp = new Array();

		// Map chairs occupied for others
		var mapOcuppied = {};
		if(section.occupied) {
			for(var i=0;i<section.occupied.length;i++){
				var row = section.occupied[i].row;
				var column = section.occupied[i].column;
				mapOcuppied[row+"-"+column] = true;
			}
		}
		
		for(var i=0;i<rowSection;i++){
			for(var j=0;j<columnSection;j++){
				var sitie = new Object();
				sitie.row = i;
				sitie.column = j;
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

	var borrar = "./resources/json/mock.json";
    return {

	    getTheaters:  function(){
	        var status = $http.get(borrar).
	            then(function(response) {
	            	var aa = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"},{"id":3,"name":"Desde Servicio Este"}];
	                return aa;
	            });
	        return status;
	    },
	    
	    getMovies:  function(theaterId){
	    	var status = $http.get(borrar).
	    	then(function(response) {
	    		var aa;
	    		if(theaterId == 1){
	    			aa = [{"id":1,"name": "Jobs","description":"description 1"},{"id":2,"name":"Mi villano Favorito 2","description":"descripcion 2"}];
	    		} else {
	    			aa = [{"id":3,"name": "Que paso ayer 1","description":"descripcion 3"},{"id":4,"name":"Metegol","description":"descripcion 4"}];
	    		}
	    		return aa;
	    	});
	    	return status;
	    },
	    
	    getShowTimeofMovies:  function(theaterId,movieId){
	    	var status = $http.get(borrar).
	    	then(function(response) {
	    			var aa = [
	    			    {
	    			        "movie": {
	    			            "id": 2304,
	    			            "title": "lalala"
	    			        },
	    			        "theater": {
	    			            "id": 30,
	    			            "name": "cinemark palmares"
	    			        },
	    			        "showTime": {
	    			            "schedule": "17:00 primnera",
	    			            "id": 1,
	    			            "left": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 2,
	    			                    "occupied": [{
    			                            "row": 1,
    			                            "column": 1
    			                        }],
	    			                }
	    			            ],
	    			            "center": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 20,
	    			                    "occupied": [
	    			                        {
	    			                            "row": 1,
	    			                            "column": 4
	    			                        },
	    			                        {
	    			                            "row": 1,
	    			                            "column": 5
	    			                        },
	    			                        {
	    			                            "row": 6,
	    			                            "column": 7
	    			                        },
	    			                        {
	    			                            "row": 3,
	    			                            "column": 2
	    			                        },
	    			                        {
	    			                            "row": 5,
	    			                            "column": 4
	    			                        }
	    			                    ]
	    			                }
	    			            ],
	    			            "right": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 3,
	    			                    "occupied": [
	    			                        {
	    			                            "row": 1,
	    			                            "column": 3
	    			                        }
	    			                    ]
	    			                }
	    			            ]
	    			        }
	    			    },
	    			    {
	    			        "movie": {
	    			            "id": 2304,
	    			            "title": "lalala"
	    			        },
	    			        "theater": {
	    			            "id": 30,
	    			            "name": "cinemark palmares"
	    			        },
	    			        "showTime": {
	    			            "schedule": "17:00 segunda",
	    			            "id": 2,
	    			            "left": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 4,
	    			                    "occupied": [{
    			                            "row": 1,
    			                            "column": 1
    			                        }],
	    			                }
	    			            ],
	    			            "center": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 20,
	    			                    "occupied": [
	    			                        {
	    			                            "row": 1,
	    			                            "column": 4
	    			                        }
	    			                    ]
	    			                }
	    			            ],
	    			            "right": [
	    			                {
	    			                    "row": 20,
	    			                    "column": 3,
	    			                    "occupied": [
	    			                        {
	    			                            "row": 1,
	    			                            "column": 2
	    			                        }
	    			                    ]
	    			                }
	    			            ]
	    			        }
	    			    }
	    			];
	    		return aa;
	    	});
	    	return status;
	    }
    };
});app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,theaterService) {
	
	$scope.templates =
        [ { name: 'filtroSesiones', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'tablaSesiones', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
	$scope.updateTheaterSelected = function(){
		$scope.$$childHead.movies = [{"id":1, "name": "Que paso ayer 1", "url":"./resources/img/movies/1.jpg"},
		                 {"id":2, "name":"Metegol", "url": "./resources/img/movies/2.jpg"}];
		console.log("dddddddd");
	};
	
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
