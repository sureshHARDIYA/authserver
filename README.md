# AUTH SERVER DOCS

# Introduction

### What
> OpenId Connect 0Auth Server

### Meta
> `http://oauth.mhof.ml/.well-known/openid-configuration`

# Installation

```shell
git clone https://github.com/sureshHARDIYA/graphql-auth-server
cd graphql-auth-server
yarn install
```

# Start a local dev server
```shell
# For development
node src/index.js
```

# Grant Types
## `Implicit`
> User initiates auth flow by building query URL and at the end, s/he will be redirected to `redirect_url` with `token` and/or `id_token`

### Sample request
```
http://oauth.mhof.ml/auth?client_id=CLIENT_ID&response_type=id_token+token&scope=openid+email+patient/*.*&nonce=foobar&prompt=login
```
## `Authorization_code`
> The authorization code flow returns an authorization code that can then be exchanged for an identity token and/or access token

### Sample Request 1 (Get authorization_code)
> Browser GET Request to
`
http://oauth.mhof.ml/auth?client_id=authzwala_id&response_type=code&scope=openid+email&nonce=foobar&prompt=login
`
### Sample Request 2 (Exchange authorization_code for access_token)
```
POST /token HTTP/1.1
Host: localhost:3002
Content-Type: application/x-www-form-urlencoded
Authorization: Basic YXV0aHp3YWxhX2lkOmF1dGh6d2FsYV9zZWNyZXQ=

code=WZg8cOJQA1_mcbvFwWrpRs770ZM&grant_type=authorization_code
```

## `Client_credentials`
> The `Client_credentials` grant type is used when the client is requesting access to protected resources under its control (i.e. there is no third party).
>
> `client_id` and `secret` are sent using the HTTP Basic authentication where credentials is the base64 encoding of `client_id` and `secret` joined by a colon

### sample request
```
POST /token
Headers:
Content-Type: application/x-www-form-urlencoded
Authorization: Basic <base64_encoded_credentialstoken>
Body:
grant_type=client_credentials&scopes=<scopes>
```




# Roadmap
- [x] Priliminary openid connect oauth implementation
- [x] Priliminary Usage guide
- [x] Static Clients and Accounts Setup
- [x] Basic Scopes for `Organization`, `Observation` ,`Questionnaire` & `Questionnaire Response`
- [ ] Accounts/User CRUD endpoints
- [ ] Fetch scopes and claims from user accounts
- [ ] Resource Owner permission and scopes Implementation (Probably)
- [ ] Client registration (Probably)


# Usage Recommendation
#### Mobile Apps
> `Implicit` or `Authorization_code` grant types

#### Dashboard
> `Client_credentials` grant type
