import * as THREE from 'three';

export class Villager{
  
  constructor() {

    this.selected = false;
    this.holding = [];

    this.name = String.fromCharCode(97 + (Math.random() * 26) ) + "inkus";

    this.lastPosition = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.steeringForces = new THREE.Vector3(0, 0, 0);

    this.maxForce = 0.001;
    this.maxSpeed = 0.04;

    this.target = null;
    this.atTarget = false;
    this.targetDist = -1;

    this.beingPushed = false;

    /* MAKE VILLAGER MODEL */
    this.model = new THREE.Group();

    this.model.name = "villager";
    this.model.owner = this;

    const geo_villager_body = new THREE.SphereGeometry( 1, 24, 12 ); 
    // const geo_villager_body = new THREE.OctahedronGeometry( 1, 5 ); 
    const mat_villager_body = new THREE.MeshToonMaterial( { color: 0xAC9253 } );
    const villager_body = new THREE.Mesh( geo_villager_body, mat_villager_body );
    
    // const geo_villager_eye = new THREE.SphereGeometry( 0.15, 6, 6 ); 
    const geo_villager_eye = new THREE.OctahedronGeometry( 0.15, 1); 
    const mat_villager_eye = new THREE.MeshToonMaterial( { color: 0x0B0B0B } );
    const villager_eye_left = new THREE.Mesh( geo_villager_eye, mat_villager_eye );
    const villager_eye_right = new THREE.Mesh( geo_villager_eye, mat_villager_eye );

    // villager_body.castShadow = true;
    // villager_body.receiveShadow = true;
    
    this.model.add(villager_body);
    this.model.add(villager_eye_left);
    this.model.add(villager_eye_right);

    villager_body.position.set(0, 1, 0);
    
    villager_eye_left.position.set(-0.4, 1, 0.85);
    villager_eye_right.position.set(0.4, 1, 0.85);

    /* MAKE VILLAGER BOUNDING BOX */
    // this.bb = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    // this.bb.setFromObject(this.model);

    //this.bb = new THREE.Sphere(this.model.position, 1);
  }

  get_target_dist(){
    if(!this.target){
      return -1;
    }

    return this.model.position.distanceTo(this.target.model.position) - this.target.distanceThreshold;
  }

  set_target(target){
    this.target = target;
    this.look_at_target();
    this.atTarget = false;
  }

  look_at_target(){
    if(!this.target){
      return;
    }
    this.model.lookAt(this.target.model.position);
  }

  set_last_position(){
    this.lastPosition.copy(this.model.position);
  }

  check_at_target(){

    if(!this.target){
      this.atTarget = true;
      return true;
    }

    let dist = this.get_target_dist();
    
    if(dist < 0 || dist > 2){
      this.atTarget = false;
      return false;
    }
    
    this.atTarget = true;

    if(this.target.model.position.equals(new THREE.Vector3(0, 0, 8))){
      this.target = null;
    }

    return true;
  }

  move_to_target(){

    if(this.check_at_target()){
      return false;
    }

    let force_vector = new THREE.Vector3(this.target.model.position.x, 0, this.target.model.position.z);
    // console.log("\ninit: ", force_vector);

    force_vector.sub(this.model.position);
    // console.log("-pos: ",force_vector);

    force_vector.normalize();
    // console.log("normalize: ",force_vector);

    force_vector.multiplyScalar(this.maxSpeed);
    // console.log("*scaler: ",force_vector);

    if(this.get_target_dist() < 0){
      force_vector.negate();
    }

    force_vector.sub(this.velocity);
    // console.log("-velo: ",force_vector);

    force_vector.clampLength(0, this.maxForce);    
    // console.log("clamp: ",force_vector);


    this.steeringForces.add(force_vector);
  }

  seperate(villagers_array){
    let distance_threshold = 2;

    let force_vector = new THREE.Vector3(0, 0, 0);
    let count = 0;
    let seperate_vector = new THREE.Vector3();

    for (let v = 0; v < villagers_array.length; v++) {
      const villager = villagers_array[v];
  
      if(villager == this){
        // console.log("ITS ME");
        continue;
      }
      
      // This will improve speed if we include a distance threshold
      if(this.model.position.distanceTo(villager.model.position) > distance_threshold){
        // console.log("TOO FAR");
        continue;
      }

      villager.beingPushed = true;

      seperate_vector.subVectors(villager.model.position, this.model.position);
      if(seperate_vector.x == 0){
        seperate_vector.x = Math.random() * 3 - 1;
      }
      if(seperate_vector.z == 0){
        seperate_vector.z = Math.random() * 3 - 1;
      }
      
      let dist = Math.min(seperate_vector.length(), 12);
      let scale = 1 - (dist/12);

      seperate_vector.multiplyScalar(-scale);
      force_vector.add(seperate_vector);
      count++;
    }

    if(count > 0){
      force_vector.clampLength(0, this.maxForce);
    }

    this.steeringForces.add(force_vector);
  }

  add_steering_forces(){
    this.steeringForces.normalize();
    this.steeringForces.multiplyScalar(this.maxForce);

    this.velocity.add(this.steeringForces);
    this.velocity.clampLength(0, this.maxSpeed);
    
    this.steeringForces.copy(new THREE.Vector3(0, 0, 0));
  }

  apply_friction(){
    this.velocity.multiplyScalar(0.975);
  }
  
  update_position(){
    // console.log("velocity:", this.velocity);
    this.model.position.add(this.velocity);

    this.check_at_target();
    this.look_at_target();

    if(this.velocity.length() < 0.001){
      this.velocity.copy(new THREE.Vector3(0, 0, 0));
    }
  }
  
  
}

