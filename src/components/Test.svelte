<script>
  import { Markdown, Tabcordion, TabcordionItem } from '@splendidlabz/svelte'
</script>

<Tabcordion>
  <TabcordionItem>
    {#snippet title()}
      <strong>Use Markdown Components</strong>
      <Markdown
        content="Simplify markup by skipping common tags like `p`, `ul`, `li`, and other typographic elements"
      />
    {/snippet}

    {#snippet content()}
      <Markdown
        content="Content for the stuff 1

        Maybe 2 paraghs"
      />
    {/snippet}
  </TabcordionItem>

  <TabcordionItem>
    {#snippet title()}
      <strong>Partials for Reusable Patterns</strong>
      <Markdown content="Makes things simple... blah." />
    {/snippet}
    {#snippet content()}
      <Markdown
        content="Content for the stuff 2

        Maybe 2 paraghs"
      />
    {/snippet}
  </TabcordionItem>

  <TabcordionItem>
    {#snippet title()}
      <strong>Numbered Content</strong>
      <Markdown
        content="Organize files for readability --- works with partials"
      />
    {/snippet}
    {#snippet content()}
      <Markdown
        content="Content for the stuff 3

        Maybe 2 paraghs"
      />
    {/snippet}
  </TabcordionItem>
</Tabcordion>
