'use client';

import React, { useState, useEffect, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { 
  Globe, 
  ShieldCheck, 
  TrendingDown, 
  Clock, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Sparkles, 
  Phone, 
  User, 
  Package, 
  HelpCircle, 
  Check, 
  Menu, 
  X, 
  ChevronDown,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Target,
  Building,
  Mail,
  Rocket,
  Shield
} from 'lucide-react';

export default function LandingPage() {
  // Form State
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [product, setProduct] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Simple self-contained Toast State
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // UI State
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hovered Benefit for SVG sync
  const [hoveredBenefit, setHoveredBenefit] = useState<number | null>(null);

  // Cookies consent state
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  // Accessibility state
  const [accessibilityOpen, setAccessibilityOpen] = useState(false);
  const [accGrayscale, setAccGrayscale] = useState(false);
  const [accHighContrast, setAccHighContrast] = useState(false);
  const [accLargeText, setAccLargeText] = useState(false);
  const [accReadableFont, setAccReadableFont] = useState(false);
  const [accHighlightLinks, setAccHighlightLinks] = useState(false);

  // Load cookies and accessibility settings on mount
  useEffect(() => {
    // Cookie banner
    const consent = localStorage.getItem('nexora-cookie-consent');
    if (!consent) {
      setShowCookieBanner(true);
    }

    // Accessibility settings
    const storedGrayscale = localStorage.getItem('acc-grayscale') === 'true';
    const storedHighContrast = localStorage.getItem('acc-high-contrast') === 'true';
    const storedLargeText = localStorage.getItem('acc-large-text') === 'true';
    const storedReadableFont = localStorage.getItem('acc-readable-font') === 'true';
    const storedHighlightLinks = localStorage.getItem('acc-highlight-links') === 'true';

    setAccGrayscale(storedGrayscale);
    setAccHighContrast(storedHighContrast);
    setAccLargeText(storedLargeText);
    setAccReadableFont(storedReadableFont);
    setAccHighlightLinks(storedHighlightLinks);
  }, []);

  // Sync classes to body element when accessibility states change
  useEffect(() => {
    const bodyClass = document.body.classList;
    
    if (accGrayscale) bodyClass.add('acc-grayscale');
    else bodyClass.remove('acc-grayscale');

    if (accHighContrast) bodyClass.add('acc-high-contrast');
    else bodyClass.remove('acc-high-contrast');

    if (accLargeText) bodyClass.add('acc-large-text');
    else bodyClass.remove('acc-large-text');

    if (accReadableFont) bodyClass.add('acc-readable-font');
    else bodyClass.remove('acc-readable-font');

    if (accHighlightLinks) bodyClass.add('acc-highlight-links');
    else bodyClass.remove('acc-highlight-links');

    // Save to localStorage
    localStorage.setItem('acc-grayscale', String(accGrayscale));
    localStorage.setItem('acc-high-contrast', String(accHighContrast));
    localStorage.setItem('acc-large-text', String(accLargeText));
    localStorage.setItem('acc-readable-font', String(accReadableFont));
    localStorage.setItem('acc-highlight-links', String(accHighlightLinks));
  }, [accGrayscale, accHighContrast, accLargeText, accReadableFont, accHighlightLinks]);

  // Cookie Actions
  const handleAcceptCookies = () => {
    localStorage.setItem('nexora-cookie-consent', 'accepted');
    setShowCookieBanner(false);
  };

  const handleDeclineCookies = () => {
    localStorage.setItem('nexora-cookie-consent', 'declined');
    setShowCookieBanner(false);
  };

  // Reset Accessibility
  const handleResetAccessibility = () => {
    setAccGrayscale(false);
    setAccHighContrast(false);
    setAccLargeText(false);
    setAccReadableFont(false);
    setAccHighlightLinks(false);
  };

  // Parallax tilt effect
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setParallax({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeaveMap = () => {
    setParallax({ x: 0, y: 0 });
  };

  // Scroll-reveal refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  // Scroll spy & Header background shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section spy
      const sections = ['hero', 'pain', 'solution', 'about', 'risk', 'roadmap', 'cta'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler
  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !companyName || !email || !phone || !product) {
      showToast('אנא מלא את כל השדות', 'error');
      return;
    }
    if (!agreedToTerms) {
      showToast('עליך לאשר את תנאי השימוש ומדיניות הפרטיות', 'error');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSupabaseConfigured && supabase) {
        // Fetch first status and first user dynamically to avoid hardcoded mismatch
        const { data: statusData } = await supabase
          .from('pipeline_statuses')
          .select('id')
          .order('order_index')
          .limit(1);
        
        const { data: userData } = await supabase
          .from('users')
          .select('id')
          .limit(1);

        const statusId = statusData && statusData.length > 0 ? statusData[0].id : null;
        const ownerId = userData && userData.length > 0 ? userData[0].id : null;

        // Insert directly to Supabase
        const { error } = await supabase.from('leads').insert({
          company_name: companyName,
          contact_name: fullName,
          email: email,
          phone: phone,
          country: 'סין / ספק גלובלי',
          industry: 'ייבוא מסחרי',
          lead_source: 'דף נחיתה',
          deal_value: 0,
          assigned_owner_id: ownerId,
          status_id: statusId,
          tags: ['בדיקת רווחיות חינם', 'דף נחיתה', `מוצר: ${product}`]
        });

        if (error) throw error;
      } else {
        // Mock fallback mode (saves to local storage under simulated key)
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const existingMocks = JSON.parse(localStorage.getItem('nexora_leads_mock') || '[]');
        const newLead = {
          id: 'lead_' + Math.random().toString(36).substr(2, 9),
          company_name: companyName,
          contact_name: fullName,
          email: email,
          phone: phone,
          country: 'סין / ספק גלובלי',
          industry: 'ייבוא מסחרי',
          lead_source: 'דף נחיתה',
          deal_value: 0,
          tags: ['בדיקת רווחיות חינם', 'דף נחיתה', `מוצר: ${product}`],
          created_at: new Date().toISOString()
        };
        localStorage.setItem('nexora_leads_mock', JSON.stringify([newLead, ...existingMocks]));
      }

      setIsSuccess(true);
      showToast('פנייתך התקבלה! נציג יחזור אליך בהקדם', 'success');
      
      // Reset form fields
      setFullName('');
      setCompanyName('');
      setEmail('');
      setPhone('');
      setProduct('');
      setAgreedToTerms(false);
    } catch (error) {
      console.error(error);
      showToast('אירעה שגיאה בשליחת הטופס. אנא נסה שנית.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#F8FAFC] text-[#1E293B] min-h-screen selection:bg-[#2563EB] selection:text-white" dir="rtl">
      
      {/* Toast Alert */}
      {toast && (
        <div className={`fixed top-24 left-6 z-50 p-4 rounded-xl shadow-2xl border transition-all duration-300 animate-fade-in ${
          toast.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Dynamic shipping route styles injected inline */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shipping-dash {
          to { stroke-dashoffset: -40px; }
        }
        .animate-shipping-route {
          stroke-dasharray: 6, 6;
          animation: shipping-dash 25s linear infinite;
        }
        .animate-shipping-route-fast {
          stroke-dasharray: 5, 5;
          animation: shipping-dash 12s linear infinite;
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.5); opacity: 0; }
          50% { opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .ping-ring {
          animation: pulse-ring 3s cubic-bezier(0.215, 0.610, 0.355, 1) infinite;
        }
        /* Scroll-reveal animations */
        .reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .reveal-delay-1 { transition-delay: 0.1s; }
        .reveal-delay-2 { transition-delay: 0.2s; }
        .reveal-delay-3 { transition-delay: 0.3s; }
        /* WhatsApp pulse */
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.5); }
          50% { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
        }
        .wa-pulse { animation: wa-pulse 2.5s infinite; }
        /* Fade in and scale animations */
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}} />

      {/* HEADER / NAVIGATION */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#0F172A]/90 backdrop-blur-md border-b border-slate-800 shadow-lg py-3' 
          : 'bg-transparent py-5'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
              <img src="/logo.png" alt="Nexora Logo" className="w-8 h-8 object-contain" />
            </div>
            <span className={`text-xl font-bold font-display tracking-wide transition-colors duration-300 ${
              scrolled ? 'text-white' : 'text-white'
            }`}>
              Nexora
            </span>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 rounded-full px-2 py-1.5 backdrop-blur-sm">
            {[
              { id: 'hero', label: 'עמוד ראשי' },
              { id: 'pain', label: 'איך מוזילים עלויות?' },
              { id: 'solution', label: 'איך זה עובד' },
              { id: 'about', label: 'מי אנחנו' },
              { id: 'risk', label: 'הפחתת סיכון ואחריות' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`px-5 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                  activeSection === link.id
                    ? 'bg-[#2563EB] text-white shadow-sm'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#cta"
              onClick={(e) => handleScrollTo(e, 'cta')}
              className="px-4.5 py-2.5 text-xs font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 active:scale-95 border border-blue-400/20"
            >
              בדיקת רווחיות בחינם
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#0F172A] border-b border-slate-800 px-6 py-5 shadow-2xl flex flex-col gap-4 animate-fade-in">
            {[
              { id: 'hero', label: 'עמוד ראשי' },
              { id: 'pain', label: 'איך מוזילים עלויות?' },
              { id: 'solution', label: 'שיטת הייבוא המוגן' },
              { id: 'about', label: 'מי אנחנו' },
              { id: 'risk', label: 'הפחתת סיכון ואחריות' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleScrollTo(e, link.id)}
                className={`py-2 px-3 rounded-lg text-sm font-semibold transition-all ${
                  activeSection === link.id
                    ? 'bg-[#2563EB]/15 text-[#60A5FA]'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-slate-800 my-1" />
            <div className="flex flex-col gap-3">
              <a
                href="#cta"
                onClick={(e) => handleScrollTo(e, 'cta')}
                className="w-full py-3 text-sm font-bold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-xl text-center shadow-lg shadow-blue-500/20"
              >
                בדיקת רווחיות בחינם
              </a>
            </div>
          </div>
        )}
      </header>

      {/* SECTION 1: HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-[90vh] md:min-h-[100vh] bg-[#0F172A] text-white pt-32 pb-16 flex items-center overflow-hidden"
      >
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none -translate-x-1/2" />
        <div className="absolute bottom-10 right-10 w-[600px] h-[600px] rounded-full bg-indigo-700/10 blur-[140px] pointer-events-none translate-x-1/4" />
        
        {/* Fine background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Right Column - Text & Copy (7 cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-start text-right">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-400 text-xs font-semibold mb-6 animate-pulse">
              <Sparkles className="w-3.5 h-3.5" />
              מפסיקים להפסיד: מעבירים את הרכש ישירות ליבוא מוגן
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl md:text-5xl lg:text-[46px] font-extrabold leading-tight tracking-tight text-white mb-4 md:mb-6">
              לייבא את המוצרים שלכם ישירות מהמפעל בחו"ל –
              <span className="text-[#3B82F6] block mt-2 relative">
                בחצי מחיר ובאפס דאגות.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base md:text-xl font-medium text-slate-200 mb-6 md:mb-8 border-r-4 border-[#2563EB] pr-4 max-w-2xl leading-relaxed">
              Nexora לוקחת אחריות מלאה על הסחורה שלכם, מהמפעל ועד דלת העסק. בלי בירוקרטיה ובלי כאבי ראש.
            </p>

            {/* Scannable Benefits Section */}
            <div className="space-y-4 mb-8 md:mb-10 text-right max-w-2xl">
              <div 
                className="flex items-start gap-3 reveal cursor-pointer"
                onMouseEnter={() => setHoveredBenefit(1)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-1 flex-shrink-0 transition-all duration-300 ${
                  hoveredBenefit === 1 
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]' 
                    : 'bg-blue-500/10 border-blue-500/25 text-blue-400'
                }`}>
                  <Target className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${hoveredBenefit === 1 ? 'text-blue-400' : 'text-white'}`}>איתור ישיר מהמפעל</span>
                  <span className="text-slate-300 text-sm md:text-base"> – הגעה למקור במחיר הנמוך ביותר.</span>
                </div>
              </div>
              
              <div 
                className="flex items-start gap-3 reveal reveal-delay-1 cursor-pointer"
                onMouseEnter={() => setHoveredBenefit(2)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-1 flex-shrink-0 transition-all duration-300 ${
                  hoveredBenefit === 2 
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]' 
                    : 'bg-blue-500/10 border-blue-500/25 text-blue-400'
                }`}>
                  <Package className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${hoveredBenefit === 2 ? 'text-blue-400' : 'text-white'}`}>ניהול לוגיסטי מקצה לקצה</span>
                  <span className="text-slate-300 text-sm md:text-base"> – שילוח, מכס ושחרור באחריותנו.</span>
                </div>
              </div>

              <div 
                className="flex items-start gap-3 reveal reveal-delay-2 cursor-pointer"
                onMouseEnter={() => setHoveredBenefit(3)}
                onMouseLeave={() => setHoveredBenefit(null)}
              >
                <div className={`w-6 h-6 rounded-lg border flex items-center justify-center mt-1 flex-shrink-0 transition-all duration-300 ${
                  hoveredBenefit === 3 
                    ? 'bg-blue-500/20 border-blue-400 text-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.3)]' 
                    : 'bg-blue-500/10 border-blue-500/25 text-blue-400'
                }`}>
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className={`font-bold text-sm md:text-base transition-colors duration-300 ${hoveredBenefit === 3 ? 'text-blue-400' : 'text-white'}`}>ביטחון ושקט נפשי</span>
                  <span className="text-slate-300 text-sm md:text-base"> – אחריות מלאה על הסחורה עד דלת העסק.</span>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="flex flex-col items-start gap-2.5 w-full sm:w-auto reveal reveal-delay-3">
              <a
                href="#cta"
                onClick={(e) => handleScrollTo(e, 'cta')}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#2563EB] hover:bg-[#1D4ED8] text-white rounded-2xl font-bold transition-all duration-200 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 text-center w-full sm:w-auto cursor-pointer"
              >
                <span className="text-base font-extrabold">לבדיקת רווחיות בחינם</span>
                <ArrowLeft className="w-5 h-5 text-white transition-transform group-hover:-translate-x-1" />
              </a>
              <p className="text-xs text-slate-400 font-normal pr-2">
                * נבדוק כמה כסף תחסוך אם תייבא את המוצר שלך *
              </p>
            </div>

          </div>

          {/* Left Column - Shipping Map Illustration (5 cols on desktop) */}
          <div className="lg:col-span-5 relative w-full flex items-center justify-center min-h-[260px] sm:min-h-[300px] lg:min-h-[400px]">
            <div 
              ref={mapContainerRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeaveMap}
              style={{
                transform: `perspective(1000px) rotateY(${parallax.x}deg) rotateX(${-parallax.y}deg)`,
                transition: 'transform 0.15s ease-out',
                willChange: 'transform'
              }}
              className="relative w-full max-w-lg aspect-[500/380] rounded-3xl bg-slate-900/50 border border-slate-800/80 p-4 shadow-2xl backdrop-blur-md transition-all duration-300"
            >
              
              {/* Map Title Tag */}
              <div className="absolute top-4 right-4 bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1 text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                NEXORA ROUTE SYSTEM ACTIVE
              </div>

              {/* Dotted Global Map and Glowing Path SVG */}
              <svg viewBox="0 0 500 380" className="w-full h-full text-slate-700 select-none" fill="none">
                {/* Background Dotted Map Grid */}
                <g opacity="0.15">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <line key={`lh-${i}`} x1="0" y1={30 + i * 22} x2="500" y2={30 + i * 22} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,8" />
                  ))}
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`lv-${i}`} x1={25 + i * 24} y1="0" x2={25 + i * 24} y2="380" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,8" />
                  ))}
                </g>

                {/* Country outlines representation (minimalistic shapes) */}
                <g fill="currentColor" opacity="0.08">
                  {/* Asia / China Area */}
                  <path d="M 370 120 C 400 110, 440 140, 430 180 C 410 220, 350 250, 360 210 Z" />
                  {/* Europe Area */}
                  <path d="M 120 70 C 160 50, 200 80, 210 110 C 180 140, 140 120, 120 90 Z" />
                  {/* Middle East Area */}
                  <path d="M 230 160 C 260 150, 280 180, 260 200 Z" />
                  {/* USA Area */}
                  <path d="M 30 100 C 60 90, 80 120, 70 150 C 40 170, 20 130, 30 100 Z" />
                </g>

                {/* Route 1: China (Shenzhen) to Israel (Haifa) */}
                <path 
                  id="china-route"
                  d="M 400 170 Q 320 200, 250 180" 
                  stroke={hoveredBenefit === 2 ? "#38BDF8" : "#3B82F6"} 
                  strokeWidth={hoveredBenefit === 2 ? "3.5" : "2.5"} 
                  strokeLinecap="round"
                  className="animate-shipping-route transition-all duration-300" 
                />
                
                {/* Route 2: USA (New York) to Israel */}
                <path 
                  id="usa-route"
                  d="M 60 130 Q 150 150, 250 180" 
                  stroke={hoveredBenefit === 2 ? "#38BDF8" : "#3B82F6"} 
                  strokeWidth={hoveredBenefit === 2 ? "2.5" : "1.5"} 
                  strokeLinecap="round"
                  className="animate-shipping-route-fast transition-all duration-300" 
                />

                {/* Route 3: Europe (Hamburg) to Israel */}
                <path 
                  id="europe-route"
                  d="M 160 90 Q 200 130, 250 180" 
                  stroke={hoveredBenefit === 2 ? "#38BDF8" : "#3B82F6"} 
                  strokeWidth={hoveredBenefit === 2 ? "2.5" : "1.5"} 
                  strokeLinecap="round"
                  className="animate-shipping-route transition-all duration-300" 
                />

                {/* Ship Icon Animated along China Route */}
                <g fill="#10B981">
                  <path d="M -8 2 L 6 2 L 8 -1 L 3 -1 L 2 -3 L -2 -3 L -3 -1 L -8 -1 Z" />
                  <animateMotion 
                    dur="16s" 
                    repeatCount="indefinite" 
                    rotate="auto"
                  >
                    <mpath href="#china-route" />
                  </animateMotion>
                </g>

                {/* Plane Icon Animated along USA Route */}
                <g fill="#60A5FA">
                  <path d="M -6 -1.5 L -3 -1.5 L -1 -4.5 L 1 -4.5 L 0 -1.5 L 4 -1.5 L 6 0 L 4 1.5 L 0 1.5 L 1 4.5 L -1 4.5 L -3 1.5 L -6 1.5 Z" />
                  <animateMotion 
                    dur="12s" 
                    repeatCount="indefinite" 
                    rotate="auto"
                  >
                    <mpath href="#usa-route" />
                  </animateMotion>
                </g>

                {/* Nodes / Hub Locations */}
                
                {/* Hub: China */}
                <g transform="translate(400, 170)" className="transition-all duration-300">
                  <circle r={hoveredBenefit === 1 ? 18 : 12} fill="#2563EB" opacity={hoveredBenefit === 1 ? 0.35 : 0.15} className="transition-all duration-300" />
                  <circle r="6" fill="#2563EB" opacity="0.35" className="animate-ping" />
                  <circle r="4" fill={hoveredBenefit === 1 ? "#60A5FA" : "#3B82F6"} className="transition-all duration-300" />
                  <text y="-12" textAnchor="middle" fill={hoveredBenefit === 1 ? "#38BDF8" : "#94A3B8"} fontSize="9" fontWeight="bold" className="font-sans transition-all duration-300 select-none">SZX-HUB (מרכז אספקה)</text>
                </g>

                {/* Hub: US East */}
                <g transform="translate(60, 130)">
                  <circle r="4" fill="#64748B" />
                  <text y="-10" textAnchor="middle" fill="#64748B" fontSize="8">ארה"ב (NY)</text>
                </g>

                {/* Hub: Europe */}
                <g transform="translate(160, 90)">
                  <circle r="4" fill="#64748B" />
                  <text y="-10" textAnchor="middle" fill="#64748B" fontSize="8">אירופה</text>
                </g>

                {/* Hub: Israel (Destination - Green success highlight) */}
                <g transform="translate(250, 180)" className="transition-all duration-300">
                  <circle r={hoveredBenefit === 3 ? 26 : 18} fill="#10B981" opacity={hoveredBenefit === 3 ? 0.25 : 0.1} className="transition-all duration-300" />
                  <circle r={hoveredBenefit === 3 ? 14 : 10} fill="#10B981" opacity={hoveredBenefit === 3 ? 0.45 : 0.25} className="ping-ring transition-all duration-300" />
                  <circle r="6" fill={hoveredBenefit === 3 ? "#34D399" : "#10B981"} className="transition-all duration-300" />
                  <text y="22" textAnchor="middle" fill={hoveredBenefit === 3 ? "#34D399" : "#10B981"} fontSize={hoveredBenefit === 3 ? "11" : "10"} fontWeight="bold" className="font-sans transition-all duration-300 select-none">העסק שלך (ישראל)</text>
                </g>

                {/* Interactive Status Tag */}
                <g transform="translate(200, 280)">
                  <rect width="100" height="34" rx="6" fill="#1E293B" stroke="#38BDF8" strokeWidth="1" opacity="0.95" />
                  <text x="50" y="15" textAnchor="middle" fill="#F8FAFC" fontSize="8" fontWeight="bold">סטטוס שילוח:</text>
                  <text x="50" y="27" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="bold">באחריות מלאה 100%</text>
                </g>
              </svg>

              {/* Decorative elements representing real-time import data */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-[10px] text-slate-400">אחריות</div>
                  <div className="text-xs font-bold text-emerald-400">דלת לדלת</div>
                </div>
                <div className="border-r border-slate-800">
                  <div className="text-[10px] text-slate-400">עמילות מכס</div>
                  <div className="text-xs font-bold text-[#3B82F6]">כולל הכל</div>
                </div>
                <div className="border-r border-slate-800">
                  <div className="text-[10px] text-slate-400">עלות מוצר</div>
                  <div className="text-xs font-bold text-white">עד 50% חיסכון</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* SECTION 2: PAIN SECTION */}
      <section 
        id="pain" 
        className="py-24 bg-[#0B0F19] border-y border-slate-800/80 text-white relative overflow-hidden"
      >
        {/* Subtle glow background */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px] pointer-events-none -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          
          {/* Broken coin / warning icon */}
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-6 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.15)] animate-bounce">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-8">
            הסוד שספקי המוצרים בארץ לא רוצים שתגלו
          </h2>

          <div className="text-right text-slate-300 space-y-6 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            <p className="font-medium text-slate-200">
              לקנות מיבואן או סיטונאי מקומי מרגיש קל ובטוח – מרימים טלפון, משלמים ומקבלים משטח למחסן. אבל מה באמת קורה בפועל?
            </p>
            <p className="text-slate-300">
              אתם משלמים <span className="text-red-400 font-bold">קנס תיווך ענק</span> שמממן משרדים מפוארים, אנשי מכירות ומתחי רווחים מטורפים של אחרים. הכסף הזה יוצא ישירות מהכיס של העסק שלכם וחותך את שורת הרווח שלכם בחצי.
            </p>
            
            {/* interactive Supply Chain Leak Chart */}
            <div className="my-10 p-5 sm:p-8 rounded-2xl bg-[#0F172A]/70 border border-[#3B82F6]/30 shadow-[0_0_25px_rgba(59,130,246,0.08)] backdrop-blur-md">
              <h3 className="text-base font-bold text-white mb-6 text-center">כך דולף הכסף שלך בשרשרת התיווך הישראלית:</h3>
              
              <div className="space-y-6 max-w-xl mx-auto">
                {/* Factory cost */}
                <div className="relative">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base font-medium mb-1.5 text-slate-300 gap-1">
                    <span>מחיר במפעל בחו"ל</span>
                    <span className="font-semibold text-slate-200">30% מעלות המוצר</span>
                  </div>
                  <div className="w-full h-3.5 bg-slate-950/60 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.3)]" style={{ width: '30%' }} />
                  </div>
                </div>
                
                {/* Middlemen fee */}
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm sm:text-base font-medium mb-1.5 text-slate-300 gap-1">
                    <span>קנס סיטונאים ומתווכים בארץ (משרדים, אנשי מכירות, מתחי רווח)</span>
                    <span className="text-xl sm:text-2xl font-black text-red-500 tracking-wide drop-shadow-[0_0_12px_rgba(239,68,68,0.3)] animate-pulse">+ 70% קנס תיווך!</span>
                  </div>
                  <div className="w-full h-4.5 bg-slate-950/60 rounded-full overflow-hidden border border-slate-800">
                    <div className="h-full bg-red-500 rounded-full shadow-[0_0_12px_rgba(239,68,68,0.4)]" style={{ width: '100%' }} />
                  </div>
                </div>
              </div>
              
              <p className="text-xs sm:text-sm text-slate-400 text-center mt-5">
                * מבוסס על ממוצעי פער תיווך ברכש תעשייתי ומסחרי בישראל
              </p>
            </div>

            <p className="mt-10 md:mt-12 text-slate-200">
              הפחד 'לברוח מהבלגן של חו"ל' גורם לכם להשאיר <span className="font-bold text-white">עשרות אלפי שקלים על הרצפה בכל חודש</span> – פשוט כי אף אחד לא הראה לכם שיש דרך אחרת, בלי כאבי ראש ובלי פערי תיווך.
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3: THE SOLUTION - CPB METHOD */}
      <section 
        id="solution" 
        className="py-24 bg-[#0F172A] text-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
              להביא את חו"ל לדלת העסק – בביטחון של קנייה בארץ
            </h2>
            <p className="text-slate-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              מעטפת הייבוא המלאה של Nexora הופכת את הרכישה ישירות מהמפעל בחו"ל לתהליך פשוט, שקוף ובטוח – <span className="text-[#10B981] font-bold">בדיוק כמו לקנות מספק בארץ, רק ברבע מהמחיר.</span>
            </p>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Column 1: הוזלת עלויות */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-2xl hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                הוזלת עלויות
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                אנחנו חותכים את כל פערי התיווך והסיטונאים באמצע. אתה מקבל "מחיר נחיתה" סופי, נמוך וידוע מראש לכל מוצר – בלי הפתעות ובלי אותיות קטנות בנמלים.
              </p>
            </div>

            {/* Column 2: חיסכון בזמן */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-2xl hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                חיסכון בזמן
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                יש לך מנהל תיק לקוח אישי בארץ, בעברית, שמנהל עבורך את כל הקצוות מקצה לקצה. אתה לא צריך לדעת אנגלית, לא להתעסק עם ניירת ולא לרוץ למכס – אנחנו עושים הכל.
              </p>
            </div>

            {/* Column 3: ראש שקט */}
            <div className="bg-slate-900/60 border border-slate-800/80 p-8 sm:p-10 rounded-2xl hover:border-slate-700 hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-slate-500/10 border border-slate-500/25 flex items-center justify-center text-slate-400 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-extrabold text-white mb-3">
                ראש שקט
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                השקט הנפשי לדעת שהכסף והסחורה שלך נמצאים תחת השגחה קפדנית ובטוחה, בזמן שאתה מתרכז רק בדבר אחד: לשווק, למכור ולהביא כסף הביתה.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4: "מי אנחנו" */}
      <section 
        id="about" 
        className="py-24 bg-[#0F172A] border-y border-slate-800/40 text-white relative overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Photo Column - Real partner photos */}
            <div className="lg:col-span-5 order-2 lg:order-1 grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md mx-auto">

              {/* Partner 1: Shalev */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800/80 p-3 group transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 text-right">
                <div className="w-full aspect-[3/4] relative overflow-hidden rounded-xl">
                  <img
                    src="/shalev.jpg"
                    alt="שלו סגל – מייסד שותף ומנכ&quot;ל Nexora"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3.5 pr-1">
                  <h4 className="text-lg font-bold text-white mb-0.5">שלו סגל</h4>
                  <p className="text-sm text-blue-400 font-medium">מייסד שותף ומנכ&quot;ל</p>
                </div>
              </div>

              {/* Partner 2: Ofek */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800/80 p-3 group transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 text-right">
                <div className="w-full aspect-[3/4] relative overflow-hidden rounded-xl">
                  <img
                    src="/ofek.jpg"
                    alt="אופק אוקונסקי – מייסד שותף, סמנכ&quot;ל תפעול וטכנולוגיות Nexora"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-3.5 pr-1">
                  <h4 className="text-lg font-bold text-white mb-0.5">אופק אוקונסקי</h4>
                  <p className="text-sm text-emerald-400 font-medium">מייסד שותף, סמנכ&quot;ל תפעול וטכנולוגיות</p>
                </div>
              </div>

            </div>

            {/* Content Column */}
            <div className="lg:col-span-7 order-1 lg:order-2 text-right">
              <span className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 block">שותפים לדרך</span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
                נעים להכיר, אנחנו האנשים שלוקחים אחריות על הסחורה שלך
              </h2>
              
              <div className="space-y-6 text-slate-300 text-sm md:text-base leading-relaxed">
                <p>
                  הקמנו את Nexora אחרי שנים שראינו את אותו הסיפור חוזר על עצמו: בעלי עסקים ויזמים מדהימים בישראל שעובדים קשה מהבוקר עד הלילה, אבל בסוף החודש לא נשאר להם כמעט כלום בכיס – רק בגלל שהסיטונאים והספקים בארץ שוחטים אותם במחירים.
                </p>
                
                <blockquote className="border-r-4 border-blue-500/50 pr-4 my-6 italic text-slate-200 bg-blue-950/20 py-3 pl-3 rounded-l-lg">
                  "כשהיינו שואלים אותם 'למה אתם לא מייבאים ישירות?', כולם היו עונים לנו בדיוק את אותו הדבר: 'עזבו אתכם, אין לנו זמן לבלגן הזה, זה מפחיד, יעקצו אותנו בסין, המכס יתקע אותנו והכסף ילך לפח'."
                </blockquote>

                <div className="border-r-4 border-[#10B981] pr-4 space-y-4">
                  <p className="font-medium text-slate-200">
                    הבנו שיש כאן בעיה ענקית. החלטנו לקחת את הכלים, מערכות הניהול והחשיבה הטכנולוגית שהבאנו מעולם ההייטק, ולחבר אותם לניסיון, לקשרים ולידע שלנו בעולם הלוגיסטיקה, הרכש ועמילות המכס.
                  </p>
                  <p className="font-medium text-slate-200">
                    התוצאה היא <span className="text-white font-bold">Nexora</span> – גוף מודרני שנותן פתרון אחד ברור ומבוסס דאטה: אנחנו נהיה הגב שלכם בשטח, עם שקיפות מלאה ומעקב דינמי. המטרה שלנו היא לפתוח את השוק העולמי לכל עסק בישראל, ולהוכיח לכם שאתם יכולים לשלם חצי מחיר על המוצרים שלכם – בלי לעבוד דקה אחת קשה יותר.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: ANTI-BULLSHIT & RISK REDUCTION */}
      <section 
        id="risk" 
        className="py-24 bg-[#0B0F19] border-y border-slate-800/80 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-6 text-right">
          
          <span className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 block">דברו דוגרי, בלי סיפורים</span>
          
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
            בואו נשים את הקלפים על השולחן.
          </h2>

          <p className="text-lg md:text-xl font-bold text-slate-200 mb-8 border-r-4 border-sky-500/50 pr-4">
            החבר'ה האלה נשמעים מעולה, אבל למה שנסמוך עליהם? איפה הניסיון של עשרות שנים?
          </p>

          <div className="space-y-6 mb-12 max-w-3xl">
            {/* Bullet 1 */}
            <div className="flex items-start gap-4 pr-1">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0 mt-1">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">אתם לא עוד תיק שקבור בין פקידים</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  בחברות הענק אף אחד לא יענה לכם בוואטסאפ בערב כשתהיו בלחץ על הסחורה. אצלנו אתם במרכז.
                </p>
              </div>
            </div>

            {/* Bullet 2 */}
            <div className="flex items-start gap-4 pr-1">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0 mt-1">
                <Rocket className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">100% מהפוקוס והלב שלנו</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  הפרויקט שלכם מנוהל אישית על ידי המייסדים ומקבל עדיפות עליונה, מהרגע הראשון ועד הגעת המשלוח.
                </p>
              </div>
            </div>

            {/* Bullet 3 */}
            <div className="flex items-start gap-4 pr-1">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 flex-shrink-0 mt-1">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">נלחמים על הכסף שלכם כאילו הוא שלנו</h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  אנחנו נלחם על כל שקל מול המפעלים, חברות השילוח והמכס. ההצלחה שלכם היא הדרך היחידה שלנו לצמוח.
                </p>
              </div>
            </div>
          </div>

          {/* Zero Risk Box - The Risk Reversal Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0A0D18] border border-[#10B981]/40 flex flex-col md:flex-row gap-5 items-start text-right shadow-[0_0_30px_rgba(16,185,129,0.05)]">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.15)] mt-1">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg sm:text-xl font-extrabold text-[#10B981] mb-2.5">אנחנו מורידים את הסיכון שלכם לאפס מוחלט:</h4>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                אנחנו עובדים אך ורק על בסיס הצלחה ואבני דרך. בשלב הראשון אנחנו מבצעים עבורכם בדיקת היתכנות, איתור מפעל וחישוב עלויות – בחינם לחלוטין וללא שום התחייבות. אתם תשלמו על הניהול רק כשהכל מאושר ויוצא לדרך. אם לא מצאנו לכם חיסכון משמעותי – לא שילמתם כלום.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6: ROADMAP */}
      <section 
        id="roadmap" 
        className="py-24 bg-[#0F172A] border-y border-slate-800/40 text-white relative overflow-hidden"
      >
        {/* Decorative background glow */}
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] rounded-full bg-blue-600/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 block">מפת הדרכים</span>
            <h2 className="text-2xl md:text-4xl font-extrabold text-white">
              4 צעדים פשוטים בדרך לחיסכון ושקט נפשי מושלם
            </h2>
          </div>

          {/* Timeline steps */}
          <div className="relative pr-8 md:pr-12 border-r-2 border-slate-800 space-y-12 max-w-2xl mx-auto">
            
            {/* Step 1 */}
            <div className="relative text-right">
              {/* Pulsing step number */}
              <span className="absolute right-0 top-0 translate-x-[calc(50%+1px)] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F172A] border-2 border-[#3B82F6] flex items-center justify-center text-xs md:text-sm font-bold text-[#3B82F6] shadow-md shadow-blue-500/20">
                01
              </span>
              <div className="pr-6 md:pr-8">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">שלב 1: שיחת אפיון ובדיקה (בחינם וללא התחייבות)</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  אתם משתפים אותנו במוצרים שאתם רוכשים כיום בארץ ובמחירם. תוך ימים בודדים אנחנו חוזרים אליכם עם אנליזה מדויקת: האם ואיך אפשר לייבא אותם ישירות, וכמה כסף תחסכו.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative text-right">
              <span className="absolute right-0 top-0 translate-x-[calc(50%+1px)] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F172A] border-2 border-slate-700 flex items-center justify-center text-xs md:text-sm font-bold text-slate-400 shadow-md">
                02
              </span>
              <div className="pr-6 md:pr-8">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">שלב 2: איתור המפעל וסגירת המחיר</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  אנחנו מאתרים את המפעל האמין והאיכותי ביותר בחו"ל, מנהלים מולו מו"מ להשגת מחיר המקור הנמוך ביותר, ומפיקים באופן מלא את כל אישורי הייבוא הנדרשים.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative text-right">
              <span className="absolute right-0 top-0 translate-x-[calc(50%+1px)] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F172A] border-2 border-slate-700 flex items-center justify-center text-xs md:text-sm font-bold text-slate-400 shadow-md">
                03
              </span>
              <div className="pr-6 md:pr-8">
                <h3 className="text-base md:text-lg font-bold text-white mb-2">שלב 3: הובלה, לוגיסטיקה ושחרור מהמכס</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  אנחנו מעלים את הסחורה לים או לאוויר, ומנהלים מקצה לקצה את כל מערך השילוח, הניירת, הבירוקרטיה והשחרור בנמלים בישראל. הכל באחריותנו המלאה.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="relative text-right">
              <span className="absolute right-0 top-0 translate-x-[calc(50%+1px)] w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0F172A] border-2 border-[#10B981] flex items-center justify-center text-xs md:text-sm font-bold text-[#10B981] shadow-md shadow-emerald-500/20">
                04
              </span>
              <div className="pr-6 md:pr-8">
                <h3 className="text-base md:text-lg font-bold text-[#10B981] mb-2">שלב 4: פריקה ישירות אצלכם בעסק</h3>
                <p className="text-slate-300 text-sm leading-relaxed">
                  משאית מגיעה ופורקת את המוצרים ישירות במחסן שלכם. אתם רק חותמים, מתחילים למכור – ומקפיצים את שורת הרווח של העסק.
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 7: THE LEAD FORM (CTA BOX) */}
      <section 
        id="cta" 
        className="py-24 bg-[#0F172A] text-white relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-[160px] pointer-events-none" />

        <div className="max-w-3xl mx-auto px-6 relative z-10">
          
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-5 sm:p-8 md:p-12 shadow-2xl relative backdrop-blur-md">
            
            {/* Header copy */}
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-[#10B981] tracking-widest uppercase block mb-3">בדיקת היתכנות חינם ללא התחייבות</span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
                בואו נבדוק כמה כסף העסק שלכם יכול לחסוך כבר החודש
              </h2>
              <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
                השאירו פרטים קצרים, ונחזור אליכם עם אנליזה ראשונית של עלויות הייבוא עבור המוצר שלכם.
              </p>
            </div>

            {/* Form */}
            {isSuccess ? (
              <div className="py-12 flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 animate-scale-in">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">הפנייה נשלחה בהצלחה!</h3>
                <p className="text-slate-400 text-sm max-w-sm mb-8">
                  תודה רבה, אפק וצוות הלוגיסטיקה כבר בודקים את הפרטים שלך. נחזור אליך עם תחזית חיסכון בתוך 48 שעות.
                </p>
                <button 
                  onClick={() => setIsSuccess(false)}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 rounded-xl transition-all"
                >
                  שלח פנייה נוספת
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-right" dir="rtl">
                
                {/* Row 1: Name and Business Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full name input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      שם מלא
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="ישראל ישראלי"
                        className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 outline-none transition-all pr-12"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 pointer-events-none">
                        <User className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Business name input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      שם העסק
                    </label>
                    <div className="relative">
                      <input 
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        placeholder="שם החברה או העסק שלך"
                        className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 outline-none transition-all pr-12"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 pointer-events-none">
                        <Building className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Mobile Phone input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      טלפון נייד
                    </label>
                    <div className="relative">
                      <input 
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="052-1234567"
                        className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 outline-none transition-all pr-12"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 pointer-events-none">
                        <Phone className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Email input */}
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-2">
                      כתובת אימייל
                    </label>
                    <div className="relative">
                      <input 
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 outline-none transition-all pr-12 text-left"
                        dir="ltr"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 text-slate-500 pointer-events-none">
                        <Mail className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Product input (Textarea open field) */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-2">
                    מה המוצר שאתם רוכשים כיום בארץ והייתם רוצים לבדוק כמה הוא יעלה בייבוא ישיר?
                  </label>
                  <div className="relative">
                    <textarea 
                      required
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="לדוגמה: כלי עבודה ממתכת, חלקי פלסטיק למכונות, ריהוט משרדי מעץ מורכב..."
                      rows={3}
                      className="w-full px-5 py-3.5 bg-slate-950/80 border border-slate-800 rounded-xl text-white placeholder-slate-500 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500/25 outline-none transition-all pr-12 resize-none"
                    />
                    <div className="absolute top-4 right-4 text-slate-500 pointer-events-none">
                      <Package className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Privacy and terms checkbox */}
                <div className="flex items-start gap-3 mt-4 pr-1">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-800 bg-slate-950/80 text-blue-600 focus:ring-blue-500/25 outline-none cursor-pointer mt-1"
                  />
                  <label htmlFor="agreedToTerms" className="text-xs text-slate-300 leading-relaxed cursor-pointer select-none">
                    אני מאשר כי מסירת הפרטים בטופס זה נעשית מרצוני החופשי ובהסכמתי המלאה, ואני מסכים ל
                    <a
                      href="#privacy-policy"
                      onClick={(e) => {
                        e.preventDefault();
                        alert("מדיניות פרטיות ותנאי שימוש: המידע שאתה מוסר בטופס זה (שם, טלפון, מייל ופרטי מוצר) נאסף אך ורק לצורך יצירת קשר, בדיקת היתכנות ייבוא והתאמת השירות עבור העסק שלך. אנו מתחייבים לשמור על סודיות המידע ולא להעבירו לצד ג' ללא הסכמתך.");
                      }}
                      className="text-blue-400 hover:text-blue-300 underline font-semibold mx-1"
                    >
                      מדיניות הפרטיות ותנאי השימוש
                    </a>
                    של האתר.
                  </label>
                </div>

                {/* Submit button (Emerald green success color) */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 bg-[#10B981] hover:bg-[#059669] text-white font-bold rounded-2xl transition-all duration-200 shadow-xl shadow-emerald-500/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2 mt-4 cursor-pointer text-sm md:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>מחשב נתוני היתכנות...</span>
                    </>
                  ) : (
                    <>
                      <span>אני רוצה בדיקת רווחיות חינם</span>
                      <ArrowLeft className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* WhatsApp Alternative */}
                <div className="text-center mt-8">
                  <a
                    href="https://wa.me/972555172571?text=%D7%94%D7%99%D7%99%2C%20%D7%A0%D7%95%D7%93%D7%94%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%99%D7%95%D7%AA%D7%A8%20%D7%A2%D7%9C%20%D7%91%D7%93%D7%99%D7%A7%D7%AA%20%D7%A8%D7%95%D7%95%D7%97%D7%99%D7%95%D7%AA%20%D7%97%D7%99%D7%A0%D7%9D"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-[#25D366] transition-colors duration-200"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    או שלח לנו הודעת וואטסאפ ישירה
                  </a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#0F172A] border-t border-slate-800/60 text-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12 reveal">
            <span className="text-xs font-bold text-sky-400 tracking-wider uppercase mb-3 block">שאלות ותשובות</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white">כל מה שרצית לדעת</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: 'מה הכמות המינימלית לייבוא?', a: 'אין כמות מינימלית קבועה – זה תלוי במוצר ובמפעל. בדרך כלל, ייבוא כלכלי מתחיל מהזמנות בשווי $2,000–$5,000. אנחנו נבדוק עבורך את סף הכדאיות בשיחת ההיתכנות החינמית.' },
              { q: 'כמה זמן לוקח תהליך ייבוא שלם?', a: 'ייבוא ימי מאסיה לישראל לוקח בדרך כלל 25–40 ימים. ייבוא אווירי מהיר לוקח 5–10 ימים. אנחנו נמליץ לך על הדרך הנכונה בהתאם לדחיפות ולתקציב שלך.' },
              { q: 'מה קורה אם המוצר לא מגיע בזמן או פגום?', a: 'אנחנו לוקחים אחריות מלאה. יש לנו ביטוח שילוח על כל משלוח, ואנחנו מפעילים בקרת איכות במפעל לפני שהסחורה יוצאת. במקרה של בעיה – אנחנו מטפלים בפיצוי מול הספק.' },
              { q: 'איך אתם עובדים מול המכס בישראל?', a: 'יש לנו עמיל מכס מורשה שמטפל בכל הניירת, האישורים והשחרור בנמלים בישראל. אתה לא צריך להגיע לנמל, לדעת אנגלית או להבין בירוקרטיה מכסית – הכל נעשה עבורך.' },
              { q: 'האם צריך לשלם מראש על השירות?', a: 'לא! שלב בדיקת ההיתכנות הוא חינמי לגמרי. אתה משלם לנו רק לאחר שמצאנו לך חיסכון משמעותי, אישרת את ההזמנה וכל התנאים סגורים ומוסכמים.' },
              { q: 'עם אילו מדינות אתם עובדים?', a: 'בעיקר עם סין (SZX-HUB), טורקיה, הודו, ויאטנם וארה"ב. אנחנו מחוברים למאגר של מפעלים מאומתים ב-18 מדינות ייצור שונות.' }
            ].map((faq, i) => (
              <div key={i} className="reveal bg-slate-900/50 rounded-2xl border border-slate-800/80 shadow-sm overflow-hidden transition-all duration-300 hover:border-blue-500/20">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-white text-sm hover:bg-slate-800/30 transition-colors gap-4"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5 text-slate-300 text-sm leading-relaxed text-right border-t border-slate-800/80 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP BUTTON */}
      <a
        href="https://wa.me/972555172571?text=%D7%94%D7%99%D7%99%2C%20%D7%A0%D7%95%D7%93%D7%94%20%D7%9C%D7%A9%D7%9E%D7%95%D7%A2%20%D7%99%D7%95%D7%AA%D7%A8%20%D7%A2%D7%9C%20%D7%91%D7%93%D7%99%D7%A7%D7%AA%20%D7%A8%D7%95%D7%95%D7%97%D7%99%D7%95%D7%AA%20%D7%97%D7%99%D7%A0%D7%9D"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl wa-pulse hover:scale-110 transition-transform duration-200"
        title="שלח הודעת וואטסאפ"
        aria-label="צור קשר בווטסאפ"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

      {/* FOOTER */}
      <footer className="bg-[#090D16] text-slate-500 py-12 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2.5 mb-6">
            <div className="relative w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 shadow-inner">
              <img src="/logo.png" alt="Nexora Logo" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-base font-bold font-display text-white tracking-wider">
              Nexora
            </span>
          </div>
          <p className="text-xs mb-4">
            כל הזכויות שמורות © {new Date().getFullYear()} Nexora בע"מ. מיוצר בארץ, מביא מחו"ל.
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-4 mb-6">
            <a 
              href="https://tr.ee/r7EA09sDS-" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-300"
              title="שלח מייל"
              aria-label="שלח מייל ל-Nexora"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href="https://www.instagram.com/nexora_il" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-pink-500 hover:shadow-[0_0_10px_rgba(236,72,153,0.3)] transition-all duration-300"
              title="אינסטגרם"
              aria-label="עמוד האינסטגרם של Nexora"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a 
              href="https://www.facebook.com/nexora.co.il/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-600 hover:shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all duration-300"
              title="פייסבוק"
              aria-label="עמוד הפייסבוק של Nexora"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a 
              href="https://www.linkedin.com/company/nexorail/about/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-400 hover:shadow-[0_0_10px_rgba(96,165,250,0.3)] transition-all duration-300"
              title="לינקדאין"
              aria-label="עמוד הלינקדאין של Nexora"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>

          <div className="flex justify-center gap-6 text-xs font-semibold text-slate-400">
            <a href="#hero" onClick={(e) => handleScrollTo(e, 'hero')} className="hover:text-white transition-colors">עמוד ראשי</a>
            <span className="text-slate-800">|</span>
            <a href="#pain" onClick={(e) => handleScrollTo(e, 'pain')} className="hover:text-white transition-colors">איך אנחנו מוזילים עלויות?</a>
            <span className="text-slate-800">|</span>
            <a href="#solution" onClick={(e) => handleScrollTo(e, 'solution')} className="hover:text-white transition-colors">שיטת הייבוא המוגן</a>
            <span className="text-slate-800">|</span>
            <a href="#about" onClick={(e) => handleScrollTo(e, 'about')} className="hover:text-white transition-colors">מי אנחנו</a>
          </div>
        </div>
      </footer>

      {/* COOKIE CONSENT BANNER */}
      {showCookieBanner && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-2xl w-[calc(100%-2rem)] bg-slate-950/95 backdrop-blur-md border border-slate-800 p-5 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-4 items-center justify-between text-right animate-scale-in">
          <div className="flex-1">
            <h4 className="text-sm font-bold text-white mb-1 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-400">
                <path d="M12 2a10 10 0 1 0 10 10c0-1.5-1-2.5-2.5-2.5S17 8.5 17 7s1-2.5-.5-3.5C15 2 13.5 2 12 2Z"/>
                <path d="M12 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-4 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm-6 4a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm6 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
              </svg>
              הודעה על שימוש בעוגיות (Cookies)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              אנו משתמשים בעוגיות כדי לשפר את חווית הגלישה שלך, להציג תכנים מותאמים אישית ולנתח את תנועת הגולשים באתר, בהתאם לחוק הגנת הפרטיות ותקנה 17. המשך הגלישה מהווה הסכמה למדיניות זו.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto justify-end">
            <button
              onClick={handleAcceptCookies}
              className="px-5 py-2.5 bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-bold rounded-xl text-xs transition-all shadow-md shadow-blue-600/20 active:scale-95 cursor-pointer"
            >
              אישור והמשך
            </button>
            <button
              onClick={handleDeclineCookies}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-xs transition-all active:scale-95 cursor-pointer"
            >
              המשך ללא אישור
            </button>
          </div>
        </div>
      )}

      {/* ACCESSIBILITY FLOATING WIDGET */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        {/* Toggle Button */}
        <button
          onClick={() => setAccessibilityOpen(!accessibilityOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-95 cursor-pointer ${
            accessibilityOpen 
              ? 'bg-[#2563EB] text-white rotate-90 shadow-blue-600/30' 
              : 'bg-slate-900 border border-slate-800 text-blue-400 hover:text-white hover:border-blue-500 shadow-black/50'
          }`}
          title="תפריט נגישות"
          aria-label="תפריט נגישות"
        >
          {accessibilityOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <circle cx="12" cy="5" r="1.5" />
              <path d="m9 20 3-6 3 6" />
              <path d="m6 8 6 2 6-2" />
              <path d="M12 10v4" />
            </svg>
          )}
        </button>

        {/* Accessibility Menu */}
        {accessibilityOpen && (
          <div className="absolute bottom-18 right-0 w-72 bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-5 shadow-2xl text-right animate-scale-in">
            <h3 className="text-sm font-bold text-white mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-blue-400">
                <circle cx="12" cy="5" r="1.5" />
                <path d="m9 20 3-6 3 6" />
                <path d="m6 8 6 2 6-2" />
                <path d="M12 10v4" />
              </svg>
              הגדרות נגישות
            </h3>

            <div className="space-y-3.5">
              {/* Option 1: Large Text */}
              <button
                onClick={() => setAccLargeText(!accLargeText)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  accLargeText
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>הגדלת גופן (טקסט גדול)</span>
                <span className={`w-2.5 h-2.5 rounded-full ${accLargeText ? 'bg-blue-500' : 'bg-slate-700'}`} />
              </button>

              {/* Option 2: High Contrast */}
              <button
                onClick={() => setAccHighContrast(!accHighContrast)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  accHighContrast
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>ניגודיות גבוהה</span>
                <span className={`w-2.5 h-2.5 rounded-full ${accHighContrast ? 'bg-blue-500' : 'bg-slate-700'}`} />
              </button>

              {/* Option 3: Grayscale */}
              <button
                onClick={() => setAccGrayscale(!accGrayscale)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  accGrayscale
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>גווני אפור (שחור-לבן)</span>
                <span className={`w-2.5 h-2.5 rounded-full ${accGrayscale ? 'bg-blue-500' : 'bg-slate-700'}`} />
              </button>

              {/* Option 4: Readable Font */}
              <button
                onClick={() => setAccReadableFont(!accReadableFont)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  accReadableFont
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>גופן קריא ופשוט</span>
                <span className={`w-2.5 h-2.5 rounded-full ${accReadableFont ? 'bg-blue-500' : 'bg-slate-700'}`} />
              </button>

              {/* Option 5: Highlight Links */}
              <button
                onClick={() => setAccHighlightLinks(!accHighlightLinks)}
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                  accHighlightLinks
                    ? 'bg-blue-600/10 border-blue-500 text-blue-400'
                    : 'bg-slate-900/50 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>הדגשת קישורים</span>
                <span className={`w-2.5 h-2.5 rounded-full ${accHighlightLinks ? 'bg-blue-500' : 'bg-slate-700'}`} />
              </button>
            </div>

            {/* Reset & Accessibility Statement */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 flex justify-between items-center gap-3">
              <button
                onClick={handleResetAccessibility}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold rounded-lg transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                איפוס הגדרות
              </button>
              <a
                href="#accessibility-statement"
                onClick={(e) => {
                  e.preventDefault();
                  alert("הצהרת נגישות: אתר זה מונגש ומותאם לגלישה עבור אנשים עם מוגבלות בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות. אם נתקלתם בבעיית נגישות כלשהי, אנא פנו אלינו בדוא\"ל או בוואטסאפ ונשמח לסייע.");
                }}
                className="text-[10px] text-slate-400 hover:text-white underline font-semibold"
              >
                הצהרת נגישות
              </a>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
