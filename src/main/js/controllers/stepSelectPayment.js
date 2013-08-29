app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.formaPago = "contado";
	
	$scope.methodsPayment = [{"id":1,"name":"contado"},{"id":2,"name":"tarjeta"}];
	
	$scope.updateMethodPayment = function(methodPaymentSelected){
		
	};
});
