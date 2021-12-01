import { getDiscussionList,getDiscussionById,submitDiscussion } from '@/api/discussion'
import { getToken } from '@/utils/auth'

export default {
    namespaced: true,
    state: {
      token: getToken(),
      title: '',
    },
    actions: {
        getDiscussionList({ commit },  page, pageSize ) {
            return new Promise((resolve, reject) => {
                getDiscussionList(page, pageSize).then((response) => {
                const { data } = response
                if (!data) {
                  reject('请求数据失败.')
                }
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
          },

        getDiscussionById({ commit }, discussionId){
            return new Promise((resolve, reject) => {
                getDiscussionById(discussionId).then((response) => {
                const { data } = response
                if (!data) {
                  reject('请求数据失败.')
                }
                resolve(data)
              }).catch(error => {
                reject(error)
              })
            })
        },


        //更新学生用户的用户名与密码
        submitDiscussion({ commit, state }, discussion) {
            const { topic,content,bookList,classifyId,classifyList}=discussion
            return new Promise((resolve, reject) => {
                submitDiscussion( state.token,{ topic:topic,content:content,classifyId: classifyId }).then(response => {
                    alert("success: 讨论提交成功!")
                    location.reload();
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}