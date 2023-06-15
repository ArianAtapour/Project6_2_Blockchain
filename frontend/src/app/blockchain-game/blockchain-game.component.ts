import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as THREE from "three";
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable, of, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {FireConectionService} from "../fire-conection.service";


@Component({
  selector: 'app-blockchain-game',
  templateUrl: './blockchain-game.component.html',
  styleUrls: ['./blockchain-game.component.css']
})



/* 3D Code part */


export class BlockchainGameComponent implements OnInit,AfterViewInit{
  @ViewChild('canvas') private canvasRef!: ElementRef; //House
  @ViewChild('canvasTwo') private canvasTwoRef!: ElementRef; //Store
  @ViewChild('canvasThree') private canvasThreeRef!: ElementRef; //building_2 (shipping)
  @ViewChild('canvasFour') private canvasFourRef!: ElementRef; //Factory
  @ViewChild('canvasFive') private canvasFiveRef!: ElementRef; //Tower
  @ViewChild('canvasSix') private canvasSixRef!: ElementRef; //Bank


  @Input() public fieldOfView: number = 1;

  @Input('nearClipping') public nearClippingPane: number = 1;

  @Input('farClipping') public farClippingPane: number = 2000;

  private camera!: THREE.PerspectiveCamera;

  private cameraTwo!: THREE.PerspectiveCamera;

  private cameraThree!: THREE.PerspectiveCamera;

  private cameraFour!: THREE.PerspectiveCamera;

  private cameraFive!: THREE.PerspectiveCamera;

  private cameraSix!: THREE.PerspectiveCamera;

  private controls!: OrbitControls;

  private controlsTwo!: OrbitControls; // Controls for the second model

  private ambientLight!: THREE.AmbientLight;

  private light1!: THREE.PointLight;

  private light2!: THREE.PointLight;

  private light3!: THREE.PointLight;

  private light4!: THREE.PointLight;

  private model: any;
  private modelTwo:any;
  private modelThree:any;
  private modelFour:any;
  private modelFive:any;
  private modelSix:any;

  private directionalLight!: THREE.DirectionalLight;


/*
  Blockchain code
 */

  dataBase: AngularFireDatabase;
  gameData$: Observable<any[]> = of([]);
  data : any[] | undefined;
  gameDataSubscription: Subscription | undefined;
  manuf!:string;
  cpu!:string;
  gpu!:string;
  orderC:number= 0;

  constructor(private router: Router, private db: AngularFireDatabase, private fireConnectionService: FireConectionService) {
    //initialize database
    this.dataBase = db;
  }


  retrieveData(){
    //create the reference towards the data list
    const orders = this.db.list("orders");
    //define the table as the data of the users table
    this.gameData$ = orders.valueChanges();

    //if the data subscription is not subbed yet then sub
    if(!this.gameDataSubscription){
      this.gameDataSubscription = this.gameData$.subscribe((data) => {
        console.log('Data updated:', data);
        //update method
        this.data = data;

        //add number of valid players
        if(this.data){
          this.manuf = "";
          this.cpu = "";
          this.gpu = "";

          let counter = 1;

          this.data.forEach((order) => {
            if(order.manuf != "" && order.gpu != "" && order.cpu != ""){
              this.manuf = order.manuf;
              this.cpu = order.cpu;
              this.gpu = order.gpu; //get the things
            }

            /*if(counter == 2){
              this.manuf = order.manuf;
              this.cpu = order.cpu;
              this.gpu = order.gpu;
            }else{
              counter++;
            }*/


          });
        }
      });
    }

  }

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  private get canvasTwo(): HTMLCanvasElement {
    return this.canvasTwoRef.nativeElement;
  }

  private get canvasThree(): HTMLCanvasElement {
    return this.canvasThreeRef.nativeElement;
  }

  private get canvasFour(): HTMLCanvasElement {
    return this.canvasFourRef.nativeElement;
  }
  private get canvasFive(): HTMLCanvasElement {
    return this.canvasFiveRef.nativeElement;
  }
  private get canvasSix(): HTMLCanvasElement {
    return this.canvasSixRef.nativeElement;
  }


  private loaderGLTF = new GLTFLoader();

  private renderer!: THREE.WebGLRenderer;

  private rendererTwo!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private sceneTwo!:THREE.Scene;

  private sceneThree!:THREE.Scene;

  private sceneFour!:THREE.Scene;

  private sceneFive!:THREE.Scene;

  private sceneSix!:THREE.Scene;

  private animateModel() { //for turn
    if (this.model && this.modelTwo && this.modelThree && this.modelFour && this.modelFive && this.modelSix) {
      this.model.rotation.y += 0.001;
      this.modelTwo.rotation.y += 0.001;
      this.modelThree.rotation.y += 0.001;
      this.modelFour.rotation.y += 0.001;
      this.modelFive.rotation.y += 0.001;
      this.modelSix.rotation.y += 0.001;
    }


  }

  private startAnimation = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(400, 400);
    renderer.domElement.style.position = 'fixed';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
  };


  /*private createControls = () => {
    const renderer = new CSS2DRenderer();
    renderer.setSize(400, 400);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '50%';
    renderer.domElement.style.left = '15%';
    document.body.appendChild(renderer.domElement);
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enableZoom=false;
  };


  private createControlsTwo(cameraTwo: THREE.PerspectiveCamera) {
    const rendererTwo = new CSS2DRenderer();
    rendererTwo.setSize(400, 400);
    rendererTwo.domElement.style.position = 'fixed';
    rendererTwo.domElement.style.top = '50%';
    rendererTwo.domElement.style.left = '45%';
    document.body.appendChild(rendererTwo.domElement);
    const controlsTwo = new OrbitControls(cameraTwo, rendererTwo.domElement);
    controlsTwo.enableZoom = false;

    // Return the controls for the second model
    return controlsTwo;
  }
*/
  private createScene() {
    //* Scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x303B44); //canvas color
    this.loaderGLTF.load('assets/house.gltf', (gltf: GLTF) => {
      this.model = gltf.scene; //without .children cause that loads only one mesh and it's not good
      console.log(this.model);
      var box = new THREE.Box3().setFromObject(this.model);
      box.getCenter(this.model.position); // this re-sets the mesh position
      this.model.position.multiplyScalar(-1);
      this.scene.add(this.model);
    });
    //*Camera
    let aspectRatio = this.getAspectRatio();
    this.camera = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    )

    this.camera.position.set(1000,0,-50)
    this.ambientLight = new THREE.AmbientLight(0x00000, 100);
    this.scene.add(this.ambientLight);
    this.directionalLight = new THREE.DirectionalLight(0xffdf04, 0.4);
    this.directionalLight.position.set(0, 1, 0);
    this.directionalLight.castShadow = true;
    this.scene.add(this.directionalLight);
    this.light1 = new THREE.PointLight(0x4b371c, 10);
    this.light1.position.set(0, 200, 400);
    this.scene.add(this.light1);
    this.light2 = new THREE.PointLight(0x4b371c, 10);
    this.light2.position.set(500, 100, 0);
    this.scene.add(this.light2);
    this.light3 = new THREE.PointLight(0x4b371c, 10);
    this.light3.position.set(0, 100, -500);
    this.scene.add(this.light3);
    this.light4 = new THREE.PointLight(0x4b371c, 10);
    this.light4.position.set(-500, 300, 500);
    this.scene.add(this.light4);
  }

  private createSceneTwo() {
    const sceneTwo = new THREE.Scene();
    sceneTwo.background = new THREE.Color(0x303B44); // Canvas color

    this.loaderGLTF.load('assets/Store.gltf', (gltf: GLTF) => {
      this.modelTwo = gltf.scene;
      console.log(this.modelTwo);
      const box = new THREE.Box3().setFromObject(this.modelTwo);
      box.getCenter(this.modelTwo.position);
      this.modelTwo.position.multiplyScalar(-1);
      sceneTwo.add(this.modelTwo);
    });

    const aspectRatio = this.getAspectRatio();
    const cameraTwo = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    cameraTwo.position.set(1000, 0, -50);
    sceneTwo.add(cameraTwo);

    const ambientLightTwo = new THREE.AmbientLight(0x000000, 100);
    sceneTwo.add(ambientLightTwo);
    const directionalLightTwo = new THREE.DirectionalLight(0xffdf04, 0.4);
    directionalLightTwo.position.set(0, 1, 0);
    directionalLightTwo.castShadow = true;
    sceneTwo.add(directionalLightTwo);
    const light1Two = new THREE.PointLight(0x4b371c, 10);
    light1Two.position.set(0, 200, 400);
    sceneTwo.add(light1Two);
    const light2Two = new THREE.PointLight(0x4b371c, 10);
    light2Two.position.set(500, 100, 0);
    sceneTwo.add(light2Two);
    const light3Two = new THREE.PointLight(0x4b371c, 10);
    light3Two.position.set(0, 100, -500);
    sceneTwo.add(light3Two);
    const light4Two = new THREE.PointLight(0x4b371c, 10);
    light4Two.position.set(-500, 300, 500);
    sceneTwo.add(light4Two);

    return { scene: sceneTwo, camera: cameraTwo };
  }

  private createSceneFour() {
    const sceneThree = new THREE.Scene();
    sceneThree.background = new THREE.Color(0x303B44); // Canvas color

    this.loaderGLTF.load('assets/factory.gltf', (gltf: GLTF) => {
      this.modelFour = gltf.scene;
      console.log(this.modelFour);
      const box = new THREE.Box3().setFromObject(this.modelFour);
      box.getCenter(this.modelFour.position);
      this.modelFour.position.multiplyScalar(-1);
      sceneThree.add(this.modelFour);
    });

    const aspectRatio = this.getAspectRatio();
    const cameraThree = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    cameraThree.position.set(1000, 0, -50);
    sceneThree.add(cameraThree);

    const ambientLightThree = new THREE.AmbientLight(0x000000, 100);
    sceneThree.add(ambientLightThree);
    const directionalLightThree = new THREE.DirectionalLight(0xffdf04, 0.4);
    directionalLightThree.position.set(0, 1, 0);
    directionalLightThree.castShadow = true;
    sceneThree.add(directionalLightThree);
    const light1Three = new THREE.PointLight(0x4b371c, 10);
    light1Three.position.set(0, 200, 400);
    sceneThree.add(light1Three);
    const light2Three = new THREE.PointLight(0x4b371c, 10);
    light2Three.position.set(500, 100, 0);
    sceneThree.add(light2Three);
    const light3Three = new THREE.PointLight(0x4b371c, 10);
    light3Three.position.set(0, 100, -500);
    sceneThree.add(light3Three);
    const light4Three = new THREE.PointLight(0x4b371c, 10);
    light4Three.position.set(-500, 300, 500);
    sceneThree.add(light4Three);

    return { scene: sceneThree, camera: cameraThree };
  }

  private createSceneThree() {
    const sceneThree = new THREE.Scene();
    sceneThree.background = new THREE.Color(0x303B44); // Canvas color

    this.loaderGLTF.load('assets/building_2.gltf', (gltf: GLTF) => {
      this.modelThree = gltf.scene;
      console.log(this.modelThree);
      const box = new THREE.Box3().setFromObject(this.modelThree);
      box.getCenter(this.modelThree.position);
      this.modelThree.position.multiplyScalar(-1);
      sceneThree.add(this.modelThree);
    });

    const aspectRatio = this.getAspectRatio();
    const cameraThree = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    cameraThree.position.set(1000, 0, -50);
    sceneThree.add(cameraThree);

    const ambientLightThree = new THREE.AmbientLight(0x000000, 100);
    sceneThree.add(ambientLightThree);
    const directionalLightThree = new THREE.DirectionalLight(0xffdf04, 0.4);
    directionalLightThree.position.set(0, 1, 0);
    directionalLightThree.castShadow = true;
    sceneThree.add(directionalLightThree);
    const light1Three = new THREE.PointLight(0x4b371c, 10);
    light1Three.position.set(0, 200, 400);
    sceneThree.add(light1Three);
    const light2Three = new THREE.PointLight(0x4b371c, 10);
    light2Three.position.set(500, 100, 0);
    sceneThree.add(light2Three);
    const light3Three = new THREE.PointLight(0x4b371c, 10);
    light3Three.position.set(0, 100, -500);
    sceneThree.add(light3Three);
    const light4Three = new THREE.PointLight(0x4b371c, 10);
    light4Three.position.set(-500, 300, 500);
    sceneThree.add(light4Three);

    return { scene: sceneThree, camera: cameraThree };
  }

  private createSceneFive() {
    const sceneThree = new THREE.Scene();
    sceneThree.background = new THREE.Color(0x303B44); // Canvas color

    this.loaderGLTF.load('assets/tower.gltf', (gltf: GLTF) => {
      this.modelFive = gltf.scene;
      console.log(this.modelFive);
      const box = new THREE.Box3().setFromObject(this.modelFive);
      box.getCenter(this.modelFive.position);
      this.modelFive.position.multiplyScalar(-1);
      sceneThree.add(this.modelFive);
    });

    const aspectRatio = this.getAspectRatio();
    const cameraThree = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    cameraThree.position.set(1000, 0, -50);
    sceneThree.add(cameraThree);

    const ambientLightThree = new THREE.AmbientLight(0x000000, 100);
    sceneThree.add(ambientLightThree);
    const directionalLightThree = new THREE.DirectionalLight(0xffdf04, 0.4);
    directionalLightThree.position.set(0, 1, 0);
    directionalLightThree.castShadow = true;
    sceneThree.add(directionalLightThree);
    const light1Three = new THREE.PointLight(0x4b371c, 10);
    light1Three.position.set(0, 200, 400);
    sceneThree.add(light1Three);
    const light2Three = new THREE.PointLight(0x4b371c, 10);
    light2Three.position.set(500, 100, 0);
    sceneThree.add(light2Three);
    const light3Three = new THREE.PointLight(0x4b371c, 10);
    light3Three.position.set(0, 100, -500);
    sceneThree.add(light3Three);
    const light4Three = new THREE.PointLight(0x4b371c, 10);
    light4Three.position.set(-500, 300, 500);
    sceneThree.add(light4Three);
    return { scene: sceneThree, camera: cameraThree };
  }

  private createSceneSix() {
    const sceneThree = new THREE.Scene();
    sceneThree.background = new THREE.Color(0x303B44); // Canvas color

    this.loaderGLTF.load('assets/bank.gltf', (gltf: GLTF) => {
      this.modelSix = gltf.scene;
      console.log(this.modelSix);
      const box = new THREE.Box3().setFromObject(this.modelSix);
      box.getCenter(this.modelSix.position);
      this.modelSix.position.multiplyScalar(-1);
      sceneThree.add(this.modelSix);
    });


    const aspectRatio = this.getAspectRatio();
    const cameraThree = new THREE.PerspectiveCamera(
      this.fieldOfView,
      aspectRatio,
      this.nearClippingPane,
      this.farClippingPane
    );
    cameraThree.position.set(1000, 0, -50);
    sceneThree.add(cameraThree);

    const ambientLightThree = new THREE.AmbientLight(0x000000, 100);
    sceneThree.add(ambientLightThree);
    const directionalLightThree = new THREE.DirectionalLight(0xffdf04, 0.4);
    directionalLightThree.position.set(0, 1, 0);
    directionalLightThree.castShadow = true;
    sceneThree.add(directionalLightThree);
    const light1Three = new THREE.PointLight(0x4b371c, 10);
    light1Three.position.set(0, 200, 400);
    sceneThree.add(light1Three);
    const light2Three = new THREE.PointLight(0x4b371c, 10);
    light2Three.position.set(500, 100, 0);
    sceneThree.add(light2Three);
    const light3Three = new THREE.PointLight(0x4b371c, 10);
    light3Three.position.set(0, 100, -500);
    sceneThree.add(light3Three);
    const light4Three = new THREE.PointLight(0x4b371c, 10);
    light4Three.position.set(-500, 300, 500);
    sceneThree.add(light4Three);

    return { scene: sceneThree, camera: cameraThree };
  }

  private getAspectRatio() {
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private startRenderingLoop() {
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
    this.renderer.setPixelRatio(devicePixelRatio);
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    let component: BlockchainGameComponent = this;
    (function render() {
      component.renderer.render(component.scene, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    }());
  }

  private startRenderingLoopTwo() {
    const rendererTwo = new THREE.WebGLRenderer({ canvas: this.canvasTwo, antialias: true });
    rendererTwo.setPixelRatio(devicePixelRatio);
    rendererTwo.setSize(this.canvasTwo.clientWidth, this.canvasTwo.clientHeight);

    const component: BlockchainGameComponent = this;
    (function render() {
      rendererTwo.render(component.sceneTwo, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  private startRenderingLoopThree() {
    const rendererThree = new THREE.WebGLRenderer({ canvas: this.canvasThree, antialias: true });
    rendererThree.setPixelRatio(devicePixelRatio);
    rendererThree.setSize(this.canvasThree.clientWidth, this.canvasThree.clientHeight);

    const component: BlockchainGameComponent = this;
    (function render() {
      rendererThree.render(component.sceneThree, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  private startRenderingLoopFour() {
    const rendererThree = new THREE.WebGLRenderer({ canvas: this.canvasFour, antialias: true });
    rendererThree.setPixelRatio(devicePixelRatio);
    rendererThree.setSize(this.canvasFour.clientWidth, this.canvasFour.clientHeight);

    const component: BlockchainGameComponent = this;
    (function render() {
      rendererThree.render(component.sceneFour, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  private startRenderingLoopFive() {
    const rendererThree = new THREE.WebGLRenderer({ canvas: this.canvasFive, antialias: true });
    rendererThree.setPixelRatio(devicePixelRatio);
    rendererThree.setSize(this.canvasFive.clientWidth, this.canvasFive.clientHeight);

    const component: BlockchainGameComponent = this;
    (function render() {
      rendererThree.render(component.sceneFive, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }

  private startRenderingLoopSix() {
    const rendererThree = new THREE.WebGLRenderer({ canvas: this.canvasSix, antialias: true });
    rendererThree.setPixelRatio(devicePixelRatio);
    rendererThree.setSize(this.canvasSix.clientWidth, this.canvasSix.clientHeight);

    const component: BlockchainGameComponent = this;
    (function render() {
      rendererThree.render(component.sceneSix, component.camera);
      component.animateModel();
      requestAnimationFrame(render);
    })();
  }



  async ngOnInit(){
    this.retrieveData();
  }
  ngAfterViewInit() {
    this.createScene();
    const { scene: sceneTwo, camera: cameraTwo } = this.createSceneTwo();
    const { scene: sceneThree, camera: cameraThree } = this.createSceneThree();
    const { scene: sceneFour, camera: cameraFour } = this.createSceneFour();
    const { scene: sceneFive, camera: cameraFive } = this.createSceneFive();
    const { scene: sceneSix, camera: cameraSix } = this.createSceneSix();
    this.sceneTwo = sceneTwo;
    this.cameraTwo = cameraTwo;
    this.sceneThree = sceneThree;
    this.cameraThree = cameraThree;
    this.sceneFour = sceneFour;
    this.cameraFour = cameraFour;
    this.sceneFive = sceneFive;
    this.cameraFive = cameraFive;
    this.sceneSix = sceneSix;
    this.cameraSix = cameraSix;
    this.startRenderingLoop();
    this.startRenderingLoopTwo(); // Start the rendering loop for the second model
    this.startRenderingLoopThree();
    this.startRenderingLoopFour();
    this.startRenderingLoopFive();
    this.startRenderingLoopSix();
    this.startAnimation();
    // @ts-ignore
    //this.controls = this.createControls(this.camera, this.renderer);

  }

}
