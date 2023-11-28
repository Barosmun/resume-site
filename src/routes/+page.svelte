<script lang="ts">
  import { Ratings } from '@skeletonlabs/skeleton';
  import { IconBrandBootstrap, IconBrandCSharp, IconBrandCouchdb, IconBrandCpp, IconBrandCss3, IconBrandGit, IconBrandGolang, IconBrandMongodb, IconBrandPython, IconBrandReact, IconBrandTailwind, IconBrandVue, IconSql, IconStarFilled } from '@tabler/icons-svelte';
  import { IconBrandAngular, IconBrandJavascript, IconBrandSvelte, IconBrandTypescript, IconHtml} from '@tabler/icons-svelte';

  var skills = [
      {
          icon: IconBrandJavascript,
          name: "javascript",
          stars: 3
      },
      {
          icon: IconBrandTypescript,
          name: "typescript",
          stars: 3
      },
      {
          icon: IconBrandAngular,
          name: "angular",
          stars: 3
      },
      {
          icon: IconBrandSvelte,
          name: "svelte",
          stars: 2
      },
      {
          icon: IconSql,
          name: "sql",
          stars: 1
      },
      {
          icon: IconHtml,
          name: "html",
          stars: 3
      },
      {
          icon: IconBrandCss3,
          name: "css",
          stars: 3
      },
      {
          icon: IconBrandMongodb,
          name: "mongo",
          stars: 1
      },
      {
          icon: IconBrandCpp,
          name: "c++",
          stars: 1
      },
      {
          icon: IconBrandGolang,
          name: "go",
          stars: 2
      },
      {
          icon: IconBrandBootstrap,
          name: "bootstrap",
          stars: 3
      },
      {
          icon: IconBrandTailwind,
          name: "tailwind",
          stars: 2
      },
      {
          icon: IconBrandCouchdb,
          name: "couchdb",
          stars: 1
      },
      {
          icon: IconBrandPython,
          name: "python",
          stars: 2
      },
      {
          icon: IconBrandReact,
          name: "react",
          stars: 1
      },
      {
          icon: IconBrandVue,
          name: "vue",
          stars: 1
      },
      
  ]

  function sortSkills(sortby: 'name' | 'stars'){
    switch(sortby){
      case 'name':
        skills.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
        break;
      case 'stars':
        skills.sort((a, b) => b.stars - a.stars);
        break;
    }
    skills = skills;
  }
  
</script>

<div class="card">
	<header class="card-header">HEADER</header>
	<section class="p-4">
    <button type="button" class="btn variant-filled" on:click={() => sortSkills('name')}>
      Sort by Name
    </button>
    <button type="button" class="btn variant-filled" on:click={() => sortSkills('stars')}>
      Sort by Experience
    </button>
  </section>
</div>

<div class="logo-cloud grid-cols-4 lg:!grid-cols-6 lg:!grid-cols-8 gap-1 pt-4">

  {#each skills as skill}
      <div class="card px-8 pt-4 pb-4 flex flex-col justify-center items-center">
        <span class="mb-2">{skill.name}</span>
        <svelte:component this={skill.icon} size={48}/>
        <Ratings bind:value={skill.stars} max={skill.stars} class="mt-4">
            <svelte:fragment slot="empty"></svelte:fragment>
            <svelte:fragment slot="half"></svelte:fragment>
            <svelte:fragment slot="full"><IconStarFilled size={12} /></svelte:fragment>
        </Ratings>
      </div>
	{/each}

</div>
