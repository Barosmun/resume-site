import * as THREE from 'three';

class Tile {
  
  constructor() {
    this.model = new THREE.Group();
  }
  
  
}


export class TileBasic extends Tile{
  constructor() {

    super();

    let rgb_variation = 12;
    let r_variation = Math.floor((Math.random() * (rgb_variation + 1)) - (rgb_variation/2));
    let g_variation = Math.floor((Math.random() * (rgb_variation + 1)) - (rgb_variation/2));
    let b_variation = Math.floor((Math.random() * (rgb_variation + 1)) - (rgb_variation/2));

    /* MAKE TILE MODEL */
    const geo_tile = new THREE.CylinderGeometry( 10, 10, 2, 6);
    const mat_tile = new THREE.MeshToonMaterial( { 
      color: `#${(0x6F + r_variation).toString(16) }${(0x86 + g_variation).toString(16) }${(0x46 + b_variation).toString(16) }`
     } );
    const tile = new THREE.Mesh( geo_tile, mat_tile );

    this.model.add(tile);

    tile.position.set(0, -1, 0);

    /* MAKE TILE BOUNDING BOX */
    // this.bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    // this.bb.setFromObject(this.model);

    //console.log(this.bb);

  }
}

