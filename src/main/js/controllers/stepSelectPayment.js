app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,paymentsService) {
	
	$scope.methodsPayment = [{"id":1,"name":"Amex"},
	                         {"id":2,"name":"Cabal"},
	                         {"id":3,"name":"Mastercard"},
	                         {"id":4,"name":"Visa"}];
	
	
	/**
	 * After select method payment then call service paymentReservation
	 */
	$scope.lastStep = function () {
		paymentsService.paymentReservation($scope.filter).then(function(confirmation){
			
			$scope.filter.confirmation = new Object();
			$scope.filter.confirmationCode = confirmation.code;
			if($scope.$parent.lastStep){
				$scope.$parent.lastStep($scope.filter);
			}
		});
	};
});
