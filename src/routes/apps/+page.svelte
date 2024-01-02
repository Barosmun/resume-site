<script lang="ts">
  import { AppBar, AppRail, AppRailAnchor, AppRailTile } from "@skeletonlabs/skeleton";

  import AppList from "$lib/AppList.svelte";
  import FlagQuiz from "$lib/FlagQuiz.svelte";
  import TileMapper from "$lib/TileMapper.svelte";
  

  // Icons
  import IconMenu from '~icons/tabler/menu-2';
  import IconFlagQuestion from '~icons/tabler/flag-question';
  import IconGrid3x3 from '~icons/tabler/grid-3x3';
  import IconArrowLeft from '~icons/tabler/arrow-left';
  import IconInfoCircle from '~icons/tabler/info-circle';
  import IconCode from '~icons/tabler/code';

  let currentTile: number = 0;

  let apps = [
    {
        title: "Apps",
        app: AppList
    },
    {
        title: "Flag Quiz",
        app: FlagQuiz
    },
    {
        title: "Tile Mapper",
        app: TileMapper
    },
  ]

</script>

<div class="card bg-surface-50-900-token rounded-lg flex h-full w-full">
    <AppRail class="flex-none h-full">
        <!-- Lead -->
        <svelte:fragment slot="lead">
            <AppRailTile bind:group={currentTile} name="tile-0" value={0} title="tile-0" class="menu-tile">
                <svelte:fragment slot="lead"><div class="flex justify-center"> <IconMenu width="32" height="32" /> </div></svelte:fragment>
                <span>Apps</span>
            </AppRailTile>
        </svelte:fragment>
        <!-- Default -->
        <AppRailTile bind:group={currentTile} name="tile-1" value={1} title="tile-1">
            <svelte:fragment slot="lead"><div class="flex justify-center"> <IconFlagQuestion width="32" height="32" /> </div></svelte:fragment>
            <span>Flag Quiz</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-2" value={2} title="tile-2">
            <svelte:fragment slot="lead"><div class="flex justify-center"> <IconGrid3x3 width="32" height="32" /> </div></svelte:fragment>
            <span>Tile Mapper</span>
        </AppRailTile>
        <!-- <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Tile 2</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Tile 3</span>
        </AppRailTile> -->
        <!-- Trail -->
        <!-- <svelte:fragment slot="trail">
            <AppRailAnchor>
                (icon)
            </AppRailAnchor>
        </svelte:fragment> -->
    </AppRail>
    <div class="flex-1 flex flex-col overflow-hidden">
        <AppBar class="w-full flex-none">
            <svelte:fragment slot="lead"><button type="button" on:click={() => {currentTile = 0;}} class="btn-icon btn-icon-sm"><IconArrowLeft width="24" height="24"/></button></svelte:fragment>
            <h4 class="h4"> {apps[currentTile].title}</h4>
            <svelte:fragment slot="trail">
                <IconInfoCircle width="24" height="24" />
                <IconCode width="24" height="24" />
            </svelte:fragment>
        </AppBar>
        <div class="w-full h-full p-4 flex-1">
            <svelte:component this={apps[currentTile].app}/>
        </div>
       
    </div>
</div>