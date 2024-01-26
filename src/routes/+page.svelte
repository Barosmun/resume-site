<script lang="ts">
  import { RadioGroup, RadioItem, Ratings } from '@skeletonlabs/skeleton';
  import IconStarFilled from '~icons/tabler/star-filled'
  import IconCategory from '~icons/tabler/category-filled'
  import IconStars from '~icons/tabler/stars-filled'
  import IconAZ from '~icons/tabler/sort-a-z'
  
  //Langs
  import IconBrandJavascript from '~icons/tabler/brand-javascript'
  import IconBrandTypescript from '~icons/tabler/brand-typescript'
  import IconBrandGolang from '~icons/tabler/brand-golang'
  import IconBrandJava from '~icons/tabler/coffee'
  import IconBrandPython from '~icons/tabler/brand-python'
  import IconBrandCpp from '~icons/tabler/brand-cpp'
  import IconBrandHaskell from '~icons/simple-icons/haskell'
  import IconBrandRacket from '~icons/simple-icons/racket'

  //Frameworks
  import IconBrandAngular from '~icons/tabler/brand-angular'
  import IconBrandSvelte from '~icons/tabler/brand-svelte'
  import IconBrandReact from '~icons/tabler/brand-react'
  import IconBrandVue from '~icons/tabler/brand-vue'
  import IconBrandJQuery from '~icons/simple-icons/jquery'

  //Web Design
  import IconHtml from '~icons/tabler/html'
  import IconBrandCss3 from '~icons/tabler/brand-css3'
  import IconBrandBootstrap from '~icons/tabler/brand-bootstrap'
  import IconBrandTailwind from '~icons/tabler/brand-tailwind'

  //Dbs
  import IconSql from '~icons/tabler/sql'
  import IconBrandMongodb from '~icons/tabler/brand-mongodb'
  import IconBrandCouchdb from '~icons/tabler/brand-couchdb'

  //Programs
  import IconBrandGamemaker from '~icons/simple-icons/gamemaker'

  var langs = [
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
      icon: IconBrandJava,
      name: "java",
      stars: 2
    },
    {
      icon: IconBrandPython,
      name: "python",
      stars: 2
    },
    {
      icon: IconBrandGolang,
      name: "go",
      stars: 1
    },
    {
      icon: IconBrandCpp,
      name: "c++",
      stars: 1
    },
    // {
    //   icon: IconBrandHaskell,
    //   name: "haskell",
    //   stars: 1
    // },
    // {
    //   icon: IconBrandRacket,
    //   name: "racket",
    //   stars: 1
    // },
  ]

  var web = [
    {
      icon: IconHtml,
      name: "html\xa0",
      stars: 3
    },
    {
      icon: IconBrandCss3,
      name: "css3\xa0",
      stars: 3
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
  ]

  var frameworks = [
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
      icon: IconBrandJQuery,
      name: "jquery",
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

  var programs = [
    {
      icon: IconBrandGamemaker,
      name: "gamemaker",
      stars: 3
    },
  ]

  var dbs = [
    {
      icon: IconSql,
      name: "sql\xa0",
      stars: 1
    },
    {
      icon: IconBrandMongodb,
      name: "mongo",
      stars: 1
    },
    // {
    //   icon: IconBrandCouchdb,
    //   name: "couchdb",
    //   stars: 1
    // },
  ]

  var categories = [
    {
      name: 'Languages',
      list: langs
    },
    {
      name: 'Frameworks / Libraries',
      list: frameworks
    },
    {
      name: 'Web Design',
      list: web
    },
    {
      name: 'Databases',
      list: dbs
    },
    {
      name: 'Engines',
      list: programs
    },

  ]


  var skills = [...categories[0].list];
  for(let i = 1; i < categories.length; i++){
    skills.push(...categories[i].list);
  }

  
  let sortby = 'stars';
  sortSkills(sortby);
  
  function sortSkills(sortby: any){
    console.log(sortby)
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

<div class="card px-6 pb-6 pt-2 mb-6 variant-soft-surface">
  <header class="card-header flex justify-between">
    <h1 class="h2">About</h1>
  </header>

  <section class="p-4">
    I am a <b>Software Engineer</b>, <b>Web Developer</b>, and hobbyist <b>Game Developer</b> with {new Date().getFullYear() - 2021}+ years of professional experience.
    
  </section>

</div>

<div class="card px-6 pb-6 pt-2 variant-soft-surface">
  <header class="card-header flex justify-between">
    <h1 class="h2">Skills</h1>
    <RadioGroup>
      <RadioItem on:change={() => sortSkills('stars')} bind:group={sortby} name="experience" value={'stars'}><IconStars width=24 height=24 /></RadioItem>
      <RadioItem on:change={() => sortSkills('name')} bind:group={sortby} name="name" value={'name'}><IconAZ width=24 height=24 /></RadioItem>
      <RadioItem on:change={() => sortSkills('categories')} bind:group={sortby} name="categories" value={'categories'}><IconCategory width=24 height=24 /></RadioItem>
    </RadioGroup>
  </header>

    {#if sortby == "categories"}
      {#each categories as category, i }
      <div class="card p-2 m-3 variant-ringed-surface">
        <h4 class="h4 ml-2">{categories[i].name}</h4>
        <div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-2">
          {#each categories[i].list as item }
          <div class="snap-start shrink-0 card py-4 w-32 lg:w-40 text-center flex flex-col justify-center items-center variant-soft">
            <span class="mb-2">{item.name}</span>
            <svelte:component this={item.icon} width=48 height=48/>
            <Ratings bind:value={item.stars} max={item.stars} class="mt-4">
              <svelte:fragment slot="empty"></svelte:fragment>
              <svelte:fragment slot="half"></svelte:fragment>
              <svelte:fragment slot="full"><IconStarFilled width=12 height=12 /></svelte:fragment>
            </Ratings>
          </div>
            <!-- <div class="card px-8 pt-4 pb-4 flex flex-col justify-center items-center w-96">
              
            </div> -->
          {/each}
        </div>
      </div>
      {/each}
    {:else}
      <section class="logo-cloud grid-cols-3 lg:!grid-cols-6 gap-1 pt-4">
        {#each skills as skill }
          <div class="card px-8 pt-4 pb-4 flex flex-col justify-center items-center variant-soft">
            <span class="mb-2">{skill.name}</span>
            <svelte:component this={skill.icon} width=48 height=48/>
            <Ratings bind:value={skill.stars} max={skill.stars} class="mt-4">
              <svelte:fragment slot="empty"></svelte:fragment>
              <svelte:fragment slot="half"></svelte:fragment>
              <svelte:fragment slot="full"><IconStarFilled width=12 height=12 /></svelte:fragment>
            </Ratings>
          </div>
        {/each}
      </section>
    {/if}

</div>

