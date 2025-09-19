import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    console.log('New content available, please refresh.')
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline')
  },
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl)
  },
})

export { updateSW }
