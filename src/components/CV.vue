<script setup>
import { onMounted, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Highlight from './HighlightWord'
import TextWithHighlight from './TextWithHighlight.vue'
import CVSection from './CVSection'
import Divider from './CVDivider'
import db from '../data/db.json'
import pdf from '../assets/cv.pdf'

const route = useRoute()
const router = useRouter()
const downloadRef = ref()

const refreshing = ref(false)
const registration = ref(null)
const updateExists = ref(false)

const name = ref(db.name)
const lastName = ref(db.lastName)
const subtitle = ref(db.subtitle)
const summary = ref(db.summary)
const experiences = ref(db.experiences)
const personalInfo = ref(db.personalInfo)
const skills = ref(db.skills)
const universities = ref(db.universities)
const languages = ref(db.languages)
const passions = ref(db.passions)
const footer = ref(db.footer)

function updateAvailable (event) {
  registration.value = event.detail
  updateExists.value = true
}
function refreshApp () {
  updateExists.value = false
  // Make sure we only send a 'skip waiting' message if the SW is waiting
  if (!registration.value || !registration.value.waiting) return
  // send message to SW to skip the waiting and activate the new SW
  registration.value.waiting.postMessage({ type: 'SKIP_WAITING' })
}
onMounted(() => {
  document.addEventListener('swUpdated', updateAvailable, { once: true })
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (refreshing.value) return
    refreshing.value = true
    // Here the actual reload of the page occurs
    window.location.reload()
  })

  if (route.path === '/pdf') {
    downloadRef.value.click()
    router.replace({ path: '/' })
  }
})

watch(updateExists, (newUpdateExists, oldUpdateExists) => {
  if (newUpdateExists) refreshApp()
})
function getImgUrl (pic) {
  return require(`../assets/skills/icon/${pic}.svg`)
}

const summaryBlocks = computed(() => {
  if (Array.isArray(summary.value)) {
    return summary.value
  }
  return [summary.value]
})

const vTooltip = {
  mounted: function (el, binding) {
    // eslint-disable-next-line no-new,no-undef
    new bootstrap.Tooltip(el, {
      title: binding.value,
      placement: binding.arg || 'top',
      trigger: 'hover'
    })
  }
}

</script>
<template>
  <div class="container h-100 px-0 print-font">
    <div class="row gx-sm-2 gx-0 h-100 w-100">
      <div id="left" class="col-auto col-sm-4 row bg-primary gy-1 mx-sm-8 mx-0 mt-0 px-2 px-sm-4 pt-2 pt-sm-4 fs-7 text-white align-content-start">
        <div class="col d-block d-sm-none">
          <h1 class="text-start"><Highlight>{{ name }}</Highlight> {{ lastName }}</h1>
          <h6 class="text-start" v-if="subtitle">{{ subtitle }}</h6>
        </div>
        <div class="no-print col-auto d-sm-none d-block pt-2" v-if="pdf">
          <a :href="pdf" ref="downloadRef" download class="rounded bg-white text-primary p-1 text-uppercase bold text-decoration-none">
            <font-awesome-icon icon="fa-solid fa-download" />&nbsp;Download</a>
        </div>
        <div class="w-100 mx-auto row justify-content-center"><img alt="Vue logo" src="../assets/me.png" class="rounded-img" /></div>
        <divider />
        <CVSection icon="fa-solid fa-person-rays" title="Personal Information" :data="personalInfo" />
        <CVSection icon="fa-solid fa-microchip" title="Main technologies">
          <div class="row justify-content-around mx-0 gy-0 mt-0 px-0">
            <img v-for="(s, i) in skills"
            :src="getImgUrl(s)" class="logo-tech col-3 my-2 col-sm-auto no-print" :key="s + i"
            v-tooltip="s"
            />
            <span v-for="(s, i) in skills" :key="s + i" class="col-3 col-sm-auto my-0 print-only">{{s}}</span>
            <!-- <span v-for="(s, i) in skills" :key="s + i" class="col-3 col-sm-auto my-0 fs-9 lh-1">
              <img :src="getImgUrl(s)" class="logo-tech col-3 my-2 col-sm-auto" /><br/>
              {{s}}
            </span> -->
          </div>
        </CVSection>
        <CVSection icon="fa-solid fa-building-columns" title="University" v-if="universities">
          <span v-for="({ year, bachelor}, i) in universities.sort(({year: year1}, {year: year2}) => year2 - year1)" :key="i">
            <b>{{ year }}</b> - {{ bachelor }}
          </span>
        </CVSection>
        <CVSection icon="fa-solid fa-language" title="Languages">
          <span v-for="(level, lang, i) in languages" :key="i"><b>{{lang}}</b> - {{ level }}</span>
        </CVSection>
        <CVSection icon="fa-solid fa-thumbs-up" title="What I like" :data="passions" noDivider />
      </div>

      <div id="right" class="col row gx-8 bg-white mx-0 mt-0 px-4 pt-4 align-content-start">
        <div class="col d-none d-sm-block">
          <h1 class="text-start"><Highlight>{{ name }}</Highlight> {{ lastName }}</h1>
          <h6 class="text-start" v-if="subtitle">{{ subtitle }}</h6>
        </div>
        <div class="no-print col-auto d-none d-sm-block pt-2" v-if="pdf">
          <a :href="pdf" download class="rounded bg-white text-primary p-1 text-uppercase bold text-decoration-none">
            <font-awesome-icon icon="fa-solid fa-download" />&nbsp;Download</a>
        </div>
        <Divider class="d-none d-sm-inline"/>
        <p class="text-justify text-monospace" >
          <template v-for="(text, i) in summaryBlocks" :key="array + i">
            <text-with-highlight :text="text" />
            <br v-if="i !== summaryBlocks.length - 1"/>
          </template>
        </p>
        <Divider white/>
        <template v-if="experiences">
          <h5><Highlight uppercase primary bold>technical skills and knowledge</Highlight></h5>
          <Divider />
          <p v-for="({ title, description, since, projects }, i) in experiences" :key="title + i" class="mb-0">
            <b>{{ title }}</b>
            <template v-if="since"> (since {{ since }})</template>
            <template v-if="description">: {{ description }}</template>
            <ul v-if="projects && projects.length" class="mb-2">
              <li v-for="(project, i) in projects" :key="project + i" class="fs-8">
                <!-- {{ project }} -->
                <text-with-highlight :text="project" />
              </li>
            </ul>
          </p>
        </template>
        <div class="pt-1"></div>
      </div>
      <div class="row w-100 m-0 h-auto bg-primary text-white px-4 pb-2 pt-2 fs-10 align-items-end">
          <template v-if="footer">{{ footer }}<br/></template>
          In compliance with the Italian legislative Decree no. 196 dated 30/06/2003, I hereby authorize you to
          use and process my personal details contained in this document.
      </div>
    </div>
  </div>
</template>
