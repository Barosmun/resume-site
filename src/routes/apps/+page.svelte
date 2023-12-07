<script lang="ts">

  import FlagQuiz from "$lib/FlagQuiz.svelte";
  import { AppBar, AppRail, AppRailAnchor, AppRailTile } from "@skeletonlabs/skeleton";

  // Icons
  import IconFlagQuestion from '~icons/tabler/flag-question';
  import IconArrowLeft from '~icons/tabler/arrow-left';

  let currentTile: number = 0;

</script>

<div class="card bg-surface-50-900-token rounded-none flex h-full">
    <AppRail class="flex-0 h-full">
        <!-- Lead -->
        <svelte:fragment slot="lead">
            <AppRailAnchor>
                (icon)
            </AppRailAnchor>
        </svelte:fragment>
        <!-- Default -->
        <AppRailTile bind:group={currentTile} name="tile-1" value={0} title="tile-1">
            <svelte:fragment slot="lead"><div class="flex justify-center"> <IconFlagQuestion width="32" height="32" /> </div></svelte:fragment>
            <span>Flag Quiz</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-2" value={1} title="tile-2">
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Tile 2</span>
        </AppRailTile>
        <AppRailTile bind:group={currentTile} name="tile-3" value={2} title="tile-3">
            <svelte:fragment slot="lead">(icon)</svelte:fragment>
            <span>Tile 3</span>
        </AppRailTile>
        <!-- Trail -->
        <svelte:fragment slot="trail">
            <AppRailAnchor>
                (icon)
            </AppRailAnchor>
        </svelte:fragment>
    </AppRail>
    <div class="w-full flex-1 flex flex-col">
        <AppBar class="w-full flex-0">
            <svelte:fragment slot="lead"><IconArrowLeft width="24" height="24" /></svelte:fragment>
            <h4 class="h4">Flag Quiz</h4>
            <svelte:fragment slot="trail">(actions)</svelte:fragment>
        </AppBar>
        {#if currentTile == 0}
            <FlagQuiz></FlagQuiz>
        {/if}
    </div>
</div>