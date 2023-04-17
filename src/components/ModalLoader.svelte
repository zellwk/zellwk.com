<script>
  import gsap from 'gsap'
  import { createEventDispatcher, afterUpdate } from 'svelte'
  const dispatch = createEventDispatcher()

  export let state = 'paused' // 'paused', playing, complete, or error

  let refs = {
    loaderTitle: undefined,
    spinner: undefined,
    successMessage: undefined,
    errorMessage: undefined,
  }

  afterUpdate(() => {
    if (state === 'playing') {
      startLoader()
    }

    if (state === 'success' || state === 'error') {
      stopLoader()
    }
  })

  // ========================
  // Animations
  // ========================
  function startLoader() {
    const tl = gsap.timeline({
      yoyo: true,
      repeat: -1,
    })

    const spinnerBox1 = refs.spinner.children[0]
    const spinnerBox3 = refs.spinner.children[2]

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
        dispatch('loaded', { state })
      },
    })

    t2.to(refs.loaderTitle, {
      opacity: 0,
      duration: 0.5,
      ease: 'power1.easeOut',
    })
      .to(refs.spinner.children, {
        opacity: 0,
        duration: 0.5,
        scale: 0.2,
        ease: 'sine.easeOut',
        stagger: {
          each: 0.15,
          from: 'random',
        },
      })
      .set(refs.loaderTitle, { height: 0 })

    if (state === 'success') {
      t2.set(refs.successMessage.children, { y: 50 })
        .set(refs.successMessage.children[0], {
          scale: 0.17,
        })
        .to(
          refs.successMessage.children,
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
      t2.set(refs.errorMessage.children, { y: 50 })
        .set(refs.errorMessage.children[0], {
          scale: 0.17,
        })
        .to(
          refs.errorMessage.children,
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
    <h3 class="loadingTitle" bind:this={refs.loaderTitle}>
      <slot name="title">Hold on while i sign you up!</slot>
    </h3>

    <div class="spinnerContainer">
      <div class="c-loader__spinner o-spinner" bind:this={refs.spinner}>
        <div class="o-spinner__item--pink" />
        <div class="o-spinner__item" />
        <div class="o-spinner__item" />
      </div>
    </div>
  </div>

  <div class="successMessage" bind:this={refs.successMessage}>
    <div class="emoji">🤗</div>
    <slot name="success">
      <div>Woohoo! You&rsquo;re in!</div>
      <div>Now, hold on while I redirect you.</div>
    </slot>
  </div>

  <div class="errorMessage" bind:this={refs.errorMessage}>
    <div class="emoji">❌</div>
    <div>
      <slot name="error" />
    </div>
  </div>
</div>
