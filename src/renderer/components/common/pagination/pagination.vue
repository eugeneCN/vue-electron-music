<template>
<div class="pager">
  <button class="btn btn-pager prev" :disabled="current == 1" @click="prePage">上一页</button>
  <span v-if="total !== 1" class="page-index" :class="{ 'active' : 1 == current }" @click="goPage(1)">1</span>
  <span v-if="preClipped" class="page-index">...</span>
  <span v-for="index in pages" class="page-index" :class="{ 'active' : index == current }" @click="goPage(index)">{{index}}</span>
  <span v-if="backClipped" class="page-index">...</span>
  <span class="page-index" :class="{ 'active' : total == current }" @click="goPage(total)">{{total}}</span>
  <button class="btn btn-pager next" :disabled="current == total" @click="nextPage">下一页</button>
</div>
</template>

<script>
export default {
  props: {
    reset: {
      type: Boolean,
      default: false
    },
    // 用于记录总页码，可由父组件传过来
    total: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      current: 1,
      // 用于判断省略号是否显示
      backClipped: true,
      preClipped: false
    }
  },
  watch: {
    reset(val) {
      if (val) {
        this.current = 1;
        this.$emit('end-reset')
      }
    },
    current(val) {
      this.$emit('current-val', val)
    }
  },
  methods: {
    prePage() {
      // 上一页
      this.current--
    },
    nextPage() {
      // 下一页
      this.current++
    },
    goPage(index) {
      // 跳转到相应页面
      if (index !== this.current) {
        this.current = index
      }
    }
  },
  computed: {
    // 使用计算属性来得到每次应该显示的页码
    pages() {
      let ret = []
      if (this.current > 3) {
        // 当前页码大于三时，显示当前页码的前2个
        ret.push(this.current - 2)
        ret.push(this.current - 1)
        if (this.current > 4) {
          // 当前页与第一页差距4以上时显示省略号
          this.preClipped = true
        }
      } else {
        this.preClipped = false
        for (let i = 2; i < this.current; i++) {
          ret.push(i)
        }
      }
      if (this.current !== this.total && this.current !== 1) {
        ret.push(this.current)
      }
      if (this.current < (this.total - 2)) {
        // 显示当前页码的后2个
        ret.push(this.current + 1)
        ret.push(this.current + 2)
        if (this.current <= (this.total - 3)) {
          // 当前页与最后一页差距3以上时显示省略号
          this.backClipped = true
        }
      } else {
        this.backClipped = false
        for (let i = (this.current + 1); i < this.total; i++) {
          ret.push(i)
        }
      }
      // 返回整个页码组
      return ret
    }
  }
}
</script>

<style lang="scss">
@import "./pagination.scss";
</style>
