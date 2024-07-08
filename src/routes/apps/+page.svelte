<script lang="ts">
  import { base } from "$app/paths";

  // Icons
  import IconFlagQuestion from '~icons/tabler/flag-question';
  import IconGrid3x3 from '~icons/tabler/grid-3x3';
  // import IconCampfire from '~icons/tabler/campfire'
</script>
  
    
  
  
  
<div class="card px-4 py-4 h-full">
  <dl class="list-dl">
    <div>
      <span class="badge bg-surface-500 p-2"><a href={base + '/apps/flag-quiz'}> <IconFlagQuestion width="32" height="32" /> </a></span>
      <span class="flex-auto">
        <dt class="h6 font-bold">Flag Quiz</dt>
        <dd>Test your vexillological prowess by identifying random national flags from around the globe</dd>
      </span>
    </div>

    <div>
      <span class="badge bg-surface-500 p-2"><a href={base + '/apps/tile-mapper'}> <IconGrid3x3 width="32" height="32" /> </a></span>
      <span class="flex-auto">
        <dt class="h6 font-bold">Tile Mapper</dt>
        <dd>Made as a tool for my game <a class="anchor" href="https://gamechoy.itch.io/autocranial">Autocranial</a> to design room layouts</dd>
      </span>
    </div>

    <!-- <div>
      <span class="badge bg-surface-500 p-2"><a href={base + '/games/tribal'}> <IconCampfire width="32" height="32" /> </a></span>
      <span class="flex-auto">
        <dt class="h6 font-bold">Tribal</dt>
        <dd>A 3D browser game I'm making using <a class="anchor" href="https://threejs.org/">Three.js</a></dd>
      </span>
    </div> -->
  </dl>
</div>
  