angular.module('gybi.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout,$rootScope) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('HomeCtrl', function($scope, $http, CustomeService, PostService, $ionicLoading) {
	$ionicLoading.show({
		template: 'Loading GYBI'
	});
	CustomeService.buildYourCampaign().then(function(data){
		$scope.campaigns = data;
		$ionicLoading.hide();
	});
	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})

.controller('SendMailCtrl', function($scope) {
	$scope.sendMail = function(){
		cordova.plugins.email.isAvailable(
			function (isAvailable) {
				// alert('Service is not available') unless isAvailable;
				cordova.plugins.email.open({
					to:      'envato@startapplabs.com',
					cc:      'hello@startapplabs.com',
					// bcc:     ['john@doe.com', 'jane@doe.com'],
					subject: 'Greetings',
					body:    'How are you? Nice greetings from IonFullApp'
				});
			}
		);
	};
})

.controller('MapsCtrl', function($scope, $ionicLoading) {

	$scope.info_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.center_position = {
		lat: 43.07493,
		lng: -89.381388
	};

	$scope.my_location = "";

	$scope.$on('mapInitialized', function(event, map) {
		$scope.map = map;
	});

	$scope.centerOnMe= function(){
		$scope.positions = [];

		$ionicLoading.show({
			template: 'Loading...'
		});

		// with this function you can get the user’s current position
		// we use this plugin: https://github.com/apache/cordova-plugin-geolocation/
		navigator.geolocation.getCurrentPosition(function(position) {
			var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			$scope.current_position = {lat: pos.k,lng: pos.D};
			$scope.my_location = pos.k+", "+pos.D;
			$scope.map.setCenter(pos);
			$ionicLoading.hide();
		});
	};
})
.controller('LoginCtrl', function($scope, $state, $templateCache, $q, $rootScope) {
	console.log('hi');
	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.goToForgotPassword = function(){
		$state.go('forgot-password');
	};

	$scope.doLogIn = function(){
		$state.go('app.feeds-categories');
	};

	$scope.user = {};

	$scope.user.email = "john@doe.com";
	$scope.user.pin = "12345";

	// We need this for the form validation
	$scope.selected_tab = "";

	$scope.$on('my-tabs-changed', function (event, data) {
		$scope.selected_tab = data.title;
	});

})

.controller('SignupCtrl', function($scope, $state) {
	$scope.user = {};

	$scope.user.email = "john@doe.com";

	$scope.doSignUp = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};
})

.controller('ForgotPasswordCtrl', function($scope, $state) {
	$scope.recoverPassword = function(){
		$state.go('app.feeds-categories');
	};

	$scope.goToLogIn = function(){
		$state.go('login');
	};

	$scope.goToSignUp = function(){
		$state.go('signup');
	};

	$scope.user = {};
})

// WORDPRESS Controller
.controller('WPCommonCtrl', function($scope, $http, $stateParams, PostService, $ionicLoading) {
	$ionicLoading.show({
		template: 'Loading post...'
	});
	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data;
		$ionicLoading.hide();
	});
	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})
// WORDPRESS Controller
.controller('ContactUsCtrl', function($scope, $http, $stateParams, PostService, $ionicLoading) {
	
})
.controller('EntrepreneurslistCtrl',function($scope, $http, $stateParams, PostService, $ionicLoading) {
	
	$scope.page = 1;
	$scope.posts = [];
	var loading = false;
	$scope.loadMore = function() {

		if(loading == false)
		{
			loading = true;
			$ionicLoading.show({ template: 'Loading Entrepreneurs...' });
			PostService.getEntrepreneurs($scope.page).then(function(data){
				
			if(data.length > 0)
			{
				$scope.page = parseInt($scope.page) + 1;
				angular.forEach(data, function(value, key) {
					$scope.posts.push(value);
					$ionicLoading.hide();
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
				loading = false;		
			}else{
				$ionicLoading.hide();
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
  	
	};
	$scope.$on('$stateChangeSuccess', function() {
    	$scope.loadMore();
  	});
	
	
})
.controller('EntrepreneurCtrl', function($scope, $http, $stateParams, PostService, $ionicLoading) {
	$ionicLoading.show({
		template: 'Loading Entrepreneur...'
	});
	var postId = $stateParams.postId;
	PostService.getPost(postId)
	.then(function(data){
		$scope.post = data;
		$ionicLoading.hide();
	});
	$scope.sharePost = function(link){
		window.plugins.socialsharing.share('Check this post here: ', null, null, link);
	};
})
.controller('InvestorslistCtrl',function($scope, $http, $stateParams, PostService, $ionicLoading) {
	$ionicLoading.show({
		template: 'Loading Investors...'
	});
	PostService.getInvestors()
	.then(function(data){
		$scope.posts = data;
		$ionicLoading.hide();
	});
	
}).controller('SupporterslistCtrl',function($scope, $http, $stateParams, PostService, $ionicLoading) {
		
	$scope.page = 1;
	$scope.posts = [];
	var loading = false;
	$scope.loadMore = function() {

		if(loading == false)
		{
			loading = true;
			$ionicLoading.show({ template: 'Loading Supporters...' });
			PostService.getSupporters($scope.page).then(function(data){
				
			if(data.length > 0)
			{
				$scope.page = parseInt($scope.page) + 1;
				angular.forEach(data, function(value, key) {
					$scope.posts.push(value);
					$ionicLoading.hide();
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
				loading = false;		
			}else{
				$ionicLoading.hide();
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
  	
	};
	$scope.$on('$stateChangeSuccess', function() {
    	$scope.loadMore();
  	});
	
}).controller('OrgnizationslistCtrl',function($scope, $http, $stateParams, PostService, $ionicLoading) {
	
	$scope.page = 1;
	$scope.posts = [];
	var loading = false;
	$scope.loadMore = function() {

		if(loading == false)
		{
			loading = true;
			$ionicLoading.show({ template: 'Loading Orgnizations...' });
			PostService.getOrganizations($scope.page).then(function(data){
				
			if(data.length > 0)
			{
				$scope.page = parseInt($scope.page) + 1;
				angular.forEach(data, function(value, key) {
					$scope.posts.push(value);
					$ionicLoading.hide();
					$scope.$broadcast('scroll.infiniteScrollComplete');
				});
				loading = false;		
			}else{
				$ionicLoading.hide();
				$scope.$broadcast('scroll.infiniteScrollComplete');
			}
			});
		}else{
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}
  	
	};
	$scope.$on('$stateChangeSuccess', function() {
    	$scope.loadMore();
  	});
	
	
});
