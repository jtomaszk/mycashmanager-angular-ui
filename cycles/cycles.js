'use strict';

angular
    .module('myCashManager.cycles', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/cycles', {
            templateUrl: $apiRoot() + 'cycles/cycles.html',
            controller: 'CyclesCtrl'
        });
    }]).controller('CyclesCtrl', function ($scope, $uibModal, $log, appService, accountService) {

        $scope.cycles = [];
        $scope.sortKey = 'date_next';
        $scope.reverse = false;

        $scope.sort = function (keyname) {
            $scope.sortKey = keyname;   //set the sortKey to the param passed
            $scope.reverse = !$scope.reverse; //if true make it false and vice versa
        };

        $scope.getCycles = function () {
            accountService.getCycles()
                .then(function (result) {
                    $scope.cycles = result.data.response;
                });
        };

        $scope.deleteCycle = function (id) {
            accountService.deleteCycle(id)
                .then(function (result) {
                    $scope.getCycles();
                });
        };

        $scope.openEditCycle = function (item) {
            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: appService.apiRoot() + 'cycles/add_cycle_content.html',
                controller: 'ModalAddCycleCtrl',
                resolve: {
                    selected: function () {
                        console.log(item);
                        return item;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                accountService.postCycle($scope.selected)
                    .then(function () {
                        $scope.getCycles();
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.open = function (size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: appService.apiRoot() + 'cycles/add_cycle_content.html',
                controller: 'ModalAddCycleCtrl',
                size: size,
                resolve: {
                    selected: function () {
                        return {
                            date_start: Date.now(),
                            repeat_every: 1
                        };
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                accountService.putCycle($scope.selected)
                    .then(function () {
                        $scope.getCycles();
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.openAddTransactionContent = function (cycle) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: appService.apiRoot() + 'cycles/add_transaction_content.html',
                controller: 'ModalAddCycleTransactionCtrl',
                //size: size,
                resolve: {
                    cycle: function () {
                        return cycle;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.selected = selectedItem;
                accountService.putCycleTransaction($scope.selected)
                    .then(function () {
                        $scope.getCycles();
                    });
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

    });