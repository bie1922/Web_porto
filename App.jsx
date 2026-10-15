import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight, Github, Linkedin, Mail, Menu, Code2, Layers3,
  Smartphone, Globe, ExternalLink, Terminal, Sparkles, Download, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    number: '01',
    title: 'Mamy Kos',
    type: 'WEB PLATFORM',
    description: 'Konsep website promosi kost dengan tampilan responsif, informasi kamar, dan pengalaman pencarian yang sederhana.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    icon: <Globe size={22} />,
    color: 'mint'
  },
  {
    number: '02',
    title: 'GOCLEAN',
    type: 'SERVICE WEBSITE',
    description: 'Website layanan cleaning dengan bagian layanan, pemesanan, dan alur kontak WhatsApp untuk pelanggan.',
    stack: ['React', 'Tailwind CSS', 'JavaScript'],
    icon: <Layers3 size={22} />,
    color: 'purple'
  },
  {
    number: '03',
    title: 'Smart Door Lock',
    type: 'IOT / EMBEDDED',
    description: 'Eksperimen sistem kunci pintu menggunakan RFID, servo, dan buzzer berbasis Arduino.',
    stack: ['Arduino', 'C++', 'RFID'],
    icon: <Code2 size={22} />,
    color: 'blue'
  }
];

const skills = [
  { name: 'HTML & CSS', level: 'WEB FOUNDATION', width: '88%' },
  { name: 'JavaScript', level: 'INTERACTIVE UI', width: '72%' },
  { name: 'React', level: 'FRONTEND', width: '65%' },
  { name: 'PHP & MySQL', level: 'BACKEND BASICS', width: '62%' },
  { name: 'Arduino / C++', level: 'EXPERIMENTAL', width: '54%' }
];

function Starfield() {
  const mountRef = useRef(null);
  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer, scene, camera, points, frame;
    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 1000);
      camera.position.z = 40;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      mount.appendChild(renderer.domElement);
      const count = 900;
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 100;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 65;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 70;
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const material = new THREE.PointsMaterial({ color: 0x8bffe0, size: 0.075, transparent: true, opacity: 0.8 });
      points = new THREE.Points(geometry, material);
      scene.add(points);
      const resize = () => {
        if (!mount || !renderer) return;
        camera.aspect = mount.clientWidth / mount.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(mount.clientWidth, mount.clientHeight);
      };
      window.addEventListener('resize', resize);
      const animate = () => {
        frame = requestAnimationFrame(animate);
        points.rotation.y += 0.00035;
        points.rotation.x = Math.sin(Date.now() * 0.0001) * 0.025;
        renderer.render(scene, camera);
      };
      animate();
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener('resize', resize);
        geometry.dispose(); material.dispose(); renderer.dispose();
        if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
      };
    } catch (e) {
      console.warn('Three.js visual could not initialize:', e);
    }
  }, []);
  return <div className="starfield" ref={mountRef} aria-hidden="true" />;
}

function IdCard() {
  return (
    <div className="lanyard-wrap" aria-label="Kartu identitas ilustratif">
      <div className="lanyard-hook" />
      <div className="lanyard-ribbon"><span>AR / DEV</span></div>
      <div className="id-card">
        <div className="card-top"><span>PERSONNEL / 2026</span><span className="card-dot" /></div>
        <div className="avatar-frame">
          <img src="https://images.unsplash.com/photo-1578632767115-3515fe1e7aaa?auto=format&fit=crop&w=500&q=85" alt="Ilustrasi anime untuk kartu identitas" />
          <span className="scanline" />
        </div>
        <div className="card-name">ARBIE DWI</div>
        <div className="card-role">FRONTEND DEVELOPER</div>
        <div className="card-divider" />
        <div className="card-meta"><span>ID / 2025806016</span><span>INDONESIA</span></div>
        <div className="barcode" />
        <div className="card-foot"><span>BUILD. LEARN. REPEAT.</span><Sparkles size={14} /></div>
      </div>
      <div className="card-shadow" />
    </div>
  );
}

function App() {
  const rootRef = useRef(null);
  const [menuOpen, setMenuOpen] = React.useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-inner', { y: -20, opacity: 0, duration: 0.8, ease: 'power3.out' });
      gsap.from('.hero-copy > *', { y: 28, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.15, ease: 'power3.out' });
      gsap.from('.lanyard-wrap', { y: 35, opacity: 0, rotate: 4, duration: 1.1, delay: 0.35, ease: 'power3.out' });
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.from(el, {
          y: 36, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 86%', once: true }
        });
      });
      gsap.to('.lanyard-wrap', { rotate: 2.2, duration: 2.7, repeat: -1, yoyo: true, ease: 'sine.inOut', transformOrigin: 'top center' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="app-shell" ref={rootRef}>
      <Starfield />
      <div className="ambient ambient-one" /><div className="ambient ambient-two" />
      <nav className="navbar">
        <div className="nav-inner container">
          <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">A<span>.</span></span><span>ARBIE<span className="muted">/DEV</span></span></a>
          <button className="mobile-menu" aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={closeMenu}>Tentang</a>
            <a href="#projects" onClick={closeMenu}>Proyek</a>
            <a href="#skills" onClick={closeMenu}>Keahlian</a>
            <a href="#contact" className="nav-contact" onClick={closeMenu}>Hubungi saya <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </nav>

      <main>
        <section className="hero container" id="home">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> AVAILABLE FOR NEW PROJECTS <span className="eyebrow-line" /></div>
            <h1>Building digital<br />things with <span className="gradient-text">purpose.</span></h1>
            <p className="hero-description">Halo, saya <strong>Arbie Dwi Prayoga</strong> — mahasiswa Teknologi Informasi yang tertarik membangun pengalaman digital, website interaktif, dan solusi teknologi yang berguna.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Jelajahi proyek <ArrowUpRight size={17} /></a>
              <a className="button button-ghost" href="#contact"><Mail size={16} /> Kontak saya</a>
            </div>
            <div className="hero-footnote"><span className="mono">01 / 04</span><span className="footnote-rule" /><span>DESIGN · CODE · ITERATE</span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-orbit orbit-a" /><div className="visual-orbit orbit-b" />
            <div className="visual-label label-top"><span className="tiny-square" /> IDENTITY MODULE <span>v.2.6</span></div>
            <IdCard />
            <div className="floating-tag tag-left"><Code2 size={15} /><span>Clean code</span></div>
            <div className="floating-tag tag-right"><Sparkles size={15} /><span>Creative mind</span></div>
            <div className="visual-label label-bottom">FIG. 01 — DEVELOPER PROFILE</div>
          </div>
          <div className="scroll-indicator"><span /> SCROLL TO EXPLORE</div>
        </section>

        <section className="ticker" aria-label="Fokus"><div className="ticker-track">{Array.from({length: 2}).map((_, i) => <span key={i}>FRONTEND DEVELOPMENT <b>✳</b> CREATIVE TECHNOLOGY <b>✳</b> UI / UX THINKING <b>✳</b> BUILDING FOR THE WEB <b>✳</b></span>)}</div></section>

        <section className="section container" id="about">
          <div className="section-heading reveal"><div className="section-index">01 / ABOUT</div><h2>Curious by nature.<br /><span className="muted-heading">Developer by practice.</span></h2></div>
          <div className="about-grid">
            <div className="about-main reveal"><p className="large-copy">Saya percaya teknologi yang baik bukan cuma terlihat keren — tetapi juga <span className="accent-text">memecahkan masalah nyata.</span></p><p className="body-copy">Saat ini saya terus mengembangkan kemampuan dalam pembuatan website, pemrograman, dan eksplorasi teknologi. Saya senang belajar lewat proyek nyata, mencoba hal baru, dan meningkatkan kualitas karya sedikit demi sedikit.</p><a href="#contact" className="text-link">Mari berkolaborasi <ArrowUpRight size={16} /></a></div>
            <div className="about-stats reveal"><div className="stat-card"><span className="stat-number">03<span>+</span></span><span className="stat-label">PROJECT EXPLORATIONS</span></div><div className="stat-card"><span className="stat-number">∞</span><span className="stat-label">CURIOSITY LEVEL</span></div><div className="quote-card"><span className="quote-mark">“</span><p>Every expert was once a beginner.</p><span className="quote-by">— KEEP BUILDING</span></div></div>
          </div>
        </section>

        <section className="section projects-section" id="projects"><div className="container">
          <div className="section-heading reveal"><div className="section-index">02 / SELECTED WORK</div><h2>Ideas into <span className="gradient-text">interfaces.</span></h2><p className="heading-note">Beberapa proyek dan eksperimen yang sedang saya bangun.</p></div>
          <div className="project-grid">{projects.map((project) => <article className={`project-card ${project.color} reveal`} key={project.number}><div className="project-card-top"><span className="project-number">{project.number} / 03</span><span className="project-icon">{project.icon}</span></div><div className="project-art"><div className="art-grid" /><div className="art-window"><div className="window-bar"><i /><i /><i /><span>{project.title.toLowerCase().replaceAll(' ', '-')}</span></div><div className="window-content"><div className="window-sidebar" /><div className="window-lines"><b /><b /><b /><div /></div></div><div className="art-orb" /></div><span className="art-caption">CONCEPT / {project.number}</span></div><div className="project-info"><div className="project-type">{project.type}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-list">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div></div><div className="project-card-footer"><span>CASE STUDY / CONCEPT</span><ArrowUpRight size={17} /></div></article>)}</div>
          <div className="projects-note reveal"><span className="note-dot" /> Project details and live demos can be added here as they become available.</div>
        </div></section>

        <section className="section container" id="skills"><div className="section-heading reveal"><div className="section-index">03 / TOOLKIT</div><h2>Tools I use to<br /><span className="muted-heading">make things happen.</span></h2></div><div className="skills-layout"><div className="skills-intro reveal"><div className="terminal-window"><div className="terminal-top"><span /><span /><span /><label>arbie@dev:~</label></div><div className="terminal-body"><p><span className="terminal-green">➜</span> <span className="terminal-blue">~</span> whoami</p><p className="terminal-output">Arbie Dwi Prayoga</p><p><span className="terminal-green">➜</span> <span className="terminal-blue">~</span> cat focus.txt</p><p className="terminal-output">Web development<br />Creative problem solving<br />Continuous learning<span className="cursor">▋</span></p></div></div><p className="body-copy">Saya terus belajar dan memperluas toolkit. Daftar ini menunjukkan area yang sedang saya pelajari dan gunakan dalam eksperimen.</p></div><div className="skills-list reveal">{skills.map((skill, i) => <div className="skill-row" key={skill.name}><div className="skill-label"><span className="skill-index">0{i + 1}</span><strong>{skill.name}</strong><span>{skill.level}</span></div><div className="skill-track"><div className="skill-fill" style={{width: skill.width}} /></div></div>)}</div></div><div className="tool-badges reveal"><span><Code2 size={15} /> HTML / CSS</span><span><Terminal size={15} /> JavaScript</span><span><Layers3 size={15} /> React</span><span><Globe size={15} /> PHP / MySQL</span><span><Smartphone size={15} /> Responsive UI</span></div></section>

        <section className="contact-section" id="contact"><div className="container contact-inner reveal"><div className="section-index">04 / GET IN TOUCH</div><h2>Have an idea?<br /><span className="gradient-text">Let's build it.</span></h2><p>Terbuka untuk diskusi proyek, kolaborasi, dan kesempatan belajar bersama.</p><a className="button button-primary contact-button" href="mailto:arbie@example.com?subject=Kolaborasi%20Proyek">Mulai percakapan <Mail size={17} /></a><div className="contact-decoration">LET'S CREATE SOMETHING USEFUL<span>✳</span></div></div></section>
      </main>

      <footer className="footer"><div className="container footer-inner"><a className="brand" href="#home"><span className="brand-mark">A<span>.</span></span><span>ARBIE<span className="muted">/DEV</span></span></a><span className="footer-copy">DESIGNED & BUILT WITH CURIOSITY © 2026</span><div className="social-links"><a href="https://github.com/bie1922" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href="mailto:arbie@example.com" aria-label="Email"><Mail size={17} /></a></div></div></footer>
    </div>
  );
}

export default App;