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
});