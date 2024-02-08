<script lang="ts">
	import { onMount } from 'svelte';
  import IconLoader from '~icons/tabler/loader'
  import * as THREE from "three"
	let loading = true;
	let el:HTMLCanvasElement;

  function resizeCanvas() {
    if(el){
      setTimeout(() => {
        el.height = el.parentElement ? el.parentElement.clientHeight : 0;
        el.width = el.parentElement ? el.parentElement.clientWidth : 0;
      }, 5);
    }
  }

	onMount(() => {
    setTimeout(() => {
      let camera : THREE.PerspectiveCamera;
      let scene : THREE.Scene;
      let renderer : THREE.WebGLRenderer;
      let cube : THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>;

      const init = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

        renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el });
        renderer.setSize( window.innerWidth, window.innerHeight );

        const geometry = new THREE.BoxGeometry( 1, 1, 1 );
        const material = new THREE.MeshBasicMaterial( { color: 0xffffff } );
        cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        camera.position.z = 5;
      }

      const render = () => {
        renderer.clear()
        renderer.render(scene, camera);
      }

      function resize(){
        if(el?.width){
           setTimeout(() => {
            renderer.setSize(el.width, el.height);
            
            camera.aspect = el.width / el.height;
            camera.updateProjectionMatrix();
          }, 7);
        }
       
      }

      const animate = () => {
        requestAnimationFrame(animate)

        cube.rotation.x += 0.005
        cube.rotation.y += 0.005

        render()
      }

      init()
      animate()

      setTimeout(() => {
        resizeCanvas();
        resize();
        loading = false;
      }, 10);

      window.addEventListener('resize', () => {resizeCanvas(); resize();});
      
      return () => {
        window.removeEventListener('resize', () => {resizeCanvas(); resize();});
      }
    }, 5);
	});
</script>

<svelte:head>
	<title>Three.js Sveltekit</title>
	<meta name="description" content="Three.js example app built with Svelte" />
</svelte:head>

{#if loading}
  <div class="w-full h-full flex items-center flex-col">
    <IconLoader class="animate-spin-slow" width={"50%"} height={"50%"}></IconLoader>
    <h1 class="h2"> loading... </h1>
  </div>
{/if}

<div class="w-full h-full">
  <canvas bind:this={el} />
</div>