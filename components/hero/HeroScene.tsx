"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type BeanData = {
  mesh: THREE.Mesh;
  spin: THREE.Vector3;
  driftY: number;
  baseY: number;
  phase: number;
  orbitRadius: number;
  orbitSpeed: number;
  orbitOffset: number;
};

type SteamData = {
  mesh: THREE.Mesh;
  phase: number;
  speed: number;
  baseX: number;
  baseZ: number;
};

function createBeanGeometry() {
  const geometry = new THREE.SphereGeometry(0.14, 16, 12);
  geometry.scale(1, 0.55, 0.72);
  return geometry;
}

function createBeanMaterial(color: string, roughness = 0.55) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness: 0.15,
    emissive: new THREE.Color(color),
    emissiveIntensity: 0.08,
  });
}

function createCoffeeCup(isMobile: boolean) {
  const group = new THREE.Group();
  const disposables: THREE.BufferGeometry[] = [];
  const materials: THREE.Material[] = [];

  const ceramic = new THREE.MeshStandardMaterial({
    color: "#f3ebe0",
    roughness: 0.35,
    metalness: 0.05,
  });
  const ceramicGold = new THREE.MeshStandardMaterial({
    color: "#d4af37",
    roughness: 0.4,
    metalness: 0.55,
  });
  const coffeeMat = new THREE.MeshStandardMaterial({
    color: "#2a160e",
    roughness: 0.25,
    metalness: 0.2,
    emissive: "#1a0c06",
    emissiveIntensity: 0.35,
  });
  materials.push(ceramic, ceramicGold, coffeeMat);

  // Cup body (open cylinder)
  const bodyGeo = new THREE.CylinderGeometry(0.55, 0.42, 0.85, 48, 1, true);
  disposables.push(bodyGeo);
  const body = new THREE.Mesh(bodyGeo, ceramic);
  body.position.y = 0.55;
  group.add(body);

  // Inner wall slightly darker
  const innerGeo = new THREE.CylinderGeometry(0.5, 0.38, 0.82, 48, 1, true);
  disposables.push(innerGeo);
  const innerMat = new THREE.MeshStandardMaterial({
    color: "#e8dccf",
    roughness: 0.45,
    metalness: 0.02,
    side: THREE.BackSide,
  });
  materials.push(innerMat);
  const inner = new THREE.Mesh(innerGeo, innerMat);
  inner.position.y = 0.55;
  group.add(inner);

  // Bottom
  const bottomGeo = new THREE.CircleGeometry(0.42, 48);
  disposables.push(bottomGeo);
  const bottom = new THREE.Mesh(bottomGeo, ceramic);
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = 0.12;
  group.add(bottom);

  // Rim ring
  const rimGeo = new THREE.TorusGeometry(0.55, 0.035, 12, 48);
  disposables.push(rimGeo);
  const rim = new THREE.Mesh(rimGeo, ceramicGold);
  rim.rotation.x = Math.PI / 2;
  rim.position.y = 0.97;
  group.add(rim);

  // Coffee surface
  const coffeeGeo = new THREE.CircleGeometry(0.48, 48);
  disposables.push(coffeeGeo);
  const coffee = new THREE.Mesh(coffeeGeo, coffeeMat);
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.82;
  group.add(coffee);

  // Classic C-shaped mug handle (tube along bezier, attached to cup wall)
  const handleCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0.5, 0.78, 0),
    new THREE.Vector3(0.98, 0.88, 0),
    new THREE.Vector3(0.98, 0.22, 0),
    new THREE.Vector3(0.45, 0.3, 0),
  );
  const handleGeo = new THREE.TubeGeometry(handleCurve, 48, 0.058, 14, false);
  disposables.push(handleGeo);
  const handle = new THREE.Mesh(handleGeo, ceramic);
  group.add(handle);

  // Soft attachment caps so the join with the body reads as one piece
  const joinGeo = new THREE.SphereGeometry(0.062, 12, 12);
  disposables.push(joinGeo);
  const joinTop = new THREE.Mesh(joinGeo, ceramic);
  joinTop.position.copy(handleCurve.getPoint(0));
  group.add(joinTop);
  const joinBottom = new THREE.Mesh(joinGeo, ceramic);
  joinBottom.position.copy(handleCurve.getPoint(1));
  group.add(joinBottom);

  // Saucer
  const saucerGeo = new THREE.CylinderGeometry(0.95, 0.95, 0.06, 48);
  disposables.push(saucerGeo);
  const saucer = new THREE.Mesh(saucerGeo, ceramic);
  saucer.position.y = 0.03;
  group.add(saucer);

  const saucerRimGeo = new THREE.TorusGeometry(0.95, 0.03, 10, 48);
  disposables.push(saucerRimGeo);
  const saucerRim = new THREE.Mesh(saucerRimGeo, ceramicGold);
  saucerRim.rotation.x = Math.PI / 2;
  saucerRim.position.y = 0.06;
  group.add(saucerRim);

  // Steam wisps
  const steam: SteamData[] = [];
  const steamMat = new THREE.MeshBasicMaterial({
    color: 0xe0c097,
    transparent: true,
    opacity: 0.22,
    depthWrite: false,
  });
  materials.push(steamMat);

  for (let i = 0; i < (isMobile ? 4 : 6); i++) {
    const steamGeo = new THREE.SphereGeometry(0.08 + Math.random() * 0.06, 10, 10);
    disposables.push(steamGeo);
    const mesh = new THREE.Mesh(steamGeo, steamMat);
    const baseX = (Math.random() - 0.5) * 0.35;
    const baseZ = (Math.random() - 0.5) * 0.35;
    mesh.position.set(baseX, 1.1 + i * 0.12, baseZ);
    mesh.scale.set(0.6, 1.4, 0.6);
    group.add(mesh);
    steam.push({
      mesh,
      phase: Math.random() * Math.PI * 2,
      speed: 0.35 + Math.random() * 0.35,
      baseX,
      baseZ,
    });
  }

  group.scale.setScalar(isMobile ? 1.05 : 1.25);
  return { group, steam, disposables, materials };
}

function getLayout(width: number, height: number) {
  const isMobile = width < 768;
  const isShort = height < 700;
  return {
    isMobile,
    isShort,
    fov: isMobile ? 42 : 40,
    cameraZ: isMobile ? (isShort ? 7.2 : 6.6) : 6.0,
    cameraY: isMobile ? 0.55 : 0.15,
    lookY: isMobile ? -0.35 : -0.15,
    cupY: isMobile ? -1.15 : -0.85,
    cupX: 0,
    beanCount: isMobile ? 7 : 12,
    particleCount: isMobile ? 40 : 80,
    parallax: isMobile ? 0.18 : 0.4,
    pixelRatio: Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2),
  };
}

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let layout = getLayout(mount.clientWidth, mount.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      layout.fov,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, layout.cameraY, layout.cameraZ);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !layout.isMobile,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(layout.pixelRatio);
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x1a140f, 1.5);
    scene.add(ambient);

    const keyLight = new THREE.PointLight(0xd4af37, 2.4, 18);
    keyLight.position.set(-2.2, 2.4, 3.8);
    scene.add(keyLight);

    const fillLight = new THREE.PointLight(0x8b4513, 1.5, 16);
    fillLight.position.set(2.8, -0.8, 2.2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xe0c097, 0.65);
    rimLight.position.set(0, 4, -2);
    scene.add(rimLight);

    const cupSpot = new THREE.SpotLight(0xd4af37, 1.8, 12, Math.PI / 5, 0.45);
    cupSpot.position.set(0.5, 4, 3);
    scene.add(cupSpot);

    const {
      group: cup,
      steam,
      disposables: cupGeometries,
      materials: cupMaterials,
    } = createCoffeeCup(layout.isMobile);
    cup.position.set(layout.cupX, layout.cupY, 0);
    cup.rotation.y = -0.35;
    cup.rotation.x = 0.08;
    scene.add(cup);
    cupSpot.target = cup;
    scene.add(cupSpot.target);

    const beanGeometry = createBeanGeometry();
    const beanColors = ["#3d2314", "#5c3317", "#2a1810", "#6b3e1f", "#4a2c14"];
    const beans: BeanData[] = [];

    for (let i = 0; i < layout.beanCount; i++) {
      const material = createBeanMaterial(
        beanColors[i % beanColors.length],
        0.45 + (i % 4) * 0.08,
      );
      const mesh = new THREE.Mesh(beanGeometry, material);
      const orbitRadius = 1.6 + Math.random() * (layout.isMobile ? 1.4 : 2.2);
      const orbitOffset = (i / layout.beanCount) * Math.PI * 2;
      const y = layout.cupY + 0.4 + (Math.random() - 0.5) * 1.8;
      mesh.position.set(
        Math.cos(orbitOffset) * orbitRadius,
        y,
        Math.sin(orbitOffset) * orbitRadius - 0.4,
      );
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      mesh.scale.setScalar(0.55 + Math.random() * 0.75);
      scene.add(mesh);
      beans.push({
        mesh,
        spin: new THREE.Vector3(
          (Math.random() - 0.5) * 0.35,
          (Math.random() - 0.5) * 0.45,
          (Math.random() - 0.5) * 0.25,
        ),
        driftY: 0.08 + Math.random() * 0.1,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
        orbitRadius,
        orbitSpeed: 0.12 + Math.random() * 0.12,
        orbitOffset,
      });
    }

    const positions = new Float32Array(layout.particleCount * 3);
    for (let i = 0; i < layout.particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd4af37,
      size: layout.isMobile ? 0.028 : 0.035,
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const glowGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.set(0, layout.cupY + 0.4, -1.8);
    scene.add(glow);

    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      targetPointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetPointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const applyLayout = () => {
      layout = getLayout(mount.clientWidth, mount.clientHeight);
      camera.fov = layout.fov;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      camera.position.z = layout.cameraZ;
      camera.position.y = layout.cameraY;
      renderer.setPixelRatio(layout.pixelRatio);
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      cup.position.y = layout.cupY;
      cup.scale.setScalar(layout.isMobile ? 1.05 : 1.25);
      glow.position.y = layout.cupY + 0.4;
    };

    const onResize = () => applyLayout();

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      if (!reduceMotion) {
        pointer.x += (targetPointer.x - pointer.x) * 0.04;
        pointer.y += (targetPointer.y - pointer.y) * 0.04;

        camera.position.x = pointer.x * layout.parallax;
        camera.position.y = layout.cameraY + pointer.y * (layout.parallax * 0.55);
        camera.lookAt(0, layout.lookY, 0);

        cup.rotation.y = -0.35 + Math.sin(t * 0.35) * 0.12 + pointer.x * 0.15;
        cup.position.y = layout.cupY + Math.sin(t * 0.7) * 0.04;

        for (const s of steam) {
          const rise = ((t * s.speed + s.phase) % 2.4) / 2.4;
          s.mesh.position.y = 1.05 + rise * 1.1;
          s.mesh.position.x = s.baseX + Math.sin(t * 0.9 + s.phase) * 0.12;
          s.mesh.position.z = s.baseZ + Math.cos(t * 0.7 + s.phase) * 0.1;
          s.mesh.scale.setScalar(0.5 + rise * 1.2);
          (s.mesh.material as THREE.MeshBasicMaterial).opacity =
            0.28 * (1 - rise);
        }

        for (const bean of beans) {
          const angle = bean.orbitOffset + t * bean.orbitSpeed;
          bean.mesh.position.x = Math.cos(angle) * bean.orbitRadius;
          bean.mesh.position.z = Math.sin(angle) * bean.orbitRadius * 0.75 - 0.2;
          bean.mesh.position.y =
            bean.baseY + Math.sin(t * bean.driftY + bean.phase) * 0.25;
          bean.mesh.rotation.x += bean.spin.x * delta;
          bean.mesh.rotation.y += bean.spin.y * delta;
        }

        particles.rotation.y = t * 0.025;
        glow.scale.setScalar(1 + Math.sin(t * 0.6) * 0.1);
        keyLight.intensity = 2.2 + Math.sin(t * 0.8) * 0.25;
      } else {
        camera.lookAt(0, layout.lookY, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      beanGeometry.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      cupGeometries.forEach((g) => g.dispose());
      cupMaterials.forEach((m) => m.dispose());
      beans.forEach((bean) => {
        (bean.mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="pointer-events-none absolute inset-0 z-0 h-full min-h-dvh w-full overflow-hidden"
      aria-hidden
    />
  );
}
