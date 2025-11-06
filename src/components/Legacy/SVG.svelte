<script>
  import { parse } from 'node-html-parser'
  import Wrapper from './Wrapper.svelte'

  export let name
  export let container = ''

  const files = import.meta.glob('/src/svg/**/*.svg', {
    eager: true,
    as: 'raw',
  })

  const file = Object.keys(files).find(file => {
    // Get the basename of the fie without using the path module because path cannot be used in client code.
    const basename = file.split('/').pop()
    return basename === `${name}.svg`
  })

  if (!file) {
    throw new Error(`${name}.svg not found`)
  }

  const root = parse(files[file])
  const svg = root.querySelector('svg')
  const { innerHTML } = svg

  let props = {
    ...svg.attributes,
    ...$$restProps,
    class: `${svg.classNames} ${$$restProps.class || ''}`,
  }
</script>

<Wrapper condition={container} tag={'div'} class={container}>
  <svg aria-hidden="true" {...props}>
    {@html innerHTML}
  </svg>
</Wrapper>
