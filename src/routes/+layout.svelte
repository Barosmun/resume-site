<script>
  import "../app.postcss";
  import { AppBar, AppShell, Avatar, TabAnchor, TabGroup} from '@skeletonlabs/skeleton';
  import { base } from "$app/paths";
  import { page } from '$app/stores';

  import Logo from "$lib/assets/simple_logo_circle.svg";

  //Icons
  import IconHome from '~icons/tabler/home'
  import IconUser from '~icons/tabler/user'
  import IconApps from '~icons/tabler/apps'
  import IconBriefcase from '~icons/tabler/briefcase'
  import IconBrandGithub from '~icons/tabler/brand-github'
  import IconBrandLinkedin from '~icons/tabler/brand-linkedin'
  import IconBrandItch from '~icons/tabler/brand-itch'
</script>

<AppShell>
  <svelte:fragment slot="header">
    <AppBar gridColumns="grid-cols-3 md:grid-cols-11" slotLead="place-self-start md:col-start-4 md:place-self-center" slotDefault="md:col-start-6 place-self-center" slotTrail="place-self-end md:col-start-8 md:col-span-2 md:place-content-start">

      <svelte:fragment slot="lead">
        <Avatar src="{Logo}" width="w-16" rounded="rounded-full" background="none" />
      </svelte:fragment>

      <h2 class="h2" data-toc-ignore>barosmun</h2>

      <svelte:fragment slot="trail">
        <div class="flex flex-col md:flex-row">
          <a href="https://github.com/barosmun"><button type="button" class="btn-icon btn-icon-sm variant-ghost-surface"><IconBrandGithub width="26" height="26"/></button></a>
          <a href="https://www.linkedin.com/in/barrett-osmundson/"><button type="button" class="btn-icon btn-icon-sm variant-ghost-surface"><IconBrandLinkedin width="26" height="26"/></button></a>
          <a href="https://barosmun.itch.io/"><button type="button" class="btn-icon btn-icon-sm  variant-ghost-surface"><IconBrandItch width="26" height="26"/></button></a>
        </div>
      </svelte:fragment>
    
    </AppBar>


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