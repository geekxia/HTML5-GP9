import { getCurrentInstance } from 'vue'

export default function useGlobal (key) {
  const app = getCurrentInstance()
  return app.appContext.config.globalProperties[key]
}
