'use strict';

angular.module('easyPower.services')
  //*********************************************************************************
  .service('FieldEnums', [function () {

    this.eqpStatus = {
      0: "Offline",
      1: "Online",
    };

    this.busTypes = {
      0: "Switchgear",
      1: "Panelboard",
      2: "Open Air",
      3: "Conductor",
      4: "MCC",
      5: "Panel",
      6: "Switchboard",
      7: "NEMA E2 Contactor",
      8: "Int Switch",
      9: "VFD",
      10: "UPS",
      11: "ATS",
      12: "Other",
      13: "Transformer Terminal",
      14: "Vault",
      15: "Padmount Equipment",
      16: "Control Panel",
      17: "Junction Box - Large",
      18: "Junction Box - Small",
      19: "Network Protector",
    };

    this.eqpUnits = {
       0: "US",
       1: "Metric",
       2: "Per Unit",
       3: "CSA",
    };

    this.cableMaterial = {
      65: "Aluminum",
      67: "Copper",
    };

    this.conductorLay = {
      65: "Flat",
      66: "Triangle",
      67: "Rt Triangle",
      68: "Cradle",
    };

    this.conductorForm = {
      65: "Round",
      66: "Sectored",
    };

    this.racewayType = {
      78: "None",
      66: "Burial",
      67: "Conduit",
      84: "Tray",
      65: "Air",
    };

    this.racewayMaterial = {
      78: "None",
      83: "Steel",
      65: "AL",
      73: "IMT",
      69: "EMT",
      80: "PVC",
    };

    this.loadClass = {
      0: "Non-essential",
      1: "Essential",
      2: "Critical",
    };

    this.loadModel = {
      0: "Spec",
      1: "SCADA",
    };

    this.motorType = {
      66: "Induction",
      65: "Synchronous",
      67: "Syn Condenser",
      68: "DC",
    };

    this.loadType = {
      0: "kVA",
      1: "Current",
      2: "Impedance",
      3: "kW+jI",
      4: "kW",
    };

    this.ansiCode = {
      0: "Other",
      1: "Synch",
      2: "Ind > 1000",
      6: ">250 @ 3600",
      3: "> 50",
      4: "< 50",
      5: "Lumped",
      7: "Regenerative Drive",
      8: "Non-Regen Drive",
    };

    this.motorGroup = {
      0: "Individual",
      1: "Group",
    };

    this.harmonicFactor = {
      0: "R-EXP",
      1: "%ECF"
    };

    this.cableInsul = {
      0: "100% Jacket",
      78: "133% Jacket",
      72: "100% No Jkt",
      79: "133% No Jkt",
      73: "100% Shield",
      80: "133% Shield"
    };

    this.tccStarterType = {
      0: "Full Voltage",
      1: "Auto-transformer",
      2: "Part Winding",
      3: "Wye-Delta",
      4: "Reduced Voltage",
    };

    this.motorStartingMethod = {
      0: "Power",
      1: "Slip",
    };

    //*************************************************************
    this.getEnumValue = function(enumObject, stringValue) {
      for (var key in enumObject) {
        if(enumObject[key] == stringValue) {
          return key;
        }
      }
      return undefined;
    };
    //*************************************************************
    this.getStringValue = function(enumObject, enumValue) {
      return enumObject[enumValue];
    };

  }])


;
