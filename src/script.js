import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

// Import shaders
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

class Sketch {
	constructor() {
		// Debug
		this.gui = new GUI({ width: 340 })

		// Canvas
		this.canvas = document.querySelector('canvas.webgl')

		// Scene
		this.scene = new THREE.Scene()

		// Clock
		this.clock = new THREE.Clock()

		// Sizes
		this.sizes = {
			width: window.innerWidth,
			height: window.innerHeight,
		}

		// Shader uniforms
		this.uniforms = {
			uTime: { value: 0.0 },
		}

		// Add GUI controls for shader parameters
		this.addGUIControls()

		this.init()
	}

	addGUIControls() {
		// Add shader controls to GUI if needed
		// Example: this.gui.add(this.someParameter, 'value', 0, 1, 0.01).name('Parameter Name')
	}

	init() {
		this.createPlane()
		this.createCamera()
		this.createRenderer()
		this.setupEventListeners()
		this.tick()
	}

	createPlane() {
		// Geometry
		const planeGeometry = new THREE.PlaneGeometry(2, 2, 50, 50)

		// Shader Material
		const shaderMaterial = new THREE.ShaderMaterial({
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,
			uniforms: this.uniforms,
			side: THREE.DoubleSide,
			wireframe: false,
		})

		// Mesh
		this.plane = new THREE.Mesh(planeGeometry, shaderMaterial)
		this.plane.rotation.x = -Math.PI * 0.5
		this.scene.add(this.plane)
	}

	createCamera() {
		// Base camera
		this.camera = new THREE.PerspectiveCamera(
			75,
			this.sizes.width / this.sizes.height,
			0.1,
			100
		)
		this.camera.position.set(1, 1, 1)
		this.scene.add(this.camera)

		// Controls
		this.controls = new OrbitControls(this.camera, this.canvas)
		this.controls.enableDamping = true
	}

	createRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			alpha: true,
		})
		this.renderer.setSize(this.sizes.width, this.sizes.height)
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
	}

	setupEventListeners() {
		window.addEventListener('resize', () => {
			// Update sizes
			this.sizes.width = window.innerWidth
			this.sizes.height = window.innerHeight

			// Update camera
			this.camera.aspect = this.sizes.width / this.sizes.height
			this.camera.updateProjectionMatrix()

			// Update renderer
			this.renderer.setSize(this.sizes.width, this.sizes.height)
			this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
		})
	}

	update() {
		const elapsedTime = this.clock.getElapsedTime()

		// Update shader uniforms
		this.uniforms.uTime.value = elapsedTime

		// Update controls
		this.controls.update()
	}

	render() {
		this.renderer.render(this.scene, this.camera)
	}

	tick() {
		this.update()
		this.render()

		// Call tick again on the next frame
		window.requestAnimationFrame(this.tick.bind(this))
	}
}

// Initialize the application
const sketch = new Sketch()
