module.exports = function(config){
    config.set({

        basePath : './',

        files : [
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',

            'bower_components/jquery/dist/jquery.min.js',
            'bower_components/bootstrap/dist/js/bootstrap.min.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            'bower_components/angular-xeditable/dist/js/xeditable.js',
            'bower_components/angular-utils-pagination/dirPagination.js',


            'app.js',
            'dash/dash.js',
            'dash/add_transaction_ctrl.js',
            'dash/create_account_ctrl.js',
            'account/account.js',
            'account/account_test.js',
            'version/version.js',
            'version/version-directive.js',
            'version/interpolate-filter.js',
            'services/accountService.js',
            'services/appService.js',
            'category/category.js',
            'cycles/cycles.js',
            'cycles/add_cycle_ctrl.js',
            'cycles/add_cycle_transaction_ctrl.js',
        ],

        autoWatch : true,

        frameworks: ['jasmine'],

        browsers : ['Chrome'],

        plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter : {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};