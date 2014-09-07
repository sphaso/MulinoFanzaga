app.controller('galleryController', function($scope, $http) {
	$scope.bigImage = '';

	var imagePromise = $http({ url: './gallery/images.json', cache: true, method: 'GET' });
	imagePromise.success(function(data) {
		$scope.images = data.images;
	});

	$scope.showOff = function(index){
		$scope.bigImage = $scope.images[index];
	};

	$scope.swipeImg = function(sum) {
		var index = $scope.images.indexOf($scope.bigImage);
		if(index == 0 && sum == -1){
			index = $scope.images.length;
		}
		else if(index == ($scope.images.length - 1) && sum == 1){
			index = -1;
		}

		$scope.bigImage = $scope.images[index + sum];
	};

	window.onhashchange = function() {
		window.history.forward();
	    $scope.hideDialog();
 
	    $('.modal-backdrop').remove();
	};
});
