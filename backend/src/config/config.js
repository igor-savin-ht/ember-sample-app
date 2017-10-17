const nconf = require('nconf');
const nconfHelper = require('configuration-helper');

nconf.argv();
const SERVICE_CONFIG_FILE = nconf.get('SERVICE_CONFIG_FILE');
const SERVICE_OVERRIDE_CONFIG_FILE = nconf.get('SERVICE_OVERRIDE_CONFIG_FILE');
const SERVICE_ENCRYPTED_CONFIG_FILE = nconf.get('SERVICE_ENCRYPTED_CONFIG_FILE');
const DECRYPTION_KEY = nconf.get('DECRYPTION_KEY') || process.env.DECRYPTION_KEY;

nconfHelper.loadOverrides(nconf, SERVICE_OVERRIDE_CONFIG_FILE);
nconfHelper.loadEncryptedConfiguration(nconf, SERVICE_ENCRYPTED_CONFIG_FILE, DECRYPTION_KEY);
nconfHelper.loadConfiguration(nconf, SERVICE_CONFIG_FILE);
nconfHelper.loadDefaultConfiguration(nconf, 'config/blog-service.default.conf.json');
nconf.env();

module.exports = nconf;
