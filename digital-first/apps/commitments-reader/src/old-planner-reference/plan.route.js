; (function (window, angular, undefined) {
    
    'use strict';

    function routeProvider(
        $routeProvider,
        context
        ) {
        $routeProvider.when('/plan', {
            data: {
                pageTitle: "Plan",
                permissions: {
                    only: 'canViewPlan',
                    redirectTo: 'deck'
                }
            },
            templateUrl: context.appSharedUrl +  '/features/plan/plan.tpl.html',
            controller: "PlanCtrl",
            controllerAs: "vm"
        });
    };

    routeProvider.$inject = [
        '$routeProvider',
        'context'
    ];

    angular.module(window.appName)
        .config(routeProvider);

} (window, window.angular));