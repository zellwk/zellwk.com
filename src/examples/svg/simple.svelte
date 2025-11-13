<script>
  import { Callout, Icon } from '@splendidlabz/svelte'
</script>

<Callout type="demo">
  <div class="box">
    <Icon icon="tabler:menu" /> Tabler's Menu
  </div>

  <div class="box">
    <Icon icon="material-symbols:menu" /> Material Symbol's menu
  </div>

  <div class="box">
    <Icon icon="zondicons:menu" /> Zondicon's menu
  </div>
</Callout>

<style>
  .box {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
</style>
