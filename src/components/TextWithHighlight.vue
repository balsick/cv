<template>
  <template v-for="line in blocks" :key="line">
    {{ line[0] }}<Highlight>{{ line[1] }}</Highlight>
  </template>
</template>
<script setup>
import { computed } from 'vue'
import Highlight from './HighlightWord'

const props = defineProps(['text'])

const toBlocks = text => {
  const array = text.split(/\*/g)
  return [...Array((array.length + 1) / 2).keys()].map(i => [array[2 * i], array[2 * i + 1]].filter(v => v))
}

const blocks = computed(() => {
  return toBlocks(props.text)
})
</script>
