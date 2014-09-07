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
			templateUrl: 'gallery/gallery.html',
			controller: 'galleryController'
		});
}]);

app.controller('parentController', ['$scope', '$state', function($scope, $state) {
	var stateList = [
		"news",
		"obiettivi",
		"mulino",
		"gallery"
	];

	$scope.swipeTo = function(direction) {
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
			$state.go("obiettivi");
		}
	};

	$scope.hideDialog = function() {
		$('#galleryModal').modal('hide');
	};
}]);
