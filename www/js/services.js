'use strict';

angular.module('easyPower.services', ['ngResource'])
  .constant("baseURL", "http://localhost:41472/api/")


  //*********************************************************************************
  .service('projectService', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getProjects = function() {
      return $resource(baseURL + "project/:id");
    }

    var currentProject;

    this.getCurrentProject = function() {
      return currentProject;
    }

    this.setCurrentProject = function(project) {
      currentProject = project;
    }

  }])

  .service('equipmentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getEquipment = function () {

      return {message: "No Equipment"};
      //$resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});

    };


  }])



  .service('summaryFactory', ['$resource', 'baseURL', 'projectService',
    function ($resource, baseURL, projectService) {

      this.getSummary = function() {

        var project = projectService.getCurrentProject();
        //$http.defaults.headers.common['x-dez-name'] = project;
        var res = $resource(baseURL + "summary/:id", { dbName: project });
        return res;
      }

  }])

;
