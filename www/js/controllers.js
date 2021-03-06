angular.module('easyPower.controllers', [])

  //========================================================================
  .controller('AppCtrl', ['$scope', '$ionicModal', '$timeout', '$localStorage',
    function ($scope, $ionicModal, $timeout, $localStorage) {

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    // Form data for the login modal
    $scope.loginData = $localStorage.getObject('userinfo', '{}');

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
      scope: $scope
    }).then(function (modal) {
      $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
      $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
      $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
      console.log('Doing login', $scope.loginData);
      $localStorage.storeObject('userinfo', $scope.loginData);

      // Simulate a login delay. Remove this and replace with your login
      // code if using a login system
      $timeout(function () {
        $scope.closeLogin();
      }, 1000);
    };
  }])

  //========================================================================
  .controller('ContactController', ['$scope', function ($scope) {

    $scope.feedback = {mychannel: "", firstName: "", lastName: "", agree: false, email: ""};

    var channels = [{value: "tel", label: "Tel."}, {value: "Email", label: "Email"}];

    $scope.channels = channels;
    $scope.invalidChannelSelection = false;

  }])

  //========================================================================
  .controller('IndexController', ['$scope', '$state', 'projectService', 'Utils', function ($scope, $state, projectService, Utils) {

    Utils.startWait();
    projectService.getProjects().query(
      function (response) {
        $scope.projects = response;
        Utils.stopWait();
      },
      function (response) {
        Utils.stopWait();
      });

    $scope.openProject = function (projectName) {
      $state.go("app.summary", {projectName: projectName});
    };
  }])

  //========================================================================
  .controller('SummaryController', ['$scope', '$state', '$stateParams', 'projectService', 'Utils',
    function ($scope, $state, $stateParams, projectService, Utils) {

      var projectName = $stateParams.projectName;

      $scope.projectName = projectName;

      Utils.startWait();
      projectService.getProjectSummary(projectName).query(
        function (response) {
          $scope.summary = response;
          Utils.stopWait();
        },
        function (response) {
          Utils.stopWait();
        });

      $scope.openEquipment = function (eqpInfo) {
        $state.go("app.equipmentList", {projectName: projectName, eqpInfo: eqpInfo});
      }

    }])

  //========================================================================
  .controller('EquipmentListController', [
    '$scope', '$state', '$stateParams', 'projectService', 'schemaService', 'Utils',
    function ($scope, $state, $stateParams, projectService, schemaService, Utils) {

      var projectName = $stateParams.projectName;
      var eqpInfo = $stateParams.eqpInfo;

      $scope.projectName = projectName;
      $scope.eqpInfo = eqpInfo;

      Utils.startWait();
      projectService.getEquipmentItems(projectName, eqpInfo).query(
        function (response) {
          $scope.eqpList = response;
          Utils.stopWait();
        },
        function (response) {
          Utils.stopWait();
        });


      $scope.properties = schemaService.getProperties(eqpInfo.url);


      $scope.getValue = function (item, prop) {
        return schemaService.getUIValue(item, prop);
      };
      $scope.selectItemForDetail = function (eqpItem) {
        $state.go("app.equipmentDetail", {projectName: projectName, eqpInfo: eqpInfo, itemId: eqpItem.id});
      };

  }])

  //========================================================================
  .controller('EquipmentDetailController', ['$scope', '$state', '$stateParams', 'projectService', 'schemaService', 'Utils',
    function ($scope, $state, $stateParams, projectService, schemaService, Utils) {

      var projectName = $stateParams.projectName;
      var eqpInfo = $stateParams.eqpInfo;
      var itemId = $stateParams.itemId;


      $scope.projectName = projectName;
      $scope.eqpInfo = eqpInfo;
      $scope.values = [];
      $scope.comments = {};
      $scope.edit = false;

      var selectedTab = 'data';

      var item;

      Utils.startWait();
      projectService.getEquipmentItems(projectName, eqpInfo).get({id: itemId},
        function (response) {
          item = response;
          $scope.comments = {text: item.comments}; // item.comments;
          $scope.values = schemaService.getProperties(eqpInfo.url, true).map(function (prop) {
            var p = {
              value: schemaService.getUIValue(item, prop),
              caption: prop.display,
            };
            if (prop.boolean) {
              p.boolean = true
            }
            else if (prop.options) {
              p.options = schemaService.getSelectOptions(prop)
            }
            else {
              p.edit = true;
            }
            return p;
          });
          Utils.stopWait();
        },
        function (response) {
          Utils.stopWait();
        });


      $scope.toggleEdit = function () {
        $scope.edit = !$scope.edit;
      }

      $scope.selectTab = function (tab) {
        selectedTab = tab;
      };
      $scope.isTabSelected = function (tab) {
        return selectedTab === tab;
      }

    }])

;
