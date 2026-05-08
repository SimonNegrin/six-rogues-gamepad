<script lang="ts">
  let {
    value = $bindable(),
  }: {
    value: string
  } = $props()

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement
    value = target.value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9\s]/g, "")
      .slice(0, 8)
  }
</script>

<input
  type="text"
  maxlength={8}
  class="w-65 bg-mist-600 border-mist-400 text-mild-yellow-white text-2xl px-4 py-1 border-4 outline-0"
  {value}
  oninput={handleInput}
/>

<style>
  input {
    border-style: inset;
  }
</style>
