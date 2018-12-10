/* global TimelineMax Sine Back */
import { event } from '../utils/events'

// Loader Factory
const Loader = () => {
  let loader = document.querySelector('.jsLoader')
  let spinner = loader.querySelector('.jsSpinner')
  let spinnerBox1 = spinner.children[0]
  let spinnerBox2 = spinner.children[1]
  let spinnerBox3 = spinner.children[2]

  return {
    loader,
    spinner,
    spinnerBox1,
    spinnerBox2,
    spinnerBox3,
    title: loader.querySelector('.jsLoaderTitle'),
    successIcon: loader.querySelector('.jsSuccessIcon'),
    successMessages: Array.from(loader.querySelector('.jsLoaderMessages').children),

    start () {
      let { spinnerBox1, spinnerBox3 } = this
      let tl = new TimelineMax({
        yoyo: true,
        repeat: -1
      })
      this.loadingAnimation = tl

      tl.timeScale(1.25)

      // 400% = full length distance
      tl.to(spinnerBox1, 1, { x: '400%', ease: Sine.easeInOut })
      tl.to(spinnerBox3, 1, { x: '-400%', ease: Sine.easeInOut }, '-=1')

      tl.to(spinnerBox1, 1, { y: '400%', ease: Sine.easeInOut }, '-=0.15')
      tl.to(spinnerBox3, 1, { y: '-400%', ease: Sine.easeInOut }, '-=1')

      tl.to(spinnerBox1, 1, { x: '0%', ease: Sine.easeInOut }, '-=0.15')
      tl.to(spinnerBox3, 1, { x: '0%', ease: Sine.easeInOut }, '-=1')

      tl.to(spinnerBox1, 1, { y: '0%', ease: Sine.easeInOut }, '-=0.15')
      tl.to(spinnerBox3, 1, { y: '0%', ease: Sine.easeInOut }, '-=1')
    },

    stop () {
      let { title, successIcon, successMessages, dispatchLoaderStopped } = this
      let t2 = new TimelineMax({ onComplete () { dispatchLoaderStopped() } })

      // Set success icon and message position
      t2.set(successIcon, { scale: 0.17 })
      successMessages.forEach(message => t2.set(message, { y: 30 }))

      // Set timescale
      t2.timeScale(1.5)

      // Start closing animation
      t2.add('start')
      t2.to(title, 0.15, {
        opacity: 0,
        ease: Sine.easeInOut
      })
      t2.to(spinnerBox1, 0.5, {
        x: '200%',
        y: '200%',
        opacity: 0,
        scale: 0,
        ease: Sine.easeInOut
      }, 'start')
      t2.to(spinnerBox2, 0.5, {
        scale: 0,
        opacity: 0,
        ease: Sine.easeInOut
      }, 'start')
      t2.to(spinnerBox3, 0.5, {
        x: '-200%',
        y: '-200%',
        opacity: 0,
        scale: 0,
        ease: Sine.easeInOut
      }, 'start')
      t2.to(successIcon, 1.25, {
        scale: 1,
        opacity: 1,
        visibility: 'visible',
        ease: Back.easeInOut
      }, 'start+=0.35')
      t2.staggerTo(successMessages, 1, {
        y: 0,
        opacity: 1,
        visibility: 'visible',
        ease: Back.easeOut.config(1.2)
      }, 1)
      this.loadingAnimation.stop()
    },

    dispatchLoaderStopped () {
      setTimeout(() => document.dispatchEvent(loaderStopped), 1500)
    }
  }
}

const loader = Loader()

// ======================================
// # Loader Events
// ======================================

export const startLoader = event('startLoader')
export const stopLoader = event('stopLoader')
export const loaderStopped = event('loaderStopped')

// === End Loader Events

document.addEventListener('startLoader', e => loader.start())
document.addEventListener('stopLoader', e => loader.stop())
