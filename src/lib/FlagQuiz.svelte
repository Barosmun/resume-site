<script lang="ts">
  import flags from '$lib/data/country_flags.json'

  // Icons
  import IconReload from '~icons/tabler/reload';
  
  let flag: {name: string, url: string};

  function randomFlag(){
    let rand = Math.floor(Math.random() * flags.length);
    flag = flags[rand];
  }

  randomFlag();
</script>

<div class="container flex-1 p-4 h-full">
  
  <!-- {#each flags as flag } -->
  <div class="card p-4 flex flex-col justify-between items-center h-full">
    <h4 class="h2 mb-8 flex-0"> {flag.name} </h4>

    <div class="flex-1 w-full bg-no-repeat bg-center bg-contain mb-8" style="background-image: url('{flag.url}');"></div>


    <button type="button" class="btn variant-filled py-4 w-full flex-0" on:click={randomFlag}>
      <span><IconReload width="32" height="32" /></span>
      <span class="h3">Reload</span>
    </button>
  </div>
  <!-- {/each} -->


</div>



<!-- <div class="card p-2 m-4 variant-filled-warning -variant-soft-surface flex-1">
  <header class="card-header">(header)</header>
	<section class="p-4">(content)</section>
	<footer class="card-footer">(footer)</footer>
</div> -->