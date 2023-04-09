<script>
  import { onMount } from 'svelte'
  import { fade, fly } from 'svelte/transition'
  import { cubicOut, sineOut } from 'svelte/easing'
  import { rem } from '@zellwk/javascript/browser/dom/font-size.js'

  import SVG from './SVG.svelte'
  import Portal from './Portal.svelte'
  import trapFocus from '../actions/trap-focus.js'

  // List of navigation items — can be put into a JSON or something later
  const nav = [
    { name: 'Learn JavaScript', link: 'https://learnjavascript.today' },
    { name: 'About', link: '/about' },
    { name: 'Articles', link: '/blog/1' },
    { name: 'Contact', link: '/contact' },
    { name: 'Newsletter', link: '/newsletter' },
  ]

  let state = 'closed'
  let offsetX
  let stagger = 100
  let initialDelay = 100

  onMount(() => {
    offsetX = rem() * -1
  })

  function openMenu() {
    state = 'open'
  }
</script>

<!-- Main Menu -->
<div class="l-wrap">
  <nav class="c-main-nav l-wrap__full">
    <div>
      <a class="c-main-nav__logo" href="/about">
        <div class="o-zell"><SVG name="zell" /></div>
      </a>
    </div>

    <div class="main-nav">
      {#each nav as item}
        <a class="o-navlink" href={item.link}>{item.name}</a>
      {/each}
      <button class="button c-main-nav__toggle" on:click={openMenu}>Menu</button
      >
    </div>
  </nav>
</div>

<!-- This is a modal, but without using the modal component... -->
{#if state === 'open'}
  <Portal>
    <div
      use:trapFocus
      on:escape={_ => (state = 'closed')}
      transition:fade={{ easing: cubicOut }}
      class="c-offsite-container"
    >
      <div class="c-offsite">
        <div class="c-offsite__header">
          <a
            in:fly={{
              x: offsetX,
              easing: sineOut,
              delay: initialDelay,
            }}
            class="c-main-nav__logo"
            href="/about"
          >
            <div class="o-zell--white">
              <SVG name="zell" />
            </div>
          </a>
          <button
            class="c-offsite__close"
            in:fly={{
              x: offsetX,
              easing: sineOut,
              delay: initialDelay + stagger,
            }}
            on:click|preventDefault={_ => (state = 'closed')}
          >
            &times;
          </button>
        </div>
        <div class="c-offsite__content">
          <nav>
            {#each nav as item, i}
              <a
                class="o-navlink--offsite"
                href={item.link}
                in:fly={{
                  x: offsetX,
                  easing: sineOut,
                  delay: initialDelay + stagger * i,
                }}>{item.name}</a
              >
            {/each}
          </nav>
        </div>
      </div>
    </div>
  </Portal>
{/if}
