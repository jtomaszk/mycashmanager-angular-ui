'use strict';

var mock, notify, mock2;

describe('myCashManager.auth module', function () {
    var scope;
    var auth;
    var location;
    var toastr;
    var controller;

    beforeEach(module('myCashManager.auth'));
    // define the mock people service
    beforeEach(function () {
        auth = {};
    });

    beforeEach(function () {
        location = {};
    });

    beforeEach(function () {
        toastr = {};
    });

    describe('LoginCtrl controller', function () {

        beforeEach(inject(function ($rootScope, $controller, $q) {
            scope = $rootScope.$new();

            controller = $controller('LoginCtrl', {
                $scope: scope,
                $auth: auth,
                $location: location,
                toastr: toastr
            });
        }));

        //it('should be defined', inject(function ($controller) {
        //    var ctrl = $controller('LoginCtrl');
            //console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
            //expect($controller).toBeDefined();
        //}));

        //it('should have authenticate method with provider param', inject(function ($controller) {
        //    var ctrl = $controller('LoginCtrl');
        //expect(controller.authenticate).toBeDefined();
        //}));
    });
});