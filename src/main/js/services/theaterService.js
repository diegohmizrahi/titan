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
});