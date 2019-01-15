1. Installation
```shell
git clone https://github.com/sureshHARDIYA/graphql-auth-server
cd graphql-auth-server
yarn install
```
2. Start a local dev server
```shell
# For development
node src/index.js
```


#### auth server info
```
http://localhost:3002/.well-known/openid-configuration
```

#### `implicit` sample request

```
http://localhost:3002/auth?client_id=foo&response_type=id_token+token&scope=openid+email+patient/*.*&nonce=foobar&prompt=login
```
#### `authorization_code` sample request
```
http://localhost:3002/auth?client_id=authzwala_id&response_type=code&scope=openid+email&nonce=foobar&prompt=login
```
Above request returns auth code on success

#### Request `access_token` after authorization_code gives out `code` (sample)
```
POST /token HTTP/1.1
Host: localhost:3002
Content-Type: application/x-www-form-urlencoded
Authorization: Basic YXV0aHp3YWxhX2lkOmF1dGh6d2FsYV9zZWNyZXQ=

code=WZg8cOJQA1_mcbvFwWrpRs770ZM&grant_type=authorization_code
```
