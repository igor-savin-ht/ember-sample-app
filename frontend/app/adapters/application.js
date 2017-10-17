import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import JSONAPIAdapter from 'ember-data/adapters/json-api';
import config from '../config/environment';

export default JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:oauth2',
    host: config.APP.API_HOST,
    namespace: config.APP.API_NAMESPACE
});