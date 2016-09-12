'use strict';

angular.module('easyPower.services', ['ngResource'])
  .constant("baseURL", "http://easypowermockapi.azurewebsites.net/api/")

  // http://easypowermockapi.azurewebsites.net/api/
  // http://localhost:41472/api/

  .service('Utils', ['$ionicLoading', function($ionicLoading){

    //****************************************************
    this.startWait = function() {
      $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading ...',
        showDelay: 100,
        animation: 'fade-in',
        showBackdrop: true
      });
    }

    this.stopWait = function() {
      $ionicLoading.hide();
    }

    //****************************************************
    this.waitFor = function (promise, onSuccess, onError) {

      this.startWait();
      promise.$promise.then(function (response) {
        if (onSuccess) {
          onSuccess(response);
        }
        this.stopWait();

      }, function (response) {
        this.stopWait();
        if (onError) {
          onError(response);
        }

      });

    }

  }])


  //*********************************************************************************
  .service('projectService', ['$resource', 'baseURL', '$ionicLoading', function ($resource, baseURL, $ionicLoading) {

    this.getProjects = function() {

      return $resource(baseURL + "project/:id");
    }

    this.getProjectSummary = function (projectName) {

      return $resource(baseURL + "summary/:id", {dbName: projectName});
    }

    this.getEquipmentItems = function(projectName, eqpInfo) {

      return $resource(baseURL + eqpInfo.url + "/:id", {dbName: projectName});
    }

  }])

  //*********************************************************************************
  .factory('$localStorage', ['$window', function ($window) {
    return {
      store: function (key, value) {
        $window.localStorage[key] = value;
      },
      get: function (key, defaultValue) {
        return $window.localStorage[key] || defaultValue;
      },
      storeObject: function (key, value) {
        $window.localStorage[key] = JSON.stringify(value);
      },
      getObject: function (key, defaultValue) {
        return JSON.parse($window.localStorage[key] || defaultValue);
      }
    }
  }])

;
