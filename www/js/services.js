'use strict';

angular.module('easyPower.services', ['ngResource'])
  .constant("baseURL", "http://localhost:41472/api/")


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

    this.waitFor = function(promise, onSuccess, onError) {

      $ionicLoading.show({template: '<ion-spinner icon="ios"></ion-spinner>', delay:500});
      promise.$promise.then(function(response) {
        $ionicLoading.hide();
        if(onSuccess) {
          onSuccess(response);
        }

      }, function(response) {
        $ionicLoading.hide();
        if(onError) {
          onError(response);
        }

      });

    }

  }])



;
