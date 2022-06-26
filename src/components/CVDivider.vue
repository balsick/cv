<template>
  <hr class="w-100 text-primary" :class="{ 'text-primary': !white, 'text-white': white }" />
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  white: Boolean
})
</script>
