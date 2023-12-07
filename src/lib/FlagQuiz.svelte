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

<div class="container flex-1 p-4 h-full">
  
  <!-- {#each flags as flag, i }
    <h4 class="h2 mb-8 flex-0"> {i}: {flag.name} </h4>
    <img src={flag.url} width=200 />
    <hr class="m-2" />
  {/each} -->


  <div class="card px-4 py-32 lg:py-4 flex flex-col justify-around lg:justify-between items-center h-full">
    <h4 class="h2 mb-8 flex-0 align-middle {revealed ? '' : 'placeholder py-5 animate-pulse w-8/12 lg:w-1/2'}"> {revealed ? flag.name : ''} </h4>

    <div class="flex-1 w-full bg-no-repeat bg-center bg-contain mb-8 lg:p-24" style="background-image: url('{flag.url}');"></div>

    <div class="w-full flex-0 flex space-x-8 justify-center px-4 lg:px-8">
      <button type="button" class="btn variant-filled py-4 w-3/4" on:click={revealed ? randomFlag : reveal}>
        <span>
          {#if revealed}
            <IconReload width="32" height="32" />
          {:else}
            <IconEye width="32" height="32"/>
          {/if}
        </span>
        <span class="h3 align-middle">{revealed ? 'Reload' : 'Reveal'}</span>
      </button>

      <!-- <button type="button" class="btn variant-filled py-4 w-full" on:click={randomFlag}>
        <span><IconReload width="32" height="32" /></span>
        <span class="h3">Reload</span>
      </button> -->
    </div>
    
  </div>



</div>



<!-- <div class="card p-2 m-4 variant-filled-warning -variant-soft-surface flex-1">
  <header class="card-header">(header)</header>
	<section class="p-4">(content)</section>
	<footer class="card-footer">(footer)</footer>
</div> -->