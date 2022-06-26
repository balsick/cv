<template>
  <span :class="{ 'text-uppercase': uppercase, 'text-primary': primary, 'text-secondary': !primary, bold }"><slot></slot></span>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  uppercase: Boolean,
  primary: Boolean,
  bold: Boolean
})
</script>
