<script lang="ts">
  import flags from '$lib/data/country_flags.json'

  // Icons
  import IconReload from '~icons/tabler/reload';
  import IconEye from '~icons/tabler/eye';
  
  let flag: {name: string, url: string};

  let revealed = false;

  function randomFlag(){
    // let max = flags.length;
    // 194 = Zimbabwe
    // 195 = Kosovo
    // 196 = Taiwan
    let max = 194 + 1;

    let rand = Math.floor(Math.random() * max);
    flag = flags[rand];
    revealed = false;
  }

  function reveal(){
    revealed = true;
  }

  randomFlag();
</script>

  
  <!-- {#each flags as flag, i }
    <h4 class="h2 mb-8 flex-none"> {i}: {flag.name} </h4>
    <img src={flag.url} width=200 />
    <hr class="m-2" />
  {/each} -->


<div class="card px-4 py-4 flex flex-col justify-around lg:justify-between items-center h-full">
  <div class="h-1/6 lg:h-auto mb-8 flex-0 align-middle {revealed ? '' : 'placeholder animate-pulse w-8/12 lg:w-1/2 lg:py-5'}">
    <h2 class="h2"> {revealed ? flag.name : ''} </h2>
  </div>

  <div class="flex-1 w-full bg-no-repeat bg-center bg-contain mb-8 lg:p-24" style="background-image: url('{flag.url}');"></div>

  <div class="flex-none lg:px-8 h-1/6 ">
    <button type="button" class="btn variant-filled py-4" on:click={revealed ? randomFlag : reveal}>
      <span>
        {#if revealed}
          <IconReload width="32" height="32" />
        {:else}
          <IconEye width="32" height="32"/>
        {/if}
      </span>
      <span class="h3 align-middle text-clip">{revealed ? 'Reload' : 'Reveal'}</span>
    </button>

    <!-- <button type="button" class="btn variant-filled py-4 w-full" on:click={randomFlag}>
      <span><IconReload width="32" height="32" /></span>
      <span class="h3">Reload</span>
    </button> -->
  </div>
  
</div>



<!-- <div class="card p-2 m-4 variant-filled-warning -variant-soft-surface flex-1">
  <header class="card-header">(header)</header>
	<section class="p-4">(content)</section>
	<footer class="card-footer">(footer)</footer>
</div> -->