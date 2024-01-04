<script lang="ts">
  import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

  let display: "time" | "category" = "time";

  import IconSortDescending from '~icons/tabler/sort-descending';
  import IconExternalLink from '~icons/tabler/external-link';
  import IconBrowser from '~icons/tabler/browser';

  let allGames = [
    {
      title: "Autocranial",
      desc: "Cyborg blasting and hacking your way through a procedurally generated dungeon",
      solo: false,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/autocranial",
      date: new Date(2023, 12 - 1, 15),
      img: "https://img.itch.zone/aW1nLzE0MzY0OTkzLnBuZw==/315x250%23c/guak9S.png"
    },
    {
      title: "Sisyphus",
      desc: "Gamified eternal punishment",
      solo: true,
      dev: "Barrett",
      html5Link: "https://barosmun.itch.io/sisyphus",
      date: new Date(2023, 2 - 1, 4),
      img: "https://img.itch.zone/aW1nLzExMjQ1NTE5LnBuZw==/315x250%23c/W2CshI.png"
    },
    {
      title: "Liftman",
      desc: "Surreal point-and-click adventure about a college student just trying to get to class who gets mistaken for the new multidimensional elevator operator",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/liftman",
      html5Link: "https://gamechoy.itch.io/liftman-html5",
      date: new Date(2020, 8 - 1, 5),
      img: "https://img.itch.zone/aW1nLzQzODAzOTQucG5n/315x250%23c/j2KB6j.png"
    },
    {
      title: "Aniyah",
      desc: "Trapped in a labyrinth of wires and monsters, escape the facility and return to your mission",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/aniyah",
      html5Link: "https://gamechoy.itch.io/aniyah-html5",
      date: new Date(2020, 4 - 1, 21),
      img: "https://img.itch.zone/aW1nLzMyOTc4ODAucG5n/315x250%23c/s3sAYS.png"
    },
    {
      title: "Meat Mountain",
      desc: "Will you defeat The Fat King and become ruler of the land? Or merely become minced meat?",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/meat-mountain",
      date: new Date(2019, 4 - 1, 30),
      img: "https://img.itch.zone/aW1nLzIwNzUzMTMucG5n/315x250%23c/PP1aJP.png"
    },
    {
      title: "Brass Garrison",
      desc: "You must defend your transport and also repair it, or face your doom as another bleached skeleton in the dunes",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/brass-garrison",
      date: new Date(2017, 8 - 1, 1),
      img: "https://img.itch.zone/aW1hZ2UvMTY0MjAwLzc2MDQ0My5wbmc=/315x250%23c/roaU0%2F.png"
    },
    {
      title: "Neuroso",
      desc: "A man runs from his fears in a time where society has little patience for cowardice",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/neuroso",
      date: new Date(2017, 4 - 1, 25),
      img: "https://img.itch.zone/aW1hZ2UvMTM4NjY5LzY0MjgwOS5wbmc=/315x250%23c/s3AUsV.png"
    },
    {
      title: "At Night They Come",
      desc: "A young boy can't sleep because of the monsters that plague him in the night",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/at-night-they-come",
      html5Link: "https://gamechoy.itch.io/at-night-they-come-html5",
      date: new Date(2016, 12 - 1, 13),
      img: "https://img.itch.zone/aW1hZ2UvMTA1MjUwLzQ4ODM2OS5wbmc=/315x250%23c/A6DGR8.png"
    },
    {
      title: "Euphrates",
      desc: "Strive to become the greatest trader in ancient Mesopotamia",
      solo: true,
      dev: "Gamechoy",
      link: "https://gamechoy.itch.io/euphrates",
      date: new Date(2016, 8 - 1, 30),
      img: "https://img.itch.zone/aW1hZ2UvODI3OTYvMzg5MjUyLnBuZw==/315x250%23c/vT4s5K.png"
    },
  ];

  let games = [...allGames];

</script>

<div class="card px-6 pb-6 pt-2 variant-soft-surface">
  <header class="card-header flex justify-between pb-4">
    <h1 class="h2">Games</h1>
    <!-- <RadioGroup>
      <RadioItem on:change={() => {display = "time"}} bind:group={display} name="time" value={'stars'}><IconStars width=24 height=24 /></RadioItem>
      <RadioItem on:change={() => {display = "category"}} bind:group={display} name="category" value={'name'}><IconAZ width=24 height=24 /></RadioItem>
    </RadioGroup> -->
  </header>

  <div class="logo-cloud grid-cols-1 gap-4">
    {#each games as game, i}
      <div class="card rounded-xl h-min flex flex-col md:grid md:grid-rows-1 md:grid-cols-5 md:px-6 md:py-4 md:gap-x-8 md:h-auto">
        <!-- border border-2 -->
        <div class="w-full flex justify-center md:col-span-2">
          <a class="p-0" href="{game.html5Link ? game.html5Link : game.link}"><img class="card rounded-xl" src="{game.img}" /> </a>
        </div>

        <div class="flex flex-col justify-between px-1 pt-2 md:col-span-2 md:pb-4 md:px-0">
          <div>
            <h4 class="h2 md:h3 mb-4">{game.title}</h4>
            <p>{game.desc}</p>
          </div>
          
          <span>
            <!-- class="flex justify-between" -->
            <span class="mr-2">{game.dev}</span>
            -
            <i class="ml-2">{game.date.toLocaleDateString()}</i>
          </span>
        </div>

        <div class="hidden md:grid justify-items-center justify-center content-center">
          <a href="{game.html5Link ? game.html5Link : game.link}"><span class="badge bg-surface-500 p-2"> <IconExternalLink width="24" height="24" /> </span></a>
        </div>

      </div>
    {/each}
  </div>

  <!-- <dl class="list-dl">

    
    {#each games as game, i}
      <div class="grid grid-cols-3 w-full">
        <img src="{game.img}" />


        <div class="flex flex-col">
          <dt class="h6 font-bold">{game.title}</dt>
          <dd>Play as a guy</dd>
          <dd>{game.date.toLocaleDateString()}</dd>
        </div>


        <a href="{game.link}"><span class="badge bg-surface-500 p-2"> <IconExternalLink width="24" height="24" /> </span></a>
      </div>
    {/each} 
  </dl> -->

</div>