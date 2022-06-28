import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
// import 'bootstrap'
// import 'bootstrap/dist/css/bootstrap.min.css'
import '../scss/theme.scss'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faLocationDot, faBirthdayCake, faBuildingColumns, faMobile, faAt, faDatabase, faMicrochip, faPersonRays, faLanguage, faThumbsUp, faBookOpen, faPersonSwimming, faFutbol, faArrowTrendUp, faTv, faDownload } from '@fortawesome/free-solid-svg-icons'

import { faReact, faVuejs, faJava, faJs, faAws, faStackOverflow, faGithub } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faLocationDot)
library.add(faBirthdayCake)
library.add(faBuildingColumns)
library.add(faMobile)
library.add(faAt)
library.add(faDatabase)
library.add(faMicrochip)
library.add(faPersonRays)
library.add(faLanguage)
library.add(faThumbsUp)
library.add(faBookOpen)
library.add(faPersonSwimming)
library.add(faFutbol)
library.add(faArrowTrendUp)
library.add(faTv)
library.add(faDownload)

library.add(faReact)
library.add(faVuejs)
library.add(faJava)
library.add(faJs)
library.add(faAws)
library.add(faGithub)
library.add(faStackOverflow)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
