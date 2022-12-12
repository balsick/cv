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
  'vue.js',
  'aws',
  'node.js',
  'spring',
  'docker',
  'npm',
  'postgres',
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
  text: 'Swimming, running, trekking, working out'
}, {
  icon: 'fa-solid fa-futbol',
  text: 'Watching sports'
}, {
  icon: 'fa-solid fa-tv',
  text: 'Movies and TV shows'
}, {
  icon: 'fa-solid fa-arrow-trend-up',
  text: 'Finance'
}
])

const experiences = ref([{
  title: 'Freelance',
  since: '2022',
  description: 'I have started helping companies speed up the development of their projects',
  projects: [
    'Front-end web development (Vue.js) on a B2B / B2C italian food delivery project.'
  ]
}, {
  title: 'Software Architect @ AEC Soluzioni srl',
  since: 'February, 2015',
  projects: [
    `2022 - Design and development of JPiano® Edge, an automatically deployed environment (Docker + node.js)
    for starting and managing uncoupled containers for field communication`,
    '2022 - Design and development of JPiano® Logistics, a JPiano® Web version for companies that only move goods without producing it',
    '2021 - Design and development of JPiano® Field Edge, a lightweight version of JPiano® for communicating with plants and storing data on Cloud',
    '2021 - Design and development of JPiano® Cloud, a cloud set of components for letting small companies use JPiano® in a shared multi-tenant environment',
    '2020 - Joined the JPiano® Server development team',
    '2019 - Design and development from scratch of JPiano® Mobile (React-Native) for logistics, BI and notifications',
    '2018 - Migrating the JPiano® Web application from SpringMVC + JSP + jquery-mobile to a Spring Boot served Single Page Application',
    `2017 - Design and development from scratch of JPiano® Native Android Wear application for receiving notifications from 
    on-premise JPiano® installations without the usage of public endpoints for registration`,
    '2017 - Improved JPiano® client Java Swing application for handling multiple open functions concurrently and converted it from being single-threaded to multi-threaded',
    '2017 - Joined the JPiano® Client and Framework development teams',
    '2015 ~ 2016 - Software development of a scheduler for tasks, orders, projects and WBS for companies using JPiano®'
  ]
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
          <div class="row justify-content-around mx-0 gy-0 mt-0 px-0">
            <img v-for="(s, i) in skills" :src="getImgUrl(s)" class="logo-tech col-3 my-2 col-sm-auto no-print" :key="s + i" />
            <span v-for="(s, i) in skills" :key="s + i" class="col-3 col-sm-auto my-0 print-only">{{s}}</span>
            <!-- <span v-for="(s, i) in skills" :key="s + i" class="col-3 col-sm-auto my-0 fs-9 lh-1">
              <img :src="getImgUrl(s)" class="logo-tech col-3 my-2 col-sm-auto" /><br/>
              {{s}}
            </span> -->
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
        <p class="text-justify text-monospace">
          Software engineer with a master’s degree at Politecnico di Torino in Software Engineering, I started working in 2015
          at the age of 22 right after graduating and obtaining a Bachelor’s degree in Computer Science Engineering.
          The company I currently work for provides a software JPiano® for managing the industrial process and production.
          I have been able to develop technical skills in a wide variety of technologies, spacing from backend to frontend, databases, data analysis,
          and all that is needed to provide a service to a customer, including technologies related to operating it.
          What I expect to find in my next job is more challenges: with a baggage like this, I want to exploit my experience
          and keep feeding my <HW>curiosity</HW>:<br/> I expect to be able to get farther and farther from an operational position and become
          a pure designer and decision maker, analyzing the customer and the project's functional and business needs,
          drawing a route and guiding the team toward the goal.</p>
        <Divider white />
        <h5><HW uppercase primary bold>technical skills and knowledge</HW></h5>
        <Divider />
        <p v-for="({ title, description, since, projects }, i) in experiences" :key="title + i" class="mb-0">
        <b>{{ title }}</b>
        <template v-if="since"> (since {{ since }})</template>
        <template v-if="description">: {{ description }}</template>
        <ul v-if="projects && projects.length">
          <li v-for="(project, i) in projects" :key="project + i" class="fs-8">{{ project }}</li>
        </ul>
        </p>
        <div class="pt-1"></div>
      </div>
      <div class="row w-100 m-0 h-auto bg-primary text-white px-4 pb-2 pt-2 fs-9 align-items-end">
          This CV was made using vue.js and bootstrap. Was it necessary? No, but more fun. Read it at https://balsick.github.io/cv<br/>
          In compliance with the Italian legislative Decree no. 196 dated 30/06/2003, I hereby authorize you to use and process my personal details contained in this document.
      </div>
    </div>
  </div>
</template>
