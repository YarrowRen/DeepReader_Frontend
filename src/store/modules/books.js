import { getUserBookList } from '@/api/user'
import { getBookList, getBookContent,getBookInfo,getClassify,getBookByClassifyId } from '@/api/books'
import { getToken } from '@/utils/auth'

const mutations = {
  SET_BOOKID: (state, bookId) => {
    state.bookId = bookId
  },
  SET_BOOKNAME: (state, bookName) => {
    state.bookName = bookName
  },
  SET_AUTHOR: (state, author) => {
    state.author = author
  },
  SET_PUBLISHINGHOUSE: (state, publishingHouse) => {
    state.publishingHouse = publishingHouse
  },
  SET_PUBLISHDATE: (state, publishDate) => {
    state.publishDate = publishDate
  },
  SET_PAGES: (state, pages) => {
    state.pages = pages
  },
  SET_ISBN: (state, ISBN) => {
    state.ISBN = ISBN
  },
  SET_PRICE: (state, price) => {
    state.price = price
  },
  SET_BRIEFINTRODUCTION: (state, briefIntroduction) => {
    state.briefIntroduction = briefIntroduction
  },
  SET_AUTHORINTRODUCTION: (state, authorIntroduction) => {
    state.authorIntroduction = authorIntroduction
  },
  SET_CONTENT: (state, content) => {
    state.content = content
  }
}

export default {
  namespaced: true,
  state: {
    token: getToken(),
    title: '学生图书列表',
    bookId: '',
    bookName: '',
    author: '',
    publishingHouse: '',
    publishDate: '',
    pages: '',
    ISBN: '',
    price: '',
    briefIntroduction: '',
    authorIntroduction: '',
    content: ''
  },
  mutations,
  actions: {

    getUserBookList({ state }, { page, pageSize }) {
      return new Promise((resolve, reject) => {
        getUserBookList(state.token,page, pageSize).then((response) => {
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

    getBookList({ commit }, { page, pageSize }) {
      return new Promise((resolve, reject) => {
        getBookList(page, pageSize).then((response) => {
          const { data } = response
          if (!data) {
            reject('请求数据失败.')
          }
          const { bookId, bookName, author, publishingHouse, publishDate, pages, ISBN, price, briefIntroduction, authorIntroduction } = data
          commit('SET_BOOKID', bookId)
          commit('SET_BOOKNAME', bookName)
          commit('SET_AUTHOR', author)
          commit('SET_PUBLISHINGHOUSE', publishingHouse)
          commit('SET_PUBLISHDATE', publishDate)
          commit('SET_PAGES', pages)
          commit('SET_ISBN', ISBN)
          commit('SET_PRICE', price)
          commit('SET_BRIEFINTRODUCTION', briefIntroduction)
          commit('SET_AUTHORINTRODUCTION', authorIntroduction)
          console.log('getBookList: ' + 'right-major')
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getBookContent({ commit }, bookId) {
      return new Promise((resolve, reject) => {
        getBookContent(bookId).then((response) => {
          const { data } = response
          if (!data) {
            reject('请求数据失败.')
          }
          const { content } = data
          commit('SET_CONTENT', content)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getBookByClassifyId({ commit }, classifyId){
      return new Promise((resolve, reject) => {
        getBookByClassifyId(classifyId).then((response) => {
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

    getBookInfo({ commit }, bookId) {
      return new Promise((resolve, reject) => {
        getBookInfo(bookId).then((response) => {
          const { data } = response
          if (!data) {
            reject('请求数据失败.')
          }
          const { content } = data
          commit('SET_CONTENT', content)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    getClassify({ commit }) {
      return new Promise((resolve, reject) => {
        getClassify().then((response) => {
          const { data } = response
          if (!data) {
            reject('请求数据失败.')
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
