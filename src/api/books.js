import request from '@/utils/request'

export function getClassifyAndBookList() {
  return request({
    url: '/book/classifyAndBookList',
    method: 'get'
  })
}

export function getBookList(page, pageSize) {
  return request({
    url: '/book/list',
    method: 'get',
    params: { page, pageSize }
  })
}

export function getBookContent(bookId) {
  return request({
    url: '/book/content',
    method: 'get',
    params: { bookId }
  })
}

export function getBookInfo(bookId) {
  return request({
    url: '/book/info',
    method: 'get',
    params: { bookId }
  })
}


export function getClassify() {
  return request({
    url: '/book/classify',
    method: 'get'
  })
}

export function getBookByClassifyId(classifyId) {
  return request({
    url: '/book/getBookByClassify',
    method: 'get',
    params: {classifyId}
  })
}
