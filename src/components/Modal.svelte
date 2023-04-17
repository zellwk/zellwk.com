<script>
  import gsap from 'gsap'
  import { boundingBox } from '@zellwk/javascript/browser/dom/elem.js'
  import { tick, createEventDispatcher } from 'svelte'
  import { cubicOut } from 'svelte/easing'
  import { fade } from 'svelte/transition'
  import trapFocus from '../actions/trap-focus'
  import Portal from './Portal.svelte'

  export let target = '' // CSS Selector for use with Portal
  export let launcher = '' // HTML Element to launch the Modal
  export let launcherRect = '' // Bounding box of the launcher. Use this if the launcher is in an incorrect position when the transition begins (like Convertkit Form button being positioned outside of the DOM).

  const dispatch = createEventDispatcher()

  // ========================
  // For transitions
  // ========================
  async function transitionIn(node) {
    await tick()
    const child = node.firstElementChild
    const modalRect = boundingBox(node)
    launcherRect = launcherRect || launcher.getBoundingClientRect()

    const tl = gsap.timeline({
      onComplete() {
        // Saving this comment for a blog post or sth
        dispatch('modal:opened') // This event dispatches to the parent component
        // node.dispatchEvent(new CustomEvent('endintro')) // This event works internally
      },
    })

    // Setup
    tl.set(node, {
      position: 'absolute',
      width: launcherRect.width,
      height: launcherRect.height,
      left: launcherRect.left,
      top: launcherRect.top,
      padding: 0,
    })
    tl.set(child, {
      height: 0,
      opacity: 0,
    })

    // Animate
    tl.to(node, {
      width: modalRect.width,
      left: modalRect.left,
      paddingLeft: modalRect.padding.left,
      paddingRight: modalRect.padding.right,
      duration: 0.4,
      ease: 'power2.easeInOut',
    })
    tl.to(node, {
      height: modalRect.height,
      top: modalRect.top,
      paddingTop: modalRect.padding.top,
      paddingBottom: modalRect.padding.bottom,
      duration: 0.4,
      ease: 'power0.easeInOut',
    })
    tl.to(child, {
      height: 'auto',
      opacity: 1,
      duration: 0.1,
      ease: 'power1.easeOut',
    })

    return {
      duration: tl.totalDuration() * 1000,
      async tick(t) {
        return tl.progress(t)
      },
    }
  }
</script>

<Portal {target}>
  <div
    class="ModalContainer"
    use:trapFocus
    on:escape
    transition:fade={{ easing: cubicOut }}
  >
    <div class="l-wrap">
      <div class="Modal" in:transitionIn>
        <div class="Modalcontent">
          <slot />
        </div>
      </div>
    </div>
  </div>
</Portal>
