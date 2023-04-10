// TODO: Need to cleanup ids and remove those that we no longer use
// Those with `id` are legacy forms.
// Those with `uid` are newer forms.
const IDS = {
  BYDB: { id: 466715 },

  javascript: { uid: '7d716b888b' },
  homepage2: { uid: 'fb9a1a2ebd' },
  betterFED: { uid: '7044f2f370' },
  calculator: { uid: '1d04248439' },
  crud: { uid: '1f9a851957' },
  jsr: { uid: '4a58c689d2' },
  mwt: { uid: '0d8f021e77' },
  ayw: { uid: 'f3b19e8f7b' },
  susy: { uid: 'd9d3e0d98d' },
  css: { uid: 'feec5a376e' },
}

export function getForm(name) {
  if (!name) name = 'betterFED'
  const { id, uid } = IDS[name]
  if (!id && !uid) {
    return console.error(`No Convertkit form found with name: ${name}`)
  }

  // Return id for legacy forms
  if (id) return { id }

  // Return uid and content for newer forms
  const files = import.meta.glob('/src/convertkit/*.mdx', {
    eager: true,
    as: 'raw',
  })

  const file = Object.keys(files).find(file => {
    // Get the basename of the fie without using the path module because path cannot be used in client code.
    const basename = file.split('/').pop()
    return basename === `${name}.mdx`
  })

  return {
    uid,
    content: files[file],
  }
}
