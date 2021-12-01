import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function getUserBookList(token, page, pageSize) {
  return request({
    url: '/user/booklist',
    method: 'get',
    params: { token, page, pageSize }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}


export function updateUserKWLForm(token,KWLForm) {
  return request({
    url: '/user/updateUserKWLForm',
    method: 'post',
    params: { token,KWLForm }
  })
}

export function updateQuestionForm(token,questionForm) {
  return request({
    url: '/user/updateQuestionForm',
    method: 'post',
    params: { token,questionForm }
  })
}

export function userDataCount(token) {
  return request({
    url: '/log/userDataCount',
    method: 'get',
    params: { token }
  })
}