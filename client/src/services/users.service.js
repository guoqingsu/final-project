import {authedRequest} from "./authedRequest";


export const requestRegister = (username, email, password) => {
  return authedRequest.post('/api/users/signup', {
    username, email, password
  });
}

export const requestLogin = (email, password) => {
  return authedRequest.post('/api/users/signin', {
    email,
    password
  })
}