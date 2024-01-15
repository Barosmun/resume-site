<script lang="ts">
  import {Avatar} from '@skeletonlabs/skeleton';

  import IconBrandAngular from '~icons/tabler/brand-angular';
  import IconBrandTypescript from '~icons/tabler/brand-typescript';
  import IconBrandBootstrap from '~icons/tabler/brand-bootstrap'
  import IconSql from '~icons/tabler/sql'
  // import IconBrandMssql from '~icons/simple-icons/microsoftsqlserver'
  import IconBrandAzure from '~icons/tabler/brand-azure';

  import IconMagni from '$lib/assets/magni.svg'

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
      icon: IconBrandTypescript,
      name: "typescript",
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

</script>

<div class="card px-6 pb-6 pt-2 mb-6 variant-soft-surface">
  <header class="card-header flex">
    <!-- <img src="{IconMagni}" width="48"/> -->
    <h1 class="h2">MAGNI</h1>
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