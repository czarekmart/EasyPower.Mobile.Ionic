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


  //*********************************************************************************
  .service('equipment', ['FieldEnums', function (FieldEnums) {

    this.getProperties = function(url, detail) {

      var statusProps = [
        {name: "status", display: "Status", options: FieldEnums.eqpStatus},
      ];
      var summaryProps;
      var detailProps;

      if(url == "bus") {
        summaryProps= [
          {name: "baseKV", display: "Base KV"},
          {name: "busType", display: "Type", options : FieldEnums.busTypes},
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
            {name: "unit", display: "Unit", options: FieldEnums.eqpUnits},
            {name: "type", display: "Type"},
            {name: "length", display: "Length"},
            {name: "material", display: "Material", options: FieldEnums.cableMaterial},
            {name: "noph", display: "No/Phase"},
            {name: "temp", display: "Temperature"},
            {name: "insulation", display: "Insulation"},
            {name: "rating", display: "Rating"},
            {name: "raceway_type", display: "Raceway Type", options: FieldEnums.racewayType},
            {name: "raceway_material", display: "Raceway Material", options: FieldEnums.racewayMaterial},
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
          {name: "class", display: "Class", options : FieldEnums.loadClass},
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
          {name: "type", display: "Load Type", options: FieldEnums.motorType},
        ];

        if(detail) {
          detailProps = [
            {name: "pfactor", display: "Power Factor"},
            {name: "efficiency", display: "Efficiency"},
            {name: "x_r_ratio", display: "X/R Ratio"},
             {name: "motor_kva", display: "Motor KVA"},
            {name: "rpm", display: "RPM"},
            {name: "fla", display: "FLA"},
            {name: "group", display: "Group", options: FieldEnums.motorGroup},
            {name: "class", display: "Class", options: FieldEnums.loadClass},
            {name: "kvahp", display: "kVA/Hp"},
            {name: "sc_ansi_code", display: "ANSI Code", options: FieldEnums.ansiCode},
            {name: "sc_load_factor", display: "Connected"},
            {name: "xppdv", display: 'X"dv or Xlr or R(Ohms)'},
            {name: "dmd_factor", display: "Demand Factor"},
            {name: "pf_load_factor", display: "Load Scaling"},
            {name: "harm_r_coef", display: "Hrm RC Value"},
            {name: "harm_factor", display: "Hrm RC Factor"},
            {name: "motor_factor", display: "Motor Factor"},
            {name: "tcc_starter_type", display: "TCC Starter", options: FieldEnums.tccStarterType},
            {name: "starting_method", display: "TCC Starter", options: FieldEnums.motorStartingMethod},
            {name: "service_factor", display: "Service Factor"},

          ];
        }
      }
      if(detailProps) {
        return statusProps.concat(summaryProps, detailProps);
      }
      else {
        return statusProps.concat(summaryProps);
      }
    };

    //*************************************************************
    this.getRawValueFromUIValue = function (uiValue, prop) {
      if(!uiValue) return undefined;
      if (prop.options) {
        for (var key in prop.options) {
          if ((prop.options)[key] == uiValue) {
            return key;
          }
        }
        return undefined;
      }
      else {
        return uiValue;
      }
    };
    //********************************************************
    this.getUIValueFromRawValue = function (rawValue, prop) {
      if(!rawValue) return "";
      return prop.options ? prop.options[rawValue] : rawValue;
    };
    //********************************************************
    this.getUIValue = function (item, prop) {
      if(!item) return "";
      return this.getUIValueFromRawValue(item[prop.name], prop);
    };
    //*************************************************************
    this.getOptions = function (prop) {
      return prop.options ? Object.values(prop.options) : [];
    };

  }])


;
