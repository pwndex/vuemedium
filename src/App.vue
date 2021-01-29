<template>
  <div>
    <mcv-topbar />
    Vue Medium Clone
    <router-view />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar'
import {actionTypes} from '@/store/modules/auth'

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  },
  mounted() {
    console.log('Hello World')
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
