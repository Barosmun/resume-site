<script lang="ts">
  import {Avatar} from '@skeletonlabs/skeleton';

  import IconBrandAngular from '~icons/tabler/brand-angular';
  import IconBrandTypescript from '~icons/tabler/brand-typescript';
  import IconBrandBootstrap from '~icons/tabler/brand-bootstrap'
  import IconSql from '~icons/tabler/sql'
  import IconBrandExpress from '~icons/simple-icons/express'
  import IconBrandAzure from '~icons/tabler/brand-azure';

  import IconMagni from '$lib/assets/magni.svg'
  import IconAppWindow from '~icons/tabler/app-window';

  import IconBrandSvelte from '~icons/tabler/brand-svelte';
  import IconBrandTabler from '~icons/tabler/brand-tabler';
  import IconBrandTailwind from '~icons/tabler/brand-tailwind';
  import IconBrandSkeletonUI from '~icons/tabler/skull';
  import IconBrandSimpleIcons from '~icons/simple-icons/simpleicons';
  import IconBrandGithub from '~icons/tabler/brand-github';

  let magniSkills = [
    {
      icon: IconBrandAngular,
      name: "angular",
    },
    {
      icon: IconBrandTypescript,
      name: "typescript",
    },
    {
      icon: IconBrandBootstrap,
      name: "bootstrap",
    },
    {
      icon: IconBrandExpress,
      name: "express",
    },
    {
      icon: IconSql,
      name: "sql",
    },
    {
      icon: IconBrandAzure,
      name: "azure",
    },
  ]

  let siteSkills = [
    {
      icon: IconBrandSvelte,
      name: "sveltekit",
    },
    {
      icon: IconBrandTailwind,
      name: "tailwind",
    },
    {
      icon: IconBrandSkeletonUI,
      name: "skeleton ui",
    },
    {
      icon: IconBrandTabler,
      name: "tabler",
    },
    {
      icon: IconBrandSimpleIcons,
      name: "simple icons",
    },
    {
      icon: IconBrandGithub,
      name: "github pages",
    },
  ]

</script>

<div class="main">
  <div class="card px-6 pb-6 pt-2 mb-6 variant-soft-surface">
    <header class="card-header flex">
      <img src="{IconMagni}" width="48" alt="Magni Logo"/>
      <h1 class="h2 ml-4">MAGNI</h1>
    </header>
  
    <section class="p-4">
      <span class="block mb-2">
        Since April 2021, I've been employed at <a class="anchor" href="https://thors.com/">THORS eLearning Solutions</a>,
        where I have worked on the <a class="anchor" href="https://www.magni.ai/">MAGNI</a> platform.
      </span>
       
      <span class="block mb-2">
        I spearheaded the creation of our custom <b>Learning Management System</b> and
        I am striving to continuously improve and advance our platform across its various facets:
      </span>
      
       <ul class="list-disc ml-10">
          <li>Skill Assessments</li>
          <li>Learning and Course Development</li>
          <li>Digital Checklist</li>
          <li>Asset Distribution and Purchasing</li>
       </ul>
      
    </section>
  
    <footer class="card-footer flex justify-center">
        <div class="snap-x snap-mandatory scroll-smooth flex gap-4 overflow-x-auto py-2">
          {#each magniSkills as item }
          <div class="snap-start shrink-0 card py-4 w-24 lg:w-32 text-center flex flex-col justify-center items-center variant-soft">
            <span class="mb-2">{item.name}</span>
            <svelte:component this={item.icon} width=48 height=48/>
          </div>
            <!-- <div class="card px-8 pt-4 pb-4 flex flex-col justify-center items-center w-96">
              
            </div> -->
          {/each}
        </div>
  
    </footer>
  
  </div>
  
  <div class="card px-6 pb-6 pt-2 mb-6 variant-soft-surface">
    <header class="card-header flex">
      <IconAppWindow width={48} height={48}></IconAppWindow>
      <h1 class="h2 ml-4">About This Site</h1>
    </header>
  
    <section class="p-4">
      <span class="block mb-2">
        There's been a few iterations of my personal site. The earliest versions, I made with nothing but vanilla HTML, CSS, and Javascript.
        I chose to make this site with <a class="anchor" href="https://kit.svelte.dev/">SvelteKit</a>  - which I find to be very intuitive and great for projects with a limited scope. 
      </span>
      
      <span class="block mb-2">
        I also utlizied 
        <a class="anchor" href="https://tailwindcss.com/">Tailwind CSS</a>, 
        <a class="anchor" href="https://www.skeleton.dev/">Skeleton UI</a>, 
        and the <a class="anchor" href="https://www.npmjs.com/package/unplugin-icons">unplugin-icons</a> package powered by <a class="anchor" href="https://iconify.design/">Iconify</a> 
        (with icon assets from <a class="anchor" href="https://tabler.io/icons">Tabler</a>
        and <a class="anchor" href="https://simpleicons.org/">Simple Icons</a>).
  
        This site is hosted on <a class="anchor" href="https://pages.github.com/">GitHub Pages</a>.
      </span>
      
    </section>
  
    <footer class="card-footer flex justify-center">
        <div class="snap-x snap-mandatory scroll-smooth flex gap-4 overflow-x-auto py-2">
          {#each siteSkills as item }
          <div class="snap-start shrink-0 card py-4 w-24 lg:w-32 text-center flex flex-col justify-center items-center variant-soft">
            <span class="mb-2">{item.name}</span>
            <svelte:component this={item.icon} width=48 height=48/>
          </div>
            <!-- <div class="card px-8 pt-4 pb-4 flex flex-col justify-center items-center w-96">
              
            </div> -->
          {/each}
        </div>
  
    </footer>
  
  </div>
</div>