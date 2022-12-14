import * as THREE from "three";

const scene = new THREE.Scene();

scene.background = new THREE.Color(0xfa8072);
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  1000
);

function Brush() {
  const brush = new THREE.Group();

  const one = new THREE.Mesh(
    new THREE.BoxGeometry(15, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xf0f00f })
  );

  const two = new THREE.Mesh(
    new THREE.BoxGeometry(4, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xffffff })
  );
  two.position.y = -1;
  two.position.x = -5;

  brush.add(two);

  brush.add(one);
  return brush;
}

const colors = { COLORS: [{ color: 0xfbc02d }, { color: 0xfbc02d }] };

function Teeth(color) {
  const brush = new THREE.Group();

  const one = new THREE.Mesh(
    new THREE.BoxGeometry(25, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xbc544b })
  );

  for (let i = 0; i < 24; i += 3) {
    const two = new THREE.Mesh(
      new THREE.BoxGeometry(2, 3, 1),
      new THREE.MeshBasicMaterial(color)
    );
    two.position.y = 2;
    two.position.x = i - 11;
    brush.add(two);
  }

  brush.add(one);
  return brush;
}

const renderer = new THREE.WebGLRenderer();

console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize(innerWidth, innerHeight);

renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

const boxGeometry = new THREE.BoxGeometry(15, 1, 1);

const material = new THREE.MeshBasicMaterial({ color: 0xf0f00f });

const mesh = new THREE.Mesh(boxGeometry, material);

const brush = new Brush();
scene.add(brush);

const teeth = new Teeth(colors.COLORS[1]);
teeth.position.y = -5;
scene.add(teeth);

camera.position.z = 20;

let BrushRotate = false;

let right = true;
let left = false;

function setupKeyLogger() {
  document.onkeydown = function (e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 37:
        left = true;
        right = false;
        console.log(brush.position);
        break;
      case 39:
        left = false;
        right = true;
        console.log(brush.position);
        break;
      case 32:
        BrushRotate = !BrushRotate;
        break;
    }
  };
}

brush.position.y += 4;

let rotation = 0.1;

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 0, 12);
scene.add(light);

function animate() {
  requestAnimationFrame(animate);
  if (left && brush.position.x >= -6) {
    brush.position.x -= 0.5;
    if (brush.position.x == -6 && BrushRotate) {
      console.log("bruh");
    }
  } else if (left && brush.position.x <= 6 && brush.position.x > 6.5) {
    console.log("bruh");
  }
  if (right && brush.position.x <= 18) {
    brush.position.x += 0.5;
  }
  if (BrushRotate) {
    if (brush.rotation.x > 1) {
      rotation = -0.1;
    }
    if (brush.rotation.x < -1) {
      rotation = 0.1;
    }
    brush.rotation.x += rotation;
    // console.log(brush.position);
    if (brush.position.y > 0) {
      brush.position.y -= 0.5;
    }
  } else {
    if (brush.position.y <= 4) {
      brush.position.y += 0.3;
    }
  }
  renderer.render(scene, camera);
  // brush.rotation.x += 0.01;
  // brush.rotation.y += 0.01;
}
setupKeyLogger();
animate();
