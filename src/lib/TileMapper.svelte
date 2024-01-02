<script lang="ts">
  import tile_1 from '$lib/data/tiles/1.png';
  import tile_2 from '$lib/data/tiles/2.png';
  import tile_3 from '$lib/data/tiles/3.png';
  import tile_4 from '$lib/data/tiles/4.png';
  import tile_5 from '$lib/data/tiles/5.png';
  import tile_6 from '$lib/data/tiles/6.png';
  import tile_7 from '$lib/data/tiles/7.png';
  import tile_8 from '$lib/data/tiles/8.png';
  import tile_9 from '$lib/data/tiles/9.png';
  import tile_10 from '$lib/data/tiles/10.png';
  import tile_11 from '$lib/data/tiles/11.png';

  // Icons
  import IconReload from '~icons/tabler/reload';
  import IconCopy from '~icons/tabler/copy';
  import IconUpload from '~icons/tabler/upload';
  import { clipboard } from '@skeletonlabs/skeleton';

  let tiles = [tile_1, tile_2, tile_3, tile_4, tile_5, tile_6, tile_7, tile_8, tile_9, tile_10, tile_11];
  let map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

  let map_string = '';
  let inputMatrix = '';

  let selected = 1;

  function setTile(row: any, col: any){
    map[row][col] = selected;
    mapString();
  }

  function save(){
    console.log(map);
  }

  function reset(){
    map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1],
		[1, 1, 1, 1, 1, 1, 1, 1, 1]
    ];

    selected = 1;
  }

  function mapString(){
    map_string = '[\n';
    for(let r = 0; r < map.length; r++){
      map_string += "["
      for(let c = 0; c < map[r].length; c++){
        map_string += map[r][c];
        if(c < map[r].length-1){
          map_string += ", "
        }
      }
      map_string += "]"
      if(r < map.length-1){
        map_string += ",\n"
      }
    }
    map_string += "\n]";
  }

  function loadMatrix(){
    var new_matrix = inputMatrix;
    new_matrix = JSON.parse(inputMatrix);
    
    if( Array.isArray(new_matrix) && new_matrix.length == map.length){
      if( Array.isArray(new_matrix[0]) && new_matrix[0].length == map[0].length){
        map = new_matrix;
      }
    }
  }

</script>

<div class="container card flex flex-col-reverse lg:flex-row w-full">

  
  <div class="flex flex-col w-full lg:w-9/12">

    <div class="w-full px-4 py-4 flex justify-around">
      

      <button type="button" class="btn variant-filled" on:click={reset}>
        <span><IconReload width="32" height="32" /></span>
        <span>Reset</span>
      </button>

      <button type="button" class="btn variant-filled" use:clipboard={map_string}>
        <span><IconCopy width="32" height="32" /></span>
        <span>Copy Matrix</span>
      </button>
    </div>

    <div class="w-full px-4 py-4 justify-center flex">
      <div class="grid grid-cols-9 grid-rows-7 w-fit h-fit">
        {#each map as row, r}
          {#each row as tile, c}
            <button on:click="{() => setTile(r, c)}">
              <img src="{tiles[tile-1]}" alt="TILE {tile}"/>
            </button>
          {/each}
        {/each}
      </div>
    </div>

    <div class="flex flex-col content-center p-4">
      <button type="button" class="btn variant-filled m-2" on:click={loadMatrix}>
        <span><IconUpload width="32" height="32" /></span>
        <span>Load Tile Matrix</span>
      </button>
      <textarea bind:value={inputMatrix} class="textarea" rows="7" placeholder="Paste tile matrix here. (remove ending comma)" />
    </div>
  </div>

  <div class="flex px-4 py-4 flex-row lg:flex-col space-x-1 lg:space-y-1 w-full lg:w-3/12 overflow-auto">
    {#each tiles as tile, i}
      <button class="flex flex-col lg:flex-row {selected == i+1 ? 'border-solid border-2' : ''}" on:click="{() => selected = i+1}"> <img src="{tile}" width="50px" height="50px" class="mr-4" alt="TILE {i+1}"/>TILE {i+1}</button>
    {/each}
  </div>

</div>