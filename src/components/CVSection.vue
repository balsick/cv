<template>
  <ST :icon="icon">{{ title }}</ST>
  <slot v-if="!data"></slot>
  <CVLS :data="data" v-else />
  <hr class="w-100 mt-2" v-if="!noDivider"/>
  <div class="pt-2" v-else ></div>
</template>
<script setup>
import ST from './SectionTitle'
import CVLS from './CVSectionList'
import { defineProps } from 'vue'
defineProps({
  icon: String,
  title: String,
  noDivider: Boolean,
  data: Object
})
</script>
