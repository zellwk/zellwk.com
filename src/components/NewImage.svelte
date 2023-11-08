<script>
  async function imp(filePath) {
    const jpeg = import.meta.glob('/src/**/*.jpg')
    const png = import.meta.glob('/src/**/*.png')
    const gif = import.meta.glob('/src/**/*.gif')

    const images = Object.assign({}, jpeg, png, gif)
    const keys = Object.keys(images)
    const key = keys.find(key => key.includes(filePath))

    if (!key) throw new Error(`Image ${filePath} not found`)

    const image = await images[key]()
    return image.default
  }

  import Test from '../assets/quotes/huijing.jpg'
</script>

{#await imp('assets/tools/text-editor.png') then value}
  <img src={value.src} width={value.width} height={value.height} alt="" />
{/await}

<img src={Test.src} width={Test.width} height={Test.height} alt="" />

<!-- <Picture src={a} formats={['avif', 'webp']} densities={[1.5, 2]} alt="" /> -->
<!-- Works but doesn't benefit from Image Optimization -->
