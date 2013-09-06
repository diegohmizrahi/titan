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
