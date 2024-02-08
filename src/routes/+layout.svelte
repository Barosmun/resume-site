<script lang="ts">
  import "../app.postcss";
  import { AppBar, AppShell, TabAnchor, TabGroup} from '@skeletonlabs/skeleton';
  import { base } from "$app/paths";
  import { page } from '$app/stores';
  import { onMount } from "svelte";

  //Icons
  import IconHome from '~icons/tabler/home'
  import IconDeviceGamepad from '~icons/tabler/device-gamepad'
  import IconApps from '~icons/tabler/apps'
  import IconBriefcase from '~icons/tabler/briefcase'

  //Header Components
  import Logo from '$lib/Logo.svelte';
  import Socials from '$lib/Socials.svelte';
  

  let header: HTMLDivElement;
  let tabs: HTMLDivElement;
  let slot: HTMLDivElement;

  let headerHeight: number;

  function fillDynamic() {
    headerHeight = header.offsetHeight + tabs.offsetHeight;
    slot.style.height = `${document.body.scrollHeight - headerHeight}px`;
  }
  

  onMount(() => {
    fillDynamic();

    window.addEventListener('resize', fillDynamic);
		
		return () => {
			window.removeEventListener('resize', fillDynamic);
		}

	});

</script>

<style>
  .main{width:100%}
  @media (min-width: 640px){.main{max-width:640px}}
  @media (min-width: 768px){.main{max-width:640px}}
  @media (min-width: 1024px){.main{max-width:768px}}
  @media (min-width: 1280px){.main{max-width:1024px}}
  @media (min-width: 1536px){.main{max-width:1024px}}
</style>

<AppShell>
  <svelte:fragment slot="header">

    <div bind:this={header} class="w-full bg-surface-100-800-token py-4 flex justify-center items-center">

      <!-- Normal Screens -->
      <div class="max-sm:hidden main px-8 flex justify-between items-center">
        <div class="w-2/12 flex justify-center">
          <Logo></Logo>
        </div>

        <div class="w-3/12 flex justify-center xl:mr-4 items-center">
          <h1 class="h1">barosmun</h1>
        </div>
        
  
        <div class="w-2/12 flex flex-row justify-center gap-x-2 items-center">
          <Socials></Socials>
        </div>
      </div>

      <!-- Mobile -->
      <div class="sm:hidden main mx-auto px-4 flex justify-between">
        <div class="flex items-center flex-1">
          <Logo size={16}></Logo>
          <h1 class="h1 ml-4">barosmun</h1>
        </div>
        <div class="flex justify-end items-center gap-x-1">
          <Socials size={24}></Socials>
        </div>
      </div>
    </div>

    <div bind:this={tabs}>
      <TabGroup 
      justify="justify-center"
      active="variant-filled-primary"
      hover="hover:variant-soft-primary"
      flex="flex-1 lg:flex-none"
      rounded=""
      border=""
      class="w-full bg-surface-100-800-token"
      padding="px-4 py-2 lg:px-16"
      >

        <TabAnchor href={base + '/'} selected={$page.url.pathname === '/' || $page.url.pathname === '/resume-site'}>
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconHome width="32" height="32" /> </div></svelte:fragment>
          <span>Home</span> 
        </TabAnchor>
      
        <TabAnchor href={base + '/work'} selected={$page.url.pathname === '/work' || $page.url.pathname === '/resume-site/work'}>
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconBriefcase width="32" height="32"/> </div></svelte:fragment>
          <span>Work</span>
        </TabAnchor>
        
        <TabAnchor href={base + '/games'} selected={$page.url.pathname === '/games' || $page.url.pathname === '/resume-site/games'}>
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconDeviceGamepad width="32" height="32"/> </div></svelte:fragment>
          <span>Games</span>
        </TabAnchor>
        
        <TabAnchor href={base + '/apps'} selected={$page.url.pathname === '/apps' || $page.url.pathname === '/resume-site/apps'}>
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconApps width="32" height="32"/> </div></svelte:fragment>
          <span>Apps</span>
        </TabAnchor>

        <TabAnchor href={base + '/three'} selected={$page.url.pathname === '/three' || $page.url.pathname === '/resume-site/three'}>
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconApps width="32" height="32"/> </div></svelte:fragment>
          <span>THREE</span>
        </TabAnchor>

        <!-- <TabAnchor href="https://github.com/barosmun">
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconBrandGithub width="32" height="32"/> </div></svelte:fragment>
          <span>Github</span>
        </TabAnchor> -->
        
        <!-- <TabAnchor href="https://www.linkedin.com/in/barrett-osmundson/">
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconBrandLinkedin width="32" height="32"/> </div></svelte:fragment>
          <span>LinkedIn</span>
        </TabAnchor> -->

        <!-- <TabAnchor href="https://barosmun.itch.io/">
          <svelte:fragment slot="lead"><div class="flex justify-center"> <IconBrandItch width="32" height="32"/> </div></svelte:fragment>
          <span>Itch</span>
        </TabAnchor> -->
      </TabGroup>
    </div>

  </svelte:fragment>

  <!-- Router Slot -->
  <div class="main mx-auto px-8 py-8" bind:this={slot}>
    <slot />
  </div>
  <!-- ---- / ---- -->

  <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>