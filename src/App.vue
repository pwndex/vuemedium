<template>
  <div>
    <mcv-topbar />
    Vue Medium Clone
    <router-view />
  </div>
</template>

<script>
import McvTopbar from '@/components/Topbar'

export default {
  name: 'McvApp',
  components: {
    McvTopbar
  }
}
</script>
