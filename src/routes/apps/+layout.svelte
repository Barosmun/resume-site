<script lang="ts">
  import { AppBar, AppRail, AppRailAnchor, AppRailTile } from '@skeletonlabs/skeleton';
  import { base } from "$app/paths";
  import { page } from '$app/stores'; 

  // Icons
  import IconArrowLeft from '~icons/tabler/arrow-left';
  import IconInfoCircle from '~icons/tabler/info-circle';
  import IconCode from '~icons/tabler/code';

  import IconMenu from '~icons/tabler/menu-2';
  import IconCampfire from '~icons/tabler/campfire'
  import IconFlagQuestion from '~icons/tabler/flag-question';
  import IconGrid3x3 from '~icons/tabler/grid-3x3';
    import { afterNavigate } from '$app/navigation';

  let currentTile: number = 0;

  let apps = [
    {
        title: "Apps",
        icon: IconMenu,
        route: '/apps'
    },
    {
      title: "Flag Quiz",
      icon: IconFlagQuestion,
      route: '/apps/flag-quiz'
    },
    {
      title: "Tile Mapper",
      icon: IconGrid3x3,
      route: '/apps/tile-mapper'
    },
    
    {
      title: "Tribal",
      icon: IconCampfire,
      route:'/games/tribal'
    },
  ]

  afterNavigate(() => {
    currentTile = apps.findIndex((app) => app.route === $page.url.pathname);
  });

</script>
  
    
  
  
<div class="main card bg-surface-50-900-token rounded-lg flex h-fit w-full">
  <AppRail>
    {#each apps as app, i}
    <a href={base + app.route}>
       <AppRailTile bind:group={currentTile} name={app.title} value={i} title={app.title} >
        <svelte:fragment slot="lead"><div class="flex justify-center"><svelte:component this={app.icon} width=40 height=40/></div></svelte:fragment>
        <span>{app.title}</span>
      </AppRailTile>
    </a>
     
    {/each}
  </AppRail>
  <div class="flex-1 flex flex-col">
    <AppBar class="w-full flex-none">
        <svelte:fragment slot="lead"><a href={base + '/apps'}><button type="button" class="btn-icon btn-icon-sm"><IconArrowLeft width="24" height="24"/></button></a></svelte:fragment>
        <h4 class="h4"> {apps[currentTile].title}</h4>
        <svelte:fragment slot="trail">
            <!-- <IconInfoCircle width="24" height="24" />
            <IconCode width="24" height="24" /> -->
        </svelte:fragment>
    </AppBar>
    <div class="w-full h-full p-4 flex-1">
        <slot />
    </div>
   
  </div>
</div>