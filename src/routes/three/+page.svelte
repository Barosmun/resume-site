<script lang="ts">
	import { onMount } from 'svelte';
	import { createScene, resize } from '$lib/scene';
  import IconLoader from '~icons/tabler/loader'

	let loading = true;
  
	let el:HTMLCanvasElement;

  function resizeCanvas() {
    console.log(el.parentElement);
    setTimeout(() => {
      el.height = el.parentElement ? el.parentElement.clientHeight : 0;
      el.width = el.parentElement ? el.parentElement.clientWidth : 0;
      setTimeout(() => {
        resize(el);
      }, 10);
    }, 5);
  }

	onMount(() => {
    setTimeout(() => {
      createScene(el);
      resizeCanvas();
      loading = false;

      window.addEventListener('resize', resizeCanvas);
      
      return () => {
        window.removeEventListener('resize', resizeCanvas);
      }
    }, 10);
	});
</script>

<svelte:head>
	<title>Three.js Sveltekit</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

{#if loading}
  <div class="w-full h-full flex items-center flex-col">
    <IconLoader class="animate-spin-slow" width={"50%"} height={"50%"}></IconLoader>
    <h1 class="h2"> loading... </h1>
  </div>
{/if}

<div class="w-full h-full">
  <canvas bind:this={el} />
</div>