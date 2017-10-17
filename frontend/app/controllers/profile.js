import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    session: Ember.inject.service(),
    actions: {
        modifyPassword: function () {
            const self = this;
			const session = this.get('session');
			const userId = session.get('data').authenticated.userId;

            this.store.findRecord('user', userId).then(function (user) {
                user.set('password', self.get('password'));
                self.set('password', '');
                user.save();
            });
        }
    }
});
