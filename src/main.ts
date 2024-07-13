import * as THREE from "three";

class Particles {
  camera!: THREE.PerspectiveCamera;
  width!: number;
  height!: number;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  points!: THREE.Points;
  mouseX!: number;
  mouseY!: number;
  clock!: THREE.Clock;
  isMobile!: boolean;

  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.clock = new THREE.Clock();
    this.mouseX = 1;
    this.mouseY = 1;
    this.isMobile = window.innerWidth <= 748;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      100
    );
    this.camera.position.z = 5;

    this.points = this.createPoints();
    this.scene.add(this.points);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(this.width, this.height);

    document.body.appendChild(this.renderer.domElement);
    this.animate();
  }

  createPoints(): THREE.Points {
    const geometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const vertices = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      vertices[i] = (Math.random() - 0.5) * 500;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
      color: 0xf5f5f5,
      size: 0.05,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });

    window.addEventListener("mousemove", (event) => {
      if (!this.isMobile) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
      }
    });

    return new THREE.Points(geometry, material);
  }

  animate = (): void => {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.points.rotation.x =
      this.mouseY *
      (this.clock.getElapsedTime() * (this.isMobile ? 0.05 : 0.00008));
    this.points.rotation.y =
      this.mouseX *
      (this.clock.getElapsedTime() * (this.isMobile ? 0.05 : 0.00008));

    requestAnimationFrame(this.animate);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.render(this.scene, this.camera);
    this.renderer.setClearColor(new THREE.Color(0x161616));
  };
}

new Particles();
