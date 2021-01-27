import authApi from '@/api/auth'

export default {
  namespaced: true,
  state: {
    isSubmitting: false,
    user: {}
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true
    },
    registerSuccess(state) {
      state.isSubmitting = false
    },
    registerFailure(state) {
      state.isSubmitting = false
    }
  },
  actions: {
    register(context, credentials) {
      return new Promise(resolve => {
        context.commit('registerStart')
        authApi
          .register(credentials)
          .then(response => {
            console.log('response', response)
            context.commit('registerSuccess', response.data.user)
            resolve(response.data.user)
          })
          .catch(result => {
            context.commit('registerFailure')
            console.log('Result errors: ', result.response.data.errors)
          })
      })
    }
  }
}
