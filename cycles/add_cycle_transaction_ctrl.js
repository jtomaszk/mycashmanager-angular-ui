/**
 * Created by jarema-user on 2016-01-30.
 */

angular.module('myCashManager.cycles')
    .controller('ModalAddCycleTransactionCtrl',
    function ($scope, $uibModalInstance, cycle) {

    $scope.cycle = cycle;
    $scope.selected = {
        item: {
            value: cycle.amount,
            date: Date.now()
        },
        cycleId: cycle.id
    };

    $scope.submit = function() {
        $uibModalInstance.close($scope.selected);
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});