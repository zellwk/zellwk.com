<script>
  import { setCSSVar } from '@splendidlabz/utils/dom'
  let logo = null

  const hoverColors = [
    'var(--color-zpurple-500)',
    'var(--color-zorange-500)',
    'var(--color-zcyan-500)',
    'var(--color-zred-500)',
  ]

  function changeColor() {
    const randomColor =
      hoverColors[Math.floor(Math.random() * hoverColors.length)]
    setCSSVar(logo, '--text-hover-color', randomColor)
  }
</script>

<div class="wrap py-2 mt-2">
  <nav class="main-nav horizontal items-center">
    <a
      bind:this={logo}
      class="logo"
      href="/"
      onfocus={changeColor}
      onmouseenter={changeColor}>ZL</a
    >
    <div class="horizontal gap-4 ml-auto">
      <a class="link" href="/about/">About</a>
      <!-- <a class="link" href="/projects">Projects</a> -->
      <a class="link" href="/blog/">Articles</a>
      <a class="link" href="/contact/">Contact</a>
    </div>
  </nav>
</div>
