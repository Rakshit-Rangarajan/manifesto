"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { useTheme } from "next-themes";

export default function Background() {
  const mountRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mountRef.current || !mounted) return;

    const currentMount = mountRef.current;
    
    const isDark = resolvedTheme === "dark";
    const fogColor = isDark ? 0x0a0a0a : 0xf5f5f0;
    const objectColor = isDark ? 0x555555 : 0x888888;
    const particleColor = isDark ? 0x666666 : 0x999999;
    
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(fogColor, isDark ? 0.0015 : 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    currentMount.appendChild(renderer.domElement);

    // Complex Torus Knot
    const geometry = new THREE.TorusKnotGeometry(12, 3, 80, 16);
    const material = new THREE.MeshStandardMaterial({
      color: objectColor,
      wireframe: true,
      transparent: true,
      opacity: isDark ? 0.15 : 0.08,
    });
    const torusKnot = new THREE.Mesh(geometry, material);
    scene.add(torusKnot);

    // Outer Particle Sphere
    const sphereGeometry = new THREE.SphereGeometry(25, 32, 32);
    const sphereMaterial = new THREE.PointsMaterial({
      color: objectColor,
      size: isDark ? 0.08 : 0.1,
      transparent: true,
      opacity: isDark ? 0.4 : 0.2,
    });
    const spherePoints = new THREE.Points(sphereGeometry, sphereMaterial);
    scene.add(spherePoints);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, isDark ? 0.5 : 0.8);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(isDark ? 0xffffff : 0x000000, 1);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    // Background Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 150;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: isDark ? 0.05 : 0.08,
      color: particleColor,
      transparent: true,
      opacity: isDark ? 0.3 : 0.1,
    });

    const backgroundParticles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(backgroundParticles);

    // Parallax variables
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      const elapsedTime = Date.now() * 0.001;
      
      torusKnot.rotation.x = elapsedTime * 0.1;
      torusKnot.rotation.y = elapsedTime * 0.15;
      
      spherePoints.rotation.y = -elapsedTime * 0.01;
      backgroundParticles.rotation.y = -elapsedTime * 0.01;
      
      camera.position.x += (mouseX * 5 - camera.position.x) * 0.02;
      camera.position.y += (-mouseY * 5 - camera.position.y) * 0.02;
      
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [mounted, resolvedTheme]);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 -z-10 pointer-events-none"
    />
  );
}