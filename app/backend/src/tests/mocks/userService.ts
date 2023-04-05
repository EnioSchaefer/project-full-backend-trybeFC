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

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhVmFsdWVzIjp7ImlkIjoyLCJ1c2VybmFtZSI6IlVzZXIiLCJyb2xlIjoidXNlciIsImVtYWlsIjoidXNlckB1c2VyLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JFk4QWJpOGpYdnNYeXFtLnJtcDBCLnVRQkE1cVV6N1Q2R2hsZy9DdlZyL2dMeFlqNVVBWlZPIn0sIl9wcmV2aW91c0RhdGFWYWx1ZXMiOnsiaWQiOjIsInVzZXJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiZW1haWwiOiJ1c2VyQHVzZXIuY29tIiwicGFzc3dvcmQiOiIkMmEkMDgkWThBYmk4alh2c1h5cW0ucm1wMEIudVFCQTVxVXo3VDZHaGxnL0N2VnIvZ0x4WWo1VUFaVk8ifSwidW5pcW5vIjoxLCJfY2hhbmdlZCI6e30sIl9vcHRpb25zIjp7ImlzTmV3UmVjb3JkIjpmYWxzZSwiX3NjaGVtYSI6bnVsbCwiX3NjaGVtYURlbGltaXRlciI6IiIsInJhdyI6dHJ1ZSwiYXR0cmlidXRlcyI6WyJpZCIsInVzZXJuYW1lIiwicm9sZSIsImVtYWlsIiwicGFzc3dvcmQiXX0sImlzTmV3UmVjb3JkIjpmYWxzZSwiaWF0IjoxNjgwNzM0OTY2LCJleHAiOjE2ODEzMzk3NjZ9.HKpELuuwW_a_FTTixeQmLcQSeY6faORV9APaanr8hlk'

export { userDB, validLoginBody, invalidMissingLoginBody, invalidPasswordFormatLoginBody, invalidEmailLoginBody, invalidPasswordLoginBody, validToken };
