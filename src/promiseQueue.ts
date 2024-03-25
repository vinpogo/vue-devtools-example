import type {
  DevtoolsPluginApi,
  ExtractSettingsTypes,
  HookPayloads,
  Hooks,
  PluginSettingsItem
} from '@vue/devtools-api'

const INSPECTOR_ID = 'queue'
let devToolsApi: DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>

type AsyncFn<T = unknown> = () => Promise<T>
const queue: AsyncFn[] = []

let processing = false

function processQueue() {
  if (!queue.length) {
    processing = false
  } else {
    const fn = queue.shift()!
    devToolsApi?.sendInspectorState(INSPECTOR_ID)
    fn()
  }
}

export function enqueue(asyncFn: AsyncFn) {
  queue.push(async () => {
    processing = true
    await asyncFn()
    processQueue()
  })

  devToolsApi?.sendInspectorState(INSPECTOR_ID)

  if (!processing) processQueue()
}

export function getAsyncFn(data: number) {
  return () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log(data)
        resolve(data)
      }, 1000)
    )
}

function createInspectorTree(payload: HookPayloads[Hooks.GET_INSPECTOR_TREE]) {
  if (payload.inspectorId !== INSPECTOR_ID) return

  payload.rootNodes = [{ id: 'queue', label: 'Queue A' }]
}

function createInspectorState(payload: HookPayloads[Hooks.GET_INSPECTOR_STATE]) {
  if (payload.inspectorId !== INSPECTOR_ID) return
  payload.state = {
    queue: queue.map((fn, idx) => ({ key: `${idx}`, value: fn }))
  }
}

export function addQueueInspector(
  api: DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>
) {
  api.addInspector({
    id: INSPECTOR_ID,
    label: 'Track my ref'
  })
  devToolsApi = api

  api.on.getInspectorTree(createInspectorTree)
  api.on.getInspectorState(createInspectorState)
}
