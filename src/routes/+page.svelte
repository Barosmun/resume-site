<script lang="ts">
  import { RadioGroup, RadioItem, Ratings } from '@skeletonlabs/skeleton';

  import { flip } from 'svelte/animate';
  import { quintInOut } from 'svelte/easing';
  import { scale } from 'svelte/transition';

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
  import IconBrandCSharp from '~icons/tabler/brand-c-sharp'
  import IconBrandHaskell from '~icons/simple-icons/haskell'
  import IconBrandRacket from '~icons/simple-icons/racket'

  //Frameworks
  import IconBrandAngular from '~icons/tabler/brand-angular'
  import IconBrandSvelte from '~icons/tabler/brand-svelte'
  import IconBrandNode from '~icons/tabler/brand-nodejs'
  import IconBrandReact from '~icons/tabler/brand-react'
  import IconBrandVue from '~icons/tabler/brand-vue'
  import IconBrandJQuery from '~icons/simple-icons/jquery'
  import IconBrandExpress from '~icons/simple-icons/express'

  //Web Design
  import IconHtml from '~icons/tabler/html'
  import IconBrandCss3 from '~icons/tabler/brand-css3'
  import IconBrandBootstrap from '~icons/tabler/brand-bootstrap'
  import IconBrandTailwind from '~icons/tabler/brand-tailwind'

  //Dbs
  import IconSql from '~icons/tabler/sql'
  import IconBrandMongodb from '~icons/tabler/brand-mongodb'
  import IconBrandCouchdb from '~icons/tabler/brand-couchdb'

  //Game Dev
  import IconBrandGamemaker from '~icons/simple-icons/gamemaker'
  import IconBrandThreejs from '~icons/tabler/brand-threejs'
  import IconBrandGodot from '~icons/simple-icons/godotengine'
  import IconBrandBlender from '~icons/tabler/brand-blender'

  //Tools
  import IconBrandGit from '~icons/tabler/brand-git'
  import IconBrandVscode from '~icons/tabler/brand-vscode'
  import IconBrandAzure from '~icons/tabler/brand-azure'

  let skillsHeight: number;
  let previousSkillsHeight: number = 0;

  let skillsDelay: number = 0;

  $: skillsHeight, onSkillHeightChange()

  var skills_full = [
    // -------- LANGUAGES --------
    {
      isCategory: true,
      name: 'Languages',
      stars: 0
    },
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
      stars: 2
    },
    {
      icon: IconBrandCpp,
      name: "c++",
      stars: 1
    },
    {
      icon: IconBrandCSharp,
      name: "c#",
      stars: 1,
      isVerbose: true
    },
    {
      icon: IconBrandRacket,
      name: "racket",
      stars: 1,
      isVerbose: true
    },
    {
      icon: IconBrandHaskell,
      name: "haskell",
      stars: 1,
      isVerbose: true
    },

    // -------- FRAMEWORKS --------
    {
      isCategory: true,
      name: 'Frameworks',
      stars: 0
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
      icon: IconBrandJQuery,
      name: "jquery",
      stars: 2,
      isVerbose: true
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
    // -------- WEB DESIGN --------
    {
      isCategory: true,
      name: 'Web Design',
      stars: 0
    },
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
      icon: IconBrandTailwind,
      name: "tailwind",
      stars: 3
    },
    {
      icon: IconBrandBootstrap,
      name: "bootstrap",
      stars: 2
    },
    // -------- TOOLS --------
    {
      isCategory: true,
      name: 'Tools',
      stars: 0,
      isVerbose: true
    },
    {
      icon: IconBrandGit,
      name: "git",
      stars: 3,
      isVerbose: true
    },
    {
      icon: IconBrandVscode,
      name: "vs\xa0code",
      stars: 3,
      isVerbose: true
    },
    {
      icon: IconBrandNode,
      name: "node",
      stars: 2,
      isVerbose: true
    },
    {
      icon: IconBrandAzure,
      name: "azure",
      stars: 2,
      isVerbose: true
    },
    {
      icon: IconBrandExpress,
      name: "express",
      stars: 1,
      isVerbose: true
    },
    // -------- DATABASES --------
    {
      isCategory: true,
      name: 'Databases',
      stars: 0
    },
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
    {
      icon: IconBrandCouchdb,
      name: "couchdb",
      stars: 1,
      isVerbose: true
    },
    // -------- GAME DEVELOPMENT --------
    {
      isCategory: true,
      name: 'Game Development',
      stars: 0
    },
    {
      icon: IconBrandGamemaker,
      name: "gamemaker",
      stars: 3
    },
    {
      icon: IconBrandGodot,
      name: "godot",
      stars: 2
    },
    {
      icon: IconBrandThreejs,
      name: "three.js",
      stars: 1,
      isVerbose: true
    },
    {
      icon: IconBrandBlender,
      name: "blender",
      stars: 1,
      isVerbose: true
    },

    
  ]

  var skills = [...skills_full];
  var showVerbose = false;

  let sortby = 'stars';
  sortSkills(sortby);
  
  function sortSkills(sortby: any){
    switch(sortby){
      case 'name':
        skills = [...skills_full].filter((skill) => !skill.isCategory);
        skills.sort(function(a, b){
          if(a.name < b.name) { return -1; }
          if(a.name > b.name) { return 1; }
          return 0;
        })
        break;
      case 'stars':
        skills = [...skills_full].filter((skill) => !skill.isCategory);
        skills.sort((a, b) => b.stars - a.stars);
        break;
      case 'categories':
        skills = [...skills_full];
        break;
    }
    if(!showVerbose){
      skills = skills.filter(s => !s.isVerbose);
    }
    skills = skills;
  }

  function toggleVerbose(){
    showVerbose = !showVerbose;
    sortSkills(sortby);
    
  }

  function onSkillHeightChange(){
    if(skillsHeight > previousSkillsHeight){
      //skillsExpanding
      skillsDelay = 0;
    }
    else{
      //skillsContracting
      skillsDelay = 350;
    }
    previousSkillsHeight = skillsHeight;
  }
  
</script>

<style>
  .skills-container {
    height: calc(var(--skillsHeight) * 1px);
    transition: height 350ms ease-in-out;
    transition-delay: calc(var(--skillsDelay) * 1ms);
  }
</style>

<div class="main">
  <div class="card px-6 pb-6 pt-2 mb-6 variant-soft-surface">
    <header class="card-header flex justify-between">
      <h1 class="h2">About</h1>
    </header>
  
    <section class="p-4">
      I am a <b>Software Engineer</b>, <b>Web Developer</b>, and hobbyist <b>Game Developer</b> with over {new Date().getFullYear() - 2020} years of professional experience.
    </section>
  
  </div>

  <div class="card px-6 pt-2 variant-soft-surface">
    <header class="card-header flex justify-between pb-4">
      <h1 class="h2">Skills</h1>
      <RadioGroup>
        <RadioItem on:change={() => sortSkills('stars')} bind:group={sortby} name="experience" value={'stars'}><IconStars width=24 height=24 /></RadioItem>
        <RadioItem on:change={() => sortSkills('name')} bind:group={sortby} name="name" value={'name'}><IconAZ width=24 height=24 /></RadioItem>
        <RadioItem on:change={() => sortSkills('categories')} bind:group={sortby} name="categories" value={'categories'}><IconCategory width=24 height=24 /></RadioItem>
      </RadioGroup>
    </header>
    
    <div class="skills-container" style='--skillsHeight:{skillsHeight}; --skillsDelay:{skillsDelay};'>
       <section class="{'logo-cloud grid-cols-3 lg:grid-cols-6 gap-1 overflow-visible'}" bind:clientHeight={skillsHeight}>
      {#each skills as skill (skill) }
        <div animate:flip={ {duration: 700, easing: quintInOut} } in:scale={ {delay: 300} } out:scale={ {duration: 600} } class="{skill.isCategory ? 'h4 col-span-3 lg:col-span-6' :'px-8 pt-4 pb-4 flex flex-col justify-center items-center variant-soft'}">
          <span class="mb-2">{skill.name}</span>
          {#if !skill.isCategory}
            <svelte:component this={skill.icon} width=48 height=48/>
          
            <Ratings bind:value={skill.stars} max={skill.stars} class="mt-4">
              <svelte:fragment slot="empty"></svelte:fragment>
              <svelte:fragment slot="half"></svelte:fragment>
              <svelte:fragment slot="full"><IconStarFilled width=12 height=12 /></svelte:fragment>
            </Ratings>
          {/if}
        </div>
      {/each}
    </section>
    </div>
   

    <footer class="card-footer flex justify-center pt-4" >
      <button on:click={() => toggleVerbose()} type="button" class="btn variant-filled px-6 py-3">
        {#if !showVerbose}
          Show More
        {:else}
          Show Less
        {/if}
      </button>
    </footer>
  
  </div>
</div>


