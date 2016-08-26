'use strict';

angular.module('easyPower.services', ['ngResource'])
  .constant("baseURL", "http://localhost:41472/api/")


  //*********************************************************************************
  .service('projectService', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getProjects = function() {
      return $resource(baseURL + "project/:id");
    }

    var currentProject;
    var currentEquipmentInfo;

    this.getCurrentProject = function() {
      return currentProject;
    }

    this.setCurrentProject = function(project) {
      currentProject = project;
    }

    this.getProjectSummary = function () {

      var res = $resource(baseURL + "summary/:id", {dbName: currentProject});
      return res;
    }

    this.setCurrentEquipmentInfo = function(eqpInfo) {
      currentEquipmentInfo = eqpInfo;
    }

    this.getCurrentEquipmentInfo = function() {
      return currentEquipmentInfo;
    }

    this.getEquipmentList = function() {
      return $resource(baseURL + currentEquipmentInfo.url + "/:id", {dbName: currentProject});
    }

  }])


  //*********************************************************************************
  .service('equipment', [function () {

    this.getProperties = function(url) {
      if(url == "bus") {
        return [
          {name: "baseKV", display: "Base KV"},
          {name: "zone", display: "Zone"},
          {name: "area", display: "Area"},
          {name: "busType", display: "Type"},
          {name: "rating", display: "Rating"},
        ];
      }
      else if(url == "cable") {

        return [];
      }
      else if(url == "load") {

        return [];
      }
      else if(url == "motor") {
        return [];
      }
      else {
        return [];
      }
    }

  }])


;
