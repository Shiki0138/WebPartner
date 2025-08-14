import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

const HeroSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Three.js AI Network Visualization
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      alpha: true,
      antialias: true 
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Create AI neural network visualization
    const geometry = new THREE.SphereGeometry(0.1, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x10B981,
      transparent: true,
      opacity: 0.8
    });
    
    const nodes: THREE.Mesh[] = [];
    const connections: THREE.Line[] = [];
    
    // Create nodes
    for (let i = 0; i < 50; i++) {
      const node = new THREE.Mesh(geometry, material.clone());
      node.position.x = (Math.random() - 0.5) * 10;
      node.position.y = (Math.random() - 0.5) * 10;
      node.position.z = (Math.random() - 0.5) * 10;
      nodes.push(node);
      scene.add(node);
    }
    
    // Create connections
    const lineMaterial = new THREE.LineBasicMaterial({ 
      color: 0x1E3A8A, 
      opacity: 0.3,
      transparent: true 
    });
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (Math.random() > 0.9) {
          const points = [];
          points.push(nodes[i].position);
          points.push(nodes[j].position);
          const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
          const line = new THREE.Line(lineGeometry, lineMaterial);
          connections.push(line);
          scene.add(line);
        }
      }
    }
    
    camera.position.z = 15;
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate nodes
      nodes.forEach((node, index) => {
        node.position.x += Math.sin(Date.now() * 0.0001 + index) * 0.01;
        node.position.y += Math.cos(Date.now() * 0.0001 + index) * 0.01;
        
        // Pulse effect
        const scale = 1 + Math.sin(Date.now() * 0.001 + index) * 0.2;
        node.scale.set(scale, scale, scale);
        
        // Update material opacity for breathing effect
        (node.material as THREE.MeshBasicMaterial).opacity = 0.5 + Math.sin(Date.now() * 0.001 + index) * 0.5;
      });
      
      // Rotate entire scene
      scene.rotation.x += 0.0005;
      scene.rotation.y += 0.001;
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 z-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-800/60 to-transparent z-10"></div>
      
      <div className="container mx-auto px-4 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm rounded-full font-medium">
              🚀 2025年最先端のAI技術を搭載
            </span>
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            あなたのホームページが
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              24時間働くAI社員
            </span>
            になる
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            人手不足を解決し、売上を自動的に増やし続ける
            <br />
            次世代型AIウェブシステム
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all"
            >
              無料デモを体験する
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/30 rounded-lg font-semibold text-lg hover:bg-white/20 transition-all"
            >
              導入事例を見る
            </motion.button>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-12"
          >
            <div className="inline-flex items-center gap-8 text-white/80">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm">導入企業</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm">顧客満足度</div>
              </div>
              <div className="w-px h-12 bg-white/30"></div>
              <div className="text-center">
                <div className="text-3xl font-bold">3.5倍</div>
                <div className="text-sm">平均売上向上</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;