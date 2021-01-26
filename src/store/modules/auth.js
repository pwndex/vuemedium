export default {
  namespaced: true,
  state: {
    isSubmitting: false
  },
  mutations: {
    registerStart(state) {
      state.isSubmitting = true
    }
  },
  actions: {
    register(context) {
      setTimeout(() => {
        context.commit('registerStart')
      }, 1000)
    }
  }
}
