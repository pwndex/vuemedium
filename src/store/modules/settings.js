import {mutationTypes} from '@/store/modules/auth'

const state = {
  isSubmitting: false,
  validationErrors: null
}

const mutations = {
  [mutationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true
    state.validationErrors = null
  },
  [mutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false
  },
  [mutationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmitting = false
    state.validationErrors = payload
  }
}

export default {
  state,
  mutations
}
