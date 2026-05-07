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
    <div className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[20px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-white/5 bg-[#1a1a1a]">
      <img 
        src={card.imageSrc} 
        alt={card.name} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-top scale-[1.5] transition-transform duration-500 hover:scale-[1.55]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
      
      {card.pro && (
        <div className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10 z-10 flex items-center justify-center">
           <span className="text-white text-[7px] font-black tracking-[0.1em] leading-none">PRO</span>
        </div>
      )}
      
      <img 
        src="/save.svg" 
        alt="Save" 
        draggable={false} 
        className="absolute top-2.5 right-2.5 w-[13px] h-[13px] opacity-70 z-10 hover:opacity-100 transition-opacity" 
      />

      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center gap-2 z-10">
        <div className="w-[18px] h-[18px] rounded-full overflow-hidden border border-white/20 shadow-sm flex-shrink-0 bg-[#222]">
          <img src="/profilepic.svg" alt="avatar" draggable={false} className="w-full h-full object-cover" />
        </div>

        <span className="text-[9.5px] font-semibold text-white/90 truncate flex-1 select-none drop-shadow-md tracking-tight">
          {card.name}
        </span>
        
        <button 
          onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
          className="flex items-center justify-end gap-[2px] active:scale-75 transition-all cursor-pointer flex-shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10.5" height="10.5" viewBox="0 0 24 24" fill={liked ? "#ff4545" : "none"} stroke={liked ? "#ff4545" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
          </svg>
          <span className="text-[8.5px] font-bold text-white select-none">{card.likes}</span>
        </button>
      </div>
    </div>
  );
};

const CommunityCardItem = ({ card }: { card: CommunityCardData }) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="relative w-[112px] h-[160px] flex-shrink-0 snap-start rounded-[20px] overflow-hidden shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-white/5 bg-[#1a1a1a]">
      <img 
        src={card.imageSrc} 
        alt={card.title} 
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover object-center scale-[1.5] transition-transform duration-500 hover:scale-[1.55]" 
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none"></div>
      
      <div className="absolute top-2.5 left-2.5 bg-white/10 backdrop-blur-md rounded-lg p-1.5 border border-white/5">
        <img src="/playbutton.svg" alt="Play" draggable={false} className="w-[14px] h-[14px] opacity-100" />
      </div>

      <div className="absolute bottom-3 left-2.5 right-2.5 flex flex-col justify-end gap-1.5 z-10">
        <span className="text-[9.5px] font-bold text-white/95 leading-tight select-none line-clamp-1 drop-shadow-lg tracking-tight">
          {card.title}
        </span>
        
        <div className="flex items-center gap-3 w-full">
          <button 
            onPointerDown={(e) => { e.stopPropagation(); setLiked(!liked); }} 
            className="flex items-center gap-1 active:scale-75 transition-all cursor-pointer z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill={liked ? "#ff4545" : "none"} stroke={liked ? "#ff4545" : "#fff"} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
              <path d="M19.5 12.572l-7.5 7.428-7.5-7.428a5 5 0 1 1 7.5-6.566a5 5 0 1 1 7.5 6.572"/>
            </svg>
            <span className="text-[8.5px] font-bold text-white select-none">{card.likes}</span>
          </button>

          <div className="flex items-center gap-1 z-20">
            <button className="active:scale-75 transition-all cursor-pointer opacity-90">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-lg">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
            </button>
            <span className="text-[8.5px] font-bold text-white select-none">{card.shares}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeNav, setActiveNav] = useState('home');
  const [activeTab, setActiveTab] = useState('discover');
  
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
    <main className="min-h-screen w-full bg-[#0a0a0a] flex items-center justify-center py-8 font-sans select-none overflow-hidden relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <section className="relative w-full max-w-[390px] h-[844px] bg-[#111111] rounded-[48px] shadow-[0_0_80px_rgba(0,0,0,0.8)] overflow-hidden border-[10px] border-[#1a1a1a] flex flex-col ring-1 ring-white/5">
        
        <div className="w-full h-12 flex-shrink-0"></div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-32 [&::-webkit-scrollbar]:hidden scroll-smooth">
          
          <header className="px-5 pb-6 flex justify-between items-center">
            <button className="flex items-center justify-center p-2 -ml-2 hover:bg-white/5 rounded-full active:scale-90 transition-all cursor-pointer">
              <img src="/chevronleft.svg" alt="Back" draggable={false} className="w-[28px] h-[28px] object-contain" />
            </button>
            
            <div className="flex items-center gap-3">
              <button className="flex items-center active:scale-95 transition-all hover:brightness-125 cursor-pointer shadow-lg">
                <img src="/progold499.png" alt="499 PRO" draggable={false} className="h-[28px] w-auto object-contain" />
              </button>
              
              <button className="flex items-center justify-center w-[34px] h-[32px] rounded-full overflow-hidden bg-[#222] active:scale-95 transition-all border border-white/20 shadow-md">
                <img src="/profilepic.svg" alt="Profile" draggable={false} className="w-full h-full object-cover" />
              </button>
            </div>
          </header>

          {/* TABS: Red Badge is now INSIDE the flex label for perfect alignment */}
          <div className="px-5 mb-7 flex gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden snap-x items-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              const isNew = tab.id === 'new';
              return (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center justify-center px-3.5 py-1.5 rounded-full text-[8.5px] tracking-[0.2em] uppercase font-medium transition-all duration-300 active:scale-90 snap-start
                    ${isActive 
                      ? 'bg-white text-black shadow-lg border border-white' 
                      : 'bg-[#1e1f24]/50 backdrop-blur-sm text-white/30 border border-white/5'
                    }`}
                >
                  <span className="flex items-center gap-1.5 leading-none">
                    {tab.label}
                    {isNew && (
                      <span className="bg-[#ff3b30] text-white text-[7.5px] w-[14.5px] h-[14.5px] rounded-full flex items-center justify-center font-bold shadow-sm leading-[0] pb-[0.5px] tracking-normal">
                        67
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-5 mb-10">
            <div className="relative w-full h-[255px] rounded-[32px] overflow-hidden bg-[#1a1a1a] pointer-events-none shadow-2xl border border-white/5">
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
                className="absolute top-4 right-4 h-[24px] w-auto object-contain z-10 drop-shadow-xl"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-6 pb-2 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                <div className="flex justify-between items-end pointer-events-auto w-full">
                  <div className="flex flex-col">
                    <img 
                      src="/micromagictext.png" 
                      alt="Micro Magic" 
                      draggable={false}
                      className="h-[84px] w-auto object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] -ml-5" 
                    />
                  </div>
                  <button className="flex items-center active:scale-90 transition-all hover:brightness-110 cursor-pointer flex-shrink-0 ml-4 mb-4">
                     <img src="/trynow.png" alt="Try Now!" draggable={false} className="h-[36px] w-auto object-contain drop-shadow-2xl" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-5 flex justify-center items-center gap-1.5">
              <div className="h-[5px] w-[5px] rounded-full bg-white opacity-100"></div>
              <div className="h-[4px] w-[4px] rounded-full bg-white/30"></div>
              <div className="h-[4px] w-[4px] rounded-full bg-white/30"></div>
            </div>
          </div>

          <div className="mb-9" ref={maleConstraintsRef}>
            <div className="px-5 flex justify-between items-end mb-4">
              <h3 className="text-white/90 font-semibold text-[12px] tracking-[0.15em] uppercase leading-none">
                AI Photoshoots Male
              </h3>
              <button className="text-white/30 hover:text-white/80 flex items-center gap-1 transition-all active:scale-90 cursor-pointer group">
                <span className="text-[11px] font-bold tracking-wide">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-30 group-hover:opacity-80 transition-opacity" />
              </button>
            </div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={maleConstraintsRef}
                className="flex gap-3 w-max cursor-grab active:cursor-grabbing pb-2 items-start px-5"
              >
                {showcaseCards.map((card) => (
                  <ShowcaseCardItem key={card.id} card={card} />
                ))}
                <div className="w-[15px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </div>

          <div className="mb-4" ref={communityConstraintsRef}>
            <div className="px-5 flex justify-between items-end mb-4">
              <h3 className="text-white/90 font-semibold text-[12px] tracking-[0.15em] uppercase leading-none">
                Community
              </h3>
              <button className="text-white/30 hover:text-white/80 flex items-center gap-1 transition-all active:scale-90 cursor-pointer group">
                <span className="text-[11px] font-bold tracking-wide">See all</span>
                <img src="/chevronright.svg" alt="" draggable={false} className="w-2.5 h-2.5 object-contain opacity-30 group-hover:opacity-80 transition-opacity" />
              </button>
            </div>
            
            <div className="overflow-hidden w-full">
              <motion.div 
                drag="x" 
                dragConstraints={communityConstraintsRef}
                className="flex gap-3 w-max cursor-grab active:cursor-grabbing pb-2 items-start px-5"
              >
                {communityCards.map((card) => (
                  <CommunityCardItem key={card.id} card={card} />
                ))}
                <div className="w-[15px] flex-shrink-0 h-1"></div>
              </motion.div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 -translate-x-1/2 w-[92%] z-50 pointer-events-auto">
          <nav className="bg-[#1a1b1f]/85 backdrop-blur-3xl border border-white/10 rounded-[32px] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.8)] pointer-events-auto ring-1 ring-white/5">
            {navItems.map((item) => {
              const isActive = activeNav === item.id;
              const isInbox = item.id === 'gallery';
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className="relative p-[13px] flex-1 flex justify-center items-center rounded-2xl z-10 transition-all active:scale-75 cursor-pointer"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-background"
                      className="absolute inset-0 bg-[#2d2e33] rounded-2xl border border-white/10 shadow-[inset_0_1px_8px_rgba(255,255,255,0.05)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 30 }}
                    />
                  )}
                  <img 
                    src={item.iconSrc} 
                    alt={item.id} 
                    className={`relative z-20 object-contain transition-all duration-500 
                      ${isInbox ? 'w-[30px] h-[30px]' : 'w-[26px] h-[26px]'}
                      ${isActive 
                        ? 'opacity-100 scale-110 filter brightness-150 drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]' 
                        : 'opacity-30 hover:opacity-50'}`} 
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