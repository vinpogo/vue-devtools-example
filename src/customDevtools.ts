import { setupDevtoolsPlugin } from '@vue/devtools-api'
import { addTrackRefInspector } from './trackRef'
import { addQueueInspector } from './promiseQueue'

export function setupDevtools(app: any) {
  if (import.meta.env.DEV) {
    setupDevtoolsPlugin(
      { id: 'some-awesome-plugin-name', label: 'Awesome plugin name', app },
      (api) => {
        addTrackRefInspector(api)
        addQueueInspector(api)
      }
    )
  }
}
