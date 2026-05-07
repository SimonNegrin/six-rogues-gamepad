<script lang="ts">
  let {
    value = $bindable(),
  }: {
    value: string
  } = $props()
</script>

<input
  type="text"
  class="w-65 bg-mist-600 border-mist-400 text-mild-yellow-white text-2xl px-4 py-1 border-4 outline-0"
  bind:value
/>

<style>
  input {
    border-style: inset;
  }
</style>
