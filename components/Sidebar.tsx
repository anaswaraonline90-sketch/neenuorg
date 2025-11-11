import React from 'react';
import { AppMode } from '../types';
import { MessageSquare, Image, Star, BookLock, Mic, ArrowUpCircle, X } from 'lucide-react';

interface SidebarProps {
    currentMode: AppMode;
    setMode: (mode: AppMode) => void;
    isPro: boolean;
    userName: string;
    personalityName: string;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: AppMode; currentMode: AppMode; setMode: (mode: AppMode) => void; isPro: boolean; closeSidebar: () => void; }> = ({ icon, label, currentMode, setMode, isPro, closeSidebar }) => {
    const isActive = currentMode === label;
    
    const proClass = 'text-gray-300 hover:bg-[rgba(var(--pro-accent),0.2)]';
    const baseClass = 'text-gray-300 hover:bg-[rgba(var(--base-accent),0.2)]';
    const activeProClass = 'bg-[rgba(var(--pro-accent),0.3)] text-white shadow-lg';
    const activeBaseClass = 'bg-[rgba(var(--base-accent),0.3)] text-white shadow-lg';
    
    const colors = isPro ? { base: proClass, active: activeProClass } : { base: baseClass, active: activeBaseClass };

    const handleClick = () => {
        setMode(label);
        closeSidebar();
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center w-full px-4 py-3 my-1 rounded-lg transition-all duration-200 ${isActive ? colors.active : colors.base} interactive-glow`}
        >
            {icon}
            <span className="ml-4 font-semibold">{label}</span>
        </button>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ currentMode, setMode, isPro, userName, personalityName, isOpen, setIsOpen }) => {
    const profileInitial = userName ? userName.charAt(0).toUpperCase() : personalityName.charAt(0).toUpperCase();

    const closeSidebar = () => {
      // Only close if on mobile view; on desktop, it's always open.
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    }

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black/60 z-30 md:hidden" onClick={() => setIsOpen(false)}></div>}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 p-4 flex flex-col glassmorphic rounded-r-2xl md:rounded-2xl md:relative md:inset-auto md:transform-none transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                 <button className="md:hidden absolute top-4 right-4 text-gray-400 hover:text-white" onClick={() => setIsOpen(false)} aria-label="Close menu">
                    <X />
                </button>
                <div className="flex items-center mb-8">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white ${isPro ? 'bg-[rgb(var(--pro-accent))]' : 'bg-[rgb(var(--base-accent))]'}`}>
                        {profileInitial}
                    </div>
                    <div className="ml-3">
                        <h1 className="text-xl font-bold text-white">{personalityName}</h1>
                        {userName && <p className="text-sm text-gray-400">for {userName}</p>}
                    </div>
                </div>

                <nav className="flex-1">
                    <NavItem icon={<MessageSquare />} label={AppMode.CHAT} currentMode={currentMode} setMode={setMode} isPro={isPro} closeSidebar={closeSidebar} />
                    <NavItem icon={<Image />} label={AppMode.IMAGE_GEN} currentMode={currentMode} setMode={setMode} isPro={isPro} closeSidebar={closeSidebar} />
                    <NavItem icon={<Star />} label={AppMode.ASTRO_GUIDE} currentMode={currentMode} setMode={setMode} isPro={isPro} closeSidebar={closeSidebar} />
                    <NavItem icon={<BookLock />} label={AppMode.AI_DIARY} currentMode={currentMode} setMode={setMode} isPro={isPro} closeSidebar={closeSidebar} />
                    <NavItem icon={<Mic />} label={AppMode.LIVE} currentMode={currentMode} setMode={setMode} isPro={isPro} closeSidebar={closeSidebar} />
                </nav>

                <div className="mt-auto">
                    {isPro && (
                         <div className="w-full flex items-center justify-center px-4 py-3 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-500 text-white font-bold shadow-lg">
                           <ArrowUpCircle className="mr-2 animate-pulse"/>
                            Mega Pro Activated
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
};

export default Sidebar;