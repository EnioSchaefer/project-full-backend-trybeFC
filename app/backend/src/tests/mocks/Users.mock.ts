const userDB = {
  id: 2,
  username: 'User',
  role: 'user',
  email: 'user@user.com',
  password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
}

const validLoginBody = {
  email: 'user@user.com',
  password: 'secret_user'
}

const invalidMissingLoginBody = {
  email: '',
  password: ''
}

const invalidPasswordFormatLoginBody = {
  email: 'user@user.com',
  password: '123'
}

const invalidEmailLoginBody = {
  email: 'invalid@invalid.com',
  password: 'secret_user'
}

const invalidPasswordLoginBody = {
  email: 'user@user.com',
  password: '1234567'
}

export { userDB, validLoginBody, invalidMissingLoginBody, invalidPasswordFormatLoginBody, invalidEmailLoginBody, invalidPasswordLoginBody };
