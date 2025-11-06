import { localStore } from '@splendidlabz/utils/dom'

const IDS = {
  javascript: 5015374,
  homepage2: 5033802,
  'better-fed': 5033810,
  calculator: 5033815,
  crud: 5033822,
  mwt: 5033864,
  ayw: 5033877,
  susy: 5033894,
  css: 5033906,
  'dev-brand': 5033972,
  'api-masterclass': 4987341,
  astro: 5041204,
  operations: 5066125,
  freelance: 5107340,
}

export function getFormID(name) {
  const id = IDS[name]
  if (!id) return new Error(`No Convertkit form found with name: ${name}`)

  return id
}

export function getCkIDFromQueryParams() {
  const searchParams = new URLSearchParams(window.location.search)
  return searchParams.get('ck_subscriber_id')
}

export function isSubscriber() {
  return localStore.get('ckSubscriberID')
}

export function saveCkID(id) {
  localStore.set('CKSubscriberID', id)
}
