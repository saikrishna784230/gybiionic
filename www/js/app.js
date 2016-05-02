angular.module('gybi', ['ionic', 'gybi.controllers', 'gybi.services', 'gybi.factories','gybi.filters','gybi.config','gybi.directives'])

.run(function($ionicPlatform,$rootScope,$http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
	
	
	$rootScope.api = WORDPRESS_API_URL;
	
	$rootScope.getPage=function(pageid){
	// Load posts from the WordPress API
	
	$http.jsonp($rootScope.api+'posts/'+pageid+'/_jsonp=pageback&callback=JSON_CALLBACK');
	
	window.pageback = function(data) {
  		$scope.page = data;
	};

	
	$http({
		method: 'GET',
		url: $rootScope.api+'posts/'+pageid+'/_jsonp=pageback&callback=JSON_CALLBACK',
	}).
	success( function( data, status, headers, config ) {
		console.log( $scope.api );
		console.log( data );
		$scope.posts = data;
	}).
	error(function(data, status, headers, config) {});
	
	}
	
	
	//$rootScope.navTitle='<img  src="img/logo.png" />';
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('signup', {
    url: "/signup",
    templateUrl: "templates/signup.html",
    controller: 'SignupCtrl'
  })

  .state('forgot-password', {
    url: "/forgot-password",
    templateUrl: "templates/forgot-password.html",
    controller: 'ForgotPasswordCtrl'
  })
  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: "/home",
    views: {
      'menuContent': {
        templateUrl: "templates/home.html",
		controller: 'HomeCtrl'
      }
    }
  })
  .state('app.login', {
    url: "/login",
    views: {
      'menuContent': {
        templateUrl: "templates/login.html",
    	controller: 'LoginCtrl'
      }
	} 
  })
  .state('app.logout', {
    url: "/logout",
	views: {
      'menuContent': {
		templateUrl: "",
		controller: 'LogOutCtrl'
	  }
	}
  })
  .state('app.userinfo', {
    url: "/userinfo",
    views: {
      'menuContent': {
        templateUrl: "templates/userinfo.html",
    	controller: 'userInfoCtrl'
      }
	} 
  })
  .state('app.entrepreneurs', {
    url: "/entrepreneurs",
    views: {
      'menuContent': {
        templateUrl: "templates/entrepreneurs.html",
        controller: 'EntrepreneurslistCtrl'
      }
    }
  })
  .state('app.singleentrepreneur', {
    url: "/entrepreneur/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/entrepreneurs_single.html",
        controller: 'EntrepreneurCtrl'
      }
    }
  })
  .state('app.entrepreneurdashboard', {
    url: "/entrepreneurdashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/entrepreneur_dashboard.html",
        controller: 'SignupCtrl'
      }
    }
  })
  .state('app.inverterdashboard', {
    url: "/inverterdashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/invester_dashboard.html",
        controller: 'SignupCtrl'
      }
    }
  })
  .state('app.supporterdashboard', {
    url: "/supporterdashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/supporter_dashboard.html",
        controller: 'SignupCtrl'
      }
    }
  })
  .state('app.organizationdashboard', {
    url: "/organizationdashboard",
    views: {
      'menuContent': {
        templateUrl: "templates/organization_dashboard.html",
        controller: 'SignupCtrl'
      }
    }
  })
  .state('app.entrepreneurdashboardsummary', {
    url: "/entrepreneurdashboardsummary",
    views: {
      'menuContent': {
        templateUrl: "templates/entrepreneur_dashboard-summary.html",
        controller: 'SignupCtrl'
      }
    }
  })
    .state('app.dashboardaccount', {
    url: "/dashboardaccount",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard-account.html",
        controller: 'SignupCtrl'
      }
    }
  })
 .state('app.dashboardinvite', {
    url: "/dashboardinvite",
    views: {
      'menuContent': {
        templateUrl: "templates/dashboard-invite.html",
        controller: 'SignupCtrl'
      }
    }
  })
  .state('app.bussinessplan', {
    url: "/bussinessplan/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/bussinessplan_plan_summary.html",
        controller: 'EntrepreneurCtrl'
      }
    }
  })
   .state('app.investors', {
    url: "/investors",
    views: {
      'menuContent': {
        templateUrl: "templates/investors.html",
        controller: 'InvestorslistCtrl'
      }
    }
  })
  .state('app.singleinvestor', {
    url: "/investor/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/investor_single.html",
        controller: 'EntrepreneurCtrl'
      }
    }
  })
    .state('app.supporters', {
    url: "/supporters",
    views: {
      'menuContent': {
        templateUrl: "templates/supporters.html",
        controller: 'SupporterslistCtrl'
      }
    }
  })
  .state('app.singlesupporter', {
    url: "/supporter/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/supporter_single.html",
        controller: 'EntrepreneurCtrl'
      }
    }
  })
  .state('app.organization', {
    url: "/organizations",
    views: {
      'menuContent': {
        templateUrl: "templates/organizations.html",
        controller: 'OrgnizationslistCtrl'
      }
    }
  })
  .state('app.singleorganization', {
    url: "/organization/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/organization_single.html",
        controller: 'EntrepreneurCtrl'
      }
    }
  })
  .state('app.contactus', {
    url: "/contactus",
    views: {
      'menuContent': {
        templateUrl: "templates/contactus.html",
        controller: 'ContactUsCtrl'
      }
    }
  })
 .state('app.post', {
    url: "/post/:postId",
    views: {
      'menuContent': {
        templateUrl: "templates/wordpress_post.html",
        controller: 'WPCommonCtrl'
      }
    }
  })
  .state('app.browse', {
    url: "/browse",
    views: {
      'menuContent': {
        templateUrl: "templates/browse.html"
      }
    }
  })
    .state('app.playlists', {
      url: "/playlists",
      views: {
        'menuContent': {
          templateUrl: "templates/playlists.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })
//OTHERS
  .state('app.settings', {
    url: "/settings",
    views: {
      'menuContent': {
        templateUrl: "settings.html",
        controller: 'SettingsCtrl'
      }
    }
  })

  .state('app.forms', {
    url: "/forms",
    views: {
      'menuContent': {
        templateUrl: "forms.html",
        controller: 'FormsCtrl'
      }
    }
  })

  .state('app.profile', {
    url: "/profile",
    views: {
      'menuContent': {
        templateUrl: "profile.html",
        controller: 'ProfileCtrl'
      }
    }
  })

  .state('app.bookmarks', {
    url: "/bookmarks",
    views: {
      'menuContent': {
        templateUrl: "bookmarks.html",
        controller: 'BookMarksCtrl'
      }
    }
  })
  .state('app.single', {
    url: "/playlists/:playlistId",
    views: {
      'menuContent': {
        templateUrl: "templates/playlist.html",
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
