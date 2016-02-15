/**
 * Created by jtomaszk on 29.01.16.
 */

'use strict';

angular.module('myCashManager.accountServices', [])
.service('accountService', function ($http, $q) {
    this.getAccounts = function () {
        return $http({method: 'GET', url: $backendRoot() + '/accounts'});
    };

    this.getTransactions = function(accountId) {
        return $http({method: 'GET', url: $backendRoot() + '/transactions/' + accountId});
    };

    this.deleteTransaction = function(transactionId) {
        return $http.delete($backendRoot() + '/transaction/' + transactionId);
    };

    this.postTransaction = function(data) {
        return $http.post($backendRoot() + '/transaction', data);
    };

    this.putTransaction = function(selected) {
        return $http.put($backendRoot() + '/transaction', {
            accountId: selected.accountId,
            type: selected.type.enum,
            categoryId: selected.category.id,
            date: selected.date,
            value: selected.value,
            comment: selected.comment,
            destinationAccountId: selected.destinationAccount != null ? selected.destinationAccount.id : null
        });
    };

    this.getCurrencies = function() {
        return $http({method: 'GET', url: $backendRoot() + '/currencies'});
    };

    this.putAccount = function(selected) {
        return $http.put($backendRoot() + '/account', {
            currencyId: selected.currency.id,
            accountName: selected.accountName
        });
    };

    this.getTransactionTypes = function() {
        var data = {
            data: {
                response: [
                    {
                        enum: 'OUTCOME',
                        name: 'outcome'
                    }, {
                        enum: 'INCOME',
                        name: 'income'
                    }, {
                        enum: 'TRANSFER',
                        name: 'transfer'
                    }
                ]
            }
        };
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;
    };

    this.getRepeatTypes = function() {
        var data = {
            data: {
                response: [
                    {
                        enum: 'days',
                        name: 'days'
                    }, {
                        enum: 'weeks',
                        name: 'weeks'
                    }, {
                        enum: 'months',
                        name: 'months'
                    }, {
                        enum: 'years',
                        name: 'years'
                    }
                ]
            }
        };
        var deferred = $q.defer();
        deferred.resolve(data);
        return deferred.promise;
    };

    this.getTransactionCategories = function() {
        return $http.get($backendRoot() + '/categories');
    };

    this.putTransactionCategory = function(i) {
        return $http.put($backendRoot() + '/category', {
            category: i
        });
    };

    this.postTransactionCategory = function(i) {
        return $http.post($backendRoot() + '/category', {
            category: i
        });
    };

    this.deleteTransactionCategory = function(id) {
        return $http.delete($backendRoot() + '/category/' + id);
    };

    this.getCycles = function() {
        return $http.get($backendRoot() + '/cycles');
    };

    this.putCycle = function(i) {
        return $http.put($backendRoot() + '/cycle', {
            item: i
        });
    };

    this.postCycle = function(i) {
        return $http.post($backendRoot() + '/cycle', {
            item: i
        });
    };

    this.deleteCycle = function(id) {
        return $http.delete($backendRoot() + '/cycle/' + id);
    };

    this.putCycleTransaction = function(i) {
        return $http.put($backendRoot() + '/transaction/cycle/' + i.cycleId, {
            item: i.item
        });
    };
});