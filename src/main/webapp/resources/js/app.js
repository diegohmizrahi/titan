var app = angular.module('cinemarkApp',['utilsDirective','stepSelectPaymentController','tplStepsController','stepSelectMovieController','tplReservationMovieController','moviesController','detailMovieController','stepSelectSitieController'], function ($routeProvider, $locationProvider, $httpProvider) {

    var interceptor = ['$rootScope', '$q', function (scope, $q) {

        function success(response) {
        	$("#error").html("");
            return response;
        }

        function error(response) {
            var status = response.status;

            if (status == 401) {
                window.location = "./index.html";
                return;
            }
            if (status == 400) {
            	//window.location = "./index.html";
            	$("#error").html(response.data);
            //	return;
            }
            if (status == 404) {
            	//$("#error").html("SERVICIO NO DISPONIBLE");
            	//$("#dialog").dialog();
            	alert("SERVICIO NO DISPONIBLE");
            }
            // otherwise
            return $q.reject(response);

        }

        return function (promise) {
            return promise.then(success, error);
        };

    }];
    
    $httpProvider.responseInterceptors.push(interceptor);
});

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider,$locationProvider) {
   //$locationProvider.html5Mode(true);
    $routeProvider
	    .when('/index', 
	   	{
	    	controller: 'reservationCtrl',
	    	templateUrl: './resources/tpl/tplReservationMovie.html'
	    })
        .when('/steps',
        {
            controller: 'stepsCtrl',
            templateUrl: './resources/tpl/tplSteps.html'
        })
        .when('/movies/:idMovie',
        		{
        	controller: 'detailMovieCtrl',
        	templateUrl: './resources/tpl/detailMovie.html'
       	})
        .otherwise({ redirectTo: '/index' });
});