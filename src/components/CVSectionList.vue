<template>
  <div class="col row gx-2 align-items-center">
    <template v-for="({ icon, text }, i) in data" :key="i">
      <font-awesome-icon :icon="icon" class="col-1 my-auto"/>
      <span class="col">{{ text }}</span>
      <div class="w-100"></div>
    </template>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'
defineProps({
  data: Object
})
</script>
