<template>
<div class="mu-slider" :class="[sliderClass, styles]" tabindex="0"
  @focus="handleFocus" @blur="handleBlur" @keydown="handleKeydown"
  @touchstart="handleTouchStart" @touchend="handleTouchEnd"
  @touchcancel="handleTouchEnd"  @mousedown="handleMouseDown"
  @mouseup="handleMouseUp" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
  <input type="hidden" :name="name" :value="inputValue">
  <div class="mu-slider-track"></div>
  <div class="mu-slider-fill" :style="fillStyle"></div>
  <div class="mu-slider-thumb" :style="thumbStyle"></div>
</div>
</template>

<script>
import focusRipple from './focusRipple'
import keycode from 'keycode'
export default {
  name: 'mu-slider',
  props: {
    name: {
      type: String
    },
    value: {
      type: [Number, String],
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    },
    step: {
      type: Number,
      default: 0.1
    },
    styles: {
      type: String,
      default: 'default'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      inputValue: this.value || 0,
      active: false,
      hover: false,
      focused: false,
      dragging: false
    }
  },
  computed: {
    percent () {
      let percentNum = (this.inputValue - this.min) / (this.max - this.min) * 100
      return percentNum > 100 ? 100 : percentNum < 0 ? 0 : percentNum || '0'
    },
    fillStyle () {
      return {
        width: this.percent + '%'
      }
    },
    thumbStyle () {
      return {
        left: this.percent + '%'
      }
    },
    sliderClass () {
      return {
        // zero: this.inputValue <= this.min,
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  created () {
    this.handleDragMouseMove = this.handleDragMouseMove.bind(this)
    this.handleMouseEnd = this.handleMouseEnd.bind(this)
    this.handleTouchMove = this.handleTouchMove.bind(this)
    this.handleTouchEnd = this.handleTouchEnd.bind(this)
  },
  methods: {
    handleKeydown (e) {
      const { min, max, step } = this
      let action
      switch (keycode(e)) {
      case 'page down':
      case 'down':
        action = 'decrease'
        break
      case 'left':
        action = 'decrease'
        break
      case 'page up':
      case 'up':
        action = 'increase'
        break
      case 'right':
        action = 'increase'
        break
      case 'home':
        action = 'min'
        break
      case 'end':
        action = 'max'
        break
      }

      if (action) {
        e.preventDefault()
        switch (action) {
        case 'decrease':
          this.inputValue -= step
          break
        case 'increase':
          this.inputValue += step
          break
        case 'min':
          this.inputValue = min
          break
        case 'max':
          this.inputValue = max
          break
        }

        this.inputValue = parseFloat(this.inputValue.toFixed(5))

        if (this.inputValue > max) {
          this.inputValue = max
        } else if (this.inputValue < min) {
          this.inputValue = min
        }
      }
    },
    handleMouseDown (e) {
      if (this.disabled) return
      this.setValue(e)
      e.preventDefault()
      document.addEventListener('mousemove', this.handleDragMouseMove)
      document.addEventListener('mouseup', this.handleMouseEnd)
      this.$el.focus()
      this.onDragStart(e)
    },
    handleMouseUp () {
      if (this.disabled) return
      this.active = false
    },
    handleTouchStart (e) {
      if (this.disabled) return
      this.setValue(e.touches[0])

      document.addEventListener('touchmove', this.handleTouchMove)
      document.addEventListener('touchup', this.handleTouchEnd)
      document.addEventListener('touchend', this.handleTouchEnd)
      document.addEventListener('touchcancel', this.handleTouchEnd)

      e.preventDefault()
      this.onDragStart(e)
    },
    handleTouchEnd (e) {
      if (this.disabled) return
      document.removeEventListener('touchmove', this.handleTouchMove)
      document.removeEventListener('touchup', this.handleTouchEnd)
      document.removeEventListener('touchend', this.handleTouchEnd)
      document.removeEventListener('touchcancel', this.handleTouchEnd)
      this.onDragStop(e)
    },
    handleFocus () {
      if (this.disabled) return
      this.focused = true
    },
    handleBlur () {
      if (this.disabled) return
      this.focused = false
    },
    handleMouseEnter () {
      if (this.disabled) return
      this.hover = true
    },
    handleMouseLeave () {
      if (this.disabled) return
      this.hover = false
    },
    // 从点击位置更新 value
    setValue (e) {
      const { $el, max, min, step } = this
      let value = (e.clientX - $el.getBoundingClientRect().left) / $el.offsetWidth * (max - min)
      value = Math.round(value / step) * step + min
      value = parseFloat(value.toFixed(5))

      if (value > max) {
        value = max
      } else if (value < min) {
        value = min
      }
      this.inputValue = value
      this.$emit('change', value)
    },
    // 拖拽控制
    onDragStart (e) {
      this.dragging = true
      this.active = true
      this.$emit('dragStart', e)
      this.$emit('drag-start', e)
    },
    onDragUpdate (e) {
      if (this.dragRunning) return
      this.dragRunning = true
      window.requestAnimationFrame(() => {
        this.dragRunning = false
        if (!this.disabled) this.setValue(e)
      })
    },
    onDragStop (e) {
      this.dragging = false
      this.active = false
      this.$emit('dragStop', e)
      this.$emit('drag-stop', e)
    },
    handleDragMouseMove (e) {
      this.onDragUpdate(e)
    },
    handleTouchMove (e) {
      this.onDragUpdate(e.touches[0])
    },
    handleMouseEnd (e) {
      document.removeEventListener('mousemove', this.handleDragMouseMove)
      document.removeEventListener('mouseup', this.handleMouseEnd)
      this.onDragStop(e)
    }
  },
  watch: {
    thumbStyle(a, b) {
      // console.log(a)
    },
    value (val) {
      this.inputValue = val
    },
    inputValue (val) {
      this.$emit('input', val)
    }
  },
  components: { focusRipple }
}
</script>

<style lang="scss">
@import "./Slider.scss";
</style>
