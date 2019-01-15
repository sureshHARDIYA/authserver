const assert = require("assert");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const Provider = require("oidc-provider");

require("dotenv").config();
const RedisAdapter = require("./redis_adapter");

// Placeholder account model, Lets work on this after demo
const Account = require("./account");
const AppConfig = require('./config/appconfig')
console.log('appconfig is', AppConfig);
const oidc = new Provider(AppConfig.APP_HOST, {
  findById: Account.findById,
  claims: {
    openid: ["sub"],
    email: ["email", "email_verified"]
  },
  scopes: ["patient", "patient/*.*"],
  interactionUrl(ctx) {
    return `/interaction/${ctx.oidc.uuid}`;
  },
  formats: {
    AccessToken: "jwt"
  },
  features: {
    devInteractions: false,
    clientCredentials: true,
    claimsParameter: true,
    discovery: true,
    encryption: true,
    introspection: true,
    registration: true,
    request: true,
    revocation: true,
    sessionManagement: true
  }
});

const keystore = require("./keystore.json");
oidc
  .initialize({
    keystore,
    clients: [
      {
        client_id: "foo",
        client_secret: "namaskar",
        redirect_uris: ["https://example.com"],
        response_types: ["id_token token"],
        grant_types: ["implicit"],
        token_endpoint_auth_method: "client_secret_post"
      },
      {
        client_id: 'authzwala_id',
        client_secret: 'authzwala_secret',
        grant_types: ["authorization_code"],
        redirect_uris: ["https://example.com"],
        response_types: ["code"],
        token_endpoint_auth_method: "client_secret_basic"
      }
    ],
    adapter: RedisAdapter
  })
  .then(() => {
    oidc.proxy = true;
    oidc.keys = AppConfig.SECURE_KEY.split(",");
  })
  .then(() => {
    const expressApp = express();
    expressApp.set("trust proxy", true);
    expressApp.set("view engine", "ejs");
    expressApp.set("views", path.resolve(__dirname, "views"));

    const parse = bodyParser.urlencoded({ extended: false });

    expressApp.get("/interaction/:grant", async (req, res) => {
      oidc.interactionDetails(req).then(details => {
        const view = (() => {
          switch (details.interaction.reason) {
            case "consent_prompt":
            case "client_not_authorized":
              return "interaction";
            default:
              return "login";
          }
        })();
        res.render(view, { details });
      });
    });

    expressApp.post("/interaction/:grant/confirm", parse, (req, res) => {
      oidc.interactionFinished(req, res, {
        consent: {
          // TODO: add offline_access checkbox to confirm too
        }
      });
    });

    expressApp.post("/interaction/:grant/login", parse, (req, res, next) => {
      Account.authenticate(req.body.email, req.body.password)
        .then(account =>
          oidc.interactionFinished(req, res, {
            login: {
              account: account.accountId,
              remember: !!req.body.remember,
              ts: Math.floor(Date.now() / 1000)
            },
            consent: {
              rejectedScopes: req.body.remember ? [] : ["offline_access"]
            }
          })
        )
        .catch(next);
    });

    expressApp.use(oidc.callback);
    expressApp.listen(AppConfig.PORT);
  });
