import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure'
}

export const actionTypes = {
  register: '[auth] register'
}

export default {
  // namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  },
  mutations: {
    [mutationTypes.registerStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.registerSuccess](state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.registerFailure](state, payload) {
      state.isSubmitting = false
      state.validationErrors = payload
    }
  },
  actions: {
    [actionTypes.register](context, credentials) {
      return new Promise(resolve => {
        context.commit(mutationTypes.registerStart)
        authApi
          .register(credentials)
          .then(response => {
            context.commit(mutationTypes.registerSuccess, response.data.user)
            setItem('accessToken', response.data.user.token)
            resolve(response.data.user)
          })
          .catch(result => {
            context.commit(
              mutationTypes.registerFailure,
              result.response.data.errors
            )
          })
      })
    }
  }
}
