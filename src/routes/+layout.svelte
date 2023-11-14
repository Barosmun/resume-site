<script>
  import "../app.postcss";
  import { AppBar, AppShell, TabAnchor, TabGroup} from '@skeletonlabs/skeleton';
  import { base } from "$app/paths";
  import { page } from '$app/stores';
  //import { IconBrandGithub, IconBrandLinkedin, IconBriefcase, IconHome, IconMail, IconUserCircle } from '@tabler/icons-svelte';
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar padding="p-4" gridColumns="grid-cols-1" slotDefault="place-self-center" slotTrail="place-content-end">
      <h2 class="h2" data-toc-ignore>barosmun</h2>
    </AppBar>

    <TabGroup 
    justify="justify-center"
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
    flex="flex-1 lg:flex-none"
    rounded=""
    border=""
    class="bg-surface-100-800-token w-full"
    padding="px-4 py-2 lg:px-8"
    >

      <TabAnchor href={base + '/'} selected={$page.url.pathname === '/'}>
        <svelte:fragment slot="lead"><div class="flex justify-center">    </div></svelte:fragment>
        <span>Home</span> 
      </TabAnchor>
    
      <TabAnchor href={base + '/about'} selected={$page.url.pathname === '/about'}>
        <svelte:fragment slot="lead"><div class="flex justify-center">   </div></svelte:fragment>
        <span>About</span>
      </TabAnchor>
    
      <TabAnchor href={base + '/work'} selected={$page.url.pathname === '/work'}>
        <svelte:fragment slot="lead"><div class="flex justify-center">   </div></svelte:fragment>
        <span>Work</span>
      </TabAnchor>

      <TabAnchor href="https://github.com/barosmun">
        <svelte:fragment slot="lead"><div class="flex justify-center">    </div></svelte:fragment>
        <span>Github</span>
      </TabAnchor>
      
      <TabAnchor href="https://www.linkedin.com/in/barrett-osmundson/">
        <svelte:fragment slot="lead"><div class="flex justify-center">    </div></svelte:fragment>
        <span>LinkedIn</span>
      </TabAnchor>
    </TabGroup>

    <!-- <div class="flex justify-between w-28 pr-8">
          <a class="btn-icon btn-icon-sm variant-filled-surface cursor-pointer" href="https://github.com/barosmun"> <IconBrandGithub />  </a>
          <a class="btn-icon btn-icon-sm variant-filled-surface cursor-pointer" href="https://www.linkedin.com/in/barrett-osmundson/"> <IconBrandLinkedin />  </a>
        </div> -->
    <!-- <LightSwitch class="absolute top-2 right-2"/> -->
  </svelte:fragment>

  <!-- Router Slot -->
  <div class="container p-10 mx-auto">
    <slot />
  </div>
  <!-- ---- / ---- -->

  <svelte:fragment slot="footer">Footer</svelte:fragment>
</AppShell>