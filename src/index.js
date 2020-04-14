const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const Provider = require('oidc-provider');
// const assert = require('assert');

require('dotenv').config();
const Adapter = require('./adapter');

// Placeholder account model, Lets work on this after demo
const Account = require('./account');

const oidc = new Provider(process.env.APP_HOST, {
  findAccount: Account.findAccount,
  claims: {
    openid: ['sub'],
    username: ['username'],
  },
  scopes: ['patient/*.*'],
  interactionUrl(ctx) {
    return `/interaction/${ctx.oidc.uuid}`;
  },
  formats: {
    AccessToken: 'jwt',
  },
  features: {
    devInteractions: false,
    clientCredentials: true,
    claimsParameter: true,
    discovery: true,
    encryption: true,
    introspection: true,
    jwtIntrospection: true,
    registration: true,
    request: true,
    revocation: true,
    sessionManagement: true,
  },
});

const keystore = require('./keystore.json');

oidc
  .initialize({
    keystore,
    clients: [
      {
        client_id: 'global',
        client_secret: process.env.GLOBAL_SECRET,
        redirect_uris: [process.env.WEBCLIENT_URL || 'https://example.com'],
        response_types: ['id_token token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'client_secret_post',
      },
      {
        client_id: 'nirmal_implicit',
        client_secret: 'nirmal_implicit_secret',
        redirect_uris: [process.env.WEBCLIENT_URL || 'https://example.com'],
        response_types: ['id_token token'],
        grant_types: ['implicit'],
        token_endpoint_auth_method: 'client_secret_post',
      },
      {
        client_id: 'suresh_authorization_client',
        client_secret: 'authorization_client_secret_suresh',
        grant_types: ['authorization_code'],
        redirect_uris: [process.env.WEBCLIENT_URL || 'https://example.com'],
        response_types: ['code'],
        token_endpoint_auth_method: 'client_secret_post',
      },
      {
        client_id: 'dipesh_credentials_client',
        client_secret: 'secret_of_dipesh_credentials',
        grant_types: ['client_credentials'],
        redirect_uris: [],
        response_types: [],
      },
    ],
    adapter: Adapter,
  })
  .then(() => {
    oidc.proxy = true;
    oidc.keys = process.env.SECURE_KEY.split(',');
  })
  .then(() => {
    const expressApp = express();
    expressApp.set('trust proxy', true);
    expressApp.set('view engine', 'ejs');
    expressApp.set('views', path.resolve(__dirname, 'views'));

    const parse = bodyParser.urlencoded({ extended: false });

    expressApp.get('/interaction/:grant', async (req, res) => {
      oidc.interactionDetails(req).then((details) => {
        const view = (() => {
          switch (details.interaction.reason) {
            case 'consent_prompt':
            case 'client_not_authorized':
              return 'interaction';
            default:
              return 'login';
          }
        })();
        res.render(view, { details, flash: null });
      });
    });

    expressApp.post('/interaction/:grant/confirm', parse, (req, res) => {
      oidc.interactionFinished(req, res, {
        consent: {
          // TODO: add offline_access checkbox to confirm too
        },
      });
    });

    expressApp.post('/interaction/:grant/login', parse, (req, res, next) => {
      Account.authenticate(req.body.username, req.body.password)
        .then(account => oidc.interactionFinished(req, res, {
          login: {
            account: account.user_id.toString(),
            remember: !!req.body.remember,
            ts: Math.floor(Date.now() / 1000),
          },
          consent: {
            rejectedScopes: req.body.remember ? [] : ['offline_access'],
          },
        }))
        .catch(() => {
          oidc.interactionDetails(req).then((details) => {
            res.render('login', { details, flash: 'Invalid username or password.', });
          })
        });
    });

    expressApp.use(oidc.callback);
    expressApp.listen(process.env.PORT);
  });
