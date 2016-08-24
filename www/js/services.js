'use strict';

angular.module('easyPower.services', ['ngResource'])
  .constant("baseURL", "http://localhost:41472/api/")


  .factory('projectFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "project/:id");

  }])
  .service('summaryFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getSummary = function () {

      return { message: "No Summary" };
      // $resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});

    };


  }])

  .service('equipmentFactory', ['$resource', 'baseURL', function ($resource, baseURL) {

    this.getEquipment = function () {

      return {message: "No Equipment"};
      //$resource(baseURL + "dishes/:id", null, {'update': {method: 'PUT'}});

    };


  }])



  .factory('feedbackFactory', ['$resource', 'baseURL', function ($resource, baseURL) {


    return $resource(baseURL + "feedback/:id");

  }])

;
