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
});