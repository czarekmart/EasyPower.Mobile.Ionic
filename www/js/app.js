
angular.module('easyPower', ['ionic', 'easyPower.controllers', 'easyPower.services'])

  .run(function ($ionicPlatform) {
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

    ;


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');

  });
