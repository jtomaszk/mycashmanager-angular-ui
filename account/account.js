'use strict';

angular.module('myCashManager.account', ['ngRoute', 'angularUtils.directives.dirPagination'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/account/:id', {
    templateUrl: $apiRoot() + 'account/account.html',
    controller: 'AccountCtrl'
  });
}]).controller('AccountCtrl', function($scope, $routeParams, accountService, $uibModal, appService) {
    $scope.transactions = [];
    $scope.account = [];
    $scope.categories = [];
    $scope.types = [];
    $scope.sortKey = 'date';
    $scope.reverse = true;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    $scope.initData = function() {
        accountService.getTransactions($routeParams['id']).then(function (result) {
            $scope.transactions = result.data.response;
            $scope.account = result.data.account;
        });
    };

    $scope.deleteTransaction = function(transactionId) {
        accountService.deleteTransaction(transactionId).then(function (result) {
           $scope.initData();
        });
    };

    $scope.loadCategories = function() {
        return accountService.getTransactionCategories().then(function (result) {
            $scope.categories = result.data.response;
        });
    };

    accountService.getTransactionTypes().then(function(result) {
        $scope.types = result.data.response;
    });

    $scope.saveTransaction = function(data, id) {
        //$scope.user not updated yet
        angular.extend(data, {id: id});
        return accountService.postTransaction(data);
    };

    $scope.openTransactionContent = function (accountId) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: appService.apiRoot() + 'dash/addTransactionContent.html',
            controller: 'ModalAddTransactionCtrl',
            resolve: {
                accountId: function() {
                    return accountId;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            accountService.putTransaction($scope.selected)
                .then(function () {
                    $scope.initData();
                });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
});