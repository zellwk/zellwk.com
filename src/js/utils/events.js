// ======================================
// # Event Composition
// ======================================

// Possible event features
let bubbles = { bubbles: true }

// Composes all features
const composeFeatures = (...features) =>
  features.reduce((feats, currentFeat) => Object.assign({}, feats, ...currentFeat), {})

// Creates event
const createEvent = eventName => (...features) => new window.CustomEvent(eventName, composeFeatures(features))

// Possible event types
export const event = eventName => createEvent(eventName)()
export const eventWithDetail = eventName => detail => createEvent(eventName)({ detail })
export const bubblingEventWithDetail = eventName => detail => createEvent(eventName)(bubbles, { detail })

// === End Event Composition
