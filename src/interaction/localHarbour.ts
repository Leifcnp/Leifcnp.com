import type { IslandDefinition } from '../content/islands.ts'
import { getHarbourWorldPosition, type HarbourDefinition, type HarbourPoint } from '../content/harbours.ts'

export interface HarbourSnapshot {
  readonly islandId: string | null
  readonly selectedHarbourId: string | null
  readonly nearbyHarbourId: string | null
}

export interface LocalHarbourState extends HarbourSnapshot {
  readonly dwellSeconds: number
  readonly manualIntentAge: number
  readonly suppressed: boolean
}

export const LOCAL_HARBOUR_TUNING = {
  enterDwell: 0.35, exitRadius: 18, maxEntrySpeed: 4, manualIntentWindow: 4,
} as const

export function createLocalHarbourState(): LocalHarbourState {
  return { islandId: null, selectedHarbourId: null, nearbyHarbourId: null, dwellSeconds: 0, manualIntentAge: Infinity, suppressed: false }
}

export function noteManualHarbourIntent(state: LocalHarbourState): LocalHarbourState {
  return { ...state, manualIntentAge: 0 }
}

export function zoomOutLocalHarbour(state: LocalHarbourState): LocalHarbourState {
  return { ...state, islandId: null, nearbyHarbourId: null, dwellSeconds: 0, manualIntentAge: Infinity, suppressed: true }
}

export function clearLocalHarbourForScan(state: LocalHarbourState): LocalHarbourState {
  return { ...state, islandId: null, nearbyHarbourId: null, dwellSeconds: 0, manualIntentAge: Infinity, suppressed: false }
}

export function selectLocalHarbour(state: LocalHarbourState, id: string, harbours: readonly HarbourDefinition[]): LocalHarbourState {
  const harbour = harbours.find(harbour => harbour.id === id)
  if (!harbour || (state.islandId && harbour.islandId !== state.islandId)) return state
  return { ...state, selectedHarbourId: id }
}

/** Advance only with active simulation time; scanner and UI selection cannot count as helm intent. */
export function stepLocalHarbour(
  state: LocalHarbourState,
  frame: { readonly position: HarbourPoint; readonly speed: number; readonly deltaSeconds: number; readonly manualIntent: boolean; readonly scannerActive: boolean },
  islands: readonly IslandDefinition[],
  harbours: readonly HarbourDefinition[],
): LocalHarbourState {
  if (!Number.isFinite(frame.deltaSeconds) || frame.deltaSeconds <= 0) return state
  if (frame.scannerActive) return clearLocalHarbourForScan(state)
  if (!Number.isFinite(frame.position.x) || !Number.isFinite(frame.position.z) || !Number.isFinite(frame.speed) || frame.speed < 0) return { ...state, dwellSeconds: 0 }
  const parent = islands.find(island => island.id === 'island-projects')
  if (!parent || !harbours.some(harbour => harbour.islandId === parent.id)) return clearLocalHarbourForScan(state)
  const distance = Math.hypot(frame.position.x - parent.position.x, frame.position.z - parent.position.z)
  const manualIntentAge = frame.manualIntent ? 0 : state.manualIntentAge + frame.deltaSeconds
  const suppressed = state.suppressed && distance <= LOCAL_HARBOUR_TUNING.exitRadius
  let islandId = state.islandId
  let selectedHarbourId = state.selectedHarbourId
  let dwellSeconds = 0
  if (distance > LOCAL_HARBOUR_TUNING.exitRadius) islandId = null
  if (!islandId && !suppressed && distance <= parent.dockingTriggerRadius && frame.speed <= LOCAL_HARBOUR_TUNING.maxEntrySpeed && manualIntentAge <= LOCAL_HARBOUR_TUNING.manualIntentWindow) {
    dwellSeconds = state.dwellSeconds + frame.deltaSeconds
    if (dwellSeconds + 1e-9 >= LOCAL_HARBOUR_TUNING.enterDwell) {
      islandId = parent.id
      if (!harbours.some(harbour => harbour.id === selectedHarbourId && harbour.islandId === parent.id)) selectedHarbourId = harbours.find(harbour => harbour.islandId === parent.id)!.id
    }
  }
  let nearbyHarbourId: string | null = null
  if (islandId) {
    for (const harbour of harbours) {
      if (harbour.islandId !== islandId) continue
      const centre = getHarbourWorldPosition(harbour, islands)!
      if (Math.hypot(frame.position.x - centre.x, frame.position.z - centre.z) <= harbour.captureRadius) {
        nearbyHarbourId = harbour.id
        break
      }
    }
  }
  return { islandId, selectedHarbourId, nearbyHarbourId, dwellSeconds, manualIntentAge, suppressed }
}
