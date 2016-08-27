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
  .service('equipment', ['FieldEnums', function (FieldEnums) {

    var currentItem;

    this.setCurrentItem = function(item) {
      currentItem = item;
    };
    this.getCurrentItem = function() {
      return currentItem;
    }

    this.getProperties = function(url, detail) {

      var statusProps = [
        {name: "status", display: "Status", mapValue: function (eqp) {
          return FieldEnums.getStringValue(FieldEnums.eqpStatus, eqp.status);
        }},
      ];
      var summaryProps;
      var detailProps;

      if(url == "bus") {
        summaryProps= [
          {name: "baseKV", display: "Base KV"},
          {name: "busType", display: "Type", mapValue : function(eqp) {
            return FieldEnums.getStringValue(FieldEnums.busTypes, eqp.busType);
          }},
        ];

        if(detail) {
          detailProps = [
            {name: "zone", display: "Zone"},
            {name: "area", display: "Area"},
            {name: "rating", display: "Rating"},

          ];
        }

      }
      else if(url == "cable") {

        summaryProps = [
          {name: "con1_name", display: "Connected From"},
          {name: "con2_name", display: "Connected To"},
          {name: "size", display: "Size"},
        ];
        if(detail) {
          detailProps = [
            {name: "unit", display: "Unit", mapValue: function (eqp) {
              return FieldEnums.getStringValue(FieldEnums.eqpUnits, eqp.unit);
            }},
            {name: "type", display: "Type"},
            {name: "length", display: "Length"},
            {name: "material", display: "Material", mapValue: function (eqp) {
                return FieldEnums.getStringValue(FieldEnums.cableMaterial, eqp.material);
              }
            },
            {name: "noph", display: "No/Phase"},
            {name: "temp", display: "Temperature"},
            {name: "insulation", display: "Insulation"},
            {name: "rating", display: "Rating"},
            {name: "raceway_type", display: "Raceway Type", mapValue: function(eqp){
              return FieldEnums.getStringValue(FieldEnums.racewayType, eqp.raceway_type);
            }},
            {name: "raceway_material", display: "Raceway Material", mapValue: function(eqp){
              return FieldEnums.getStringValue(FieldEnums.racewayMaterial, eqp.raceway_material);
            }},
            {name: "raceway_config", display: "Raceway Config"},
            {name: "ground_size", display: "Ground Size"},
            {name: "ground_num", display: "Ground Num"},
            {name: "r1", display: "R1"},
            {name: "x1", display: "X1"},
            {name: "r0", display: "R0"},
            {name: "x0", display: "X0"},
            {name: "xc", display: "XC"},
            {name: "xc0", display: "XC0"},

           ];
        }
      }
      else if(url == "load") {

        summaryProps = [
          {name: "con1_name", display: "Connected To"},
          {name: "class", display: "Class", mapValue : function(eqp){
            return FieldEnums.getStringValue(FieldEnums.loadClass, eqp["class"]);
          }},
          {name: "mw", display: "MW"},
          {name: "mvar", display: "MVAR"},
        ];

        if(detail) {
          detailProps = [
            {name: "load_factor", display: "MVA Scaling%"},
            {name: "load_amps", display: "Amps"},
            {name: "load_kva", display: "kVA"},
            {name: "mw_I", display: "I MW"},
            {name: "mvar_I", display: "I MVAR"},
            {name: "load_factor_I", display: "I Scaling%"},
            {name: "mw_Z", display: "Z MW"},
            {name: "mvar_Z", display: "Z MVAR"},
            {name: "load_factor_Z", display: "Z Scaling%"},
           ];
        }
      }
      else if(url == "motor") {

        summaryProps = [
          {name: "con1_name", display: "Connected To"},
          {name: "kv", display: "kV"},
          {name: "hp", display: "HP"},
          {name: "type", display: "Load Type", mapValue: function (eqp) {
            return FieldEnums.getStringValue(FieldEnums.motorType, eqp["type"]);
          }},
        ];

        if(detail) {
          detailProps = [
            {name: "pfactor", display: "Power Factor"},
            {name: "efficiency", display: "Efficiency"},
            {name: "x_r_ratio", display: "X/R Ratio"},
             {name: "motor_kva", display: "Motor KVA"},
            {name: "rpm", display: "RPM"},
            {name: "fla", display: "FLA"},
            {name: "group", display: "Group", mapValue: function (eqp) {
              return FieldEnums.getStringValue(FieldEnums.motorGroup, eqp.group);
            }},
            {name: "class", display: "Class", mapValue: function (eqp) {
              return FieldEnums.getStringValue(FieldEnums.loadClass, eqp["class"]);
            }},
            {name: "kvahp", display: "kVA/Hp"},
            {name: "sc_ansi_code", display: "ANSI Code", mapValue: function (eqp) {
              return FieldEnums.getStringValue(FieldEnums.ansiCode, eqp.sc_ansi_code);
            }},
            {name: "sc_load_factor", display: "Connected"},
            {name: "xppdv", display: 'X"dv or Xlr or R(Ohms)'},
            {name: "dmd_factor", display: "Demand Factor"},
            {name: "pf_load_factor", display: "Load Scaling"},
            {name: "harm_r_coef", display: "Hrm RC Value"},
            {name: "harm_factor", display: "Hrm RC Factor"},
            {name: "motor_factor", display: "Motor Factor"},
            {name: "tcc_starter_type", display: "TCC Starter", mapValue: function(eqp){
              return FieldEnums.getStringValue(FieldEnums.tccStarterType, eqp.tcc_starter_type);
            }},
            {name: "starting_method", display: "TCC Starter", mapValue: function (eqp) {
              return FieldEnums.getStringValue(FieldEnums.motorStartingMethod, eqp.starting_method);
            }},
            {name: "service_factor", display: "Service Factor"},

          ];
        }
      }
      var props;
      if(detailProps) {
        props = statusProps.concat(summaryProps, detailProps);
      }
      else {
        props = statusProps.concat(summaryProps);
      }
      return props;
    }

  }])


;
