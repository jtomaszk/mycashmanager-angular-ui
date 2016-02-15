'use strict';

function $apiRoot() {
    return ''; //$("#linkApiRoot").attr("href");
}

// Declare app level module which depends on views, and components
var app = angular.module('myCashManager', [
    'ngRoute',
    'xeditable',
    'satellizer',
    'myCashManager.dash',
    'myCashManager.account',
    'myCashManager.version',
    'myCashManager.commonServices',
    'myCashManager.accountServices',
    'myCashManager.category',
    'myCashManager.cycles'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.otherwise({redirectTo: '/dash'});
}]).directive('classOnActiveLink', [function () {
    return {
        link: function (scope, element, attrs) {

            var anchorLink = element.children()[0].getAttribute('ng-href') || element.children()[0].getAttribute('href');
            anchorLink = anchorLink.replace(/^#/, '');
            //anchorLink = anchorLink.substring(0, anchorLink.indexOf('/'));
            console.log(anchorLink);

            scope.$on("$routeChangeSuccess", function (event, current) {
                if (current.$$route !== undefined && current.$$route.originalPath.startsWith(anchorLink)) {
                    element.addClass(attrs.classOnActiveLink);
                } else {
                    element.removeClass(attrs.classOnActiveLink);
                }
            });

        }
    };
}]).directive("input", function () {
    return {
        require: 'ngModel',
        link: function (scope, elem, attr, ngModel) {
            if (attr['type'] === 'date') {
                //To view date
                ngModel.$formatters.push(function (value) {
                    if (value) {
                        return new Date(value);
                    } else {
                        return null;
                    }
                });
                //To post date
                ngModel.$parsers.push(function(value) {
                    return Date.parse(value);
                });
            }

        }
    };
}).config(function($authProvider) {


}).controller('LoginCtrl', function($scope, $auth) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider);
    };

});

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});
