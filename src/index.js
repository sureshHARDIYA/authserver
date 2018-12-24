const Koa = require('koa');
const mount = require('koa-mount');
const Provider = require('oidc-provider');

const passwordGrant = require('./utils/password_grant.js');

const oidc = new Provider('http://localhost:8080', {
  features: {
    clientCredentials: true,
    introspection: true,
  },
});

// Register the custom password grant type
passwordGrant(oidc);

// Create the web server
const app = new Koa();

// Wrap promise login in an anonymous async function
(async () => {
  // Init the OIDC provider
  await oidc.initialize({
    clients: [
      {
        client_id: 'test_oauth_app',
        client_secret: 'super_secret',
        grant_types: ['password'],
        redirect_uris: [],
        response_types: [],
      },
    ],
  });

  // Add OIDC middleware to Koa, merging applications with koa-mount
  app.use(mount(oidc.app));

  // Start the server
  app.listen(8080);
})();
