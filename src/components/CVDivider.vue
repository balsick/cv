<template>
  <hr class="w-100 text-primary" :class="{ 'text-primary': !white, 'text-white': white }" />
</template>
<script setup>
defineProps({
  white: Boolean
})
</script>
