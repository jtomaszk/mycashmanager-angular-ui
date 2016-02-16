'use strict';

angular.module('myCashManager.dash',
    ['ngRoute', 'ngAnimate', 'ui.bootstrap']
).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dash', {
    templateUrl: $apiRoot() + 'dash/dash.html',
    controller: 'DashCtrl'
  });
}]).controller('DashCtrl', function($scope,
                                    $uibModal,
                                    $log,
                                    $location,
                                    $auth,
                                    appService,
                                    accountService,
                                    toastr) {

    $scope.accounts = [];

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function() {
                console.log('You have successfully signed in with ' + provider + '!');
                toastr.success('You have successfully signed in with ' + provider + '!');
                $location.path('/');
            })
            .catch(function(error) {
                if (error.error) {
                    // Popup error - invalid redirect_uri, pressed cancel button, etc.
                    toastr.error(error.error);
                } else if (error.data) {
                    // HTTP response error from server
                    toastr.error(error.data.message, error.status);
                } else {
                    toastr.error(error);
                }
            });
    };

    $scope.getAccounts = function() {
        accountService.getAccounts().then(function (result) {
            $scope.accounts = result.data.response;
        });
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: appService.apiRoot() + 'dash/addAccountContent.html',
            controller: 'ModalCreateAccountCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
            accountService.putAccount($scope.selected)
                .then(function () {
                    $scope.getAccounts();
                });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
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
                    $scope.getAccounts();
                });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.viewAccount = function (accountId) {
        $location.path('/account/'+accountId);
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
});