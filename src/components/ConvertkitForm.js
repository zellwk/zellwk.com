// TODO: Need to cleanup ids and remove those that we no longer use
// Those with `id` are legacy forms.
// Those with `uid` are newer forms.
const IDS = {
  ayw: { id: 2439 },
  'better-fed': { id: 212048 },
  'build-calculator': { id: 361296 },
  css: { id: 2568203 },
  'default-honesty': { id: 174404 },
  'fed-wed': { id: 214866 },
  'homepage-2': { id: 465868 },
  jsr: { id: 275679 },
  learnjs: { id: 282474 },
  'mrt-simplicity': { id: 177782 },
  'rt-system': { id: 60354 },
  susy: { id: 987 },
  CUCrud: { id: 466666 },
  BYDB: { id: 466715 },
  jsSnippets: { id: 466744 },
  thinkLikeDev: { id: 467127 },
  javascript: { uid: '7d716b888b' },
}

export function getForm(name) {
  if (!name) name = 'better-fed'
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
