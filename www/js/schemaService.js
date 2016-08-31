'use strict';

angular.module('easyPower.services')
  .service('schemaService', ['FieldEnums', function (FieldEnums) {

    //*******************************************************
    var getBusProps = function (detail) {
      var props = [
        {name: "baseKV", display: "Base KV"},
        {name: "busType", display: "Type", options: FieldEnums.busTypes},
      ];
      if (detail) {
        props = props.concat([
          {name: "zone", display: "Zone"},
          {name: "area", display: "Area"},
          {name: "rating", display: "Rating"}
        ]);
      }
      return props;
    };
    //*******************************************************
    var getCableProps = function (detail) {
      var props = [
        {name: "con1_name", display: "Connected From"},
        {name: "con2_name", display: "Connected To"},
        {name: "size", display: "Size"}
      ];
      if (detail) {
        props = props.concat([
          {name: "unit", display: "Unit", options: FieldEnums.eqpUnits},
          {name: "type", display: "Type", options: FieldEnums.cableType},
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
          {name: "xc0", display: "XC0"}
        ]);
      }
      return props;
    };
    //*******************************************************
    var getLoadProps = function (detail) {
      var props = [
        {name: "con1_name", display: "Connected To"},
        {name: "class", display: "Class", options: FieldEnums.loadClass},
        {name: "mw", display: "MW"},
        {name: "mvar", display: "MVAR"}
      ];
      if (detail) {
        props = props.concat([
          {name: "load_factor", display: "MVA Scaling%"},
          {name: "load_amps", display: "Amps"},
          {name: "load_kva", display: "kVA"},
          {name: "mw_I", display: "I MW"},
          {name: "mvar_I", display: "I MVAR"},
          {name: "load_factor_I", display: "I Scaling%"},
          {name: "mw_Z", display: "Z MW"},
          {name: "mvar_Z", display: "Z MVAR"},
          {name: "load_factor_Z", display: "Z Scaling%"}
        ]);
      }
      return props;
    };
    //*******************************************************
    var getMotorProps = function (detail) {
      var props = [
        {name: "con1_name", display: "Connected To"},
        {name: "kv", display: "kV"},
        {name: "hp", display: "HP"},
        {name: "type", display: "Load Type", options: FieldEnums.motorType}
      ];
      if (detail) {
        props = props.concat([
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
          {name: "service_factor", display: "Service Factor"}
        ]);
      }
      return props;
    };

    //********************************************************
    this.getProperties = function (url, detail) {

      var headerProps = [
        {name: "status", display: "Status", options: FieldEnums.eqpStatus, boolean: true},
      ];
      if (url == "bus") {
        return headerProps.concat(getBusProps(detail));
      }
      else if (url == "cable") {
        return headerProps.concat(getCableProps(detail));
      }
      else if (url == "load") {
        return headerProps.concat(getLoadProps(detail));
      }
      else if (url == "motor") {
        var motorProps = getMotorProps(detail);
        var rc = headerProps.concat(motorProps);
        return rc;
      }
      else {
        return headerProps;
      }
    };

    //*************************************************************
    this.getRawValueFromUIValue = function (uiValue, prop) {
      if (!uiValue) {
        return undefined;
      }
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
      if (!rawValue) {
        return "";
      }
      return prop.options ? prop.options[rawValue] : rawValue;
    };
    //********************************************************
    this.getUIValue = function (item, prop) {
      if (!item) {
        return "";
      }
      return this.getUIValueFromRawValue(item[prop.name], prop);
    };
    //*************************************************************
    this.getSelectOptions = function (prop) {
      if (prop.options) {
        var opts = [];
        for (var key in prop.options) {
          opts.push({key: key, value: (prop.options)[key]});
        }
        return opts;
      }
      else {
        return null;
      }
    }

  }]);
