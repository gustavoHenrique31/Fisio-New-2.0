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
  HelpCircle,
} from 'lucide-react';

// --- CONFIGURÁVEL ---
const WHATSAPP_NUMBER = '5511999999999';
const CLINIC_ADDRESS = 'Rua Exemplo, 123 - Bairro - Cidade/UF';
const CLINIC_PHONE = '(11) 99999-9999';
const INSTAGRAM_URL = 'https://instagram.com';
const FACEBOOK_URL = 'https://facebook.com';
const YOUTUBE_URL = 'https://youtube.com';

const BODY_FRONT_IMAGE = '/assets/defrente.png';
const BODY_BACK_IMAGE = '/assets/decosta.png';

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

const TREATMENT_STEPS = [
  { icon: Target, title: 'Avaliação', desc: 'Análise postural e testes específicos para diagnóstico preciso.' },
  { icon: Zap, title: 'Tratamento', desc: 'Técnicas manuais, exercícios e equipamentos de última geração.' },
  { icon: TrendingUp, title: 'Evolução', desc: 'Acompanhamento contínuo com reavaliações periódicas.' },
  { icon: ThumbsUp, title: 'Alta', desc: 'Recuperação completa com prevenção de novas lesões.' },
];

// Perguntas frequentes prontas
const FAQ_QUESTIONS = [
  { question: 'O que causa dor no ombro?', answer: 'Dor no ombro pode ser causada por bursite, tendinite, má postura ou movimentos repetitivos. Recomendamos uma avaliação para diagnóstico preciso.' },
  { question: 'Quanto tempo dura o tratamento?', answer: 'O tempo varia conforme cada caso, mas geralmente de 4 a 16 semanas. Na primeira consulta já conseguimos estimar melhor.' },
  { question: 'Vocês aceitam convênio?', answer: 'Sim! Trabalhamos com diversos convênios. Entre em contato pelo WhatsApp para verificar se aceitamos o seu.' },
  { question: 'Preciso de encaminhamento médico?', answer: 'Não é obrigatório, mas se tiver exames ou encaminhamento, ajuda na avaliação. Podemos avaliar você diretamente.' },
  { question: 'Como agendar uma consulta?', answer: 'É fácil! Clique no botão "Fale com um Especialista" ou chame no WhatsApp. Atendemos de segunda a sexta.' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeView, setActiveView] = useState<'front' | 'back'>('front');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showFAQModal, setShowFAQModal] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<number | null>(null);
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
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedZone(null);
        setShowFormModal(false);
        setShowFAQModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || showFormModal || showFAQModal ? 'hidden' : '';
    return () => { document.body.style.overflow = '' };
  }, [menuOpen, showFormModal, showFAQModal]);

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

  const zoneIndex = (id: string) => {
    const i = ZONES.findIndex(z => z.id === id);
    return String(i + 1).padStart(2, '0');
  };

  return (
    <div className="relative bg-[#07100E] text-white font-['Inter'] selection:bg-[#C9A876]/30">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Inter:wght@300;400;500;600&display=swap');

        :root {
          --ink: #07100E;
          --ink-soft: #0D1917;
          --teal: #5FE3C9;
          --teal-deep: #0E6F63;
          --brass: #CDA96E;
          --brass-soft: rgba(205, 169, 110, 0.35);
          --paper: #EFE7D6;
        }

        .font-display { font-family: 'Fraunces', Georgia, 'Times New Roman', serif; }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.02);
          background-blend-mode: luminosity;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.07), 0 20px 40px -24px rgba(0,0,0,0.65);
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
          background: linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 25%, transparent 50%, rgba(205,169,110,0.10) 75%, rgba(255,255,255,0.18) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }
        .grain {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }
        .plate-frame {
          position: relative;
        }
        .plate-frame::before, .plate-frame::after {
          content: '';
          position: absolute;
          width: 14px;
          height: 14px;
          border-color: var(--brass-soft);
          opacity: 0.8;
        }
        .plate-frame::before { top: 10px; left: 10px; border-top: 1px solid; border-left: 1px solid; }
        .plate-frame::after { bottom: 10px; right: 10px; border-bottom: 1px solid; border-right: 1px solid; }
        .plate-corner-tl { position: absolute; top: 10px; right: 10px; width: 14px; height: 14px; border-top: 1px solid var(--brass-soft); border-right: 1px solid var(--brass-soft); opacity: 0.8; }
        .plate-corner-br { position: absolute; bottom: 10px; left: 10px; width: 14px; height: 14px; border-bottom: 1px solid var(--brass-soft); border-left: 1px solid var(--brass-soft); opacity: 0.8; }
        .body-zone {
          fill: transparent;
          stroke: transparent;
          cursor: pointer;
          transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          vector-effect: non-scaling-stroke;
        }
        .body-zone:hover {
          stroke: rgba(95, 227, 201, 0.9);
          stroke-width: 1.5px;
          filter: drop-shadow(0 0 16px rgba(95, 227, 201, 0.55));
        }
        .drawer-scroll::-webkit-scrollbar { width: 4px; }
        .drawer-scroll::-webkit-scrollbar-track { background: transparent; }
        .drawer-scroll::-webkit-scrollbar-thumb { background: rgba(95, 227, 201, 0.2); border-radius: 10px; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
        @keyframes drawScale { from { stroke-dashoffset: 340; } to { stroke-dashoffset: 0; } }
        .animate-fade-in-up { animation: fadeInUp 0.7s ease-out forwards; }
        .animate-modal-in { animation: modalIn 0.3s ease-out forwards; }
        .hover-lift { transition: transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease; }
        .hover-lift:hover { transform: translateY(-4px); }
        .gradient-text {
          background: linear-gradient(135deg, #5FE3C9, #CDA96E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .gradient-border { position: relative; }
        .gradient-border::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 44px; height: 1px;
          background: linear-gradient(90deg, #CDA96E, transparent);
        }
        .eyebrow {
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.28em;
        }
        .ghost-num {
          font-family: 'Fraunces', serif;
          font-weight: 300;
          font-style: italic;
          color: transparent;
          -webkit-text-stroke: 1px rgba(205, 169, 110, 0.35);
        }
        :focus-visible {
          outline: 1.5px solid var(--teal);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-fade-in-up, .animate-modal-in, .hover-lift { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4" />
        <div className="absolute inset-0 bg-[#07100E]/70 backdrop-blur-[1px]"></div>
      </div>
      <div className="grain" />

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-20 md:hidden transition-opacity duration-500 ${menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ background: 'rgba(7,16,14,0.94)', backdropFilter: 'blur(30px)' }}>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button onClick={() => scrollToSection(mapSectionRef)} className="text-2xl font-display font-light text-white">Mapa Corporal</button>
          <button onClick={() => scrollToSection(specSectionRef)} className="text-2xl font-display font-light text-white">Especializações</button>
          <button onClick={() => scrollToSection(aboutSectionRef)} className="text-2xl font-display font-light text-white">Sobre Nós</button>
          <button onClick={() => { setMenuOpen(false); window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank'); }} className="liquid-glass rounded-full px-8 py-3.5 text-white font-medium flex items-center gap-3 mt-6">
            <MessageCircle className="h-5 w-5 text-[#5FE3C9]" /> Fale com um Especialista
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col">
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#07100E]/50 backdrop-blur-xl' : ''}`}>
          <div className="flex justify-between items-center px-5 pt-6 pb-3 sm:px-8 sm:pt-8 md:px-16 lg:px-20">
            <svg width="36" height="36" viewBox="0 0 256 256" fill="white" className="md:w-10 md:h-10">
              <path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" />
            </svg>
            <div className="hidden md:flex liquid-glass rounded-full px-8 py-3 gap-8">
              <button onClick={() => scrollToSection(mapSectionRef)} className="text-sm text-white/60 hover:text-white transition-colors">Mapa Corporal</button>
              <button onClick={() => scrollToSection(specSectionRef)} className="text-sm text-white/60 hover:text-white transition-colors">Especializações</button>
              <button onClick={() => scrollToSection(aboutSectionRef)} className="text-sm text-white/60 hover:text-white transition-colors">Sobre Nós</button>
            </div>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="hidden md:flex liquid-glass rounded-full px-5 py-2.5 items-center gap-2 text-sm text-white hover:bg-white/[0.04] transition-colors">
              <MessageCircle className="h-4 w-4 text-[#5FE3C9]" /> Fale com um Especialista
            </button>
            <button className="md:hidden liquid-glass h-10 w-10 rounded-full flex items-center justify-center" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <div className="flex-1 flex items-center px-5 sm:px-8 md:px-16 lg:px-20 pt-24">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <div className="liquid-glass rounded-full inline-flex items-center gap-3 px-4 py-2 mb-7">
                  <div className="flex -space-x-2">
                    {['774909', '1222271', '1239291', '697509'].map((id, i) => (
                      <img key={i} src={`https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=100`} alt="" className="h-6 w-6 rounded-full border-2 border-[#07100E] object-cover" />
                    ))}
                  </div>
                  <span className="text-sm text-white/60 eyebrow tracking-normal">sua jornada para o bem-estar</span>
                </div>
                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[5rem] font-light leading-[1.05] text-white mb-7">
                  Recupere seu<br /><span className="gradient-text font-normal italic">movimento natural</span>
                </h1>
                <p className="text-lg sm:text-xl text-white/50 font-light max-w-xl mb-10 leading-relaxed">
                  Especialistas em fisioterapia ortopédica e esportiva.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => scrollToSection(mapSectionRef)} className="liquid-glass rounded-full px-8 py-4 text-white font-medium flex items-center gap-2 text-lg group hover:bg-white/[0.04] transition-colors">
                    Explorar Mapa <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="rounded-full px-8 py-4 bg-[#CDA96E]/10 border border-[#CDA96E]/25 text-[#E4C68C] font-medium flex items-center gap-2 text-lg hover:bg-[#CDA96E]/15 transition-colors">
                    Agendar <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {HERO_BENEFITS.map((benefit, idx) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={idx} className="liquid-glass rounded-2xl p-6 text-center hover-lift">
                      <Icon className="h-7 w-7 text-[#5FE3C9] mx-auto mb-3" strokeWidth={1.25} />
                      <p className="text-white/60 text-sm font-light">{benefit.text}</p>
                    </div>
                  );
                })}
                <div className="liquid-glass rounded-2xl p-6 text-center col-span-2 bg-[#CDA96E]/5">
                  <span className="font-display italic text-[#E4C68C] text-3xl font-light">98%</span>
                  <p className="text-white/50 text-sm mt-2 font-light">dos pacientes recomendam</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Body Map */}
      <section ref={mapSectionRef} className="relative z-10 py-28 px-5 sm:px-8 md:px-16 lg:px-20 min-h-screen flex flex-col justify-center">
        <div className="text-center mb-16">
          <span className="text-[#CDA96E] text-xs eyebrow uppercase mb-4 block">Interativo</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">Mapa Corporal Interativo</h2>
          <p className="text-white/45 max-w-lg mx-auto font-light">Clique em uma área do corpo para descobrir condições comuns e tratamentos.</p>
        </div>
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-8">
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-white mb-4 gradient-border pb-4">Como funciona</h3>
                <p className="text-white/45 font-light">Metodologia baseada em quatro pilares para sua recuperação.</p>
              </div>
              <div className="space-y-4">
                {TREATMENT_STEPS.map((step, idx) => {
                  const Icon = step.icon;
                  return (
                    <div key={idx} className="liquid-glass rounded-2xl p-5 hover-lift">
                      <div className="flex gap-4 items-start relative">
                        <span className="ghost-num absolute -top-3 right-0 text-4xl select-none pointer-events-none">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <div className="w-10 h-10 shrink-0 rounded-full bg-[#5FE3C9]/10 border border-[#5FE3C9]/20 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-[#5FE3C9]" strokeWidth={1.25} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{step.title}</h4>
                          <p className="text-white/40 text-sm font-light">{step.desc}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => setShowFAQModal(true)} className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-2 hover:bg-white/[0.04] transition-colors">
                <HelpCircle className="h-5 w-5 text-[#CDA96E]" /> Dúvidas Frequentes
              </button>
            </div>
            <div className="order-1 lg:order-2 flex flex-col items-center">
              <div className="liquid-glass rounded-full p-1 flex mb-8">
                <button onClick={() => setActiveView('front')} className={`px-6 py-2.5 rounded-full text-sm transition-colors ${activeView === 'front' ? 'bg-white/[0.07] text-white' : 'text-white/35'}`}>Frente</button>
                <button onClick={() => setActiveView('back')} className={`px-6 py-2.5 rounded-full text-sm transition-colors ${activeView === 'back' ? 'bg-white/[0.07] text-white' : 'text-white/35'}`}>Costas</button>
              </div>
              <div className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px]">
                <div className="plate-frame liquid-glass rounded-3xl p-4 sm:p-6 md:p-8 bg-black/10 relative">
                  <div className="plate-corner-tl" />
                  <div className="plate-corner-br" />
                  <div className="relative max-w-[260px] sm:max-w-[280px] md:max-w-[300px] mx-auto">
                    <img src={activeView === 'front' ? BODY_FRONT_IMAGE : BODY_BACK_IMAGE} alt="Corpo humano" className="w-full opacity-85 pointer-events-none" />
                    <svg viewBox="0 0 400 700" className="absolute inset-0 w-full h-full"
                      onMouseMove={(e) => { const t = e.target as SVGElement; setHoveredZone(t.getAttribute('data-zone-id')); }}
                      onMouseLeave={() => setHoveredZone(null)}
                      onClick={(e) => { const t = e.target as SVGElement; const id = t.getAttribute('data-zone-id'); if (id) handleZoneClick(id); }}>
                      {activeView === 'front' ? (
                        <g>
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
                        <g>
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
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 liquid-glass rounded-full px-4 py-2 text-sm text-[#8FF0DC] pointer-events-none z-10 whitespace-nowrap">
                      {ZONES.find(z => z.id === hoveredZone)?.title}
                    </div>
                  )}
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="eyebrow text-[10px] uppercase text-[#CDA96E]/70">Prancha I</span>
                    <span className="text-[10px] text-white/25 font-light">Mapa Corporal Interativo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section ref={specSectionRef} className="relative z-10 py-28 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="text-center mb-16">
          <span className="text-[#CDA96E] text-xs eyebrow uppercase mb-4 block">Expertise</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white mb-4">Nossas Especializações</h2>
          <p className="text-white/45 max-w-lg mx-auto font-light">Atendimento especializado para cada necessidade.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {SPECIALIZATIONS.map((spec, idx) => {
            const Icon = spec.icon;
            return (
              <div key={idx} className="liquid-glass rounded-2xl p-7 hover-lift">
                <Icon className="h-7 w-7 text-[#5FE3C9] mb-5" strokeWidth={1.25} />
                <h3 className="text-xl font-medium text-white mb-2 gradient-border pb-3">{spec.title}</h3>
                <p className="text-white/45 font-light pt-1">{spec.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section ref={aboutSectionRef} className="relative z-10 py-28 px-5 sm:px-8 md:px-16 lg:px-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <span className="text-[#CDA96E] text-xs eyebrow uppercase mb-4 block">Nossa História</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-light text-white">Saiba Mais Sobre Nós</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { number: '+10', label: 'Anos de experiência' },
            { number: '+2.000', label: 'Pacientes atendidos' },
            { number: '98%', label: 'Satisfação' },
          ].map((stat, i) => (
            <div key={i} className="liquid-glass rounded-2xl p-8 text-center">
              <div className="font-display italic text-4xl sm:text-5xl font-light text-[#8FF0DC] mb-2">{stat.number}</div>
              <div className="text-white/45 font-light text-sm eyebrow uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] bg-black/30 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 lg:px-20 py-16">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <svg width="26" height="26" viewBox="0 0 256 256" fill="white"><path d="M 128 128 C 198.692 128 256 185.308 256 256 L 151.883 256 C 149.812 220.307 120.213 192 84 192 C 47.787 192 18.188 220.307 16.117 256 L 0 256 C 0 185.308 57.308 128 128 128 Z M 104.117 0 C 106.188 35.694 135.787 64 172 64 C 208.213 64 237.812 35.694 239.883 0 L 256 0 C 256 70.692 198.692 128 128 128 C 57.308 128 0 70.692 0 0 Z" /></svg>
              <span className="text-white/75 font-display font-light text-xl">FisioNew</span>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/35 font-light">
              <span><MapPin className="h-4 w-4 inline text-[#CDA96E]/60 mr-1" /> {CLINIC_ADDRESS}</span>
              <span><Phone className="h-4 w-4 inline text-[#CDA96E]/60 mr-1" /> {CLINIC_PHONE}</span>
            </div>
            <div className="flex gap-5">
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="text-white/25 hover:text-[#5FE3C9] transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener" className="text-white/25 hover:text-[#5FE3C9] transition-colors"><Facebook className="h-5 w-5" /></a>
              <a href={YOUTUBE_URL} target="_blank" rel="noopener" className="text-white/25 hover:text-[#5FE3C9] transition-colors"><Youtube className="h-5 w-5" /></a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/[0.06] text-center text-white/20 text-xs font-light">
            © {new Date().getFullYear()} FisioNew
          </div>
        </div>
      </footer>

      {/* DRAWER */}
      <div className={`fixed inset-y-0 right-0 z-30 w-full max-w-md transition-transform duration-500 ${selectedZone && !showFormModal && !showFAQModal ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm" onClick={() => setSelectedZone(null)} />
        <div ref={drawerContentRef} className="relative ml-auto w-full max-w-md h-full liquid-glass border-l border-white/[0.06] bg-black/65 backdrop-blur-2xl overflow-y-auto drawer-scroll p-8">
          <button onClick={() => setSelectedZone(null)} className="sticky top-4 float-right liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white z-10">
            <X className="h-4 w-4" />
          </button>
          {currentZoneData && (
            <div className="mt-12 space-y-6 pb-8">
              <div>
                <span className="eyebrow text-[10px] uppercase text-[#CDA96E]/80">Fig. {zoneIndex(currentZoneData.id)} — Área selecionada</span>
                <h3 className="font-display text-2xl font-light text-white mt-2">{currentZoneData.title}</h3>
              </div>
              <div className="space-y-4">
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-[10px] text-white/35 eyebrow uppercase">Problema comum</span>
                  <p className="text-white/80 mt-2 font-light">{currentZoneData.problem}</p>
                </div>
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-[10px] text-white/35 eyebrow uppercase">Tempo estimado</span>
                  <p className="text-white/80 mt-2 font-light">{currentZoneData.recovery}</p>
                  <p className="text-xs text-white/25 mt-1 font-light">*Estimativa geral</p>
                </div>
                <div className="liquid-glass rounded-xl p-5">
                  <span className="text-[10px] text-white/35 eyebrow uppercase">Método sugerido</span>
                  <p className="text-white/80 mt-2 font-light">{currentZoneData.method}</p>
                </div>
              </div>
              <div className="liquid-glass rounded-xl overflow-hidden aspect-video bg-white/[0.02] flex items-center justify-center text-white/25 text-sm font-light">
                Vídeo em breve
              </div>

              <button
                onClick={() => { resetForm(); setShowFormModal(true); }}
                className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-2 hover:bg-[#5FE3C9]/10 bg-[#5FE3C9]/5 transition-all"
              >
                <ClipboardList className="h-5 w-5 text-[#5FE3C9]" /> Quero uma pré-avaliação
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal Formulário */}
      {showFormModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowFormModal(false)} />
          <div className="relative w-full max-w-md liquid-glass rounded-3xl p-8 bg-black/70 backdrop-blur-2xl animate-modal-in max-h-[90vh] overflow-y-auto drawer-scroll">
            <button onClick={() => setShowFormModal(false)} className="absolute top-5 right-5 liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-6 mt-4">
              <div className="text-center">
                <ClipboardList className="h-9 w-9 text-[#CDA96E] mx-auto mb-3" strokeWidth={1.25} />
                <h3 className="font-display text-2xl font-light text-white">Pré-avaliação Rápida</h3>
                {currentZoneData && <p className="text-[#8FF0DC] text-sm mt-1 font-light">Área: {currentZoneData.title}</p>}
              </div>
              <div className="space-y-4">
                <div><label className="text-[10px] text-white/40 mb-1 block eyebrow uppercase">Nome</label><input type="text" placeholder="Seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5FE3C9]/50" /></div>
                <div><label className="text-[10px] text-white/40 mb-1 block eyebrow uppercase">Idade</label><input type="number" placeholder="Sua idade" value={idade} onChange={(e) => setIdade(e.target.value)} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5FE3C9]/50" /></div>
                <div><label className="text-[10px] text-white/40 mb-1 block eyebrow uppercase">Sintomas</label><textarea placeholder="Descreva sua dor..." value={sintoma} onChange={(e) => setSintoma(e.target.value)} rows={4} className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5FE3C9]/50 resize-none" /></div>
                {formError && <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4"><p className="text-red-400 text-sm font-light">{formError}</p></div>}
                <button onClick={handleWhatsApp} className="liquid-glass w-full rounded-full py-4 text-white font-medium flex items-center justify-center gap-3 bg-[#5FE3C9]/5 hover:bg-[#5FE3C9]/10 transition-colors">
                  <Send className="h-5 w-5 text-[#5FE3C9]" /> Enviar para Especialista
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal FAQ */}
      {showFAQModal && (
        <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowFAQModal(false)} />
          <div className="relative w-full max-w-lg liquid-glass rounded-3xl p-8 bg-black/70 backdrop-blur-2xl animate-modal-in max-h-[80vh] overflow-y-auto drawer-scroll">
            <button onClick={() => { setShowFAQModal(false); setSelectedFAQ(null); }} className="absolute top-5 right-5 liquid-glass h-9 w-9 rounded-full flex items-center justify-center text-white/50 hover:text-white">
              <X className="h-4 w-4" />
            </button>
            <div className="space-y-4 mt-4">
              <div className="text-center mb-6">
                <HelpCircle className="h-9 w-9 text-[#CDA96E] mx-auto mb-3" strokeWidth={1.25} />
                <h3 className="font-display text-2xl font-light text-white">Dúvidas Frequentes</h3>
                <p className="text-white/45 text-sm mt-1 font-light">Selecione uma pergunta para ver a resposta</p>
              </div>

              {selectedFAQ === null ? (
                <div className="space-y-3">
                  {FAQ_QUESTIONS.map((faq, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedFAQ(idx)}
                      className="liquid-glass w-full rounded-xl p-4 text-left hover:bg-[#5FE3C9]/5 transition-all group"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-white/75 text-sm font-light group-hover:text-white">{faq.question}</span>
                        <ChevronRight className="h-4 w-4 text-[#5FE3C9] shrink-0 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => setSelectedFAQ(null)}
                    className="text-[#8FF0DC] text-sm hover:text-[#5FE3C9] transition-colors flex items-center gap-1"
                  >
                    ← Voltar para perguntas
                  </button>
                  <div className="liquid-glass rounded-xl p-5">
                    <p className="text-white font-medium mb-2">{FAQ_QUESTIONS[selectedFAQ].question}</p>
                    <p className="text-white/55 text-sm leading-relaxed font-light">{FAQ_QUESTIONS[selectedFAQ].answer}</p>
                  </div>
                  <button
                    onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Olá! Tenho uma dúvida sobre: ${FAQ_QUESTIONS[selectedFAQ].question}`, '_blank')}
                    className="liquid-glass w-full rounded-full py-3.5 text-white font-medium flex items-center justify-center gap-2 bg-[#5FE3C9]/5 hover:bg-[#5FE3C9]/10 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5 text-[#5FE3C9]" /> Falar com Especialista
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
