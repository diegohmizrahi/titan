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
});