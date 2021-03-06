'use strict';

let angular = require('angular');

module.exports = angular.module('spinnaker.azure.serverGroup.details.elasticIp.controller', [
  require('./elasticIp.write.service.js'),
  require('../../../../core/task/monitor/taskMonitorService.js')
])
  .controller('azureElasticIpCtrl', function($scope, $modalInstance, elasticIpWriter, taskMonitorService,
                                                application, serverGroup, elasticIp, onTaskComplete) {
    $scope.serverGroup = serverGroup;
    $scope.elasticIp = elasticIp;

    $scope.verification = {};

    this.isValid = () => $scope.verification.verified;

    this.associate = function () {
      var taskMonitorConfig = {
        application: application,
        title: 'Associating Elastic IP with ' + serverGroup.cluster,
        modalInstance: $modalInstance,
        onTaskComplete: onTaskComplete
      };

      var submitMethod = function () {
        return elasticIpWriter.associateElasticIpWithCluster(
          application, serverGroup.account, serverGroup.cluster, serverGroup.region, $scope.elasticIp
        );
      };

      $scope.taskMonitor = taskMonitorService.buildTaskMonitor(taskMonitorConfig);
      $scope.taskMonitor.submit(submitMethod);
    };

    this.disassociate = function () {
        var taskMonitorConfig = {
          application: application,
          title: 'Disassociating Elastic IP with ' + serverGroup.cluster,
          modalInstance: $modalInstance,
          onTaskComplete: onTaskComplete
        };

      var submitMethod = function() {
        return elasticIpWriter.disassociateElasticIpWithCluster(
          application, serverGroup.account, serverGroup.cluster, serverGroup.region, elasticIp.address
        );
      };

      $scope.taskMonitor = taskMonitorService.buildTaskMonitor(taskMonitorConfig);
      $scope.taskMonitor.submit(submitMethod);
    };

    this.cancel = function () {
      $modalInstance.dismiss();
    };
  });
