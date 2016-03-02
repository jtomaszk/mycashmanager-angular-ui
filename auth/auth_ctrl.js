'use strict';

angular.module('myCashManager.auth',
    ['ngRoute', 'ngAnimate', 'ui.bootstrap']
).config(function($authProvider) {
    $authProvider.google({
        clientId: $googleOauth2ClientId(),
        url: $backendRoot() + '/auth/google'
    });
    $authProvider.baseUrl = $backendRoot() + '/';
}).config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/signin', {
        templateUrl: $apiRoot() + 'auth/signin.html',
        controller: 'LoginCtrl'
    });
}]).controller('LoginCtrl', function($scope, $auth, $location, toastr) {

    $scope.authenticate = function(provider) {
        $auth.authenticate(provider)
            .then(function() {
                console.log('You have successfully signed in with ' + provider + '!');
                toastr.success('You have successfully signed in with ' + provider + '!');
                $location.path('/dash');
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