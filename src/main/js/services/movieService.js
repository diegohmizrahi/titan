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
});