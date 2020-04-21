const markdown = require('./markdown')
const radioSVG = `<svg width="27" height="27" viewBox="0 0 27 27">
  <title>radio </title>
  <g transform="translate(1 1)" fill="none" fill-rule="evenodd">
    <circle stroke="currentColor" cx="12.5" cy="12.5" r="12.5"/>
    <path stroke="currentColor" d="M13.497 13.614c-1.566-1.623-2.768-3.703-4.698-4.87-.574-.346-2.022.344-1.766.964l-.64 3.371c2.018 4.894 11.428 1.825 7.864-5.297-2.529-5.054-9.282.503-8.185 4.334 1.33 4.646 11.866 4.32 13.162-.32 2.23-7.983-12.68-6.59-12.04 2.085.575 7.791 10.546 2.663 13.004-.32.51-.62.458-1.751-.002-2.408C16.772 6.268 4.08 9.656 6.714 16.29c2.302 5.798 15.589 3.311 11.876-2.73-3.847-6.26-9.275-6.838-9.629.001" stroke-width="2" stroke-dasharray="148" stroke-dashoffset="-148"/>
  </g>
</svg>`

const generateUnique = length =>
  Math.random().toString(36).substring(2, 2 + length)

// Form items
const hidden = ({ name, value }) => {
  return `<div class="c-form__item jsFormItem c-form__hidden-item">
    <input type="hidden" name="${name}" value="${value}">
  </div>`
}

const input = ({
  type = 'text',
  label,
  helpText,
  name,
  placeholder,
  required,
  classes
}) => {
  return `<div class="c-form__item jsFormItem ${classes || ''}">
    <label for="${name}">
      <div class="c-form__question jsFormQuestion">
        ${markdown.inline(label)}
      </div>
      ${helpText
    ? `<div class="c-form__help-text">
            ${markdown.inline(helpText)}
          </div>`
    : ''
}
      <div class="c-form__error jsFormError"></div>
      <input
        type="${type}"
        name="${name}"
        id="${name}"
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${required ? 'data-required' : ''}
      >
    </label>
  </div>`
}

const textarea = ({
  name,
  label,
  helpText,
  placeholder,
  required,
  classes
}) => {
  return `<div class="c-form__item jsFormItem ${classes || ''}">
    <label for="textarea">
      <div class="c-form__question jsFormQuestion">
        ${markdown.inline(label)}
      </div>
      ${helpText
    ? `<div class="c-form__help-text">
            ${markdown.inline(helpText)}
          </div>`
    : ''
}
      <textarea
        name="${name}"
        id="${name}"
        ${placeholder ? `placeholder="${placeholder}"` : ''}
        ${required ? 'data-required' : ''}
      ></textarea>
    </label>
  </div>`
}

const radios = ({
  label,
  helpText,
  classes,
  name,
  required,
  filter,
  choices
}) => {
  const unique = generateUnique(5)
  const radioString = choices
    .map(choice => radio(Object.assign({}, choice, { name })))
    .join('')

  return `<div class="c-form__item--radios jsFormItem ${classes} ${filter ? 'jsGroupFilter' : ''}"
    role="group"
    aria-labelledby="${unique}"
  >
    <div class="c-form__question jsFormQuestion" id="${unique}">
      ${markdown.inline(label)}
    </div>
    ${helpText
    ? `<div class="c-form__help-text">
          ${markdown.inline(helpText)}
        </div>`
    : ''
}
    ${radioString}
  </div>
  `
}

const radio = ({
  name,
  value,
  target,
  required
}) => {
  return `<label>
    <input
      type="radio"
      name="${name}"
      value="${value}"
      ${target ? `data-target="${target}"` : ''}
      ${required ? 'required data-required' : ''}
    />
      ${radioSVG}
      <span>${markdown.inline(value)}</span>
    </label>
  `
}

// Default form (paired shortcode)
const form = (content, options) => {
  return `<form
    method="post"
    class="c-form jsEmailForm"
    data-redirect=${options.redirect}
    ${options.spreadsheet ? `data-spreadsheet=${options.spreadsheet}` : ''}
  >
    <noscript>(Hey, would you mind turning on JavaScript? This form doesn't work properly without it. I won't be able to see what you wrote). </noscript>

    ${hidden({ name: 'subject', value: options.subject })}
    ${hidden({ name: 'initial-message', value: options.initialMessage })}

    ${content}

    ${input({
      label: "What's your name?",
      name: 'name',
      placeholder: '',
      required: true
    })}

    ${input({
      label: "What's your email address?",
      name: 'email',
      type: 'email',
      placeholder: '',
      required: true
    })}

    ${hidden({ name: 'final-message', subject: options.finalMessage })}

    <div class="c-form__item">
      <button class="button" data-type="secondary" type="submit">Send my answers</button>
    </div>
  </form>`
}

module.exports = {
  form,
  hidden,
  input,
  textarea,
  radios
}
