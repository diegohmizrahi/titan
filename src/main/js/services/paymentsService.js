app.factory('paymentsService', function($http) {

	$http.defaults.useXDomain = true;
    return {

    	/**
    	 * Confirm cinema ticket
    	 */
    	paymentReservation:  function(info){

    		var stringSities = "";
    		for (var key in info.sitiesSelected) {
    			stringSities = stringSities + "&seat="+info.sitiesSelected[key].row+","+
    							info.sitiesSelected[key].column + "," + info.sitiesSelected[key].nameSection;
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
