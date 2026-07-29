import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  ChevronRight,
  MapPin,
  Phone,
  Instagram,
  Facebook,
  Youtube,
  Bone,
  Activity,
  HeartPulse,
  Dumbbell,
  Wind,
  UserCheck,
  Star,
  Shield,
  Clock,
  Award,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// --- CONFIGURÁVEL: Troque aqui os dados reais ---
const WHATSAPP_NUMBER = '5511999999999';
const CLINIC_ADDRESS = 'Rua Exemplo, 123 - Bairro - Cidade/UF';
const CLINIC_PHONE = '(11) 99999-9999';
const INSTAGRAM_URL = 'https://instagram.com';
const FACEBOOK_URL = 'https://facebook.com';
const YOUTUBE_URL = 'https://youtube.com';

const ZONE_VIDEOS: Record<string, string> = {
  'Cabeça e Cervical': '',
  Ombro: '',
  'Cotovelo e Antebraço': '',
  'Punho e Mão': '',
  'Coluna Torácica': '',
  'Coluna Lombar': '',
  'Peito e Tórax': '',
  Quadril: '',
  Joelho: '',
  'Tornozelo e Pé': '',
};

// URLs das imagens do corpo
const BODY_FRONT_IMAGE = 'https://thumbs.dreamstime.com/b/male-anatomy-heart-18582891.jpg';
const BODY_BACK_IMAGE = 'https://thumbs.dreamstime.com/b/human-anatomy-back-muscles-shown-red-illustration-18582891.jpg';
// --- FIM DAS CONFIGURAÇÕES ---

interface ZoneData {
  id: string;
  title: string;
  problem: string;
  recovery: string;
  method: string;
}

const ZONES: ZoneData[] = [
  { id: 'head_neck', title: 'Cabeça e Cervical', problem: 'Cervicalgia / Torcicolo', recovery: '2 a 6 semanas', method: 'Terapia manual + alongamento' },
  { id: 'shoulder', title: 'Ombro', problem: 'Bursite / Tendinite', recovery: '4 a 12 semanas', method: 'Fortalecimento + liberação miofascial' },
  { id: 'elbow', title: 'Cotovelo e Antebraço', problem: 'Epicondilite', recovery: '4 a 8 semanas', method: 'Terapia por ondas de choque + exercícios' },
  { id: 'wrist', title: 'Punho e Mão', problem: 'Síndrome do Túnel do Carpo', recovery: '6 a 12 semanas', method: 'Imobilização + dessensibilização neural' },
  { id: 'thoracic', title: 'Coluna Torácica', problem: 'Dor postural / Hipercifose', recovery: '8 a 16 semanas', method: 'RPG + fortalecimento escapular' },
  { id: 'lumbar', title: 'Coluna Lombar', problem: 'Lombalgia / Hérnia de disco', recovery: '6 a 12 semanas', method: 'Estabilização segmentar + tração' },
  { id: 'chest', title: 'Peito e Tórax', problem: 'Reabilitação pós-cirúrgica', recovery: '8 a 16 semanas', method: 'Fisioterapia respiratória + expansão torácica' },
  { id: 'hip', title: 'Quadril', problem: 'Bursite trocantérica', recovery: '4 a 10 semanas', method: 'Fortalecimento glúteo + terapia manual' },
  { id: 'knee', title: 'Joelho', problem: 'Condromalácia patelar', recovery: '8 a 16 semanas', method: 'Fortalecimento excêntrico + equilíbrio' },
  { id: 'ankle', title: 'Tornozelo e Pé', problem: 'Entorse / Fascite plantar', recovery: '3 a 12 semanas', method: 'Propriocepção + bandagem funcional' },
];

const SPECIALIZATIONS = [
  { icon: Bone, title: 'Ortopedia e Traumatologia', desc: 'Lesões ósseas, articulares e musculares.' },
  { icon: Dumbbell, title: 'Fisioterapia Esportiva', desc: 'Performance, prevenção e retorno ao esporte.' },
  { icon: Wind, title: 'Fisioterapia Respiratória', desc: 'Reabilitação pulmonar e capacidade respiratória.' },
  { icon: Activity, title: 'Reabilitação Pós-Cirúrgica', desc: 'Recuperação segura após procedimentos cirúrgicos.' },
  { icon: UserCheck, title: 'RPG (Reeducação Postural)', desc: 'Correção postural e alívio de dores crônicas.' },
  { icon: HeartPulse, title: 'Fisioterapia Geriátrica', desc: 'Mobilidade e qualidade de vida musculoesquelética.' },
];

const HERO_BENEFITS = [
  { icon: Star, text: 'Especialistas certificados' },
  { icon: Shield, text: 'Técnicas avançadas' },
  { icon: Clock, text: 'Atendimento ágil' },
  { icon: Award, text: '+10 anos de excelência' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [formError, setFormError] = useState('');

  const mapSectionRef = useRef<HTMLDivElement>(null);
  const specSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const currentZoneData = ZONES.find(z => z.id === selectedZone);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedZone(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [menuOpen]);

  // Scroll to top of drawer content when zone changes
  useEffect(() => {
    if (selectedZone && drawerContentRef.current) {
      drawerContentRef.current.scrollTop = 0;
    }
  }, [selectedZone]);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const handleWhatsApp = () => {
    if (!nome.trim() || !idade.trim() || !sintoma.trim()) {
      setFormError('Por favor, preencha todos os campos antes de prosseguir.');
      return;
    }
    setFormError('');
    const zoneTitle = currentZoneData?.title || 'Área selecionada';
    const message = `Olá! Meu nome é ${nome}, tenho ${idade} anos.\nEstou sentindo: ${sintoma}\nÁrea de interesse: ${zoneTitle}`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`, '_blank');
  };

  const resetForm = () => {
    setNome('');
    setIdade('');
    setSintoma('');
    setFormError('');
  };

  const handleZoneClick = (zoneId: string) => {
    resetForm();
    setSelectedZone(zoneId);
  };

  return (
    <div className="relative bg-black text-white font-['Inter'] selection:bg-teal-400/30">
      <style>{`
        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
          border: none;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.45) 0%,
            rgba(255, 255, 255, 0.15) 20%,
            transparent 40%,
            transparent 60%,
            rgba(255, 255, 255, 0.15) 80%,
            rgba(255, 255, 255, 0.45) 100%
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .body-zone {
          fill: transparent;
          stroke: transparent;
          cursor: pointer;
          transition: all 0.3s ease-out;
          vector-effect: non-scaling-stroke;
        }
        .body-zone:hover {
          stroke: rgba(94, 234, 212, 0.8);
          stroke-width: 2px;
          filter: drop-shadow(0 0 12px rgba(94, 234, 212, 0.6));
        }
        .zone-dimmed .body-zone {
          opacity: 0.3;
        }
        .zone-dimmed .body-zone:hover {
          opacity: 1;
          stroke: rgba(94, 234, 212, 0.9);
        }
        .drawer-scroll::-webkit-scrollbar { 
          width: 6px; 
        }
        .drawer-scroll::-webkit-scrollbar-track { 
          background: rgba(255,255,255,0.05); 
        }
        .drawer-scroll::-webkit-scrollbar-thumb { 
          background: rgba(94, 234, 212, 0.3); 
          border-radius: 4px; 
        }
        .drawer-scroll::-webkit-scrollbar-thumb:hover { 
          background: rgba(94, 234, 212, 0.5); 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade-in-up-delay {
          animation: fadeInUp 0.6s ease-out 0.2s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.6s ease-out 0.4s forwards;
          opacity: 0;
        }
      `}</style>

      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-20 md:hidden transition-opacity duration-500 ease-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(24px)' }}
      >
        <div className={`flex flex-col items-center justify-center h-full gap-8 transition-transform duration-500 ease-out ${menuOpen ? 'translate-y-0' : '-translate-y-8'}`}>
          <button onClick={() => scrollToSection(mapSectionRef)} className="text-2xl font-medium text-white hover:text-teal-300 transition-colors">Mapa Corporal</button>
          <button onClick={() => scrollToSection(specSectionRef)} className="text-2xl font-medium text-white hover:text-teal-300 transition-colors">Especializações</button>
          <button onClick={() => scrollToSection(aboutSectionRef)} className="text-2xl font-medium text-white hover:text-teal-300 transition-colors">Saiba Mais Sobre Nós</button>
          <button 
            onClick={() => {
              setMenuOpen(false);
              window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com um especialista.`, '_blank');
            }} 
            className="liquid-glass rounded-full px-6 py-3 text-white font-medium flex items-center gap-2 mt-4"
          >
            <MessageCircle className="h-5 w-5" /> Fale com um Especialista
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col">
        <nav className="flex justify-between items-center px-5 pt-6 sm:px-8 sm:pt-8 md:px-16 lg:px-20">
          <div className="flex-shrink-0">
            <svg width="36" height="36" viewBox="0 0 256 256" fill="white" className="md:w-[40px] md:h-[40px]">
              <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
            </svg>
          </div>

          <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 gap-8">
            <button onClick={() => scrollToSection(mapSectionRef)} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Mapa Corporal</button>
            <button onClick={() => scrollToSection(specSectionRef)} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Especializações</button>
            <button onClick={() => scrollToSection(aboutSectionRef)} className="text-sm font-medium text-white/70 hover:text-white transition-colors">Saiba Mais Sobre Nós</button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com um especialista.`, '_blank')}
              className="hidden md:flex liquid-glass rounded-full px-5 py-2.5 items-center gap-2 text-sm font-medium text-white hover:bg-white/5 transition-all"
            >
              <MessageCircle className="h-4 w-4" /> Fale com um Especialista
            </button>
            <button
              className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center z-50 relative"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
              <X className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
            </button>
          </div>
        </nav>

        <div className={`flex-1 flex items-center px-5 sm:px-8 md:px-16 lg:px-20 transition-opacity duration-500 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              
              {/* Coluna da esquerda - Texto */}
              <div>
                <div className="animate-fade-in-up">
                  <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-5 sm:mb-6">
                    <div className="flex -space-x-2">
                      {['774909', '1222271', '1239291', '697509'].map((id, i) => (
                        <img
                          key={i}
                          src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                          alt=""
                          className="h-5 w-5 sm:h-6 sm:w-6 rounded-full border-2 border-white/20 object-cover"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/80">sua jornada para o bem-estar</span>
                  </div>
                </div>

                <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.05] text-white tracking-[-0.05em] mb-6 sm:mb-8">
                  Recupere seu<br />movimento natural
                </h1>
                
                <p className="animate-fade-in-up-delay text-lg sm:text-xl text-white/70 font-light max-w-xl mb-8">
                  Especialistas em fisioterapia ortopédica e esportiva. Descubra o que está causando sua dor e inicie seu caminho de recuperação hoje.
                </p>

                <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => scrollToSection(mapSectionRef)}
                    className="liquid-glass rounded-full px-8 py-3.5 text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-white/5 transition-all text-lg group"
                  >
                    Explorar Mapa Corporal 
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de agendar uma avaliação.`, '_blank')}
                    className="rounded-full px-8 py-3.5 bg-teal-500/20 border border-teal-400/30 text-teal-300 font-medium inline-flex items-center justify-center gap-2 hover:bg-teal-500/30 transition-all text-lg backdrop-blur-sm"
                  >
                    Agende sua Avaliação <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Coluna da direita - Cards de benefícios */}
              <div className="animate-fade-in-up-delay-2 grid grid-cols-2 gap-4">
                {HERO_BENEFITS.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={idx} className="liquid-glass rounded-2xl p-6 backdrop-blur-md text-center hover:bg-white/[0.02] transition-all group cursor-default">
                      <Icon className="h-8 w-8 text-teal-400 mx-auto mb-3 group-hover:scale-110 transition-transform" strokeWidth={1.5} />
                      <p className="text-white/80 text-sm font-medium">{benefit.text}</p>
                    </div>
                  );
                })}
                
                {/* Card extra de estatística */}
                <div className="liquid-glass rounded-2xl p-6 backdrop-blur-md text-center col-span-2 bg-teal-500/5">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-teal-400" />
                    <span className="text-teal-400 text-lg font-semibold">98%</span>
                    <Sparkles className="h-5 w-5 text-teal-400" />
                  </div>
                  <p className="text-white/70 text-sm">dos pacientes recomendam nossa clínica</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Map Section */}
      <section ref={mapSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20 min-h-screen flex flex-col items-center justify-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">Mapa Corporal Interativo</h2>
          <p className="text-white/60 max-w-lg mx-auto">Clique em uma área do corpo para descobrir condições comuns, tratamentos e falar com um especialista.</p>
        </div>

        <div className="liquid-glass rounded-full p-1 flex mb-10">
          <button
            onClick={() => setActiveView('front')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeView === 'front' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            Frente
          </button>
          <button
            onClick={() => setActiveView('back')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeView === 'back' ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80'}`}
          >
            Costas
          </button>
        </div>

        <div className="relative w-full max-w-[350px] sm:max-w-[420px] md:max-w-[500px] lg:max-w-[580px] mx-auto">
          <div className="liquid-glass rounded-3xl p-6 sm:p-10 backdrop-blur-md bg-black/20 relative">
            
            {/* Imagem do corpo humano */}
            <div className="relative w-full" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <img 
                src={activeView === 'front' ? BODY_FRONT_IMAGE : BODY_BACK_IMAGE}
                alt={activeView === 'front' ? 'Corpo humano frente' : 'Corpo humano costas'}
                className="w-full h-auto opacity-85"
                style={{ filter: 'brightness(1.1) contrast(0.95)' }}
              />
              
              {/* SVG overlay com zonas clicáveis */}
              <svg
                viewBox="0 0 400 700"
                className="absolute inset-0 w-full h-full"
                onMouseOver={(e) => {
                  const target = e.target as SVGElement;
                  const zoneId = target.getAttribute('data-zone-id');
                  if (zoneId) setHoveredZone(zoneId);
                }}
                onMouseOut={() => setHoveredZone(null)}
                onClick={(e) => {
                  const target = e.target as SVGElement;
                  const zoneId = target.getAttribute('data-zone-id');
                  if (zoneId) handleZoneClick(zoneId);
                }}
              >
                {activeView === 'front' ? (
                  <g className={hoveredZone ? 'zone-dimmed' : ''}>
                    <ellipse data-zone-id="head_neck" cx="200" cy="65" rx="55" ry="65" className="body-zone" />
                    <ellipse data-zone-id="shoulder" cx="120" cy="155" rx="38" ry="28" className="body-zone" />
                    <ellipse data-zone-id="shoulder" cx="280" cy="155" rx="38" ry="28" className="body-zone" />
                    <rect data-zone-id="chest" x="155" y="140" width="90" height="80" rx="15" className="body-zone" />
                    <circle data-zone-id="elbow" cx="95" cy="270" r="22" className="body-zone" />
                    <circle data-zone-id="elbow" cx="305" cy="270" r="22" className="body-zone" />
                    <circle data-zone-id="wrist" cx="80" cy="350" r="18" className="body-zone" />
                    <circle data-zone-id="wrist" cx="320" cy="350" r="18" className="body-zone" />
                    <rect data-zone-id="thoracic" x="170" y="200" width="60" height="100" rx="15" className="body-zone" />
                    <rect data-zone-id="lumbar" x="175" y="300" width="50" height="80" rx="15" className="body-zone" />
                    <circle data-zone-id="hip" cx="155" cy="420" r="35" className="body-zone" />
                    <circle data-zone-id="hip" cx="245" cy="420" r="35" className="body-zone" />
                    <circle data-zone-id="knee" cx="160" cy="530" r="28" className="body-zone" />
                    <circle data-zone-id="knee" cx="240" cy="530" r="28" className="body-zone" />
                    <circle data-zone-id="ankle" cx="155" cy="640" r="25" className="body-zone" />
                    <circle data-zone-id="ankle" cx="245" cy="640" r="25" className="body-zone" />
                  </g>
                ) : (
                  <g className={hoveredZone ? 'zone-dimmed' : ''}>
                    <ellipse data-zone-id="head_neck" cx="200" cy="65" rx="55" ry="65" className="body-zone" />
                    <ellipse data-zone-id="shoulder" cx="120" cy="155" rx="38" ry="28" className="body-zone" />
                    <ellipse data-zone-id="shoulder" cx="280" cy="155" rx="38" ry="28" className="body-zone" />
                    <rect data-zone-id="thoracic" x="170" y="200" width="60" height="100" rx="15" className="body-zone" />
                    <circle data-zone-id="elbow" cx="95" cy="270" r="22" className="body-zone" />
                    <circle data-zone-id="elbow" cx="305" cy="270" r="22" className="body-zone" />
                    <rect data-zone-id="lumbar" x="175" y="300" width="50" height="80" rx="15" className="body-zone" />
                    <circle data-zone-id="hip" cx="155" cy="420" r="35" className="body-zone" />
                    <circle data-zone-id="hip" cx="245" cy="420" r="35" className="body-zone" />
                    <circle data-zone-id="knee" cx="160" cy="530" r="28" className="body-zone" />
                    <circle data-zone-id="knee" cx="240" cy="530" r="28" className="body-zone" />
                    <circle data-zone-id="ankle" cx="155" cy="640" r="25" className="body-zone" />
                    <circle data-zone-id="ankle" cx="245" cy="640" r="25" className="body-zone" />
                  </g>
                )}
              </svg>
            </div>
            
            {hoveredZone && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 liquid-glass rounded-full px-4 py-1.5 text-sm font-medium text-teal-300 shadow-lg pointer-events-none z-10">
                {ZONES.find(z => z.id === hoveredZone)?.title}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section ref={specSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">Nossas Especializações</h2>
          <p className="text-white/60 max-w-lg mx-auto">Atendimento especializado e humanizado para cada necessidade do seu corpo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SPECIALIZATIONS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="liquid-glass rounded-2xl p-6 backdrop-blur-md hover:bg-white/[0.02] transition-all group">
                <Icon className="h-8 w-8 text-teal-400 mb-4" strokeWidth={1.5} />
                <h3 className="text-xl font-medium text-white mb-2">{spec.title}</h3>
                <p className="text-white/60 font-light">{spec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-6">Saiba Mais Sobre Nós</h2>
              <p className="text-white/70 font-light mb-4 leading-relaxed">
                Na FisioNew, acreditamos que cada corpo conta uma história. Nossa missão é ouvir, compreender e traçar o melhor caminho para sua recuperação, com base em ciência, técnica e acolhimento.
              </p>
              <p className="text-white/70 font-light leading-relaxed">
                Com uma equipe multidisciplinar focada em ortopedia, esporte e reabilitação respiratória, oferecemos um ambiente seguro e moderno para você recuperar sua qualidade de vida.
              </p>
            </div>
            <div className="liquid-glass rounded-3xl overflow-hidden h-64 sm:h-80">
              <div className="w-full h-full bg-gradient-to-br from-teal-900/40 to-black/60 flex items-center justify-center text-white/40 text-lg font-light">
                Foto da Equipe / Clínica
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { number: '+10', label: 'Anos de experiência' },
              { number: '+2.000', label: 'Pacientes atendidos' },
              { number: '98%', label: 'Satisfação' },
            ].map((stat, i) => (
              <div key={i} className="liquid-glass rounded-2xl p-6 text-center backdrop-blur-md">
                <div className="text-3xl sm:text-4xl font-light text-teal-400 mb-2">{stat.number}</div>
                <div className="text-white/60 font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/20 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-20 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <svg width="28" height="28" viewBox="0 0 256 256" fill="white" className="opacity-80">
                <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
              </svg>
              <span className="text-white/80 font-medium text-lg">FisioNew</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-white/50 font-light">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {CLINIC_ADDRESS}</span>
              <span className="flex items-center gap-2"><Phone className="h-4 w-4" /> {CLINIC_PHONE}</span>
            </div>
            <div className="flex gap-4">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-teal-400 transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-teal-400 transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-teal-400 transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/5 text-center text-white/30 text-xs font-light">
            © {new Date().getFullYear()} FisioNew. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-md transition-transform duration-500 ease-out transform ${
          selectedZone ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${selectedZone ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setSelectedZone(null)}
        />
        <div 
          ref={drawerContentRef}
          className="relative ml-auto w-full max-w-md h-full liquid-glass border-l border-white/10 bg-black/40 backdrop-blur-xl overflow-y-auto drawer-scroll p-6 sm:p-8"
        >
          <button
            onClick={() => setSelectedZone(null)}
            className="sticky top-4 float-right liquid-glass h-8 w-8 rounded-full flex items-center justify-center text-white/70 hover:text-white transition-colors z-10"
          >
            <X className="h-4 w-4" />
          </button>

          {currentZoneData && (
            <div className="mt-10 space-y-6 pb-8">
              <h3 className="text-2xl font-medium text-white">{currentZoneData.title}</h3>
              
              <div className="space-y-4">
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Problema comum</span>
                  <p className="text-white/80 font-light">{currentZoneData.problem}</p>
                </div>
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Tempo estimado de recuperação</span>
                  <p className="text-white/80 font-light">{currentZoneData.recovery}</p>
                  <p className="text-xs text-white/40 mt-1">*Estimativa geral, pode variar por caso.</p>
                </div>
                <div>
                  <span className="text-xs text-white/40 uppercase tracking-wider">Método sugerido</span>
                  <p className="text-white/80 font-light">{currentZoneData.method}</p>
                </div>
              </div>

              <div className="liquid-glass rounded-xl overflow-hidden aspect-video">
                {ZONE_VIDEOS[currentZoneData.title] ? (
                  <video
                    src={ZONE_VIDEOS[currentZoneData.title]}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/30 text-sm">
                    Vídeo demonstrativo em breve
                  </div>
                )}
              </div>

              <div className="space-y-4" id="triage-form">
                <h4 className="text-lg font-medium text-white">Pré-avaliação rápida</h4>
                <input
                  type="text"
                  placeholder="Nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors"
                />
                <input
                  type="number"
                  placeholder="Idade"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors"
                />
                <textarea
                  placeholder="Descreva brevemente sua dor ou desconforto"
                  value={sintoma}
                  onChange={(e) => setSintoma(e.target.value)}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-teal-400/50 transition-colors resize-none"
                />
                {formError && (
                  <p className="text-red-400 text-sm font-light">{formError}</p>
                )}
                <button
                  onClick={handleWhatsApp}
                  className="liquid-glass w-full rounded-full py-3.5 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
                >
                  <MessageCircle className="h-5 w-5" /> Conversar com Especialista Ortopédico
                </button>
                <p className="text-center text-white/30 text-xs mt-2">
                  Suas informações estão seguras e serão usadas apenas para sua avaliação
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
