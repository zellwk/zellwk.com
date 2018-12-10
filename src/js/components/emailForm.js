// ====================================================
// Automagic handling to include entries
// in the emails that's sent via the server
// ====================================================
import zlFetch from 'zl-fetch'
import { redirect, readyModal, LaunchModal } from './modal'

/**
 * Constructs an array of entries
 * @param  {array} items - array of form items
 * @return {array}       - array of entries with {name, question, answer}
 */
const constructEntriesArray = (items) => {
  return items.map(item => {
    let question = getQuestion(item)
    let { name, answer } = getValues(item)

    return {
      question,
      answer,
      name
    }
  })
}

/**
 * Gets question
 * @param  {node} item - form item node
 * @return {String}    - question text (or undefined if node not found)
 */
const getQuestion = (item = '') => {
  let question = item.querySelector('.jsFormQuestion')
  return question ? question.innerHTML : undefined
}

/**
 * Gets name and answer values from node
 * @param  {node} item - form item node
 * @return {Object}    - {name, answer}
 */
const getValues = item => {
  let input = item.querySelector('input') || item.querySelector('textarea')
  let type = input.getAttribute('type')
  if (type === 'radio' || type === 'checkbox') return getRadioValues(item)
  return getInputValues(input)
}

const getRadioValues = item => {
  let input = item.querySelector(':checked')
  return getInputValues(input)
}

const getInputValues = input => ({
  name: input.getAttribute('name'),
  answer: input.value.trim()
})

// Get correct form items to parse
const getActiveFormItems = form => {
  const children = Array.from(form.children)
    .filter(el => el.classList.contains('jsFormItem') || el.classList.contains('jsFormGroup'))
  return children.reduce((arr, el) => {
    // Returns 1st level items
    if (el.classList.contains('jsFormItem')) return [...arr, el]

    // Ignores hidden groups
    if (el.hasAttribute('hidden')) return arr

    // Returns all items within active group that are form items
    const items = Array.from(el.children)
      .filter(el => el.matches('.jsFormItem'))
    return [...arr, ...items]
  }, [])
}

const hideGroups = (groups, activeGroupId) => {
  groups.forEach(group => {
    group.setAttribute('hidden', 'true')
    group.setAttribute('aria-hidden', 'true')

    group.querySelectorAll('[data-required]')
      .forEach(el => el.removeAttribute('required'))
  })
}

const showActiveGroup = (groups, activeGroupId) => {
  const activeGroup = groups.find(group => group.id === activeGroupId)
  activeGroup.removeAttribute('hidden')
  activeGroup.removeAttribute('aria-hidden')
  activeGroup.querySelectorAll('[data-required]')
    .forEach(el => el.setAttribute('required', true))
}

// 1. Detect currently selected filter
// 2. Set required to false for inactive form groups
// 3. Set required to true for active form groups
// 5. Show / hide form group. simple show/hide will do. No need animations
const filterChangeHandler = e => {
  const activeGroupId = e.target.getAttribute('data-target')
  const form = e.target.closest('form')
  const groups = Array.from(form.querySelectorAll('.jsFormGroup'))
  hideGroups(groups, activeGroupId)
  showActiveGroup(groups, activeGroupId)
}

const submitHandler = e => {
  e.preventDefault()
  document.dispatchEvent(readyModal)

  // Get all form items
  const formItems = getActiveFormItems(form)
  console.log(formItems)
  const entries = constructEntriesArray(formItems)

  // Trigger loading modal
  const launchModal = LaunchModal({
    titleText: 'Hold on while I send this message...',
    successText: 'Message sent! :)'
  })

  form.querySelector('button').dispatchEvent(launchModal)

  // Sent entries to server via Fetch.
  zlFetch('/email', {
    method: 'post',
    body: {
      spreadsheetId: form.dataset.spreadsheetid,
      entries
    }
  })
    .then(r => redirect(form.dataset.redirect))
    .catch(e => {
      console.log(e)
      window.alert(`Uh. Something went wrong. Can you email me at zell@zellwk.com instead? I'm on it to fix the error`)
    })
}

// Form filter
// ==========
const form = document.querySelector('.jsEmailForm')

if (form) {
  form.addEventListener('submit', submitHandler)

  const formFilter = form.querySelector('.jsGroupFilter')
  if (formFilter) {
    formFilter.addEventListener('change', filterChangeHandler)
  }
}
