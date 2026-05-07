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

// --- Subcomponents ---

const ShowcaseCardItem = ({ card }: { card: ShowcaseCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[18px] overflow-hidden shadow-lg border border-white/5">
      <img 
        src={card.imageSrc} 
        alt={card.name} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top scale-[1.5]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      {card.pro && (
        <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-1.5 py-0 rounded-full border border-white/10 z-10 flex items-center justify-center">
           <span className="text-white text-[7px] font-bold tracking-[0.1em] leading-none">PRO</span>
        </div>
      )}
      
      <img 
        src="/save.svg" 
        alt="Save" 
        draggable={false} 
        className="absolute top-2 right-2 w-[12px] h-[12px] opacity-80 z-10" 
      />

      <div className="absolute bottom-2 left-2 right-2 flex items-center gap-1.5 z-10">
        <div className="w-[16px] h-[16px] rounded-full overflow-hidden border border-white/30 bg-[#333] flex-shrink-0">
          <img src="/profilepic.svg" alt="avatar" draggable={false} className="w-full h-full object-cover" />
        </div>

        <span className="text-[9px] font-medium text-white truncate flex-1 select-none drop-shadow-sm">
          {card.name}
        </span>
        
        <button 
          onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
          className="flex items-center justify-end gap-[2px] group active:scale-90 transition-transform cursor-pointer flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill={liked ? "#ff4545" : "none"} stroke={liked ? "#ff4545" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-md">
            <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
          </svg>
          <span className="text-[8px] font-bold text-white select-none">{card.likes}</span>
        </button>
      </div>
    </div>
  );
};

const CommunityCardItem = ({ card }: { card: CommunityCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[18px] overflow-hidden shadow-lg border border-white/5">
      <img 
        src={card.imageSrc} 
        alt={card.title} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.5]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none"></div>
      
      <img 
        src="/playbutton.svg" 
        alt="Play" 
        draggable={false} 
        className="absolute top-2 left-2 w-[16px] h-[16px] opacity-90 z-10" 
      />

      <div className="absolute bottom-2.5 left-2 right-2 flex flex-col justify-end gap-1 z-10">
        <span className="text-[9px] font-bold text-white leading-tight select-none line-clamp-1 drop-shadow-md">
          {card.title}
        </span>
        
        <div className="flex items-center gap-2.5 w-full">
          <button 
            onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
            className="flex items-center gap-0.5 group active:scale-90 transition-transform cursor-pointer z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill={liked ? "#ff4545" : "none"} stroke={liked ? "#ff4545" : "#fff"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
            </svg>
            <span className="text-[8px] font-bold text-white select-none">{card.likes}</span>
          </button>

          <div className="flex items-center gap-0.5 z-20">
            <button className="active:scale-90 transition-transform cursor-pointer opacity-90 hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <span className="text-[8px] font-bold text-white select-none">{card.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState('discover');
  
  const maleConstraintsRef = useRef(null);
  const communityConstraintsRef = useRef(null);

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
    <main className="min-h-screen w-full bg-[#1e1e1e] flex items-center justify-center py-8 font-sans select-none overflow-hidden">
      
      <section className="relative w-full max-w-[390px] h-[844px] bg-[#111111] rounded-[40px] shadow-2xl overflow-hidden border-[8px] border-[#222] flex flex-col">
        
        <div className="w-full h-12 flex-shrink-0"></div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-28 [&::-webkit-scrollbar]:hidden scroll-smooth">
          
          <header className="px-5 pb-5 flex justify-between items-center">
            <button className="flex items-center justify-center p-1 -ml-1 hover:opacity-70 active:scale-90 transition-all cursor-pointer">
              <img src="/chevronleft.svg" alt="Back" draggable={false} className="w-[28px] h-[28px] object-contain" />
            </button>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center active:scale-95 transition-transform hover:brightness-110 cursor-pointer">
                <img src="/progold499.png" alt="499 PRO" draggable={false} className="h-[28px] w-auto object-contain" />
              </button>
              
              <button className="flex items-center justify-center w-[32px] h-[32px] rounded-full overflow-hidden bg-[#222] active:scale-95 transition-transform border border-white/10 shadow-sm">
                <img src="/profilepic.svg" alt="Profile" draggable={false} className="w-full h-full object-cover" />
              </button>
            </div>
          </header>

          <div className="px-5 mb-6 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isNew = tab.id === 'new';
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center px-3 py-1.5 rounded-full text-[9px] tracking-[0.1em] uppercase font-bold transition-all duration-300 active:scale-95 snap-start
                    ${isActive 
                      ? 'bg-white text-black shadow-md border border-white' 
                      : 'bg-[#1e1f24]/80 text-[#555] border border-white/5'
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    {tab.label}
                    {isNew && (
                      <span className="bg-[#ff3b30] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black animate-pulse shadow-sm">
                        67
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-5 mb-8">
            <div className="relative w-full h-[255px] rounded-[26px] overflow-hidden bg-[#222] pointer-events-none shadow-md">
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
                className="absolute top-4 right-4 h-[24px] w-auto object-contain z-10 shadow-lg"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-5 pb-1 z-10">
                <div className="flex justify-between items-end pointer-events-auto w-full">
                  <div className="flex flex-col">
                    <img 
                      src="/micromagictext.png" 
                      alt="Micro Magic" 
                      draggable={false}
                      className="h-[83px] w-auto object-contain drop-shadow-lg -ml-5" 
                    />
                  </div>
                  <button className="flex items-center active:scale-95 transition-transform hover:brightness-110 cursor-pointer flex-shrink-0 ml-4 mb-4">
                     <img src="/trynow.png" alt="Try Now!" draggable={false} className="h-[36px] w-auto object-contain" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center items-center">
              <img src="/circles.png" alt="Pagination" draggable={false} className="h-[6px] w-auto object-contain opacity-90" />
            </div>
          </div>

          {/* MINIMALIST HEADERS: AI Photoshoots Male */}
          <div className="mb-8" ref={maleConstraintsRef}>
            <div className="px-5 flex justify-between items-center mb-3">
              <h3 className="text-white font-medium text-[13px] tracking-[0.1em] uppercase opacity-90">
                AI Photoshoots Male
              </h3>
              <button className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-all active:scale-95 cursor-pointer group">
                <span className="text-[11px] font-bold tracking-wide pt-[1px]">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-40 group-hover:opacity-70" />
              </button>
            </div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={maleConstraintsRef}
                className="flex gap-[7px] w-max cursor-grab active:cursor-grabbing pb-1 items-start px-5"
              >
                {showcaseCards.map((card) => (
                  <ShowcaseCardItem key={card.id} card={card} />
                ))}
                <div className="w-[13px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </div>

          {/* MINIMALIST HEADERS: Community */}
          <div className="mb-4" ref={communityConstraintsRef}>
            <div className="px-5 flex justify-between items-center mb-3">
              <h3 className="text-white font-medium text-[13px] tracking-[0.1em] uppercase opacity-90">
                Community
              </h3>
              <button className="flex items-center gap-1 text-white/40 hover:text-white/70 transition-all active:scale-95 cursor-pointer group">
                <span className="text-[11px] font-bold tracking-wide pt-[1px]">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-40 group-hover:opacity-70" />
              </button>
            </div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={communityConstraintsRef}
                className="flex gap-[7px] w-max cursor-grab active:cursor-grabbing pb-2 items-start px-5"
              >
                {communityCards.map((card) => (
                  <CommunityCardItem key={card.id} card={card} />
                ))}
                <div className="w-[13px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] z-50 pointer-events-auto">
          <nav className="bg-[#1a1b1f]/80 backdrop-blur-xl border border-white/10 rounded-[30px] p-2 flex justify-between items-center shadow-[0_15px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const isInbox = item.id === 'gallery';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="relative p-[13px] flex-1 flex justify-center items-center rounded-[20px] z-10 group transition-colors cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-background"
                      className="absolute inset-0 bg-[#2d2e33] rounded-[22px] border border-white/5"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <img 
                    src={item.iconSrc} 
                    alt={item.id} 
                    className={`relative z-20 object-contain transition-all duration-300 
                      ${isInbox ? 'w-[30px] h-[30px]' : 'w-[26px] h-[26px]'}
                      ${isActive ? 'opacity-100 scale-110 filter brightness-150 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]' : 'opacity-40'}`} 
                  />
                </button>
              );
            })}
          </nav>
        </div>
        
      </section>
    </main>
  );
}