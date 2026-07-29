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
  ClipboardList,
  Send,
  ChevronDown,
  Target,
  Zap,
  TrendingUp,
  ThumbsUp,
} from 'lucide-react';

// --- CONFIGURÁVEL: Troque aqui os dados reais ---
const WHATSAPP_NUMBER = '5511999999999';
const CLINIC_ADDRESS = 'Rua Exemplo, 123 - Bairro - Cidade/UF';
const CLINIC_PHONE = '(11) 99999-9999';
const INSTAGRAM_URL = 'https://instagram.com';
const FACEBOOK_URL = 'https://facebook.com';
const YOUTUBE_URL = 'https://youtube.com';

const BODY_FRONT_IMAGE = 'https://thumbs.dreamstime.com/b/male-anatomy-heart-18582891.jpg';
const BODY_BACK_IMAGE = 'https://thumbs.dreamstime.com/b/human-anatomy-back-muscles-shown-red-illustration-18582891.jpg';

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

// Dados dos steps de tratamento
const TREATMENT_STEPS = [
  { icon: Target, title: 'Avaliação', desc: 'Análise postural e testes específicos para diagnóstico preciso.' },
  { icon: Zap, title: 'Tratamento', desc: 'Técnicas manuais, exercícios e equipamentos de última geração.' },
  { icon: TrendingUp, title: 'Evolução', desc: 'Acompanhamento contínuo com reavaliações periódicas.' },
  { icon: ThumbsUp, title: 'Alta', desc: 'Recuperação completa com prevenção de novas lesões.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [nome, setNome] = useState('');
  const [idade, setIdade] = useState('');
  const [sintoma, setSintoma] = useState('');
  const [formError, setFormError] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const mapSectionRef = useRef<HTMLDivElement>(null);
  const specSectionRef = useRef<HTMLDivElement>(null);
  const aboutSectionRef = useRef<HTMLDivElement>(null);
  const drawerContentRef = useRef<HTMLDivElement>(null);

  const currentZoneData = ZONES.find(z => z.id === selectedZone);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedZone(null);
        setShowFormModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || showFormModal ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [menuOpen, showFormModal]);

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
    setShowFormModal(false);
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
          background: rgba(255, 255, 255, 0.02);
          background-blend-mode: luminosity;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.08);
          position: relative;
          overflow: hidden;
          border: none;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.08) 25%,
            transparent 50%,
            rgba(255, 255, 255, 0.05) 75%,
            rgba(255, 255, 255, 0.2) 100%
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
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          vector-effect: non-scaling-stroke;
        }
        .body-zone:hover {
          stroke: rgba(94, 234, 212, 0.9);
          stroke-width: 2px;
          filter: drop-shadow(0 0 16px rgba(94, 234, 212, 0.7)) drop-shadow(0 0 4px rgba(94, 234, 212, 0.5));
        }
        .zone-dimmed .body-zone {
          opacity: 0.25;
        }
        .zone-dimmed .body-zone:hover {
          opacity: 1;
          stroke: rgba(94, 234, 212, 1);
        }
        .drawer-scroll::-webkit-scrollbar { 
          width: 4px; 
        }
        .drawer-scroll::-webkit-scrollbar-track { 
          background: transparent; 
        }
        .drawer-scroll::-webkit-scrollbar-thumb { 
          background: rgba(94, 234, 212, 0.2); 
          border-radius: 10px; 
        }
        .drawer-scroll::-webkit-scrollbar-thumb:hover { 
          background: rgba(94, 234, 212, 0.4); 
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeInRight {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(30px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .animate-fade-in-up-delay {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) 0.15s forwards;
          opacity: 0;
        }
        .animate-fade-in-up-delay-2 {
          animation: fadeInUp 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) 0.3s forwards;
          opacity: 0;
        }
        .animate-fade-in-left {
          animation: fadeInLeft 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .animate-fade-in-right {
          animation: fadeInRight 0.7s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .animate-modal-in {
          animation: modalIn 0.35s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
        }
        .animate-pulse-subtle {
          animation: pulse 2s ease-in-out infinite;
        }
        .animate-slide-down {
          animation: slideDown 0.3s ease-out forwards;
        }
        .hover-lift {
          transition: transform 0.3s cubic-bezier(0.22, 0.61, 0.36, 1), box-shadow 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }
        .gradient-text {
          background: linear-gradient(135deg, #5eead4 0%, #2dd4bf 50%, #14b8a6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-border {
          position: relative;
        }
        .gradient-border::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #5eead4, transparent);
          border-radius: 2px;
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70 backdrop-blur-[1px]"></div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-20 md:hidden transition-all duration-500 ease-out ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(30px)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <div className={`transition-all duration-500 delay-100 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button onClick={() => scrollToSection(mapSectionRef)} className="text-2xl font-light text-white hover:text-teal-300 transition-colors tracking-wide">Mapa Corporal</button>
          </div>
          <div className={`transition-all duration-500 delay-150 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button onClick={() => scrollToSection(specSectionRef)} className="text-2xl font-light text-white hover:text-teal-300 transition-colors tracking-wide">Especializações</button>
          </div>
          <div className={`transition-all duration-500 delay-200 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button onClick={() => scrollToSection(aboutSectionRef)} className="text-2xl font-light text-white hover:text-teal-300 transition-colors tracking-wide">Sobre Nós</button>
          </div>
          <div className={`transition-all duration-500 delay-300 ${menuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button 
              onClick={() => {
                setMenuOpen(false);
                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com um especialista.`, '_blank');
              }} 
              className="liquid-glass rounded-full px-8 py-3.5 text-white font-medium flex items-center gap-3 mt-6 hover:bg-teal-500/10 transition-all"
            >
              <MessageCircle className="h-5 w-5" /> Fale com um Especialista
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/40 backdrop-blur-xl shadow-2xl shadow-black/20' : ''
        }`}>
          <div className="flex justify-between items-center px-5 pt-6 pb-3 sm:px-8 sm:pt-8 sm:pb-4 md:px-16 lg:px-20">
            <div className="flex-shrink-0 group cursor-pointer">
              <svg width="36" height="36" viewBox="0 0 256 256" fill="white" className="md:w-[40px] md:h-[40px] transition-transform duration-300 group-hover:scale-110">
                <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
              </svg>
            </div>

            <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 gap-8">
              <button onClick={() => scrollToSection(mapSectionRef)} className="text-sm font-medium text-white/60 hover:text-white transition-all duration-300 hover:scale-105">Mapa Corporal</button>
              <button onClick={() => scrollToSection(specSectionRef)} className="text-sm font-medium text-white/60 hover:text-white transition-all duration-300 hover:scale-105">Especializações</button>
              <button onClick={() => scrollToSection(aboutSectionRef)} className="text-sm font-medium text-white/60 hover:text-white transition-all duration-300 hover:scale-105">Sobre Nós</button>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de falar com um especialista.`, '_blank')}
                className="hidden md:flex liquid-glass rounded-full px-5 py-2.5 items-center gap-2 text-sm font-medium text-white hover:bg-teal-500/10 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4" /> Fale com um Especialista
              </button>
              <button
                className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center z-50 relative"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              >
                <Menu className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? 'rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`} />
                <X className={`absolute h-5 w-5 text-white transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'}`} />
              </button>
            </div>
          </div>
        </nav>

        <div className={`flex-1 flex items-center px-5 sm:px-8 md:px-16 lg:px-20 transition-opacity duration-500 pt-20 ${menuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              
              <div>
                <div className="animate-fade-in-up">
                  <div className="liquid-glass rounded-full inline-flex items-center gap-2.5 sm:gap-3 px-3 py-1.5 sm:px-4 sm:py-2 mb-6 sm:mb-8 hover:bg-white/5 transition-all duration-500">
                    <div className="flex -space-x-2">
                      {['774909', '1222271', '1239291', '697509'].map((id, i) => (
                        <img
                          key={i}
                          src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=100`}
                          alt=""
                          className="h-6 w-6 sm:h-7 sm:w-7 rounded-full border-2 border-white/20 object-cover transition-transform duration-300 hover:scale-110 hover:z-10"
                        />
                      ))}
                    </div>
                    <span className="text-xs sm:text-sm font-light text-white/70 tracking-wide">sua jornada para o bem-estar</span>
                  </div>
                </div>

                <h1 className="animate-fade-in-up text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.02] text-white tracking-[-0.03em] mb-6 sm:mb-8">
                  Recupere seu<br />
                  <span className="gradient-text font-normal">movimento natural</span>
                </h1>
                
                <p className="animate-fade-in-up-delay text-lg sm:text-xl text-white/60 font-light max-w-xl mb-10 leading-relaxed">
                  Especialistas em fisioterapia ortopédica e esportiva. Descubra o que está causando sua dor e inicie seu caminho de recuperação hoje.
                </p>

                <div className="animate-fade-in-up-delay-2 flex flex-col sm:flex-row gap-4 mb-10">
                  <button
                    onClick={() => scrollToSection(mapSectionRef)}
                    className="liquid-glass rounded-full px-8 py-4 text-white font-medium inline-flex items-center justify-center gap-2 hover:bg-teal-500/10 transition-all duration-300 text-lg group"
                  >
                    Explorar Mapa Corporal 
                    <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Gostaria de agendar uma avaliação.`, '_blank')}
                    className="rounded-full px-8 py-4 bg-teal-500/10 border border-teal-400/20 text-teal-300 font-medium inline-flex items-center justify-center gap-2 hover:bg-teal-500/20 hover:border-teal-400/40 transition-all duration-300 text-lg backdrop-blur-sm"
                  >
                    Agende sua Avaliação <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="animate-fade-in-up-delay-2 grid grid-cols-2 gap-4 sm:gap-5">
                {HERO_BENEFITS.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={idx} className="liquid-glass rounded-2xl p-5 sm:p-6 backdrop-blur-md text-center hover-lift group cursor-default">
                      <div className="relative inline-block mb-4">
                        <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl group-hover:bg-teal-400/30 transition-all duration-500"></div>
                        <Icon className="h-8 w-8 text-teal-400 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                      </div>
                      <p className="text-white/70 text-sm font-medium group-hover:text-white/90 transition-colors duration-300">{benefit.text}</p>
                    </div>
                  );
                })}
                
                <div className="liquid-glass rounded-2xl p-5 sm:p-6 backdrop-blur-md text-center col-span-2 bg-teal-500/5 hover-lift">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="h-5 w-5 text-teal-400 animate-pulse-subtle" />
                    <span className="text-teal-400 text-2xl font-semibold tracking-tight">98%</span>
                    <Sparkles className="h-5 w-5 text-teal-400 animate-pulse-subtle" />
                  </div>
                  <p className="text-white/60 text-sm">dos pacientes recomendam nossa clínica</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-subtle hidden md:block">
          <ChevronDown className="h-6 w-6 text-white/40" />
        </div>
      </section>

      {/* Body Map Section - Layout lado a lado */}
      <section ref={mapSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <span className="text-teal-400/80 text-sm font-medium tracking-widest uppercase mb-4 block">Interativo</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Mapa Corporal Interativo</h2>
          <p className="text-white/50 max-w-lg mx-auto font-light leading-relaxed">Clique em uma área do corpo para descobrir condições comuns, tratamentos e falar com um especialista.</p>
        </div>

        {/* Layout: Texto à esquerda + Corpo à direita */}
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Coluna da Esquerda - Conteúdo informativo */}
            <div className="animate-fade-in-left order-2 lg:order-1">
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-light text-white mb-4 gradient-border pb-4">
                    Como funciona nosso tratamento
                  </h3>
                  <p className="text-white/50 font-light leading-relaxed">
                    Nossa metodologia é baseada em quatro pilares fundamentais que garantem sua recuperação completa e segura.
                  </p>
                </div>

                {/* Timeline Steps */}
                <div className="space-y-4">
                  {TREATMENT_STEPS.map((step, idx) => {
                    const Icon = step.icon;
                    return (
                      <div key={idx} className="liquid-glass rounded-2xl p-5 hover-lift transition-all duration-300 group cursor-default">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0 relative">
                            <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-lg group-hover:bg-teal-400/30 transition-all duration-500"></div>
                            <div className="relative z-10 w-10 h-10 rounded-full bg-teal-500/10 border border-teal-400/20 flex items-center justify-center">
                              <Icon className="h-5 w-5 text-teal-400" strokeWidth={1.5} />
                            </div>
                            {idx < TREATMENT_STEPS.length - 1 && (
                              <div className="absolute top-12 left-5 w-px h-6 bg-gradient-to-b from-teal-400/30 to-transparent"></div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-white font-medium mb-1 group-hover:text-teal-300 transition-colors duration-300">{step.title}</h4>
                            <p className="text-white/40 text-sm font-light leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* CTA abaixo dos steps */}
                <button
                  onClick={() => {
                    if (selectedZone) {
                      resetForm();
                      setShowFormModal(true);
                    } else {
                      const firstZone = ZONES[0].id;
                      handleZoneClick(firstZone);
                    }
                  }}
                  className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-2 hover:bg-teal-500/10 transition-all duration-300 group"
                >
                  <ClipboardList className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  {selectedZone ? 'Quero uma pré-avaliação' : 'Iniciar avaliação corporal'}
                </button>
              </div>
            </div>

            {/* Coluna da Direita - Corpo Interativo */}
            <div className="animate-fade-in-right order-1 lg:order-2 flex flex-col items-center">
              <div className="liquid-glass rounded-full p-1 flex mb-8">
                <button
                  onClick={() => setActiveView('front')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeView === 'front' 
                      ? 'bg-white/10 text-white shadow-lg shadow-teal-400/10' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  Frente
                </button>
                <button
                  onClick={() => setActiveView('back')}
                  className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeView === 'back' 
                      ? 'bg-white/10 text-white shadow-lg shadow-teal-400/10' 
                      : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  Costas
                </button>
              </div>

              <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] mx-auto">
                <div className="liquid-glass rounded-3xl p-4 sm:p-6 md:p-8 backdrop-blur-md bg-black/10 relative hover-lift transition-all duration-500">
                  
                  <div className="relative w-full max-w-[260px] sm:max-w-[280px] md:max-w-[300px] mx-auto">
                    <img 
                      src={activeView === 'front' ? BODY_FRONT_IMAGE : BODY_BACK_IMAGE}
                      alt={activeView === 'front' ? 'Corpo humano vista frontal' : 'Corpo humano vista costas'}
                      className="w-full h-auto opacity-85"
                      style={{ filter: 'brightness(1.1) contrast(0.95)' }}
                      loading="lazy"
                    />
                    
                    <svg
                      viewBox="0 0 400 700"
                      className="absolute inset-0 w-full h-full"
                      aria-label="Mapa corporal interativo"
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
                          <ellipse data-zone-id="head_neck" cx="200" cy="60" rx="55" ry="65" className="body-zone" />
                          <ellipse data-zone-id="shoulder" cx="130" cy="150" rx="35" ry="25" className="body-zone" />
                          <ellipse data-zone-id="shoulder" cx="270" cy="150" rx="35" ry="25" className="body-zone" />
                          <rect data-zone-id="chest" x="155" y="135" width="90" height="80" rx="15" className="body-zone" />
                          <circle data-zone-id="elbow" cx="105" cy="235" r="20" className="body-zone" />
                          <circle data-zone-id="elbow" cx="295" cy="235" r="20" className="body-zone" />
                          <circle data-zone-id="wrist" cx="95" cy="305" r="16" className="body-zone" />
                          <circle data-zone-id="wrist" cx="305" cy="305" r="16" className="body-zone" />
                          <rect data-zone-id="thoracic" x="170" y="195" width="60" height="95" rx="15" className="body-zone" />
                          <rect data-zone-id="lumbar" x="175" y="290" width="50" height="80" rx="15" className="body-zone" />
                          <circle data-zone-id="hip" cx="162" cy="380" r="32" className="body-zone" />
                          <circle data-zone-id="hip" cx="238" cy="380" r="32" className="body-zone" />
                          <circle data-zone-id="knee" cx="165" cy="475" r="26" className="body-zone" />
                          <circle data-zone-id="knee" cx="235" cy="475" r="26" className="body-zone" />
                          <circle data-zone-id="ankle" cx="162" cy="570" r="22" className="body-zone" />
                          <circle data-zone-id="ankle" cx="238" cy="570" r="22" className="body-zone" />
                        </g>
                      ) : (
                        <g className={hoveredZone ? 'zone-dimmed' : ''}>
                          <ellipse data-zone-id="head_neck" cx="200" cy="60" rx="55" ry="65" className="body-zone" />
                          <ellipse data-zone-id="shoulder" cx="130" cy="150" rx="35" ry="25" className="body-zone" />
                          <ellipse data-zone-id="shoulder" cx="270" cy="150" rx="35" ry="25" className="body-zone" />
                          <rect data-zone-id="thoracic" x="170" y="195" width="60" height="95" rx="15" className="body-zone" />
                          <circle data-zone-id="elbow" cx="105" cy="235" r="20" className="body-zone" />
                          <circle data-zone-id="elbow" cx="295" cy="235" r="20" className="body-zone" />
                          <rect data-zone-id="lumbar" x="175" y="290" width="50" height="80" rx="15" className="body-zone" />
                          <circle data-zone-id="hip" cx="162" cy="380" r="32" className="body-zone" />
                          <circle data-zone-id="hip" cx="238" cy="380" r="32" className="body-zone" />
                          <circle data-zone-id="knee" cx="165" cy="475" r="26" className="body-zone" />
                          <circle data-zone-id="knee" cx="235" cy="475" r="26" className="body-zone" />
                          <circle data-zone-id="ankle" cx="162" cy="570" r="22" className="body-zone" />
                          <circle data-zone-id="ankle" cx="238" cy="570" r="22" className="body-zone" />
                        </g>
                      )}
                    </svg>
                  </div>
                  
                  {hoveredZone && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 liquid-glass rounded-full px-4 py-2 text-xs sm:text-sm font-medium text-teal-300 shadow-2xl shadow-teal-400/20 pointer-events-none z-10 whitespace-nowrap animate-slide-down">
                      {ZONES.find(z => z.id === hoveredZone)?.title}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section ref={specSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-teal-400/80 text-sm font-medium tracking-widest uppercase mb-4 block">Expertise</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Nossas Especializações</h2>
          <p className="text-white/50 max-w-lg mx-auto font-light leading-relaxed">Atendimento especializado e humanizado para cada necessidade do seu corpo.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 max-w-6xl mx-auto">
          {SPECIALIZATIONS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="liquid-glass rounded-2xl p-6 sm:p-7 backdrop-blur-md hover-lift group cursor-default transition-all duration-300">
                <div className="relative inline-block mb-5">
                  <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl group-hover:bg-teal-400/30 transition-all duration-500"></div>
                  <Icon className="h-8 w-8 text-teal-400 relative z-10 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-teal-300 transition-colors duration-300">{spec.title}</h3>
                <p className="text-white/50 font-light leading-relaxed">{spec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutSectionRef} className="relative z-10 py-24 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-400/80 text-sm font-medium tracking-widest uppercase mb-4 block">Nossa História</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4 tracking-tight">Saiba Mais Sobre Nós</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <div>
              <p className="text-white/60 font-light mb-5 leading-relaxed text-lg">
                Na FisioNew, acreditamos que cada corpo conta uma história. Nossa missão é ouvir, compreender e traçar o melhor caminho para sua recuperação, com base em ciência, técnica e acolhimento.
              </p>
              <p className="text-white/50 font-light leading-relaxed">
                Com uma equipe multidisciplinar focada em ortopedia, esporte e reabilitação respiratória, oferecemos um ambiente seguro e moderno para você recuperar sua qualidade de vida.
              </p>
            </div>
            <div className="liquid-glass rounded-3xl overflow-hidden h-72 sm:h-80 hover-lift transition-all duration-500">
              <div className="w-full h-full bg-gradient-to-br from-teal-900/30 via-teal-800/20 to-black/50 flex items-center justify-center text-white/30 text-lg font-light relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="relative z-10">Foto da Equipe / Clínica</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { number: '+10', label: 'Anos de experiência', icon: Clock },
              { number: '+2.000', label: 'Pacientes atendidos', icon: UserCheck },
              { number: '98%', label: 'Satisfação', icon: Star },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="liquid-glass rounded-2xl p-7 text-center backdrop-blur-md hover-lift transition-all duration-300">
                  <Icon className="h-6 w-6 text-teal-400/60 mx-auto mb-4" strokeWidth={1.5} />
                  <div className="text-4xl sm:text-5xl font-light text-teal-400 mb-2 tracking-tight">{stat.number}</div>
                  <div className="text-white/50 font-light">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/5 bg-black/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-20 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <svg width="28" height="28" viewBox="0 0 256 256" fill="white" className="opacity-80">
                  <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
                </svg>
                <span className="text-white/80 font-medium text-xl tracking-tight">FisioNew</span>
              </div>
              <p className="text-white/40 text-sm font-light leading-relaxed">Recupere seu movimento natural com excelência e cuidado.</p>
            </div>
            <div className="flex flex-col gap-3 text-sm text-white/40 font-light">
              <span className="flex items-center gap-3 hover:text-white/60 transition-colors duration-300">
                <MapPin className="h-4 w-4 text-teal-400/60" /> {CLINIC_ADDRESS}
              </span>
              <span className="flex items-center gap-3 hover:text-white/60 transition-colors duration-300">
                <Phone className="h-4 w-4 text-teal-400/60" /> {CLINIC_PHONE}
              </span>
            </div>
            <div className="flex gap-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-teal-400 transition-all duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-teal-400 transition-all duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="text-white/30 hover:text-teal-400 transition-all duration-300 hover:scale-110">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 text-center text-white/25 text-xs font-light tracking-wide">
            © {new Date().getFullYear()} FisioNew. Todos os direitos reservados.
          </div>
        </div>
      </footer>

      {/* Drawer Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-full max-w-md transition-all duration-500 ease-out transform ${
          selectedZone && !showFormModal ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setSelectedZone(null)}
        />
        <div 
          ref={drawerContentRef}
          className="relative ml-auto w-full max-w-md h-full liquid-glass border-l border-white/5 bg-black/60 backdrop-blur-2xl overflow-y-auto drawer-scroll p-8"
        >
          <button
            onClick={() => setSelectedZone(null)}
            className="sticky top-4 float-right liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300 z-10"
            aria-label="Fechar painel"
          >
            <X className="h-4 w-4" />
          </button>

          {currentZoneData && (
            <div className="mt-12 space-y-8 pb-8">
              <div>
                <span className="text-teal-400/70 text-xs font-medium tracking-widest uppercase">Área selecionada</span>
                <h3 className="text-2xl font-medium text-white mt-1">{currentZoneData.title}</h3>
              </div>
              
              <div className="space-y-6">
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Problema comum</span>
                  <p className="text-white/80 font-light mt-1">{currentZoneData.problem}</p>
                </div>
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Tempo estimado de recuperação</span>
                  <p className="text-white/80 font-light mt-1">{currentZoneData.recovery}</p>
                  <p className="text-xs text-white/25 mt-2 font-light">*Estimativa geral, pode variar por caso.</p>
                </div>
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-xs text-white/40 uppercase tracking-wider font-medium">Método sugerido</span>
                  <p className="text-white/80 font-light mt-1">{currentZoneData.method}</p>
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
                  <div className="w-full h-full flex items-center justify-center bg-white/[0.02] text-white/25 text-sm font-light">
                    Vídeo demonstrativo em breve
                  </div>
                )}
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setShowFormModal(true);
                }}
                className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-2 hover:bg-teal-500/10 transition-all duration-300 group"
              >
                <ClipboardList className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> 
                Quero uma pré-avaliação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Formulário */}
      {showFormModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-500"
            onClick={() => setShowFormModal(false)}
          />
          
          <div className="relative w-full max-w-md liquid-glass rounded-3xl p-8 bg-black/70 backdrop-blur-2xl animate-modal-in max-h-[90vh] overflow-y-auto drawer-scroll shadow-2xl shadow-teal-400/5">
            <button
              onClick={() => setShowFormModal(false)}
              className="absolute top-5 right-5 liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all duration-300"
              aria-label="Fechar formulário"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-8">
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-teal-400/20 rounded-full blur-xl"></div>
                  <ClipboardList className="h-10 w-10 text-teal-400 relative z-10" />
                </div>
                <h3 className="text-2xl font-medium text-white">Pré-avaliação Rápida</h3>
                {currentZoneData && (
                  <p className="text-teal-400/70 text-sm mt-2 font-light">
                    Área selecionada: {currentZoneData.title}
                  </p>
                )}
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-xs text-white/50 mb-2 block font-medium tracking-wider uppercase">Nome</label>
                  <input
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-white/50 mb-2 block font-medium tracking-wider uppercase">Idade</label>
                  <input
                    type="number"
                    placeholder="Sua idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 focus:bg-white/[0.05] transition-all duration-300"
                  />
                </div>
                
                <div>
                  <label className="text-xs text-white/50 mb-2 block font-medium tracking-wider uppercase">O que você está sentindo?</label>
                  <textarea
                    placeholder="Descreva brevemente sua dor ou desconforto..."
                    value={sintoma}
                    onChange={(e) => setSintoma(e.target.value)}
                    rows={4}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-teal-400/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
                  />
                </div>

                {formError && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 animate-fade-in">
                    <p className="text-red-400 text-sm font-light">{formError}</p>
                  </div>
                )}

                <button
                  onClick={handleWhatsApp}
                  className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-3 hover:bg-teal-500/10 transition-all duration-300 bg-teal-500/5 group"
                >
                  <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" /> 
                  Enviar para Especialista
                </button>

                <p className="text-center text-white/20 text-xs font-light">
                  Suas informações estão seguras e serão enviadas via WhatsApp
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
