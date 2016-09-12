
angular.module('easyPower', ['ionic', 'ngCordova', 'easyPower.controllers', 'easyPower.services'])

  .run(function ($ionicPlatform, $rootScope, $ionicLoading, $cordovaSplashscreen, $timeout) {
    $ionicPlatform.ready(function () {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

      }
      if (window.StatusBar) {
        // org.apache.cordova.statusbar required
        StatusBar.styleDefault();
      }
      $timeout(function () {
        if($cordovaSplashscreen) $cordovaSplashscreen.hide();
      }, 3000);
    });

    $rootScope.$on('loading:show', function () {
      $ionicLoading.show({template: '<ion-spinner></ion-spinner> Loading ...'})
    });
    $rootScope.$on('loading:hide', function () {
      $ionicLoading.hide();
    });
    $rootScope.$on('$stateChangeStart', function () {
      console.log('Loading ...');
      $rootScope.$broadcast('loading:show');
    });
    $rootScope.$on('$stateChangeSuccess', function () {
      console.log('done');
      $rootScope.$broadcast('loading:hide');
    });
  })


  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/sidebar.html',
        controller: 'AppCtrl'
      })

      .state('app.home', {
        url: '/home',
        views: {
          'mainContent': {
            templateUrl: 'templates/home.html',
            controller: 'IndexController'
          }
        }
      })

      .state('app.aboutus', {
        url: '/aboutus',
        views: {
          'mainContent': {
            templateUrl: 'templates/aboutus.html'
          }
        }
      })

      .state('app.summary', {
        url: '/summary',
        params: {
          projectName: null,
        },
        views: {
          'mainContent': {
            templateUrl: 'templates/summary.html',
            controller: 'SummaryController',
          }
        }
      })

      .state('app.equipmentList', {
        url: '/equipmentList',
        params: {
          projectName: null,
          eqpInfo: null,
        },
        views: {
          'mainContent': {
            templateUrl: 'templates/equipmentList.html',
            controller: 'EquipmentListController'
          }
        }
      })

      .state('app.equipmentDetail', {
        url: '/equipmentDetail',
        params: {
          projectName: null,
          eqpInfo: null,
          itemId: null,
        },
        views: {
          'mainContent': {
            templateUrl: 'templates/equipmentDetail.html',
            controller: 'EquipmentDetailController'
          }
        }
      })

      .state('app.equipmentEdit', {
        url: '/equipmentEdit',
        params: {
          projectName: null,
          eqpInfo: null,
          itemId: null,
        },
        views: {
          'mainContent': {
            templateUrl: 'templates/equipmentEdit.html',
            controller: 'EquipmentDetailController'
          }
        }
      })
    ;


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

  });
