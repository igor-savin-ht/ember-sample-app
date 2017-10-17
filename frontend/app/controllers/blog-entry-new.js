import Controller from '@ember/controller';
import Ember from 'ember';

export default Controller.extend({
    session: Ember.inject.service(),
	actions: {
		createBlogEntry: function () {
			const self = this;
			const blogEntry = this.store.createRecord('blog-entry', {
				subject: this.get('subject'),
				body: this.get('body')
			});

			blogEntry.save().then(function() {
                self.set('subject', '');
                self.set('body', '');
				self.transitionToRoute('blog-entries');
			});
		}
	}
});
