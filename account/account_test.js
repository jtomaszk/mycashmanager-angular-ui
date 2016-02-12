'use strict';

var mock, notify, mock2;

describe('myCashManager.account module', function () {

    var scope;
    var accountService;
    var controller;
    var q;
    var deferred;
    var uibModal;
    var appService;


    beforeEach(module('myCashManager.account'));

    // define the mock people service
    beforeEach(function() {
        accountService = {
            peopleStore: [{
                FirstName: "Jim",
                LastName: "Lavin",
                Email: "jlavin@jimlavin.net",
                Bio: "Creator and Host of Coding Smackdown TV"}],

            getTransactionTypes: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    beforeEach(function() {
        uibModal = {
            peopleStore: [{
                FirstName: "Jim",
                LastName: "Lavin",
                Email: "jlavin@jimlavin.net",
                Bio: "Creator and Host of Coding Smackdown TV"}],

            requestPeople: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    beforeEach(function() {
        appService = {
            peopleStore: [{
                FirstName: "Jim",
                LastName: "Lavin",
                Email: "jlavin@jimlavin.net",
                Bio: "Creator and Host of Coding Smackdown TV"}],

            requestPeople: function() {
                deferred = q.defer();
                return deferred.promise;
            }
        };
    });

    describe('AccountCtrl controller', function () {

        beforeEach(inject(function($rootScope, $controller, $q) {
            q = $q;
            scope = $rootScope.$new();

            // We use the $q service to create a mock instance of defer
            deferred = $q.defer();

            // Use a Jasmine Spy to return the deferred promise
            //spyOn(accountService, 'search').and.returnValue(deferred.promise);

            // Init the controller, passing our spy service instance
            controller = $controller('AccountCtrl', {
                $scope: scope,
                accountService: accountService,
                $uibModal: uibModal,
                appService: appService
            });
        }));

        it('should ....', inject(function ($rootScope, $injector,
                                           $controller) {
            //var scope = $rootScope.$new();
            //var view2Ctrl = $controller('AccountCtrl');//, {$scope: scope});
            expect(controller).toBeDefined();
        }));

    });
});