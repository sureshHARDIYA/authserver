const Database = require('./database/models');

const users = [
  {
    user_id: 1,
    system_id: 'admin',
    username: '',
    password: '2478c2d557565c3020362fc7910cdd34bb634ebc717f8f7ce691e92b726339ac0cb68fe95cc8847eb6b763ac7ebc85a00b589d4aa6a7dc89d257fbdc99b1ea43',
    salt: 'eefa643b477cde9998074133d81fb9efcd03f977e140a6aa14e2965d8845cd61a9be929381c3f1981d642301334007b89a19e5c9101204fa09f3e4cc0d6979df',
    uuid: '4cc4047e-768e-11ea-8121-f23c919967ab'
  },
  {
    user_id: 2,
    system_id: 'daemon',
    username: 'daemon',
    password: null,
    salt: null,
    uuid: 'A4F30A1B-5EB9-11DF-A648-37A07F9C90FB'
  },
  {
    user_id: 3,
    system_id: '3-4',
    username: 'horatio',
    password: 'ba603bda386cd09baf0f7175adf219a502919f4efbc6e18dbec0f70bea3b8b5c2dc6cbf4bce8d25a7990c4364e254a304935599dd8067525b40b8d0be67ba36d',
    salt: 'f012cbef8378f4dad794e246a539b542957749fdefcd2700e64d936b0242980bef8f72ac520b9197dd771939ff3f8079c6a60e8c1c0d71fbdbd61507119728e4',
    uuid: '11fa2b9f-78b0-49bf-9b34-4083d3404604'
  },
  {
    user_id: 4,
    system_id: '4-2',
    username: 'johnp',
    password: '9e26b53847d918df53f7e5db07b55eadff19d0a843b2efbaab7c7cd77aa4af53f3aabeea8cb157151a1aa107b74c2b3c6e0fd0b1ea7c9e84bfc6240ff6d8a47f',
    salt: '9bcf7a6d6f7ec16ef7a5a2668b40a09d44042aeb20e03d9d0f2eb0d8985699a5c7ad922c5330c1d3a4865fc8c49bd255a2345c5d9b4328a8f3670956c04da195',
    uuid: 'bbe9b0cc-1a3f-4fb7-a484-29e58cf2a277'
  },
  {
    user_id: 5,
    system_id: '5-9',
    username: 'ateya',
    password: '2046008f555dcee28af35bdfb00e29225f4b171f10b4b6ceeec90496ef722fa3ecb7e39d7a01324b657a8be224622077ce9c663177179d0bfe992e1b55cf0b2c',
    salt: 'b47d7a30ffc6647d5d988599f247ad9e05028da56bae232ba41767c4890838753fd8d87541b6042083a3032cd5d0cad068f61798fbca6d86903908f64b39c7b6',
    uuid: '15d643f7-45d9-4719-8f39-e46b04bafb0c'
  },
  {
    user_id: 6,
    system_id: '6-7',
    username: 'djuma',
    password: 'ead091228708bb3c42256fd9fab3f09ec48538395549cb53a900c9f9d0945efc69cbf81807335432df9d2259ac1e62cdf22084744cc17c80e6645fcc47181e09',
    salt: '9c5d6c4172961e8a9ffa9a6fb28a1e46825b62b626eed5a6effc172e84477fa2687e388b4e62d2ca7d6fe9ea0325d70cfeef580b2f4479f9e0c447632fce7ae8',
    uuid: '636718ec-0016-48e8-8e0d-16959df5e9d4'
  },
  {
    user_id: 7,
    system_id: '7-5',
    username: 'mAtingo',
    password: '244407033d749af2ae21935115f465fa43a82b7da9a59645ae8c911eb1a198daa77c3b4c85c44b85bb1cc0ca459a4f6641312a2e4a5d9fe8646cb28960fd106e',
    salt: 'cd26c6d4bc7f49e4b2230372e9cb348ee39850e3856a293390b50b54acedb0c9fbe1b3f796d9299260ba94f330ad1d21733024510ea8229a0cd71f6ca72ba5be',
    uuid: '684c2f85-192a-45bb-8bae-07c7cb9942c1'
  },
  {
    user_id: 8,
    system_id: '8-3',
    username: 'pTest',
    password: 'b2f6d88ee3d3759777072331f6ee91cfdb5af2d404f6f5433be82752372f2195589d14f42f5a5e8a0270385137300e7abee46f34447223ea64cd0c28de4d2a73',
    salt: 'ec5b435c15a890c626cf0d08a0be11e9a5836338940c43a37259e63750bfa2d73bee5bd6c21a50d482b028ba03dfb55d7ca12c00a589b1ef687f615153916837',
    uuid: 'c0d7b9f1-f2c0-443d-a1da-5696d71fef52'
  },
  {
    user_id: 9,
    system_id: '9-1',
    username: 'jprovider',
    password: 'b3c70eb72e4d3960360d2c664e2e178e2d625a1d4dacdd0dfc23394b9fd16f53ca5ab5a2d4475ffdb0f6076a667d4043ffa6268864f76e1c81f6606367dc5613',
    salt: '80bc17e2baa0dc59eeb605f6b55b185f734fa5c3cac3bcd3834042e82455550087a4b5b77caa165b44eaf5895eb13884c59302308f8bf42086377818d8441305',
    uuid: 'a888b49c-bd75-43e0-a537-57629f30a19a'
  },
  {
    user_id: 10,
    system_id: '10-9',
    username: 'sstellah',
    password: '04baa67666ba223a68bdaaaaff3bf8f6ee5595b21a141b6a9a993696fd8c91563919a5d728ba295df1219ac581a8b0a9a695305c67b015fdfba1beef7d6f9e76',
    salt: '731128a0db448b3cc4e37f3e5e4d58015778ced76395de16eb3053c2b7c9601bf61f1ba7eeba37cbccaf3aa0670979f570957902a2705ad2d55b52b63d3c00f4',
    uuid: '4bf8b906-6ea5-4ca5-9831-20bb7f890a83'
  },
  {
    user_id: 11,
    system_id: '11-7',
    username: 'sam',
    password: 'e61531aa64d71e28851d3d5f91b68cf45facfc13f63150955c44d54a81f2b4b6037f09194b504fe58bd91cad0565c05241b2548a60b06e5c204da28f0e4dfe86',
    salt: 'c6e0b65620e023de15f319feacea821ac8117af4e8ed39e4cbadc9ab20a537df66a230896209e974281bec3358813ecfbe96009f6848b51d30497c0d3fd5251c',
    uuid: 'c178536e-224d-4063-8e6c-3223ba62eecd'
  },
  {
    user_id: 12,
    system_id: '12-5',
    username: 'ben',
    password: '208f83f88b1f7d7124002dfdda7e414d00587e805f649659df5b3316d48e41d97f373f620e89ab36e590da378058b40ae12da1553994022408d1d116e5d8a26d',
    salt: '4c10dec3b2c80e1db28b0cb82e79288487762f3ea2b2e7c072ffee30dd8f41bf11a2aba8d4d72d973b74f1c361c70d52b8896c2381d418bb30a8009fc22fcb8c',
    uuid: '84dab0ba-dd9c-40b8-a86a-6fbe64394728'
  }
]

users.forEach((user) => {
  Database.user.findById(user.user_id)
    .then((u) => {
      if (!u) {
        console.log('user:', user)
        Database.user.create(user)
      }
    })
})
