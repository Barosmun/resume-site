<script>
  import "../app.postcss";
  import { AppBar, AppShell, Avatar, TabAnchor, TabGroup} from '@skeletonlabs/skeleton';
  import { base } from "$app/paths";
  import { page } from '$app/stores';

  import Logo from "$lib/assets/simple_logo_circle.svg";

  //Icons
  import IconHome from '~icons/tabler/home'
  import IconDeviceGamepad from '~icons/tabler/device-gamepad'
  import IconApps from '~icons/tabler/apps'
  import IconBriefcase from '~icons/tabler/briefcase'
  import IconBrandGithub from '~icons/tabler/brand-github'
  import IconBrandLinkedin from '~icons/tabler/brand-linkedin'
  import IconBrandItch from '~icons/tabler/brand-itch'
</script>

<AppShell>
  <svelte:fragment slot="header">

    <div class="w-full bg-surface-100-800-token py-4 flex justify-center items-center">

      <div class="w-full px-10 md:w-9/12 lg:6/12 flex justify-between xl:justify-center xl:gap-x-4 items-center">
        <div class="w-2/12 flex justify-center">
          <Avatar src="{Logo}" width="w-20" rounded="rounded-full" background="none" />
        </div>

        <div class="w-3/12 flex justify-center xl:mr-4">
          <!-- text-violet-500 sm:text-cyan-500 md:text-emerald-500 lg:text-yellow-500 xl:text-red-500 -->
          <h1 class="h1">barosmun</h1>
        </div>
        
  
        <div class="w-2/12 flex flex-row justify-center gap-x-2">
          <a href="https://github.com/barosmun"><button type="button" class="btn-icon max-md:btn-icon-sm variant-ghost-surface border-2"><IconBrandGithub width={30} height={30}/></button></a>
          <a href="https://www.linkedin.com/in/barrett-osmundson/"><button type="button" class="btn-icon max-md:btn-icon-sm variant-ghost-surface border-2"><IconBrandLinkedin width={30} height={30}/></button></a>
          <a href="https://barosmun.itch.io/"><button type="button" class="btn-icon max-md:btn-icon-sm variant-ghost-surface border-2"><IconBrandItch width={30} height={30}/></button></a>
        </div>
      </div>

    </div>


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

  </svelte:fragment>

  <!-- Router Slot -->
  <div class="container px-8 md:px-12 lg:px-24 xl:px-64 py-8 mx-auto h-full lg:h-auto">
    <slot />
  </div>
  <!-- ---- / ---- -->

  <svelte:fragment slot="footer"></svelte:fragment>
</AppShell>