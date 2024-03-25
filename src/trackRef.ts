import {
  type CustomInspectorNode,
  type CustomInspectorState,
  type DevtoolsPluginApi,
  type ExtractSettingsTypes,
  type HookPayloads,
  type Hooks,
  type PluginSettingsItem
} from '@vue/devtools-api'
import { type Ref } from 'vue'
import type { Deep } from './stores/deep'

const INSPECTOR_ID = 'track-refs'

let trackedRef: Ref<Deep>

export function trackRef(refToTrack: Ref<Deep>) {
  trackedRef = refToTrack
}

function flattenIt(it: Deep): Deep[] {
  const { children } = it

  return [it].concat((children ?? []).flatMap(flattenIt))
}

function getCustomInspectorTree(filterTerm: string): CustomInspectorNode[] {
  return flattenIt(trackedRef.value)
    .filter((it) => it.id.includes(filterTerm))
    .map((it) => ({ id: it.id, label: it.id }))
}

function createInspectorTree(payload: HookPayloads[Hooks.GET_INSPECTOR_TREE]) {
  if (payload.inspectorId !== INSPECTOR_ID) return

  payload.rootNodes = getCustomInspectorTree(payload.filter)
}

function getCustomInspectorState(id: string): CustomInspectorState {
  const foundNode = flattenIt(trackedRef.value).find((it) => it.id === id)
  if (!foundNode) return {}
  return {
    'the data': [
      { key: 'id', value: foundNode.id },
      { key: 'children', value: foundNode.children }
    ]
  }
}

function createInspectorState(payload: HookPayloads[Hooks.GET_INSPECTOR_STATE]) {
  if (payload.inspectorId !== INSPECTOR_ID) return
  payload.state = getCustomInspectorState(payload.nodeId)
}

export function addTrackRefInspector(
  api: DevtoolsPluginApi<ExtractSettingsTypes<Record<string, PluginSettingsItem>>>
) {
  api.addInspector({
    id: INSPECTOR_ID,
    label: 'Track my ref'
  })

  api.on.getInspectorTree(createInspectorTree)
  api.on.getInspectorState(createInspectorState)
}
