import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getUserProfileStart: '[userProfile] getUserProfileStart',
  getUserProfileSuccess: '[userProfile] getUserProfileSuccess',
  getUserProfileFailure: '[userProfile] getUserProfileFailure'
}

export const actionTypes = {
  getUserProfile: '[userProfile] getUserProfile'
}

const mutations = {
  [mutationTypes.getUserProfileStart](state) {
    state.isLoading = true
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess](state, payload) {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailure](state, payload) {
    state.isLoading = false
    state.error = payload
  }
}

const actions = {
  [actionTypes.getUserProfile](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileStart)
      userProfileApi
        .getUserProfile(slug)
        .then(userProfile => {
          context.commit(mutationTypes.getUserProfileSuccess, userProfile)
          resolve(userProfile)
        })
        .catch(result => {
          context.commit(mutationTypes.getUserProfileFailure, result.data.error)
        })
    })
  }
}

export default {
  state,
  mutations,
  actions
}
