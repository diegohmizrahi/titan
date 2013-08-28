app.moviesModule = angular.module('detailMovieController',[]);

app.moviesModule.controller('detailMovieCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
//	if($routeParams.idMovie != 0) {
//		movieService.getMovie($routeParams.idMovie).then(function(movie){
//			$scope.movie = movie;
//		});
//	};
	
	if($routeParams.idMovie != 0) {
//		$scope.movie = {"name": "Que paso ayer 1", "description": "esta es una breve descripcion de que se trata la pelicula",
//				"url":"http://imdb-poster.b0.upaiyun.com/000/268/380.jpg!cover?_upt=22d38ae31377737331"};
//	
		$scope.movie = {
		    "id": 3,
		    "name": "Metegol",
		    "description": "All Boys espera al ganador entre los Bodegueros y el equipo del Viaducto, en la semifinal. En la otra llave lucharan por un lugar en la final el sorprendente Estudiantes de Buenos Aires milita en la B Metropolitana y es el unico de los cuatro que no es de Primera y San Lorenzo.",
		    "urlImage": "http://imdb-poster.b0.upaiyun.com/000/268/380.jpg!cover?_upt=22d38ae31377737331",
		    "urlTrailer": "http://www.youtube.com/embed/30v_FQxGmaA",
		    "actors": "Pablo Rago, Miguel Angel Rodriguez, Fabian Gianola, Horacio Fontova",
		    "genre": "Comedy"
		};
	}
});
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
app.factory('movieService', function($http) {

    return {

	    getMovies:  function(){
	        var status = $http.get(app.constantsGlobal.REST_MOVIE).
	            then(function(response) {
	                return response.data;
	            });
	        return status;
	    },
    
    	getMovie: function(idMovie){
    		 var status = $http.get(app.constantsGlobal.REST_MOVIE + '/'+idMovie).
	            then(function(response) {
	                return response.data;
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
app.moviesModule.controller('reservationMovieCtrl', function($rootScope,$routeParams, $scope, $location, movieService) {

	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	
	$scope.updateTheaterSelected = function(theaterSelected){
		if(theaterSelected.id == 1){
			$scope.movies = [{"id":1,"name": "Jobs",},{"id":2,"name":"Mi villano Favorito 2"}];
		} else {
			$scope.movies = [{"id":3,"name": "Que paso ayer 1"},{"id":4,"name":"Metegol"}];
		}
//		movieService.getMovies().then(function(response) {
//			$scope.movies = response;
//		});
//		theaterService.getMovies($scope.filter.theaterSelected).then(function(){
//			
//		});
		//TODO:28-8 hay que hacer la logica cuando venga del backend
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
				"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
				"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
				"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
				"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
				"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";
	    
		$scope.filter.movieSelected = false;
		$scope.filter.timeSelected = false;
	};

	$scope.updateMovieSelected = function(movieSelected){
		if(movieSelected.id == 1 || movieSelected.id == 3){
			$scope.times = [{"name": "miercoles 20:20"},{"name":"miercoles 22"}];
		} else {
			$scope.times = [{"name": "jueves 20:20"},{"name":"sabado 22"}];
		}
		$scope.filter.timeSelected = false;
//		movieService.getTime($scope.filter.theaterSelected,$scope.filter.movieSelected).then(function(){
//			
//		});
		
	};
	
});
app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.formaPago = "contado";
});
app.moviesModule = angular.module('stepSelectSitieController',[]);

app.moviesModule.controller('sitiesCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	//var occupedSession = 0;
	$scope.occupedSession = 0;
	$scope.quantity = 0;
	$scope.sitiesSelected = new Array();
	//TODO: 27-8 la idea seria mejorarlo lo mejor posible
	// evaluar si conviene tener solo un listado de sities, o por separado
	$scope.sitiesList = function(){
//     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 2}],"center": [
//{"row": 20,"column": 4,"occupied": [{"row": 1,"column": 5}]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};
     	var sities ={"movie" : { "id":2304, "title": "lalala" }, "theater": {"id": 30,"name": "cinemark palmares" },"showTime": {"schedule": "17:00","id": 234, "left": [{"row": 20,"column": 4}],"center": [
{"row": 20,"column": 15,"occupied": [{"row": 1,"column": 4}]}],"right": [{"row": 20,"column": 3,"occupied": [{"row": 1,"column": 3}]}]}};

		//movieService.getSities().then(function(sities){
			
			var showTimeLeftRow = sities.showTime.left[0].row;
			var showTimeLeftColumn = sities.showTime.left[0].column;
			
			var sitiesLeftTemp = new Array();
			for(var i=0;i<showTimeLeftRow;i++){
				for(var j=0;j<showTimeLeftColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesLeftTemp.push(sitie);
				};
				$scope.sizeLeft = showTimeLeftColumn * 24 + "px";
				$scope.sizeLeftNro =  showTimeLeftColumn * 24;
			};

			var showTimeCenterRow = sities.showTime.center[0].row;
			var showTimeCenterColumn = sities.showTime.center[0].column;
			
			var sitiesCenterTemp = new Array();
			for(var i=0;i<showTimeCenterRow;i++){
				for(var j=0;j<showTimeCenterColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesCenterTemp.push(sitie);
				};
				$scope.sizeCenter = showTimeCenterColumn * 24 + "px";
				$scope.sizeCenterNro = showTimeCenterColumn * 24;
			};
			
			var showTimeRightRow = sities.showTime.right[0].row;
			var showTimeRightColumn = sities.showTime.right[0].column;
			
			var sitiesRightTemp = new Array();
			for(var i=0;i<showTimeRightRow;i++){
				for(var j=0;j<showTimeRightColumn;j++){
					var sitie = new Object();
					sitie.row = i;
					sitie.column = j;
					sitie.url = "resources/img/seat_gray.gif";
					sitie.occuped = false;
					sitiesRightTemp.push(sitie);
				};
				$scope.sizeRight = showTimeRightColumn * 24 + "px";
			};
			
			$scope.sitiesLeft = sitiesLeftTemp;
			$scope.sitiesCenter = sitiesCenterTemp;
			$scope.sitiesRight = sitiesRightTemp;
		//});
	};
	
	//TODO: falta el tema de que si ya esta ocupado por otro, q no lo desocupe.
	// y que cuante dependiendo de la cantidad de entradas que compro
	// solo comienzo de verificacion, esto debe mejorar!!
	$scope.updateSitie = function(sitie){
		
		if(sitie.occuped){
			$scope.occupedSession -= 1;
			sitie.occuped = false;
			sitie.url = "resources/img/seat_gray.gif";
			return;
		}
		if($scope.quantity <= $scope.occupedSession){
			return;
		}
		if(!sitie.occuped) {
			$scope.occupedSession += 1;
			sitie.occuped = true;
			sitie.url = "resources/img/seat_green.gif";
			$scope.sitiesSelected.push(sitie);
			return;
		}
		
	};
	$scope.sitiesList();
});
app.moviesModule = angular.module('tplReservationMovieController',[]);

app.moviesModule.controller('reservationCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.templates =
        [ { name: 'filtroSesiones', url: 'resources/tpl/gridMovies.html', state: true}
        , { name: 'tablaSesiones', url: 'resources/tpl/stepSelectMovie.html' , state: true} ];
	
});
app.moviesModule = angular.module('tplStepsController',[]);

app.moviesModule.controller('reservationdddCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	var sitiesSelectedA;
	$scope.filter = {};
	//$scope.filter.theaterSelected = false;
	$scope.templates =
        [ { name: 'stepSelectMovie', url: 'resources/tpl/stepSelectMovie.html', state: true}
        , { name: 'stepSelectSitie', url: 'resources/tpl/stepSelectSitie.html' , state: false} 
        , { name: 'stepSelectPayment', url: 'resources/tpl/stepSelectPayment.html' , state: false}];
	
	$scope.theaters = [{"id":1,"name": "Palmares"},{"id":2,"name":"Shopping"}];
	$scope.movies = [{"id":1,"name": "Que paso ayer 1"},{"id":2,"name":"Metegol"}];
	$scope.times = [{"id":1,"name": "miercoles 20:20"},{"id":2,"name":"miercoles 22"}];
	
	if($routeParams.movie && $routeParams.theater && $routeParams.showTime) {
		
		for(var i=0;i<$scope.theaters.length;i++){
			if($scope.theaters[i].id == $routeParams.theater){
				$scope.filter.theaterSelected = $scope.theaters[0];
				break;
			}
		}

		for(var i=0;i<$scope.movies.length;i++){
			if($scope.movies[i].id == $routeParams.movie){
				$scope.filter.movieSelected = $scope.movies[0];
				break;
			}
		}
		
		for(var i=0;i<$scope.times.length;i++){
			if($scope.times[i].id == $routeParams.showTime){
				$scope.filter.timeSelected = $scope.times[0];
				break;
			}
		}
		
		$scope.description = "Amadeo vive en un pueblo pequeno y anonimo. Trabaja en un bar, juega al metegol mejor que nadie " +
		"y esta enamorado de Laura, aunque ella no lo sabe. Su rutina sencilla se desmorona cuando Parpados, un joven del " +
		"pueblo convertido en el mejor futbolista del mundo, vuelve dispuesto a vengarse de la unica derrota que sufrio " +
		"en su vida. Con el metegol, el bar y hasta su alma destruidas, Amadeo descubre algo magico: los jugadores de su " +
		"querido metegol hablan y mucho. Juntos se embarcaran en un viaje lleno de aventuras para salvar a Laura y al " +
		"pueblo y en el camino convertirse en un verdadero equipo. Pero, hay en el futbol lugar para los milagros.";

		$scope.templates[1].state = true;
	};
	
	$scope.fin = function() {
		console.log($rootScope);
		console.log($scope);
		console.log("ddddd");
	};
	
	$scope.fin1 = function(sitiesSelected){
		//console.log(sitiesSelected);
		var test = " Theater: " + $scope.filter.theaterSelected.name + " Movie: " + $scope.filter.movieSelected.name + " Time: " +
		$scope.filter.timeSelected.name + " Sities: " ;
		for(var i=0;i<sitiesSelected.length;i++){
			test = test + "(" + sitiesSelected[i].row + "," + sitiesSelected[i].column + ")";
		}
		alert(test);
		sitiesSelectedA = sitiesSelected;
		$scope.templates[2].state = true;
	};
	
	$scope.end = function(formaPagos){
		console.log(formaPagos);
		alert(formaPagos);
	};
});
