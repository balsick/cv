<script setup>
import HW from './HighlightWord'
import CVS from './CVSection'
import Divider from './CVDivider'
import { onMounted, ref, watch } from 'vue'
import pdf from '../assets/cv.pdf'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const downloadRef = ref()

const refreshing = ref(false)
const registration = ref(null)
const updateExists = ref(false)

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
  console.log('ciao')

  if (route.path === '/pdf') {
    downloadRef.value.click()
    router.replace({ path: '/' })
  }
})

watch(updateExists, (newUpdateExists, oldUpdateExists) => {
  if (newUpdateExists) refreshApp()
})
const skills = ref([
  'java',
  'react',
  'vuejs',
  'aws',
  'nodejs',
  'spring',
  'docker',
  'npm',
  'postgresql',
  'firebase',
  'influx',
  'redis'
])
function getImgUrl (pic) {
  return require(`../assets/skills/icon/${pic}.svg`)
}
const personalInfo = ref([{
  icon: 'fa-solid fa-cake-candles',
  text: 'December 03, 1992'
}, {
  icon: 'fa-solid fa-at',
  text: 'balsick@gmail.com'
}, {
  icon: 'fa-solid fa-location-dot',
  text: 'Torino (TO) - Italy'
}, {
  icon: 'fa-solid fa-mobile',
  text: '+39 340 14 66 912'
}, {
  icon: 'fa-brands fa-github',
  text: 'balsick'
}, {
  icon: 'fa-brands fa-stack-overflow',
  text: 'user:2331491'
}])

const languages = ref({
  Italian: 'Native speaker',
  English: 'Fluent'
})

const passions = ref([{
  icon: 'fa-solid fa-book-open',
  text: 'Reading (find me on Goodreads)'
}, {
  icon: 'fa-solid fa-person-swimming',
  text: 'Swimming, running, trekking'
}, {
  icon: 'fa-solid fa-futbol',
  text: 'Watching sports'
}, {
  icon: 'fa-solid fa-tv',
  text: 'Movies and TV shows'
}, {
  icon: 'fa-solid fa-arrow-trend-up',
  text: 'Finance'
}])

const experiences = ref([{
  title: 'Freelance',
  since: '2022',
  description: 'I have started helping companies speed up the development of their projects'
}, {
  title: 'Software Architect @ AEC Soluzioni srl',
  since: 'February, 2015'
}])
</script>
<template>
  <div class="container h-100 px-0 print-font">
    <div class="row gx-sm-2 gx-0 h-100 w-100">

      <div id="left" class="col-auto col-sm-4 row bg-primary gy-1 mx-sm-8 mx-0 mt-0 px-2 px-sm-4 pt-2 pt-sm-4 fs-7 text-white align-content-start">
        <div class="col d-block d-sm-none">
          <h1 class="text-start"><HW>Enrico</HW> Balsamo</h1>
          <h6 class="text-start">Software is my thing</h6>
        </div>
        <div class="no-print col-auto d-sm-none d-block pt-2">
          <a :href="pdf" ref="downloadRef" download class="rounded bg-white text-primary p-1 text-uppercase bold text-decoration-none"><font-awesome-icon icon="fa-solid fa-download" />&nbsp;Download</a>
        </div>
        <div class="w-100 mx-auto row justify-content-center"><img alt="Vue logo" src="../assets/me.png" class="rounded-img" /></div>
        <divider />
        <CVS icon="fa-solid fa-person-rays" title="Personal Information" :data="personalInfo" />
        <CVS icon="fa-solid fa-microchip" title="Main technologies">
          <div class="row justify-content-around gy-2 mx-0 mt-0 px-0">
            <img v-for="(s, i) in skills" :src="getImgUrl(s)" class="logo-tech col-3 col-sm-auto" :key="s + i" />
          </div>
        </CVS>
        <CVS icon="fa-solid fa-building-columns" title="University">
          <span><b>2018</b> - Master's Degree in Computer Engineering</span>
          <span><b>2014</b> - Bachelor's Degree in Computer Engineering</span>
        </CVS>
        <CVS icon="fa-solid fa-language" title="Languages">
          <span v-for="(level, lang, i) in languages" :key="i"><b>{{lang}}</b> - {{ level }}</span>
        </CVS>
        <CVS icon="fa-solid fa-thumbs-up" title="What I like" :data="passions" noDivider />
      </div>

      <div id="right" class="col row gx-8 bg-white mx-0 mt-0 px-4 pt-4 align-content-start">
        <div class="col d-none d-sm-block">
          <h1 class="text-start"><HW>Enrico</HW> Balsamo</h1>
          <h6 class="text-start">Software is my thing</h6>
        </div>
        <div class="no-print col-auto d-none d-sm-block pt-2">
          <a :href="pdf" download class="rounded bg-white text-primary p-1 text-uppercase bold text-decoration-none"><font-awesome-icon icon="fa-solid fa-download" />&nbsp;Download</a>
        </div>
        <Divider class="d-none d-sm-inline"/>
        <p class="text-justify text-monospace">Long time passionate to logic and models abstraction, to the extraction of Mathematics
from the real world to solve the most trivial daily problems, I've found in Computer
Science the realization of my expressiveness and insight. Passion for tech projected me
to the most important choices for my studies and work career. Willful and pushing, I
never give up to the resolution of any kind of problem or the full achievement of my
goals, leaving binaries and classic patterns to find the most effective solutions.</p>
        <Divider white />
        <div class="pt-4"></div>
        <h5><HW uppercase primary bold>technical Skills and knowledge</HW></h5>
        <Divider />
        <p class="text-justify text-monospace">
        In my everyday job in the company I have almost exclusively worked in, I have spent most of the time developing
        and growing a complex software platform spaning many services on several entities, first on each
        customer's on premise installation, then on standard <HW>cloud</HW> implementations.<br/>
        The job of each component might be completely different from one another, so choosing the best strategies and
        technologies for developing, communicating and deploying was essential.<br/>
        This way I have been able to learn very vary technologies, on each part of a running IT business, and under my guidance
        old tech and approaches were replaced with new modern and fresh <HW>microservices-oriented</HW> ways of thinking.<br/>
        <HW>Separation of concerns</HW> is my thing, and I'd rather add lines of code and complexity than hardcode,
        having in mind that this way of coding eventually decreases the lines of code and the overall complexity.
        I always look for configurability, because it allows <HW>reusability</HW> and eventual cost-saving,
        but I am not a blind fan: sometimes, quick and simple is better.<br/>
        Given the time I have worked in that company and its nature of being a startup, and the centrality of my position,
        saying that I am a <HW>full-stack developer</HW> is indeed the truth. From acquiring the customer's needs, developing the backend business logic,
        designing the database model and optimizing queries, to develop the core UI framework and implementations on both Java Swing fat-client and browser,
        designing and developing custom mobile apps. But also deploying via custom services, docker instances, kubernetes.<br/>
        <HW>Name some tech</HW>, I have probably made at least some experience with it.
        </p>
        <Divider white />
        <div class="pt-4"></div>
        <Divider />
        <p v-for="({ title, description, since }, i) in experiences" :key="title + i">
        <b>{{ title }}</b>
        <template v-if="since"> (since {{ since }})</template>
        <template v-if="description">: {{ description }}</template>
        </p>
        <div class="pt-2"></div>
        <div class="pt-4"></div>
        <!-- <div class="pt-4"></div> -->
      </div>
      <div class="row w-100 m-0 h-auto bg-primary text-white px-4 pb-2 pt-2 fs-8 align-items-end">
          This CV was made using vue.js and bootstrap. Was it necessary? No, but more fun. Source code on github.<br/>
          In compliance with the Italian legislative Decree no. 196 dated 30/06/2003, I hereby authorize you to use and process my personal details contained in this document.
      </div>
    </div>
  </div>
</template>
