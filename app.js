'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myCashManager', [
    'ngRoute',
    'xeditable',
    'toastr',
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
    $authProvider.google({
        clientId: $googleOauth2ClientId(),
        url: $backendRoot() + '/auth/google'
    });
    $authProvider.baseUrl = $backendRoot() + '/';

}).controller('LoginCtrl', function($scope, $auth, toastr) {

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
});

app.run(function (editableOptions) {
    editableOptions.theme = 'bs3';
});
