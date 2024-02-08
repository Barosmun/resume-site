import * as THREE from 'three';

class Building{
  
  constructor() {
    this.model = new THREE.Group();

    this.model.name = "building";
    this.model.owner = this;

    this.distanceThreshold = 6;
  }
  
  
}


export class Hut extends Building{
  constructor() {
    super();

    this.distanceThreshold = 6;

    /* MAKE HUT MODEL */

    const mat_hut = new THREE.MeshToonMaterial( { color: 0xBDB393 } );
    const mat_roof = new THREE.MeshToonMaterial( { color: 0x867246 } );
    const mat_door_hole = new THREE.MeshToonMaterial( { color: 0x000000 } );

    const geo_hut = new THREE.CylinderGeometry( 3, 3, 4, 8 );
    const geo_roof = new THREE.CylinderGeometry( .75, 3.75, 2, 8 );
    const geo_door = new THREE.TorusGeometry( 1.65, 0.25, 8, 3, Math.PI);
    const geo_door_hole = new THREE.CircleGeometry( 1.65, 3, 0, Math.PI);

    const hut = new THREE.Mesh(geo_hut, mat_hut);
    const roof = new THREE.Mesh(geo_roof, mat_roof);
    const door = new THREE.Mesh(geo_door, mat_hut);
    const door_hole = new THREE.Mesh(geo_door_hole, mat_door_hole);

    // hut.castShadow = true;
    // hut.receiveShadow = true;

    // roof.castShadow = true;
    // roof.receiveShadow = true;

    this.model.add(hut);
    this.model.add(roof);
    this.model.add(door);
    this.model.add(door_hole);

    hut.position.set(0, 2, 0);
    roof.position.set(0, 2 + 3, 0);
    door.position.set(0, 0, 3);
    door_hole.position.set(0, 0, 3.5);
    
    door.scale.set(1, 1.5, 4);
    door_hole.scale.set(1, 1.5, 0);

    hut.rotation.set(0, 22.5 * (Math.PI/180), 0)
    roof.rotation.set(0, 22.5 * (Math.PI/180), 0)

    /* MAKE HUT BOUNDING BOX */
    // this.bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    // this.bb.setFromObject(this.model);

  }
}

export class Tree extends Building{
  constructor() {

    super();

    this.distanceThreshold = 3;

    /* MAKE TREE MODEL */

    const mat_tree = new THREE.MeshToonMaterial( { color: 0x5C4A23 } );
    const mat_leaves = new THREE.MeshToonMaterial( { color: 0x516E2C } );


    const geo_tree = new THREE.CylinderGeometry( 0.5, 1.25, 8, 5 );
    const geo_leaves = new THREE.DodecahedronGeometry(4, 0);

    const tree = new THREE.Mesh(geo_tree, mat_tree);
    const leaves = new THREE.Mesh(geo_leaves, mat_leaves);

    // hut.castShadow = true;
    // hut.receiveShadow = true;

    // roof.castShadow = true;
    // roof.receiveShadow = true;

    this.model.add(tree);
    this.model.add(leaves);

    tree.position.set(0, 4, 0);
    leaves.position.set(0, 4 + 2.5, 0);
    leaves.scale.set(1, 0.5, 1);

    /* MAKE TREE BOUNDING BOX */
    this.bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.bb.setFromObject(this.model);

  }
}

