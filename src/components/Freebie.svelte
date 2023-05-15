<script>
  import SVG from './SVG.svelte'
  import SvelteMarkdown from 'svelte-markdown'
  import Video from './Video.svelte'
  import Image from './Image.svelte'

  let klass
  export { klass as class }
  export let entry // Entry from Content Collections API
  export let name
  export let tag = 'div'

  const { data } = entry
</script>

{#if entry.status !== 'draft'}
  <div class={`Freebie ${klass}`}>
    <div class="assets">
      {#if data.svg}
        <div class="logo">
          <SVG name={data.svg} />
        </div>
      {/if}

      {#if data.image}
        <div class="image">
          <Image src={data.image} />
        </div>
      {/if}
    </div>

    <div class="content ContentBlock">
      <svelte:element this={tag} class="title">
        <SvelteMarkdown source={data.title} />
      </svelte:element>

      <slot />

      <div class="cta">
        {#if data.url}
          <a
            href={data.url.more}
            target="_blank"
            class="button"
            data-type="outline"
          >
            Find out more
          </a>
        {/if}

        <a
          href={`/freebies/${name}`}
          target="_blank"
          class="button"
          data-type="green"
        >
          Get {data.freeText} for free
        </a>
      </div>
    </div>
  </div>
{/if}
