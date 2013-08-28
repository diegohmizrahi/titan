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
