const User = require ('./user.model');
const BlogEntry = require ('./blog.entry.model');

BlogEntry.belongsTo(User);
User.hasMany(BlogEntry);

module.exports = {BlogEntry, User};
