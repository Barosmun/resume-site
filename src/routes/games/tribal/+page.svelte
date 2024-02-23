<script lang="ts">
  import IconLoader from '~icons/tabler/loader';
  import IconInfoCircle from '~icons/tabler/info-circle';
  import IconCampfire from '~icons/tabler/campfire';
  import IconBrandThreejs from '~icons/tabler/brand-threejs';
  import IconBrandJavascript from '~icons/tabler/brand-javascript';
  import IconBrandWebGL from '~icons/simple-icons/webgl';
  import IconBrandSvelte from '~icons/tabler/brand-svelte';
  import IconPlus from '~icons/tabler/plus';
  import IconFood from '~icons/tabler/tools-kitchen-2';
  import IconProduce from '~icons/tabler/carrot';
  import IconGrain from '~icons/tabler/growth';
  import IconMeat from '~icons/tabler/meat';
  import IconFish from '~icons/tabler/fish';
  import IconEgg from '~icons/tabler/egg-fried';
  import IconWood from '~icons/tabler/tree';
  import IconStone from '~icons/tabler/mountain';


  let tribalSkills = [
    {
      icon: IconBrandThreejs,
      name: "three.js",
    },
    {
      icon: IconBrandJavascript,
      name: "javascript",
    },
    {
      icon: IconBrandWebGL,
      name: "webgl",
    },
    {
      icon: IconBrandSvelte,
      name: "svelte",
    },
    
  ]
  
  
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { beforeNavigate } from '$app/navigation';
  import * as THREE from "three"
  import { MapControls } from 'three/addons/controls/MapControls.js';
  import { SelectionBox } from 'three/addons/interactive/SelectionBox.js';
  import { SelectionHelper } from 'three/addons/interactive/SelectionHelper.js';
  import { Villager } from '$lib/tribal/villager';
  import { Building, Hut, Tree } from '$lib/tribal/buildings';
  import { Tile, TileBasic } from '$lib/tribal/tiles';

	let loading = true;
	let el : HTMLCanvasElement;
	let el_position : DOMRect;

  let onResize = () => { resizeCanvas(); }
  let onMouseDown = (event: MouseEvent) => {}
  let onMouseMove = (event: MouseEvent) => {}
  let onMouseUp = (event: MouseEvent) => {}
  let onCleanUp = () => {}
  let onAddVillager = () => {}

  function resizeCanvas() {
    if(el){
      setTimeout(() => {
        el.height = el.parentElement ? el.parentElement.clientHeight : 0;
        el.width = el.parentElement ? el.parentElement.clientWidth : 0;

        el_position = el.getBoundingClientRect();
      }, 5);
    }
  }

  let camera: THREE.PerspectiveCamera;
  let scene: THREE.Scene;
  let renderer: THREE.WebGLRenderer;
  let pointer: THREE.Vector2;
  let light_ambient: THREE.AmbientLight;
  let sky_background = 0x4CBCF0;
  
  let sun_color = 0xfff0ee;
  let sun_group: THREE.Group;
  let sun: THREE.DirectionalLight;

  let camera_controls: MapControls;

  let raycaster: THREE.Raycaster;

  let selectionBox: SelectionBox;
  let selectionHelper: SelectionHelper;

  let day_length = 1000; // 1000
  let day_time = 0; // 0
  let day_count = 0; // 0

  let villager_appetite = 3; // 3
  

  let stats = {
    //foods
    produce: 50,
    grain: 0,
    meat: 25,
    fish: 0,
    egg: 0,


    wood: 0,
    stone: 0
  }

  let max_villagers = 6;
  let villagers: Villager[] = [];
  let buildings: Building[] = [];
  let tiles: Tile[] = [];

  let viewVillager: {villager: Villager, index: number};

  let first: boolean = true;

  const TILE_HALF_DIST = Math.sqrt(3) / 2 * 10;
  const TILE_EDGE_DIST = TILE_HALF_DIST * 2;
  const TILE_DIAG_DIST = Math.sqrt((TILE_EDGE_DIST) ** 2 - TILE_HALF_DIST ** 2);

	onMount(() => {
    el_position = el.getBoundingClientRect();
    
    setTimeout(() => {
      
      const init = () => {
        /* BASIC SCENE SETUP */
        {
          scene = new THREE.Scene();
  
          camera = new THREE.PerspectiveCamera( 75, el.width / el.height, 0.1, 1000 );
          resetCamera();
        
          renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
          renderer.clear();
          renderer.setSize( el.width, el.height );

          resize();
          
          pointer = new THREE.Vector2();
  
          scene.background = new THREE.Color(sky_background);

          light_ambient = new THREE.AmbientLight(0xa0a0a0); // soft white light
          scene.add(light_ambient);
        }

        /* MAKE SUN */
        {
          sun = new THREE.DirectionalLight(sun_color, 1);

          sun.castShadow = false;
          sun.target = new THREE.Object3D();

          // const geo_sun = new THREE.SphereGeometry(1, 8, 4);
          // const mat_sun = new THREE.MeshToonMaterial({ color: 0xF9D71C });
          // const sun_debug = new THREE.Mesh(geo_sun, mat_sun);
  
  
          sun_group = new THREE.Group();
          sun_group.add(sun);
          // sun_group.add(sun_debug);
  
          scene.add(sun_group);
  
          sun.position.set(100, 50, 0);
          // sun_debug.position.set(100, 50, 0);
        }

        /* CAMERA CONTROLS SETUP */
        {
          camera_controls = new MapControls(camera, renderer.domElement);
  
          camera_controls.enableDamping = true;
          camera_controls.enablePan = true;
          camera_controls.enableRotate = true;
          camera_controls.enableZoom = true;
  
          camera_controls.minDistance = 10;
          camera_controls.maxDistance = 50;
  
          camera_controls.maxPolarAngle = 1.25;
          camera_controls.minPolarAngle = 0.25;
  
          camera_controls.rotateSpeed = 1;
  
          camera_controls.mouseButtons = {
            // LEFT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.ROTATE,
            // RIGHT: THREE.MOUSE.DOLLY
          }

          camera_controls.touches = {
            // ONE: THREE.TOUCH.ROTATE,
            TWO: THREE.TOUCH.DOLLY_ROTATE
          }
        }

        /* CLICK SELECTOR */
        {
          raycaster = new THREE.Raycaster();
        }

        /* BOX SELECTOR */
        {
          selectionBox = new SelectionBox(camera, scene);
          selectionHelper = new SelectionHelper(renderer, 'selectBox');
        }

        /* BASIC GROUND SETUP */
        {
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          tiles.push(new TileBasic());
          
          scene.add(tiles[0].model);
          scene.add(tiles[1].model);
          scene.add(tiles[2].model);
          scene.add(tiles[3].model);
          scene.add(tiles[4].model);
          scene.add(tiles[5].model);
          scene.add(tiles[6].model);
          
          tiles[1].model.position.set(TILE_EDGE_DIST, 0, 0);
          tiles[2].model.position.set(TILE_HALF_DIST, 0, TILE_DIAG_DIST);
          tiles[3].model.position.set(-TILE_HALF_DIST, 0, TILE_DIAG_DIST);
          tiles[4].model.position.set(-TILE_HALF_DIST, 0, -TILE_DIAG_DIST);
          tiles[5].model.position.set(TILE_HALF_DIST, 0, -TILE_DIAG_DIST);
          tiles[6].model.position.set(-TILE_EDGE_DIST, 0, 0);
        }
        
        /* BASIC BUIDLINGS SETUP */
        {
          let hut = new Hut();
          scene.add(hut.model);

          let tree = new Tree();
          scene.add(tree.model);
          tree.model.position.set(TILE_HALF_DIST, 0, TILE_DIAG_DIST);

          buildings.push(hut, tree);
        }
        
        
        /* INITIAL VILLAGER */
        {
          let new_villager = addVillager();
          if(new_villager != null){
            viewVillager = {villager: new_villager, index: 0};
          }
        }
      }

      const onPointerDown = (event: MouseEvent | PointerEvent) => {
        // console.log(event);
        if (event.button == 2) { // || (event instanceof PointerEvent && event.pointerType != "mouse" && villagers.filter((v) => v.selected).length > 0)
          raycaster.setFromCamera(pointer, camera);

          const intersects = raycaster.intersectObjects(scene.children, true)

          const intersectsBuildings = intersects.filter((o) => o.object.parent.name === "building");

          if (intersectsBuildings.length > 0) {

            villagers.filter((v) => v.selected).forEach(villager => {
              villager.set_target(intersectsBuildings[0].object.parent.owner);
            });

          }
          else{
            const intersectsTiles = intersects.filter((o) => o.object.parent.name === "tile");

            if (intersectsTiles.length > 0) {

              villagers.filter((v) => v.selected).forEach(villager => {
                villager.set_target(intersectsTiles[0].object.parent.owner);
              });
            }
          selectionHelper.isDown = false;
          }
        }

        if (event.button != 0) {
          selectionHelper.isDown = false;
          return;
        }

        for (const item of selectionBox.collection) {
          if (item.parent?.name == 'villager') {
            item.parent.owner.selected = false;

            item.parent.children.forEach(child => {
              child.material.emissive.set(0x000000);
            })
          }
        }

        let temp = [...villagers];
        villagers = [...temp];

        selectionBox.startPoint.set(
          ((event.clientX - el_position.left) / el.width) * 2 - 1,
          - ((event.clientY - el_position.top) / el.height) * 2 + 1,
          0.5);
      }

      const onPointerMove = (event: MouseEvent) => {
        
        pointer.x = ((event.clientX - el_position.left) / el.width) * 2 - 1;
        pointer.y = - ((event.clientY - el_position.top) / el.height) * 2 + 1;
        
        if (selectionHelper.isDown) {

          for (let i = 0; i < selectionBox.collection.length; i++) {

            if (selectionBox.collection[i].parent?.name == 'villager') {
              selectionBox.collection[i].parent.owner.selected = false;
              selectionBox.collection[i].parent.children.forEach(child => {
                child.material.emissive.set(0x000000);
              })
            }

          }

          selectionBox.endPoint.set(
            ((event.clientX - el_position.left) / el.width) * 2 - 1,
            - ((event.clientY - el_position.top) / el.height) * 2 + 1,
            0.5);

          const allSelected = selectionBox.select();

          for (let i = 0; i < allSelected.length; i++) {
            if (selectionBox.collection[i].parent?.name == 'villager') {
              selectionBox.collection[i].parent.owner.selected = true;
              selectionBox.collection[i].parent.children.forEach(child => {
                child.material.emissive.set(0x335599);
              })
            }
          }

          let temp = [...villagers];
          villagers = [...temp];

        }

      }

      const onPointerUp = (event: MouseEvent) => {
        if (event.button != 0) {
          return;
        }


        selectionBox.endPoint.set(
          ((event.clientX - el_position.left) / el.width) * 2 - 1,
          - ((event.clientY - el_position.top) / el.height) * 2 + 1,
          0.5);

        const allSelected = selectionBox.select();

        for (let i = 0; i < allSelected.length; i++) {
          if (allSelected[i].parent?.name == 'villager') {
            allSelected[i].parent.owner.selected = true;

            allSelected[i].parent.children.forEach(child => {
              child.material.emissive.set(0x335599);
            })

          }
        }
      }

      const addVillager = () => {

        if(villagers.length < max_villagers){
          let new_villager = new Villager()

          let temp = [...villagers];
          temp.push(new_villager);
          villagers = [...temp];
  
          scene.add(new_villager.model);
          new_villager.target = {
            model: {
              position: new THREE.Vector3(0, 0, 8)
            },
            distanceThreshold: 1
          };
          
          return new_villager;
        }

        return null;
      }
      
      const render = () => {
        renderer.clear()
        renderer.render(scene, camera);
      }
      
      const resetCamera = () => {
        // camera_controls.reset();
        camera.position.set(0, 15, 25) // 0, 15, 15
        camera.rotation.set(-0.75, 0, 0); //-0.75, 0, 0
      }

      const resize = () => {
        if(el?.width){
          setTimeout(() => {
            renderer.setSize(el.width, el.height);
            
            camera.aspect = el.width / el.height;
            camera.updateProjectionMatrix();
          }, 7);
        }
       
      }

      const villagerEat = (myFood: "produce" | "grain" | "meat" | "fish" | "egg") => {

        if(stats[myFood] >= villager_appetite){
          stats[myFood] -= villager_appetite
          return 0;
        }
        else{
          stats[myFood] = 0;
          return villager_appetite - stats[myFood];
        }
      }

      const onNewDay = () => {
        let food_resources: ("produce" | "grain" | "meat" | "fish" | "egg")[]
        = ["produce", "grain", "meat", "fish", "egg"];

        food_resources = food_resources.filter(x => stats[x] > 0);

        villagerLoop:
        for(let v = 0; v < villagers.length; v++){
          let rand_resource = food_resources[Math.floor(Math.random()*food_resources.length)];
          while(villagerEat(rand_resource) != 0){
            food_resources = food_resources.filter(x => stats[x] > 0);

            if(food_resources.length == 0){
              //Starve
              break villagerLoop;
            }

            rand_resource = food_resources[Math.floor(Math.random()*food_resources.length)];

          }
        }
      }

      const animate = () => {
        requestAnimationFrame(animate)



        /* FIRST RUN ACTIONS */
        {
          if (first) {
            /* MOVE CAMERA BACK FROM ORIGIN */
            resetCamera();
            first = false;
          }
        }

        /* CAMERA CONTROLS UPDATE */
        {
          camera_controls.update();
        }

        /* VILLAGERS UPDATE */
        {
          villagers.forEach((villager, vi) => {

          if (!villager.atTarget) {
            villager.move_to_target();
          }

          if (!villager.steeringForces.equals(new THREE.Vector3(0, 0, 0))) {
            villager.add_steering_forces();
          }
          else if (!villager.velocity.equals(new THREE.Vector3(0, 0, 0))) {
            villager.apply_friction();
          }

          if (!villager.velocity.equals(new THREE.Vector3(0, 0, 0))) {
            villager.update_position();
            villager.seperate(villagers);
          }
          else if (villager.beingPushed) {
            villager.seperate(villagers);
          }

          villager.beingPushed = false;
          });
        }

        /* SUN AND DAY EFFECTS */
        {
          if(++day_time >= day_length){
            day_time = 0;
            day_count++;
            sun_group.rotation.y = 0;
            onNewDay();
          }

          sun_group.rotation.y = 2 * Math.PI * (day_time / day_length);

          let timeFromNoon = (Math.abs((day_length/2) - day_time)) / (day_length/2);

          let sunNewRed = Math.floor(0x6f * (1-timeFromNoon) + 0x90); //0xff
          let sunNewGreen = Math.floor(0xb0 * (1-timeFromNoon) + 0x40); //0xf0
          let sunNewBlue = Math.floor(0xde * (1-timeFromNoon) + 0x10); //0xee
          let sunNewColor = `#${sunNewRed.toString(16).padStart(2, '0')}${sunNewGreen.toString(16).padStart(2, '0')}${sunNewBlue.toString(16).padStart(2, '0')}`;
          sun.color = new THREE.Color(sunNewColor);

          // scene.background = new THREE.Color(sky_background)

        }

        render()
      }

      const cleanUp = () => {
        if(renderer != null){
            console.log("DESTROY WebGL");
            renderer.forceContextLoss();
            renderer.clear();
            scene.remove(...scene.children)
          }
      }

      init()
      animate()

      onResize = () => {resizeCanvas(); resize();};
      onMouseDown = (event: MouseEvent) => {onPointerDown(event);};
      onMouseMove = (event: MouseEvent) => {onPointerMove(event);};
      onMouseUp = (event: MouseEvent) => {onPointerUp(event);};
      onCleanUp = () => {cleanUp();};
      onAddVillager = () => {addVillager();};

      setTimeout(() => {
        resizeCanvas();
        resize();
        loading = false;
      }, 10);

    }, 5);
	});

  beforeNavigate(() => {
    onCleanUp();
  });


</script>

<svelte:window
  on:resize={onResize}

  on:pointerdown={onMouseDown}
  on:pointermove={onMouseMove}
  on:pointerup={onMouseUp}
/>

<svelte:head>
  <style>
      canvas { margin: 0; overflow: hidden; border-radius: 2em;}

      .selectBox {
        border: 1px solid rgb(15, 58, 166, 0.6);
        background-color: rgba(26, 54, 126, 0.2);
        position: fixed;
        z-index: 100;
      }
  </style>
</svelte:head>


<div class="w-full h-full grid grid-cols-1 grid-rows-1 m-0 overflow-hidden">

  <canvas class="col-start-1 row-start-1" bind:this={el} />

  {#if loading}
    <div class="col-start-1 row-start-1 w-full flex items-center flex-col pointer-events-none">
      <IconLoader class="animate-spin-slow" width={"50%"} height={"50%"}/>
      <h1 class="h2"> loading... </h1>
    </div>
  {:else}
    <div class="col-start-1 row-start-1 w-full grid grid-cols-3 grid-rows-1 m-0 pointer-events-none p-4 text-center z-50">
      <div class="w-fit pt-4">
        <button class="btn btn-lg variant-filled pointer-events-auto" on:click={onAddVillager}>
          <span><IconPlus /></span>
          <span class="max-sm:hidden">Add Villager</span>
        </button>

        <h3 class="h3 underline">Villagers</h3>
        {#each villagers as villager (villager)}
          <h4 class="h4 {villager.selected ? 'text-secondary-500' : ''}">- {villager.name}</h4>
        {/each}

      </div>
    
      <div class="max-sm:hidden">
        <h2 class="h2"> Tribal </h2>
        <p class="text-xs"> v0.0.3 </p>
        <progress value={day_time} max={day_length} />
        <h4 class="h4"> Day {day_count+1} </h4>
      </div>
    
      <div class="col-start-3 justify-end pt-4">

        <div class="flex max-sm:flex-col justify-around">
          <Accordion class="pointer-events-auto w-min">
            <AccordionItem class="w-min">
              <svelte:fragment slot="summary">
                <h4 class="h4 flex item-center gap-x-2"><IconFood />{stats.produce + stats.grain + stats.meat + stats.fish + stats.egg}</h4>
              </svelte:fragment>
              <svelte:fragment slot="content">
                <span class="flex item-center gap-x-2 "> <IconProduce />{stats.produce} </span>
                <span class="flex item-center gap-x-2"> <IconGrain />{stats.grain} </span>
                <span class="flex item-center gap-x-2"> <IconMeat />{stats.meat} </span>
                <span class="flex item-center gap-x-2"> <IconFish />{stats.fish} </span>
                <span class="flex item-center gap-x-2"> <IconEgg />{stats.egg} </span>
              </svelte:fragment>
            </AccordionItem>
          </Accordion>
          <h4 class="h4 flex items-center gap-x-2 h-min py-1.5 px-4"><IconWood/>{stats.wood}</h4>
          <h4 class="h4 flex items-center gap-x-2 h-min py-1.5 px-4"><IconStone/>{stats.stone}</h4>
        </div>

      </div>
    </div>
  {/if}

</div>

<div class="main card w-full h-fit mb-4 variant-soft-surface mt-2">
  <Accordion>
    <AccordionItem>
      <svelte:fragment slot="lead"><IconInfoCircle/></svelte:fragment>
      <svelte:fragment slot="summary">About This Project</svelte:fragment>
      <svelte:fragment slot="content">
        <div class="px-6 pb-6 pt-2 mb-6">
          <header class="card-header flex">
            <IconCampfire width={48} height={48} />
            <h1 class="h2 ml-4">Tribal</h1>
          </header>
        
          <section class="p-4">
            <span class="block mb-2">
              This project reflects my first foray into <a class="anchor" href="https://threejs.org/">Three.js</a>, primarily as a new avenue for game development. 
              I was able to pick up the basics of Three.js quickly, and I was wrote some custom steering behaviors for our villagers.
              I'll continue to update this project moving forward.
            </span>
            
          </section>
          
          <section class="p-4">
            <h3 class="h3 underline">
              Controls
            </h3>
            <p>[MOUSE LEFT] - Select Villagers</p>
            <p>[MOUSE RIGHT] - Assign Villagers</p>
            <p>[MOUSE MIDDLE] - Camera Rotate</p>
            <p>[MOUSE MIDDLE + SHIFT] - Camera Pan</p>
            <p>[MOUSE SCROLL] - Camera Zoom</p>
          </section>

        
          <footer class="card-footer flex justify-center">
              <div class="snap-x snap-mandatory scroll-smooth flex gap-4 overflow-x-auto py-2">
                {#each tribalSkills as item }
                <div class="snap-start shrink-0 card py-4 w-24 lg:w-32 text-center flex flex-col justify-center items-center variant-soft">
                  <span class="mb-2">{item.name}</span>
                  <svelte:component this={item.icon} width=48 height=48/>
                </div>
                {/each}
              </div>
              
        
          </footer>
        
        </div>
      </svelte:fragment>
    </AccordionItem>
  </Accordion>
</div>