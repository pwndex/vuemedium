import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

export const mutationTypes = {
  registerStart: '[auth] registerStart',
  registerSuccess: '[auth] registerSuccess',
  registerFailure: '[auth] registerFailure',
  loginStart: '[auth] loginStart',
  loginSuccess: '[auth] loginSuccess',
  loginFailure: '[auth] loginFailure'
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLoggedIn: '[auth] isLoggedIn',
  isAnonymous: '[auth] isAnonymous'
}

export default {
  // namespaced: true,
  state: {
    isSubmitting: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  },
  getters: {
    [getterTypes.currentUser]: state => {
      return state.currentUser
    },
    [getterTypes.isLoggedIn]: state => {
      return Boolean(state.isLoggedIn)
    },
    [getterTypes.isAnonymous]: state => {
      return state.isLoggedIn === false
    }
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
    },
    [mutationTypes.loginStart](state) {
      state.isSubmitting = true
      state.validationErrors = null
    },
    [mutationTypes.loginSuccess](state, payload) {
      state.isSubmitting = false
      state.currentUser = payload
      state.isLoggedIn = true
    },
    [mutationTypes.loginFailure](state, payload) {
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
    },
    [actionTypes.login](context, credentials) {
      return new Promise(resolve => {
        context.commit(mutationTypes.loginStart)
        authApi
          .login(credentials)
          .then(response => {
            context.commit(mutationTypes.loginSuccess, response.data.user)
            setItem('accessToken', response.data.user.token)
            resolve(response.data.user)
          })
          .catch(result => {
            context.commit(
              mutationTypes.loginFailure,
              result.response.data.errors
            )
          })
      })
    }
  }
}
