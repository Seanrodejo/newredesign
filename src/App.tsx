import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Types ---
type TabItem = {
  id: string;
  label: string;
};

type ShowcaseCardData = {
  id: number;
  imageSrc: string;
  name: string;
  likes: string;
  pro: boolean;
};

type CommunityCardData = {
  id: number;
  imageSrc: string;
  title: string;
  likes: string;
  shares: string;
};

// --- Animations Variants (100% TS COMPATIBLE) ---
const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { type: "spring", stiffness: 260, damping: 25, delay: 0.1, staggerChildren: 0.08 } 
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
};

const listVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25 } },
};

const dotVariants = {
  active: { 
    scale: 1.3, 
    backgroundColor: "#ffffff", 
    boxShadow: "0px 0px 8px rgba(255,255,255,0.6)",
    transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1.5, ease: "easeInOut" } 
  },
  inactive: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.2)", boxShadow: "none" },
};

// --- Subcomponents ---

const ShowcaseCardItem = ({ card }: { card: ShowcaseCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.6), inset 0px 1px 1px rgba(255,255,255,0.15)", 
        transition: { type: "spring", stiffness: 400, damping: 25 } 
      }}
      className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[22px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 bg-gradient-to-b from-[#222] to-[#111]"
    >
      <img 
        src={card.imageSrc} 
        alt={card.name} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top scale-[1.5] transition-transform duration-700 hover:scale-[1.6]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      {card.pro && (
        <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/20 z-10 flex items-center justify-center shadow-lg">
           <span className="text-white text-[7px] font-black tracking-[0.1em] leading-none drop-shadow-md">PRO</span>
        </div>
      )}
      
      <motion.img 
        src="/save.svg" 
        alt="Save" 
        draggable={false} 
        className="absolute top-2.5 right-2.5 w-[14px] h-[14px] opacity-60 z-10 hover:opacity-100 transition-opacity drop-shadow-md" 
        whileHover={{ scale: 1.2, filter: "brightness(1.5)" }}
      />

      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2 z-10">
        <div className="w-[18px] h-[18px] rounded-full overflow-hidden border border-white/30 shadow-[0_2px_5px_rgba(0,0,0,0.5)] flex-shrink-0 bg-[#222]">
          <img src="/profilepic.svg" alt="avatar" draggable={false} className="w-full h-full object-cover" />
        </div>

        <span className="text-[9.5px] font-bold text-white/95 truncate flex-1 select-none drop-shadow-lg tracking-tight">
          {card.name}
        </span>
        
        <motion.button 
          onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
          className="flex items-center justify-end gap-[2px] cursor-pointer flex-shrink-0"
          whileTap={{ scale: 0.7, transition: { type: "spring", stiffness: 500, damping: 10 } }}
        >
          <motion.svg 
            animate={liked ? { scale: [1, 1.3, 1] } : {}} 
            xmlns="http://www.w3.org/2000/svg" width="10.5" height="10.5" viewBox="0 0 24 24" fill={liked ? "#ff3333" : "none"} stroke={liked ? "#ff3333" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
          >
            <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
          </motion.svg>
          <span className="text-[8.5px] font-black text-white select-none drop-shadow-md">{card.likes}</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const CommunityCardItem = ({ card }: { card: CommunityCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ 
        y: -6, 
        scale: 1.02,
        boxShadow: "0px 15px 30px rgba(0,0,0,0.6), inset 0px 1px 1px rgba(255,255,255,0.15)", 
        transition: { type: "spring", stiffness: 400, damping: 25 } 
      }}
      className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[22px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 bg-gradient-to-b from-[#222] to-[#111]"
    >
      <img 
        src={card.imageSrc} 
        alt={card.title} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.5] transition-transform duration-700 hover:scale-[1.6]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      <motion.div 
        className="absolute top-2.5 left-2.5 bg-white/10 backdrop-blur-md rounded-[10px] p-1.5 border border-white/20 shadow-lg"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.25)", scale: 1.05 }}
      >
        <img src="/playbutton.svg" alt="Play" draggable={false} className="w-[14px] h-[14px] opacity-100 drop-shadow-md" />
      </motion.div>

      <div className="absolute bottom-3 left-2.5 right-2.5 flex flex-col justify-end gap-1.5 z-10">
        <span className="text-[9.5px] font-black text-white/95 leading-tight select-none line-clamp-1 drop-shadow-xl tracking-tight">
          {card.title}
        </span>
        
        <div className="flex items-center gap-3 w-full">
          <motion.button 
            onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
            className="flex items-center gap-1 cursor-pointer z-20"
            whileTap={{ scale: 0.7, transition: { type: "spring", stiffness: 500, damping: 10 } }}
          >
            <motion.svg 
              animate={liked ? { scale: [1, 1.3, 1] } : {}}
              xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill={liked ? "#ff3333" : "none"} stroke={liked ? "#ff3333" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg"
            >
              <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
            </motion.svg>
            <span className="text-[8.5px] font-black text-white select-none drop-shadow-md">{card.likes}</span>
          </motion.button>

          <div className="flex items-center gap-1 z-20">
            <motion.button 
              className="cursor-pointer opacity-80 hover:opacity-100"
              whileTap={{ scale: 0.8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </motion.button>
            <span className="text-[8.5px] font-black text-white select-none drop-shadow-md">{card.shares}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState('discover');
  const [currentSlide] = useState(0);

  const maleConstraintsRef = useRef<HTMLDivElement>(null);
  const communityConstraintsRef = useRef<HTMLDivElement>(null);

  const tabs: TabItem[] = [
    { id: 'discover', label: 'Discover' },
    { id: 'create', label: 'Create' },
    { id: 'new', label: 'New' },
    { id: 'trending', label: 'Trending' },
  ];

  const showcaseCards: ShowcaseCardData[] = [
    { id: 1, imageSrc: '/model1.png', name: 'Male Model 1', likes: '58.9K', pro: true },
    { id: 2, imageSrc: '/model2.png', name: 'Male Model 2', likes: '58.9K', pro: true },
    { id: 3, imageSrc: '/model3.png', name: 'Male Model 3', likes: '58.9K', pro: true },
    { id: 4, imageSrc: '/model4.png', name: 'Male Model 4', likes: '58.9K', pro: true },
  ];

  const communityCards: CommunityCardData[] = [
    { id: 1, imageSrc: '/dog1.png', title: 'the camera slowly turns', likes: '58.9K', shares: '67K' },
    { id: 2, imageSrc: '/dog2.png', title: 'the camera slowly turns', likes: '58.9K', shares: '67K' },
    { id: 3, imageSrc: '/dog3.png', title: 'the camera slowly turns', likes: '58.9K', shares: '67K' },
    { id: 4, imageSrc: '/dog4.png', title: 'the camera slowly turns', likes: '58.9K', shares: '67K' },
  ];

  const navItems = [
    { id: 'home', iconSrc: '/homenavbar.svg' },
    { id: 'search', iconSrc: '/searchnavbar.svg' },
    { id: 'video', iconSrc: '/createnavbar.svg' },
    { id: 'gallery', iconSrc: '/inbox.svg' },
    { id: 'profile', iconSrc: '/profilenavbar.svg' },
  ];

  return (
    <main className="min-h-screen w-full bg-[#050505] flex items-center justify-center py-8 font-sans select-none overflow-hidden relative">
      {/* PREMIUM AMBIENT GLOWS - Breathing Animation */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 blur-[130px] rounded-full pointer-events-none"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"
      />

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[390px] h-[844px] bg-[#0c0c0c] rounded-[52px] shadow-[0_0_100px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.05)] overflow-hidden border-[11px] border-[#161616] flex flex-col ring-1 ring-white/10"
      >
        
        <div className="w-full h-12 flex-shrink-0 z-50"></div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-32 [&::-webkit-scrollbar]:hidden scroll-smooth stagger-children">
          
          <motion.header variants={headerVariants} className="px-6 pb-5 flex justify-between items-center">
            <motion.button 
              className="flex items-center justify-center p-2.5 -ml-3 rounded-full hover:bg-white/5 cursor-pointer transition-colors"
              whileTap={{ scale: 0.8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
            >
              <img src="/chevronleft.svg" alt="Back" draggable={false} className="w-[26px] h-[26px] object-contain drop-shadow-md" />
            </motion.button>
            
            <div className="flex items-center gap-3.5">
              <motion.button 
                className="flex items-center hover:brightness-125 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.2)] rounded-full"
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                whileHover={{ scale: 1.02 }}
              >
                <img src="/progold499.png" alt="499 PRO" draggable={false} className="h-[28px] w-auto object-contain drop-shadow-lg" />
              </motion.button>
              
              <motion.button 
                className="flex items-center justify-center w-[36px] h-[34px] rounded-full overflow-hidden bg-[#222] border border-white/20 shadow-[0_4px_10px_rgba(0,0,0,0.5)]"
                whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                whileHover={{ scale: 1.05 }}
              >
                <img src="/profilepic.svg" alt="Profile" draggable={false} className="w-full h-full object-cover" />
              </motion.button>
            </div>
          </motion.header>

          {/* iOS STYLE SEGMENTED CONTROL TABS (NO BLEED) */}
          <motion.div variants={headerVariants} className="px-6 mb-8 w-full z-20">
            <div className="relative flex w-full bg-[#1a1a1a]/60 backdrop-blur-xl p-1.5 rounded-full border border-white/5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)] ring-1 ring-white/5">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const isNew = tab.id === 'new';
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-1 py-2 flex items-center justify-center rounded-full transition-all active:scale-95 z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_2px_10px_rgba(255,255,255,0.2)]"
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                    <span 
                      className={`relative z-20 text-[8px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${isActive ? 'text-black' : 'text-white/40 hover:text-white/80'}`}
                    >
                      {tab.label}
                      {/* ABSOLUTE BADGE PARA HINDI TUMULAK */}
                      {isNew && (
                        <span className={`absolute -top-1.5 -right-3.5 flex items-center justify-center text-[6px] w-[13px] h-[13px] rounded-full font-black leading-none tracking-normal border transition-colors duration-300 ${isActive ? 'bg-[#ff3b30] text-white border-white/50 shadow-[0_2px_5px_rgba(255,51,51,0.6)]' : 'bg-[#cc2e2e] text-white/90 border-[#111] shadow-none'}`}>
                          67
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.2 } }} className="px-6 mb-10">
            <div className="relative w-full h-[255px] rounded-[36px] overflow-hidden bg-[#111] pointer-events-none shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 ring-1 ring-white/5">
              <img 
                src="/micromagic.png" 
                alt="Micro Magic Hero" 
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover scale-[1.05]"
              />
              <img 
                src="/purplepro.png" 
                alt="PRO" 
                draggable={false}
                className="absolute top-5 right-5 h-[26px] w-auto object-contain z-10 drop-shadow-2xl"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-7 pb-3 z-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <div className="flex justify-between items-end pointer-events-auto w-full">
                  <div className="flex flex-col">
                    <img 
                      src="/micromagictext.png" 
                      alt="Micro Magic" 
                      draggable={false}
                      className="h-[88px] w-auto object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.9)] -ml-6" 
                    />
                  </div>
                  <motion.button 
                    className="flex items-center cursor-pointer flex-shrink-0 ml-4 mb-4"
                    whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                    whileHover={{ scale: 1.05, filter: "brightness(1.15)" }}
                  >
                     <img src="/trynow.png" alt="Try Now!" draggable={false} className="h-[38px] w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            {/* Visual Pagination Dots directly below MicroMagic */}
            <div className="mt-6 flex justify-center items-center gap-2 z-20 relative">
              {[0, 1, 2].map((dotIndex) => (
                <motion.div
                  key={dotIndex}
                  variants={dotVariants}
                  animate={dotIndex === currentSlide ? "active" : "inactive"}
                  className="rounded-full shadow-inner"
                  style={{ width: dotIndex === currentSlide ? "6px" : "5px", height: dotIndex === currentSlide ? "6px" : "5px" }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={listVariants} className="mb-10" ref={maleConstraintsRef}>
            <motion.div variants={headerVariants} className="px-6 flex justify-between items-end mb-5">
              <h3 className="text-white/90 font-medium text-[11px] tracking-[0.25em] uppercase leading-none drop-shadow-md">
                AI Photoshoots Male
              </h3>
              <motion.button 
                className="text-white/30 flex items-center gap-1 cursor-pointer group"
                whileHover={{ scale: 1.05, color: "rgba(255, 255, 255, 0.9)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[10px] font-black tracking-widest pt-[1px] transition-colors group-hover:text-white/90 uppercase">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={maleConstraintsRef}
                className="flex gap-3.5 w-max cursor-grab active:cursor-grabbing pb-4 items-start px-6"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {showcaseCards.map((card) => (
                  <ShowcaseCardItem key={card.id} card={card} />
                ))}
                <div className="w-[20px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div variants={listVariants} className="mb-4" ref={communityConstraintsRef}>
            <motion.div variants={headerVariants} className="px-6 flex justify-between items-end mb-5">
              <h3 className="text-white/90 font-medium text-[11px] tracking-[0.25em] uppercase leading-none drop-shadow-md">
                Community
              </h3>
              <motion.button 
                className="text-white/30 flex items-center gap-1 cursor-pointer group"
                whileHover={{ scale: 1.05, color: "rgba(255, 255, 255, 0.9)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[10px] font-black tracking-widest pt-[1px] transition-colors group-hover:text-white/90 uppercase">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-50 group-hover:opacity-100 transition-opacity" />
              </motion.button>
            </motion.div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={communityConstraintsRef}
                className="flex gap-3.5 w-max cursor-grab active:cursor-grabbing pb-4 items-start px-6"
                variants={listVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
              >
                {communityCards.map((card) => (
                  <CommunityCardItem key={card.id} card={card} />
                ))}
                <div className="w-[20px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* PERFECTLY CENTERED ULTRA-PREMIUM NAV BAR */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[90%] z-50 pointer-events-none flex justify-center items-center">
          <motion.nav 
            initial={{ y: 60, opacity: 0 }} 
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 250, damping: 25, delay: 0.6 } }} 
            className="bg-[#16171b]/80 backdrop-blur-3xl border border-white/10 rounded-[36px] p-2.5 flex justify-between items-center shadow-[0_25px_50px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] pointer-events-auto ring-1 ring-white/5 relative w-full overflow-hidden"
          >
            {/* Top Gloss Highlight for Nav */}
            <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const isInbox = item.id === 'gallery';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="relative p-[14px] flex-1 flex justify-center items-center rounded-2xl z-10 cursor-pointer transition-transform active:scale-90"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-background"
                      className="absolute inset-0 bg-[#2d2e33] rounded-[20px] border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),0_10px_20px_rgba(0,0,0,0.3)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <motion.img 
                    whileHover={!isActive ? { scale: 1.1, opacity: 0.7 } : {}}
                    src={item.iconSrc} 
                    alt={item.id} 
                    className={`relative z-20 object-contain transition-all duration-500 
                      ${isInbox ? 'w-[32px] h-[32px]' : 'w-[26px] h-[26px]'}
                      ${isActive 
                        ? 'opacity-100 scale-110 filter brightness-150 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]' 
                        : 'opacity-40'}`} 
                  />
                </button>
              );
            })}
          </motion.nav>
        </div>
      </motion.section>
    </main>
  );
}