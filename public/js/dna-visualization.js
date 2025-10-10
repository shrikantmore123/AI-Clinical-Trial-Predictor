// Three.js Molecular Visualization
function initMolecule() {
    const container = document.getElementById('molecule-container');
    if (!container) return;
    
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create molecular structure
    const group = new THREE.Group();
    
    // Create atoms (spheres)
    const atomGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const materials = [
        new THREE.MeshPhongMaterial({ color: 0x1a73e8 }), // Blue
        new THREE.MeshPhongMaterial({ color: 0x4caf50 }), // Green
        new THREE.MeshPhongMaterial({ color: 0xf44336 }), // Red
        new THREE.MeshPhongMaterial({ color: 0xff9800 })  // Orange
    ];
    
    // Create multiple atoms in a molecular structure
    const atoms = [];
    const positions = [
        [0, 0, 0], [1.5, 0, 0], [0.5, 1.2, 0], 
        [-1, 0.8, 0], [-0.5, -1, 0], [1, -0.8, 0.5]
    ];
    
    positions.forEach((pos, i) => {
        const atom = new THREE.Mesh(atomGeometry, materials[i % materials.length]);
        atom.position.set(pos[0], pos[1], pos[2]);
        atoms.push(atom);
        group.add(atom);
    });
    
    // Create bonds (cylinders)
    const bondPairs = [[0,1], [0,2], [0,3], [0,4], [1,5]];
    
    bondPairs.forEach(pair => {
        const start = new THREE.Vector3(...positions[pair[0]]);
        const end = new THREE.Vector3(...positions[pair[1]]);
        const direction = new THREE.Vector3().subVectors(end, start);
        const length = direction.length();
        
        const bondGeometry = new THREE.CylinderGeometry(0.1, 0.1, length, 8);
        const bondMaterial = new THREE.MeshPhongMaterial({ color: 0x7e57c2 });
        const bond = new THREE.Mesh(bondGeometry, bondMaterial);
        
        // Position and rotate the bond
        bond.position.copy(start).add(direction.multiplyScalar(0.5));
        bond.lookAt(end);
        bond.rotateX(Math.PI / 2);
        
        group.add(bond);
    });
    
    scene.add(group);
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    camera.position.z = 5;
    
    // Add rotation animation
    function animate() {
        requestAnimationFrame(animate);
        group.rotation.y += 0.01;
        group.rotation.x += 0.005;
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize molecule when page loads
window.addEventListener('load', initMolecule);