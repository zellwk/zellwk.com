<script>
  export let page
  export let numPagesToShow = 10 // This should be an even number

  const threshold = numPagesToShow / 2

  const { currentPage, lastPage } = page
  const parts = page.url.current.split('/')
  const dir = parts[parts.length - 2]

  // Functions to make building the HTML easier
  const link = (text, href) => `<a href=${href}>${text}</a> `
  const span = text => `<span class="is-active">${text}</span> `
  const output = (text, href) =>
    currentPage === text ? span(text) : link(text, href)
</script>

<nav class="c-pagination">
  <!-- eslint-disable -->
  {#if currentPage > 1}
    {@html link('<', page.url.prev)}
  {/if}

  {#if currentPage < threshold}
    {#each { length: threshold + 2 } as _, i}
      {@html output(i + 1, `/${dir}/${i + 1}`)}
    {/each}
    {@html span('...')}
    {@html link(lastPage, `/${dir}/${lastPage}`)}
  {/if}

  {#if currentPage >= threshold && currentPage + threshold - 1 <= lastPage}
    {@html link('1', `/${dir}/1`)}
    {@html span('...')}
    {#each { length: threshold } as _, i}
      {@const pageNum = currentPage - Math.floor(threshold / 2) + i}
      {@html output(pageNum, `/${dir}/${pageNum}`)}
    {/each}
    {@html span('...')}
    {@html link(lastPage, `/${dir}/${lastPage}`)}
  {/if}

  {#if currentPage + threshold - 1 > lastPage}
    {@html link('1', `/${dir}/1`)}
    {@html span('...')}
    {#each { length: threshold + 2 } as _, i}
      {@const pageNum = lastPage - threshold - 1 + i}
      {@html output(pageNum, `/${dir}/${pageNum}`)}
    {/each}
  {/if}

  {#if currentPage < lastPage}
    {@html link('>', page.url.next)}
  {/if}
  <!-- eslint-enable -->
</nav>
