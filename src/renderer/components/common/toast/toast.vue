<template>
<transition name="toast">
  <div class="toast-mask" v-if="visible">
    <div class="toast" :style="{'z-index': zIndex}">
      {{loading}}{{message}}
    </div>
  </div>
</transition>
</template>

<script>
export default {
  name: 'toast',
  props: {
    message: {
      type: String,
      default: ''
    },
    loading: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(val) {
      if (val) this.clearToast()
    }
  },
  methods: {
    clearToast() {
      if (this.toastTimer) clearTimeout(this.toastTimer)
      this.toastTimer = setTimeout(() => {
        this.$emit('close', this.visible)
      }, 2000)
    }
  },
  data() {
    return {
      zIndex: 138333
    }
  }
}
</script>

<style lang="scss">
@import './toast.scss';
</style>
