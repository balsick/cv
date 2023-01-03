<template>
  <h5 class="bold w-100 text-uppercase"><font-awesome-icon :icon="icon" />&nbsp;&nbsp;<slot></slot></h5>
</template>
<script setup>
defineProps({
  icon: String
})
</script>
