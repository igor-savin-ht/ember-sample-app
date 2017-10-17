import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
	location: config.locationType,
	rootURL: config.rootURL
});

Router.map(function () {
	this.route('profile');
	this.route('blog-entries');
	this.route('blog-entry-new', {path: '/blog-entries/new'});
	this.route('login');
});

export default Router;
