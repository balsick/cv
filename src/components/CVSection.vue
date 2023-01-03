<template>
  <SectionTitle :icon="icon">{{ title }}</SectionTitle>
  <slot v-if="!data"></slot>
  <SectionList v-else :data="data" />
  <hr class="w-100 mt-2" v-if="!noDivider"/>
  <div class="pt-2" v-else ></div>
</template>
<script setup>
import SectionTitle from './SectionTitle'
import SectionList from './CVSectionList'
defineProps({
  icon: String,
  title: String,
  noDivider: Boolean,
  data: Object
})
</script>
