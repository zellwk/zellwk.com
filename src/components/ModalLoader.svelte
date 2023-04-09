<script>
  import gsap from 'gsap'
  import { createEventDispatcher, afterUpdate } from 'svelte'

  export let state = '' // paused, playing, complete (paused by default)

  let loaderTitleRef
  let spinnerRef
  let successMessageRef
  let errorMessageRef

  afterUpdate(() => {
    if (state === 'playing') {
      startLoader()
    }

    if (state === 'complete' || state === 'error') {
      stopLoader()
    }
  })

  const dispatch = createEventDispatcher()

  // ========================
  // Animations
  // ========================
  function startLoader() {
    const tl = gsap.timeline({
      yoyo: true,
      repeat: -1,
    })

    const spinnerBox1 = spinnerRef.children[0]
    const spinnerBox3 = spinnerRef.children[2]

    tl.timeScale(1.25)
      .to(spinnerBox1, { xPercent: 400, duration: 1, ease: 'sine.easeInOut' })
      .to(
        spinnerBox3,
        { xPercent: -400, duration: 1, ease: 'sine.easeInOut' },
        '<'
      )
      .to(
        spinnerBox1,
        { yPercent: 400, duration: 1, ease: 'sine.easeInOut' },
        '-=0.15'
      )
      .to(
        spinnerBox3,
        { yPercent: -400, duration: 1, ease: 'sine.easeInOut' },
        '<'
      )
      .to(
        spinnerBox1,
        { xPercent: 0, duration: 1, ease: 'sine.easeInOut' },
        '-=0.15'
      )
      .to(
        spinnerBox3,
        { xPercent: 0, duration: 1, ease: 'sine.easeInOut' },
        '-=1'
      )
      .to(
        spinnerBox1,
        { yPercent: 0, duration: 1, ease: 'sine.easeInOut' },
        '-=0.15'
      )
      .to(
        spinnerBox3,
        { yPercent: 0, duration: 1, ease: 'sine.easeInOut' },
        '-=1'
      )
  }

  function stopLoader() {
    // Stop animation
    const t2 = gsap.timeline({
      onComplete() {
        dispatch('loadingComplete')
      },
    })

    t2.to(loaderTitleRef, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.easeOut',
    })
      .to(spinnerRef.children, {
        opacity: 0,
        duration: 0.5,
        scale: 0.2,
        ease: 'sine.easeOut',
        stagger: {
          each: 0.15,
          from: 'random',
        },
      })
      .set(loaderTitleRef, { height: 0 })

    if (state === 'complete') {
      t2.set(successMessageRef.children, { y: 50 })
        .set(successMessageRef.children[0], {
          scale: 0.17,
        })
        .to(
          successMessageRef.children,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'back.out(1.7)',
            stagger: { each: 0.2 },
          },
          '<'
        )
    }

    if (state === 'error') {
      t2.set(errorMessageRef.children, { y: 50 })
        .set(errorMessageRef.children[0], {
          scale: 0.17,
        })
        .to(
          errorMessageRef.children,
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.75,
            ease: 'back.out(1.7)',
            stagger: { each: 0.2 },
          },
          '<'
        )
    }
  }
</script>

<div class="Loader">
  <div class="loading">
    <h3 class="loadingTitle" bind:this={loaderTitleRef}>
      <slot name="title">Hold on while i sign you up!</slot>
    </h3>

    <div class="spinnerContainer">
      <div class="c-loader__spinner o-spinner" bind:this={spinnerRef}>
        <div class="o-spinner__item--pink" />
        <div class="o-spinner__item" />
        <div class="o-spinner__item" />
      </div>
    </div>
  </div>

  <div class="successMessage" bind:this={successMessageRef}>
    <div class="emoji">🤗</div>
    <div>Woohoo! You&rsquo;re in!</div>
    <div>Now, hold on while I redirect you.</div>
  </div>

  <div class="errorMessage" bind:this={errorMessageRef}>
    <div class="emoji">❌</div>
    <slot name="error"><!-- optional fallback --></slot>
  </div>
</div>
