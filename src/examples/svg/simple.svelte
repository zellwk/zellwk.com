<script>
  import Callout from '../../components/Callout.svelte'
  import { SVG } from 'splendid-ui/svelte'
</script>

<Callout type="demo">
  <div class="Box">
    <SVG icon="tabler:menu" /> Tabler's Menu
  </div>

  <div class="Box">
    <SVG icon="material-symbols:menu" /> Material Symbol's menu
  </div>

  <div class="Box">
    <SVG icon="zondicons:menu" /> Zondicon's menu
  </div>
</Callout>

<style>
  .Box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
