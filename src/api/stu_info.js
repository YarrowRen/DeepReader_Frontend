import request from '@/utils/request'

export function getStuClsInfo(token) {
  return request({
    url: '/stu/clsInfo',
    method: 'get',
    params: { token }
  })
}

export function updateStuInfo(data) {
  return request({
    url: '/stu/updateStuInfo',
    method: 'post',
    data
  })
}

export function getQuestionFormByBookId(bookId) {
  return request({
    url: '/dq/getQuestionFormByBookId',
    method: 'get',
    params: { bookId }
  })
}

export function submitAnswer(token,answerForm) {
  return request({
    url: '/dq/submitAnswer',
    method: 'post',
    params: { token,answerForm }
  })
}

export function viewBook(token,bookId) {
  return request({
    url: '/log/viewBook',
    method: 'get',
    params: { token,bookId }
  })
}

export function viewBookAtExam(token,bookId) {
  return request({
    url: '/log/viewBookAtExam',
    method: 'get',
    params: { token,bookId }
  })
}