/* eslint-env node */
'use strict';

module.exports = function (environment) {
    let ENV = {
        modulePrefix: 'ember-blog-app',
        environment,
        rootURL: '/',
        locationType: 'auto',
        EmberENV: {
            FEATURES: {
                // Here you can enable experimental features on an ember canary build
                // e.g. 'with-controller': true
            },
            EXTEND_PROTOTYPES: {
                // Prevent Ember Data from overriding Date.parse.
                Date: false
            }
        },

        APP: {
            API_NAMESPACE: 'v1'
        },

        routeAfterAuthentication: 'blog',
        routeIfAlreadyAuthenticated: 'blog'
    };

    if (environment === 'development') {
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;

        ENV.APP.API_HOST = 'http://localhost:4000';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';

        ENV.APP.API_HOST = 'http://localhost:4000';
    }

    if (environment === 'production') {
        // here you can enable a production-specific feature
    }

    return ENV;
};
