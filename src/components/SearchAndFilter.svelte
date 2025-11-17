<script>
  import { TextInput } from '@splendidlabz/svelte'
  import { formatDate } from 'date-fns'
  let { posts = $bindable([]) } = $props()

  let inputRef = $state(null)
  let searchTerm = $state('')

  // Combine all derivations into one for better performance
  let data = $derived.by(() => {
    const searchLower = searchTerm.toLowerCase()

    // Filter and group in one pass
    const postsByYear = {}
    for (const post of posts) {
      const titleMatch = post.data.title.toLowerCase().includes(searchLower)
      const tagMatch = post.data.tags.some(tag =>
        tag.toLowerCase().includes(searchLower),
      )
      const dateMatch = formatDate(post.data.date, 'dd MMMM yyyy')
        .toLowerCase()
        .includes(searchLower)

      if (!titleMatch && !tagMatch && !dateMatch) continue

      const year = new Date(post.data.pubDate).getFullYear()
      if (!postsByYear[year]) postsByYear[year] = []
      postsByYear[year].push(post)
    }

    // Sort years descending
    return Object.keys(postsByYear)
      .sort((a, b) => Number(b) - Number(a))
      .map(year => ({ year, posts: postsByYear[year] }))
  })

  const topicTags = [
    'html',
    'css',
    'javascript',
    'astro',
    'svelte',
    'design',
    'typography',
    'accessibility',
  ]
  const productTags = ['splendidlabz', 'magicaldevs']
  const businessAndLifeTags = ['life', 'business', 'musings', 'reflection']

  function handleTagClick(event) {
    event.preventDefault()
    searchTerm = event.target.dataset.tag
  }
</script>

<svelte:window
  on:keydown={event => {
    if (event.key === '/' && event.target !== inputRef) {
      event.preventDefault()
      inputRef.focus()
    }
  }}
/>

<form class="vertical !gap-2" onsubmit={e => e.preventDefault()}>
  <TextInput
    name="search"
    class="search-input gap-1 [--radius:0.5em]"
    hint="Hit / to focus on the search input"
    placeholder="Search"
    type="search"
    bind:ref={inputRef}
    bind:value={searchTerm}
  />

  <div class="vertical gap-1.5 june [--font-style:60] text-6 bp8:text-7">
    <div class="flow gap-[0.5em]">
      <div>topics:</div>
      {#each topicTags as tag, index (tag + index)}
        {@render filterTag(tag, index === topicTags.length - 1)}
      {/each}
    </div>
    <div class="flow gap-[0.5em]">
      <div>products:</div>
      {#each productTags as tag, index (tag + index)}
        {@render filterTag(tag, index === productTags.length - 1)}
      {/each}
    </div>
    <div class="flow gap-[0.5em]">
      <div>business and life:</div>
      {#each businessAndLifeTags as tag, index (tag + index)}
        {@render filterTag(tag, index === businessAndLifeTags.length - 1)}
      {/each}
    </div>
  </div>
</form>

<div class="vertical gap-8 mt-4">
  {#each data as { year, posts } (year)}
    <div class="vertical gap-2">
      <hgroup class="horizontal gap-2 items-baseline">
        <h2 class="h3 text-zorange-500">{year}</h2>
        <p class="june text-6 text-zgray-500">({posts.length} posts)</p>
      </hgroup>
      <div class="blog-list">
        {#each posts as post (post.data.slug)}
          <div class="blog-list-item">
            <div class="date">{formatDate(post.data.date, 'dd MMM')}</div>
            <div class="vertical gap-0.25">
              <a class="title" href="/blog/{post.data.slug}/">
                {post.data.title}
              </a>
              <span class="meta">
                {#each post.data.tags as tag, index (tag + index)}
                  {@render oneTag(tag, index === post.data.tags.length - 1)}
                {/each}
              </span>
            </div>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>

{#snippet filterTag(tag, isLast)}
  <span>
    <button class="tag" data-tag={tag} onclick={handleTagClick}
      >#{tag.toLowerCase()}</button
    >{#if !isLast}<span>,</span>{/if}
  </span>
{/snippet}

{#snippet oneTag(tag, isLast)}
  <span>
    <a class="tag" href="/tags/{tag.toLowerCase()}/">#{tag.toLowerCase()}</a
    >{#if !isLast}<span>,</span>{/if}
  </span>
{/snippet}
