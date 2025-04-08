console.log("GLTFLoader:", GLTFLoader);
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


let scene, camera, renderer, cube, sphere; 

function init() {
    
    scene = new THREE.Scene();
    const light = new THREE.DirectionalLight(0xffffff,3);
    light.position.set(3,4,5);
    scene.add(light);

    
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    renderer = new THREE.WebGLRenderer({ antialias: true,});
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const loader = new GLTFLoader();
    loader.load('assets/mitsubishi_lancer_evolution_6___www.vecarz.com/scene.gltf',function(glft){
        const car = glft.scene;
        scene.add(car);
        car.scale.set(50, 50, 50);
        car.position.set(-1.5, -0.5, 0); 
        
        controls.target.set(0, 0, 0);
        camera.position.set(0, 1, 5); 
        controls.update();  


    })
   
    
    const controls = new OrbitControls(camera, renderer.domElement);

    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const texture = new THREE.TextureLoader().load('../textures/texture-image.jpg');
 
    const material = new THREE.MeshBasicMaterial({ map: texture });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);


    const geometrySphere = new THREE.SphereGeometry(1, 32, 16);  
    sphere = new THREE.Mesh(geometrySphere, material);  
    sphere.position.x = 2;  
    scene.add(sphere);  

    
    window.addEventListener('resize', onWindowResize, false);

    
    renderer.setAnimationLoop(animate);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

   
    sphere.rotation.x += 0.01;  
    sphere.rotation.y += 0.01;  
    
    renderer.render(scene, camera);
}


init();





