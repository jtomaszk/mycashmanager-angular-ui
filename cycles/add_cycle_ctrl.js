/**
 * Created by jarema-user on 2016-01-30.
 */

angular.module('myCashManager.cycles')
    .controller('ModalAddCycleCtrl',
    function ($scope, $filter, $uibModalInstance, accountService, selected) {

    $scope.accounts = [];
    $scope.transactionTypes = [];
    $scope.transactionCategories = [];
    $scope.repeatTypes = [];
    $scope.selected = selected;

    $scope.getAccounts = function() {
        accountService.getAccounts().then(function(result) {
            $scope.accounts = result.data.response;
            $scope.selected.account = $scope.accounts[0];
        })
    };

    $scope.getTransactionTypes = function() {
        accountService.getTransactionTypes().then(function(result) {
            $scope.transactionTypes = result.data.response;
            if ($scope.selected.transaction_type) {
                $scope.selected.type = $filter("filter")(
                    $scope.transactionTypes, {enum: $scope.selected.transaction_type}
                )[0];
            } else {
                $scope.selected.type = $scope.transactionTypes[0];
            }
        })
    };

    $scope.getTransactionCategories = function() {
        accountService.getTransactionCategories().then(function(result) {
            $scope.transactionCategories = result.data.response;
            if ($scope.selected.category_id) {
                $scope.selected.category = $filter("filter")(
                    $scope.transactionCategories, {id: $scope.selected.category_id}
                )[0];
            } else {
                $scope.selected.category = $scope.transactionCategories[0];
            }
        })
    };

    $scope.getRepeatTypes = function() {
        accountService.getRepeatTypes().then(function(result) {
            $scope.repeatTypes = result.data.response;
            if ($scope.selected.repeat_type) {
                $scope.selected.repeatType = $filter("filter")(
                    $scope.repeatTypes, {enum: $scope.selected.repeat_type}
                )[0];
            } else {
                $scope.selected.repeatType = $scope.repeatTypes[2];
            }
        })
    };

    $scope.submit = function() {
        $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});