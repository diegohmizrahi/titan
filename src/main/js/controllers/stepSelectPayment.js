app.moviesModule = angular.module('stepSelectPaymentController',[]);

app.moviesModule.controller('paymentCtrl', function($rootScope,$routeParams, $scope, $location,movieService) {
	
	$scope.methodsPayment = [{"id":1,"name":"Amex"},
	                         {"id":2,"name":"Cabal"},
	                         {"id":3,"name":"Mastercard"},
	                         {"id":4,"name":"Visa"}];
	
	  $scope.lastStep = function (info) {
	    $scope.shouldBeOpen = true;
	    console.log(info);
	  };

	  $scope.close = function () {
	    $scope.shouldBeOpen = false;
	  };

	  $scope.items = ['item1', 'item2'];

	  $scope.opts = {
	    backdropFade: true,
	    dialogFade:true
	  };
});
