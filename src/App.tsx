import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

// --- Types ---
type TabItem = {
  id: string;
  label: string;
};

type CreatorData = {
  avatar: string;
  handle: string;
};

type ShowcaseCardData = {
  id: number;
  imageSrc: string;
  name: string;
  creator: CreatorData;
  likes: string;
  pro: boolean;
};

type CommunityCardData = {
  id: number;
  imageSrc: string;
  title: string;
  creator: CreatorData;
  likes: string;
  shares: string;
};

// --- Animations Variants ---
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
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 25 } },
};

const dotVariants = {
  active: { 
    scale: 1.4, 
    backgroundColor: "#ffffff", 
    boxShadow: "0px 0px 12px rgba(255,51,153,0.8)", 
    transition: { repeat: Infinity, repeatType: "reverse" as const, duration: 1.2, ease: "easeInOut" } 
  },
  inactive: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.3)", boxShadow: "none" },
};

// --- Subcomponents ---

const ShowcaseCardItem = ({ card }: { card: ShowcaseCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div 
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        scale: 1.03,
        zIndex: 50,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.8), inset 0px 1px 2px rgba(255,255,255,0.2)", 
        transition: { type: "spring", stiffness: 400, damping: 20 } 
      }}
      className="relative w-[125px] h-[175px] flex-shrink-0 snap-start rounded-[28px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/10 bg-[#161616]"
    >
      <img 
        src={card.imageSrc} 
        alt={card.name} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 hover:scale-[1.05]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      {card.pro && (
        <div className="absolute top-3 left-3 bg-[#ff3399]/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-[#ff3399]/40 z-10 flex items-center justify-center shadow-[0_4px_10px_rgba(255,51,153,0.4)]">
           <span className="text-white text-[7px] font-black font-poppins tracking-[0.15em] leading-none drop-shadow-md">PRO</span>
        </div>
      )}
      
      <motion.img 
        src="/save.svg" 
        alt="Save" 
        draggable={false} 
        className="absolute top-3 right-3 w-[16px] h-[16px] opacity-80 z-10 hover:opacity-100 transition-all drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" 
        whileHover={{ scale: 1.2, filter: "brightness(1.5)" }}
      />

      <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-2 z-10">
        <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] rounded-full overflow-hidden border-2 border-white/30 shadow-[0_2px_8px_rgba(0,0,0,0.6)] flex-shrink-0 bg-[#222]">
              <img src={card.creator.avatar} alt="avatar" draggable={false} className="w-full h-full object-cover" />
            </div>
            <span className="text-[9px] font-bold text-white/80 truncate flex-1 select-none drop-shadow-lg tracking-wide">
              {card.creator.handle}
            </span>
        </div>

        <div className="flex items-center justify-between gap-1 w-full">
            <span className="text-[10.5px] font-semibold text-white/95 truncate flex-1 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-tight leading-tight">
              {card.name}
            </span>
            
            <motion.button 
              onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
              className="flex items-center justify-end gap-[3px] cursor-pointer flex-shrink-0"
              whileTap={{ scale: 0.6, transition: { type: "spring", stiffness: 600, damping: 12 } }}
            >
              <motion.svg 
                animate={liked ? { scale: [1, 1.4, 1] } : {}} 
                xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={liked ? "#ff3333" : "none"} stroke={liked ? "#ff3333" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
              >
                <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
              </motion.svg>
              <span className="text-[9px] font-black text-white select-none drop-shadow-md">{card.likes}</span>
            </motion.button>
        </div>
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
        y: -10, 
        scale: 1.03,
        zIndex: 50,
        boxShadow: "0px 20px 40px rgba(0,0,0,0.8), inset 0px 1px 2px rgba(255,255,255,0.2)", 
        transition: { type: "spring", stiffness: 400, damping: 20 } 
      }}
      className="relative w-[125px] h-[175px] flex-shrink-0 snap-start rounded-[28px] overflow-hidden shadow-[0_10px_25px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/10 bg-[#161616]"
    >
      <img 
        src={card.imageSrc} 
        alt={card.title} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-[1.05]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      <motion.div 
        className="absolute top-3 left-3 bg-white/15 backdrop-blur-lg rounded-[14px] p-2 border border-white/20 shadow-[0_4px_15px_rgba(0,0,0,0.3)]"
        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.3)", scale: 1.1 }}
      >
        <img src="/playbutton.svg" alt="Play" draggable={false} className="w-[14px] h-[14px] opacity-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
      </motion.div>

      <div className="absolute bottom-3 left-3 right-3 flex flex-col justify-end gap-2.5 z-10">
        <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-white/95 leading-tight select-none line-clamp-1 drop-shadow-[0_2px_5px_rgba(0,0,0,0.9)] tracking-tight">
              {card.title}
            </span>
            <span className="text-[9px] font-bold text-white/70 truncate select-none drop-shadow-md tracking-wide">
              {card.creator.handle}
            </span>
        </div>
        
        <div className="flex items-center gap-3.5 w-full">
          <motion.button 
            onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
            className="flex items-center gap-1.5 cursor-pointer z-20"
            whileTap={{ scale: 0.6, transition: { type: "spring", stiffness: 600, damping: 12 } }}
          >
            <motion.svg 
              animate={liked ? { scale: [1, 1.4, 1] } : {}}
              xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill={liked ? "#ff3333" : "none"} stroke={liked ? "#ff3333" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
            >
              <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
            </motion.svg>
            <span className="text-[9px] font-black text-white select-none drop-shadow-md">{card.likes}</span>
          </motion.button>

          <div className="flex items-center gap-1.5 z-20">
            <motion.button 
              className="cursor-pointer opacity-90 hover:opacity-100"
              whileTap={{ scale: 0.7, transition: { type: "spring", stiffness: 500, damping: 10 } }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </motion.button>
            <span className="text-[9px] font-black text-white select-none drop-shadow-md">{card.shares}</span>
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

  // CHANGED: Handle is now @sean_visuals
  const creatorMale = { avatar: '/profilepic.svg', handle: '@sean_visuals' };
  const creatorCommunity = { avatar: '/avatarcommunity.png', handle: '@communityfeeds' };

  const showcaseCards: ShowcaseCardData[] = [
    { id: 1, imageSrc: '/model1.png', name: 'Male Model 1', creator: creatorMale, likes: '58.9K', pro: true },
    { id: 2, imageSrc: '/model2.png', name: 'Male Model 2', creator: creatorMale, likes: '58.9K', pro: true },
    { id: 3, imageSrc: '/model3.png', name: 'Male Model 3', creator: creatorMale, likes: '58.9K', pro: true },
    { id: 4, imageSrc: '/model4.png', name: 'Male Model 4', creator: creatorMale, likes: '58.9K', pro: true },
  ];

  const communityCards: CommunityCardData[] = [
    { id: 1, imageSrc: '/dog1.png', title: 'the camera slowly turns', creator: creatorCommunity, likes: '58.9K', shares: '67K' },
    { id: 2, imageSrc: '/dog2.png', title: 'the camera slowly turns', creator: creatorCommunity, likes: '58.9K', shares: '67K' },
    { id: 3, imageSrc: '/dog3.png', title: 'the camera slowly turns', creator: creatorCommunity, likes: '58.9K', shares: '67K' },
    { id: 4, imageSrc: '/dog4.png', title: 'the camera slowly turns', creator: creatorCommunity, likes: '58.9K', shares: '67K' },
  ];

  const navItems = [
    { id: 'home', iconSrc: '/homenavbar.svg' },
    { id: 'search', iconSrc: '/searchnavbar.svg' },
    { id: 'video', iconSrc: '/createnavbar.svg' },
    { id: 'gallery', iconSrc: '/inbox.svg' },
    { id: 'profile', iconSrc: '/profilenavbar.svg' },
  ];

  return (
    // FONT UPDATE: Default font changed to font-inter
    <main className="min-h-screen w-full bg-[#050505] flex items-center justify-center py-8 font-inter select-none overflow-hidden relative">
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#ff007f]/15 blur-[150px] rounded-full pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-0 w-[600px] h-[600px] bg-[#00e5ff]/10 blur-[130px] rounded-full pointer-events-none"
      />

      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-[400px] h-[860px] bg-[#080808] rounded-[60px] shadow-[0_0_150px_rgba(0,0,0,1),inset_0_2px_4px_rgba(255,255,255,0.05)] overflow-hidden border-[14px] border-[#111111] flex flex-col ring-1 ring-white/10"
      >
        <div className="w-full h-12 flex-shrink-0 z-50"></div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-36 [&::-webkit-scrollbar]:hidden scroll-smooth stagger-children">
          
          <motion.header variants={headerVariants} className="px-5 pb-5 flex justify-between items-center">
            <motion.button 
              className="flex items-center justify-center p-3 -ml-4 rounded-full hover:bg-white/10 cursor-pointer transition-colors"
              whileTap={{ scale: 0.8, transition: { type: "spring", stiffness: 500, damping: 10 } }}
            >
              <img src="/chevronleft.svg" alt="Back" draggable={false} className="w-[30px] h-[30px] object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]" />
            </motion.button>
            
            <div className="flex items-center gap-4">
              
              <motion.button 
                className="relative flex items-center justify-center overflow-hidden rounded-full shadow-[0_5px_20px_rgba(212,175,55,0.4)] cursor-pointer p-[1.5px]"
                whileTap={{ scale: 0.95, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                  className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_75%,#d4af37_100%)]"
                />
                <div className="absolute inset-[1.5px] bg-[#1a1a1a] rounded-full z-0" />
                <img src="/progold499.png" alt="499 PRO" draggable={false} className="relative z-10 h-[28px] w-auto object-contain drop-shadow-xl rounded-full" />
              </motion.button>
              
              <motion.button 
                className="flex items-center justify-center w-[40px] h-[40px] rounded-full overflow-hidden bg-[#222] border-2 border-white/20 shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
                whileTap={{ scale: 0.9, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                whileHover={{ scale: 1.08 }}
              >
                <img src="/profilepic.svg" alt="Profile" draggable={false} className="w-full h-full object-cover" />
              </motion.button>
            </div>
          </motion.header>

          <motion.div variants={headerVariants} className="px-5 mb-8 w-full z-20 relative">
            <div className="relative flex w-full bg-[#161616]/80 backdrop-blur-2xl p-2 rounded-full border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_2px_10px_rgba(0,0,0,0.5)] overflow-hidden">
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                const isNew = tab.id === 'new';
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="relative flex-1 py-3 flex items-center justify-center rounded-full transition-all active:scale-95 z-10"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-tab-indicator"
                        className="absolute inset-0 bg-white rounded-full shadow-[0_4px_15px_rgba(255,255,255,0.3)]"
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      />
                    )}
                    {/* FONT: Poppins for Tabs */}
                    <span 
                      className={`relative z-20 text-[9px] font-black font-poppins tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-black' : 'text-white/50 hover:text-white/90 drop-shadow-md'}`}
                    >
                      {tab.label}
                      {isNew && (
                        <span className={`absolute -top-2 -right-4 flex items-center justify-center text-[7.5px] w-[16px] h-[16px] rounded-full font-black leading-none tracking-normal border transition-colors duration-300 ${isActive ? 'bg-[#ff0055] text-white border-white/50 shadow-[0_4px_10px_rgba(255,0,85,0.8)]' : 'bg-[#d60047] text-white/90 border-[#111] shadow-none'}`}>
                          67
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 25, delay: 0.2 } }} className="px-5 mb-8">
            <div className="relative w-full h-[255px] rounded-[32px] overflow-hidden bg-[#111] pointer-events-none shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-white/10 ring-1 ring-white/5">
              <img 
                src="/micromagic.png" 
                alt="Micro Magic Hero" 
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover scale-[1.1]" 
              />
              <img 
                src="/purplepro.png" 
                alt="PRO" 
                draggable={false}
                className="absolute top-5 right-5 h-[26px] w-auto object-contain z-10 drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-7 pb-4 z-10 bg-gradient-to-t from-[#050505] via-black/30 to-transparent">
                <div className="flex justify-between items-end pointer-events-auto w-full">
                  <div className="flex flex-col">
                    <img 
                      src="/micromagictext.png" 
                      alt="Micro Magic" 
                      draggable={false}
                      className="h-[84px] w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.9)] -ml-5" 
                    />
                  </div>
                  <motion.button 
                    className="flex items-center cursor-pointer flex-shrink-0 ml-4 mb-4"
                    whileTap={{ scale: 0.85, transition: { type: "spring", stiffness: 450, damping: 10 } }}
                    whileHover={{ scale: 1.1, filter: "brightness(1.2)" }}
                  >
                     <img src="/trynow.png" alt="Try Now!" draggable={false} className="h-[38px] w-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]" />
                  </motion.button>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center items-center gap-3 z-20 relative">
              {[0, 1, 2].map((dotIndex) => (
                <motion.div
                  key={dotIndex}
                  variants={dotVariants}
                  animate={dotIndex === currentSlide ? "active" : "inactive"}
                  className="rounded-full shadow-inner"
                  style={{ width: dotIndex === currentSlide ? "8px" : "6px", height: dotIndex === currentSlide ? "8px" : "6px" }}
                />
              ))}
            </div>
          </motion.div>

          <motion.div variants={listVariants} className="mb-6" ref={maleConstraintsRef}>
            <motion.div variants={headerVariants} className="px-5 flex justify-between items-end mb-3">
              <h3 className="text-white/95 font-bold font-poppins text-[12.5px] tracking-[0.25em] uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"> 
                AI Photoshoots Male
              </h3>
              <motion.button 
                className="text-white/40 flex items-center gap-1.5 cursor-pointer group"
                whileHover={{ scale: 1.08, color: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[11px] font-black font-poppins tracking-widest pt-[1px] transition-colors group-hover:text-white uppercase drop-shadow-md">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-3 h-3 object-contain opacity-60 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
              </motion.button>
            </motion.div>
            
            <div className="w-full relative z-10">
              <motion.div 
                drag="x" 
                dragConstraints={maleConstraintsRef}
                className="flex gap-4 w-max cursor-grab active:cursor-grabbing pb-6 pt-4 items-start px-5"
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
            <motion.div variants={headerVariants} className="px-5 flex justify-between items-end mb-3">
              <h3 className="text-white/95 font-bold font-poppins text-[12.5px] tracking-[0.25em] uppercase leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Community
              </h3>
              <motion.button 
                className="text-white/40 flex items-center gap-1.5 cursor-pointer group"
                whileHover={{ scale: 1.08, color: "rgba(255, 255, 255, 1)" }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-[11px] font-black font-poppins tracking-widest pt-[1px] transition-colors group-hover:text-white uppercase drop-shadow-md">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-3 h-3 object-contain opacity-60 group-hover:opacity-100 transition-opacity drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
              </motion.button>
            </motion.div>
            
            <div className="w-full relative z-10">
              <motion.div 
                drag="x" 
                dragConstraints={communityConstraintsRef}
                className="flex gap-4 w-max cursor-grab active:cursor-grabbing pb-6 pt-4 items-start px-5"
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

        <div className="absolute bottom-9 left-1/2 -translate-x-1/2 w-[90%] z-50 pointer-events-none flex justify-center items-center">
          <motion.nav 
            initial={{ y: 70, opacity: 0 }} 
            animate={{ y: 0, opacity: 1, transition: { type: "spring", stiffness: 250, damping: 25, delay: 0.6 } }} 
            className="bg-[#111111]/85 backdrop-blur-3xl border border-white/10 rounded-[40px] p-3 flex justify-between items-center shadow-[0_30px_70px_rgba(0,0,0,0.95),inset_0_2px_4px_rgba(255,255,255,0.1)] pointer-events-auto ring-1 ring-white/10 relative w-full overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const isInbox = item.id === 'gallery';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="relative p-[16px] flex-1 flex justify-center items-center rounded-3xl z-10 cursor-pointer transition-transform active:scale-90"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-background"
                      className="absolute inset-0 bg-[#252525] rounded-[28px] border border-white/15 shadow-[inset_0_2px_15px_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.5)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <motion.img 
                    whileHover={!isActive ? { scale: 1.2, filter: "brightness(1.5)" } : {}}
                    src={item.iconSrc} 
                    alt={item.id} 
                    className={`relative z-20 object-contain transition-all duration-500 
                      ${isInbox ? 'w-[36px] h-[36px]' : 'w-[28px] h-[28px]'}
                      ${isActive 
                        ? 'opacity-100 scale-125 filter brightness-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]' 
                        : 'opacity-50 drop-shadow-md'}`} 
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