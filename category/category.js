'use strict';

angular.module('myCashManager.category', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/category', {
    templateUrl: $apiRoot() + 'category/category.html',
    controller: 'CategoryCtrl'
  });
}]).controller('CategoryCtrl', function($scope, $q, accountService) {
    $scope.list = [];
    $scope.sortKey = 'name';
    $scope.reverse = false;

    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    $scope.initCategoryList = function() {
        accountService.getTransactionCategories().then(function(result) {
            $scope.list = result.data.response;
        });
    };

    $scope.saveShelf = function(data, id){

        if (id) {
            angular.extend(data, {id: id});
            return accountService.postTransactionCategory(data)
        } else {
            return accountService.putTransactionCategory(data);
        }
    };

    $scope.add = function() {
        $scope.list.push({
            name: ''
        });
    };

    $scope.deleteCategory = function(categoryId) {
        accountService.deleteTransactionCategory(categoryId).then(function (result) {
            $scope.initCategoryList();
        });
    };

});