app.moviesModule = angular.module('stepPaymentConfirmationController',[]);

app.moviesModule.controller('paymentConfirmationCtrl', function($rootScope,$scope) {

	
	/**
	 * Show payment confirmation
	 */
	$rootScope.showPaymentConfirmation = function(information){
		$scope.info = information;
	};
	
});
