import request from '@/utils/request'

export function getDiscussionList(page, pageSize) {
  return request({
    url: '/discussion/list',
    method: 'get',
    params: { page, pageSize }
  })
}

export function getDiscussionById(discussionId) {
  return request({
    url: '/discussion/getDiscussion',
    method: 'get',
    params: { discussionId }
  })
}


export function submitDiscussion(token,discussion) {
  return request({
    url: '/discussion/submitDiscussion',
    method: 'post',
    params: { token,discussion }
  })
}