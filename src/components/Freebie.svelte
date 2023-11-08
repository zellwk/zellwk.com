<script>
  import SVG from './SVG.svelte'
  import SvelteMarkdown from 'svelte-markdown'
  import Image from './OldImage.svelte'

  let klass
  export { klass as class }
  export let entry // Entry from Content Collections API
  export let name
  export let tag = 'div'
  export let titleVersion = '1' // 1 or 2, uses title or title2. This is just a hacky way and we can improve later.

  const { data } = entry
  const title = titleVersion === '1' ? data.title : data.title2
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
        <SvelteMarkdown source={title} />
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
