var app = angular.module('mulinoApp', ['ui.router', 'ngTouch']);
app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.when('', 'news');

	$stateProvider
		.state('news', {
			url: '/news',
			templateUrl: 'news/news.html'
		})
		.state('obiettivi', {
			url: '/obiettivi',
			templateUrl: 'obiettivi/obiettivi.html'
		})
		.state('mulino', {
			url: '/mulino',
			templateUrl: 'mulino/mulino.html'
		})
		.state('gallery', {
			url: '/gallery',
			templateUrl: 'gallery/gallery.html'
		})
		.state('contatti', {
			url: '/contatti',
			templateUrl: 'contatti/contatti.html'
		});
}]);

app.factory('imagesFactory', ['$http', function($http) {
	var dal = {
				getImgs: function(folder){
					return $http({ url: './' + folder + '/images.json', cache: true, method: 'GET' });
				}
			};
	return dal;
}]);

app.directive('gallery', function(){
	return {
		restrict: 'E',
		templateUrl: 'galleryTemplate.html',
		scope: {folder: "=path"},
		controller: function($scope, imagesFactory) {
			$scope.bigImage = '';
			$scope.images = [];
			imagesFactory.getImgs($scope.folder.folder).success(function(data){
						$scope.images = data.images;
					});

			$scope.showOff = function(index){
				$scope.bigImage = $scope.images[index];
				console.log($scope.bigImage);
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
				$('.modal-backdrop').remove();
				window.history.forward();
			    $scope.hideDialog();
			};
		}
	}
});


app.controller('parentController', ['$scope', '$state', function($scope, $state) {
	var stateList = [
		"news",
		"obiettivi",
		"mulino",
		"gallery",
		"contatti"
	];

	$scope.swipeTo = function(direction) {
		if($("#galleryModal").data('bs.modal').isShown){
			return;
		}

		var curState = $state.$current.self.name;
		var parentState = curState.split(".")[0];
		var parentStateIndex = stateList.indexOf(parentState);

		if (direction === 1) {
			if (parentStateIndex + 1 >= stateList.length) {
				$state.go(stateList[0]);
			} else {
				$state.go(stateList[parentStateIndex + 1]);
			}
		} else if (direction === -1) {
			if (parentStateIndex - 1 < 0) {
				$state.go(stateList[stateList.length - 1]);
			} else {
				$state.go(stateList[parentStateIndex - 1]);
			}
		} else {
			$state.go("news");
		}
	};

	$scope.hideDialog = function() {
		$('#galleryModal').modal('hide');
	};
}]);
