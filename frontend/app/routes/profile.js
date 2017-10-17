import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import Route from '@ember/routing/route';

export default Route.extend(AuthenticatedRouteMixin, {
    model() {
        const session = this.get('session');
        const userId = session.get('data').authenticated.userId;
        return this.get('store').findRecord('user', userId);
    }
});
