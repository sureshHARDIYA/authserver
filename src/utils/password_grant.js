const {User} = require('./db');

const register = (oidc) => {
  oidc.registerGrantType('password', (providerInstance) => {
    return async (ctx, next) => {
      // Deconstruct the params from query / body
      const {
        username,
        password,
      } = ctx.oidc.params;

      // Query Mongo for the given user (note, password unhashed for demo purposes)
      const user = await User.findOne({
        username,
        password,
      });

      // If user is found
      if (user) {
        // Deconstruct AccessToken obj
        const {
          AccessToken,
        } = providerInstance;

        // Create new AccessToken from user data
        const accessTokenUnsaved = new AccessToken({
          gty: 'password',
          accountId: user._id,
          client: ctx.oidc.client,
          grantId: ctx.oidc.uuid,
        });

        const accessToken = await accessTokenUnsaved.save();

        // Output response to client
        ctx.body = {
          access_token: accessToken,
          expires_in: accessTokenUnsaved.expiration,
          token_type: 'Bearer',
        };
      } else {
        // The user wasn't found, output error to client
        ctx.body = {
          error: 'invalid_grant',
          error_description: 'invalid credentials provided',
        };

        // Set the HTTP status to 400
        ctx.status = 400;
      }

      await next();
    };
  }, ['username', 'password'], []);
};

module.exports = register;
