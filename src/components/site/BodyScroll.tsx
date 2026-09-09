import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Minus, Plus, Rotate3D } from "lucide-react";

type Stage = {
  id: string;
  label: string;
  title: string;
  desc: string;
  specs: string[];
  /** hotspot position in % of the figure box */
  x: number;
  y: number;
};

const stages: Stage[] = [
  {
    id: "cortex",
    label: "01 / NEURAL & CORTEX",
    title: "Synapse Overclock v4",
    desc: "Co-processeur synaptique greffé sur le cortex préfrontal. Réduit la latence neuronale et augmente la vitesse de traitement cognitif de 40%.",
    specs: ["Bande passante 128 TB/s", "Conso 15 W", "Rejet < 0.02%"],
    x: 50,
    y: 7,
  },
  {
    id: "optique",
    label: "02 / OPTIQUE & SENSORIEL",
    title: "Iris HUD Tactique Kiroshi-X",
    desc: "Remplacement oculaire complet avec surcouche AR. Télémétrie, thermographie et identification de cibles projetées sur la rétine.",
    specs: ["16K par œil", "Zoom x20", "Thermique intégré"],
    x: 43,
    y: 10,
  },
  {
    id: "musculo",
    label: "03 / MUSCULO-SQUELETTIQUE",
    title: "Bras Bionique Titan Grip",
    desc: "Prothèse intégrale à servomoteurs tungstène et coque fibre de carbone. Ancrage vertébral requis au-delà de 400 kg de charge.",
    specs: ["Levage 800 kg", "Alliage W-C", "Rejet 0.1%"],
    x: 24,
    y: 42,
  },
  {
    id: "systemique",
    label: "04 / SYSTÉMIQUE & ORGANIQUE",
    title: "Pompe à Adrénaline Régulée",
    desc: "Glande surrénale synthétique déclenchable par commande mentale. Coagulants intégrés, sécurité matérielle à 5 doses par cycle.",
    specs: ["5 doses / jour", "Activation neurale", "Rejet 0.05%"],
    x: 57,
    y: 27,
  },
];

export function BodyScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const enabledRef = useRef<boolean[]>(stages.map((_, index) => index === 0));
  const buildModeRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState<boolean[]>(stages.map((_, index) => index === 0));
  const [buildMode, setBuildMode] = useState(false);

  useEffect(() => {
    const mount = canvasRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
    camera.position.set(0, 0, 8.2);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minDistance = 5.7;
    controls.maxDistance = 11;
    controls.target.set(0, 0, 0);

    scene.add(new THREE.HemisphereLight(0x9defff, 0x071018, 2.2));
    const keyLight = new THREE.DirectionalLight(0x7deaff, 3.5);
    keyLight.position.set(3, 5, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0xff4f92, 18, 12);
    rimLight.position.set(-3, 1, 3);
    scene.add(rimLight);

    const body = new THREE.Group();
    scene.add(body);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x8f9ba1,
      roughness: 0.72,
      metalness: 0.55,
      flatShading: true,
    });
    const cyan = new THREE.MeshStandardMaterial({
      color: 0x43e5ff,
      emissive: 0x0b7183,
      emissiveIntensity: 2.8,
      metalness: 0.35,
      roughness: 0.3,
    });

    let disposed = false;
    const loader = new GLTFLoader();
    loader.load("/models/Soldier.glb", (gltf) => {
      if (disposed) return;
      const model = gltf.scene;
      const bounds = new THREE.Box3().setFromObject(model);
      const size = bounds.getSize(new THREE.Vector3());
      const center = bounds.getCenter(new THREE.Vector3());
      const scale = 3.55 / size.y;
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
      model.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.material = bodyMaterial;
          object.castShadow = true;
        }
      });
      body.add(model);
    });

    const implantPositions: [number, number, number][] = [
      [0, 1.78, 0.45],
      [-0.16, 1.58, 0.5],
      [-0.5, 0.62, 0.5],
      [0.16, 1.02, 0.5],
    ];
    const implantGroups = stages.map((stage, index) => {
      const group = new THREE.Group();
      const material = cyan.clone();
      material.transparent = true;
      material.opacity = index === 0 ? 1 : 0;
      const node = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.12, 0.05), material);
      node.position.set(...implantPositions[index]!);
      node.rotation.z = index === 2 ? -0.25 : 0;
      group.add(node);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.022, 8, 20), material);
      ring.rotation.x = Math.PI / 2;
      node.add(ring);
      const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.38, 6), material);
      cable.rotation.z = index === 2 ? Math.PI / 2 : 0;
      cable.position.set(index === 2 ? 0.2 : 0, index === 2 ? 0 : -0.23, -0.01);
      node.add(cable);
      body.add(group);
      return { group, material };
    });

    const resize = () => {
      const { width, height } = mount.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);
    let frame = 0;
    const render = () => {
      const current = progressRef.current;
      const horizontal = current < 0.5 ? -current * 2 : (current - 0.5) * 2;
      body.position.x = horizontal * 0.9;
      body.rotation.z = Math.sin(current * Math.PI * 2) * 0.035;
      controls.enabled = buildModeRef.current;
      implantGroups.forEach(({ group, material }, index) => {
        const scrollAmount = THREE.MathUtils.clamp((current * stages.length - index) * 4, 0, 1);
        const amount = enabledRef.current[index] ? Math.max(scrollAmount, 1) : 0;
        material.opacity = amount;
        group.scale.setScalar(0.7 + amount * 0.3);
      });
      controls.update();
      renderer.render(scene, camera);
      frame = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      disposed = true;
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      bodyMaterial.dispose();
      cyan.dispose();
      implantGroups.forEach(({ material }) => material.dispose());
    };
  }, []);

  const toggleImplant = (index: number) => {
    const next = enabledRef.current.map((value, itemIndex) =>
      itemIndex === index ? !value : value,
    );
    enabledRef.current = next;
    setEnabled(next);
  };

  const toggleBuildMode = () => {
    const next = !buildModeRef.current;
    buildModeRef.current = next;
    setBuildMode(next);
  };

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 0;
        progressRef.current = p;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = Math.min(stages.length - 1, Math.floor(progress * stages.length * 0.999));
  const stage = stages[active]!;

  return (
    <section id="anatomie" ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="grid-bg absolute inset-0 opacity-70" aria-hidden />
        <div
          className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-primary), transparent 60%)" }}
          aria-hidden
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-6 px-5 pt-20 lg:grid-cols-[280px_1fr_340px]">
          {/* index */}
          <ol className="order-2 hidden flex-col justify-center gap-3 lg:order-1 lg:flex">
            {stages.map((s, i) => (
              <li
                key={s.id}
                className={`bevel-sm border-l-2 px-4 py-3 transition-all duration-500 ${
                  i === active
                    ? "border-l-primary bg-card text-foreground"
                    : "border-l-border bg-transparent text-muted-foreground"
                }`}
              >
                <p className="mono-label">{s.label}</p>
                <p className="mt-1 font-display text-xs font-bold">{s.title}</p>
              </li>
            ))}
          </ol>

          {/* figure */}
          <div className="relative order-1 mx-auto flex h-[58vh] w-full max-w-[34rem] items-center justify-center lg:order-2 lg:h-[78vh]">
            <div
              className="relative h-full w-full max-w-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${progress < 0.5 ? -progress * 2 * 22 : (progress - 0.5) * 2 * 22}%) scale(${1 + progress * 0.04})`,
              }}
            >
              <div
                ref={canvasRef}
                className={`h-full w-full ${buildMode ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"}`}
                aria-label="Modèle 3D low-poly cybernétique Synaptik"
                role="img"
              />
              {stages.map((s, i) => {
                const on = i <= active;
                return (
                  <span
                    key={s.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                    style={{
                      left: `${s.x}%`,
                      top: `${s.y}%`,
                      opacity: on && enabled[i] ? 1 : 0,
                      transform: `translate(-50%,-50%) scale(${on ? 1 : 0.4})`,
                    }}
                  >
                    <span className="relative block h-3 w-3">
                      <span
                        className="absolute inset-0 rounded-full bg-primary"
                        style={{ animation: "pulse-node 1.8s ease-in-out infinite" }}
                      />
                      <span className="absolute -inset-3 rounded-full border border-primary/40" />
                    </span>
                  </span>
                );
              })}
            </div>
            <div
              className="pointer-events-none absolute inset-x-0 h-24 opacity-40"
              style={{
                top: `${progress * 100}%`,
                background:
                  "linear-gradient(to bottom, transparent, oklch(0.855 0.145 200 / 0.25), transparent)",
              }}
              aria-hidden
            />
          </div>

          <div className="absolute bottom-12 left-1/2 z-10 w-[min(92vw,34rem)] -translate-x-1/2 border border-border bg-card/90 p-3 backdrop-blur">
            {!buildMode ? (
              <button
                type="button"
                onClick={toggleBuildMode}
                className="bevel flex w-full items-center justify-center gap-3 border border-primary/70 bg-primary/15 px-4 py-3 font-display text-xs font-bold tracking-[0.16em] text-primary transition-colors hover:bg-primary/25"
              >
                <Rotate3D className="h-4 w-4" />
                ENTRER EN ARMOR BUILD
              </button>
            ) : (
              <>
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="mono-label flex items-center gap-2 text-primary">
                    <Rotate3D className="h-3.5 w-3.5" />
                    Armor build · rotation / zoom actifs
                  </p>
                  <button
                    type="button"
                    onClick={toggleBuildMode}
                    className="font-mono text-[10px] text-muted-foreground transition-colors hover:text-primary"
                  >
                    QUITTER
                  </button>
                </div>
                <div className="mb-3 flex justify-end">
                  <p className="font-mono text-[10px] text-muted-foreground">
                    {enabled.filter(Boolean).length}/4 actifs
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {stages.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={enabled[index]}
                      onClick={() => toggleImplant(index)}
                      className={`bevel-sm flex min-h-12 items-center justify-between gap-2 border px-3 py-2 text-left transition-colors ${
                        enabled[index]
                          ? "border-primary/70 bg-primary/15 text-foreground"
                          : "border-border bg-background text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <span className="font-mono text-[10px] leading-tight">
                        {item.label.split(" / ")[1]}
                      </span>
                      {enabled[index] ? (
                        <Minus className="h-3.5 w-3.5 shrink-0 text-primary" />
                      ) : (
                        <Plus className="h-3.5 w-3.5 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* annotation */}
          <div className="order-3 flex items-center">
            <div
              key={stage.id}
              className="bevel w-full border border-border bg-card/90 p-6 backdrop-blur"
            >
              <p className="mono-label text-primary">{stage.label}</p>
              <h3 className="mt-3 font-display text-xl font-bold">{stage.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.desc}</p>
              <ul className="mt-5 space-y-2">
                {stage.specs.map((sp) => (
                  <li
                    key={sp}
                    className="flex items-center justify-between border-b border-border/70 pb-2 font-mono text-xs text-foreground"
                  >
                    <span>{sp}</span>
                    <span className="text-primary">OK</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <div className="mono-label mb-2">Intégration du châssis</div>
                <div className="h-1 w-full bg-secondary">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </div>
                <p className="mt-2 font-mono text-xs text-muted-foreground">
                  {Math.round(progress * 100)}% · {active + 1}/{stages.length} modules montés
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="mono-label absolute bottom-5 left-1/2 -translate-x-1/2">
          Défilez pour assembler le châssis
        </p>
      </div>
    </section>
  );
}
