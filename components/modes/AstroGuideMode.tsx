import React, { useState } from 'react';
import { getAstroPrediction } from '../../services/geminiService';
import { Star, Sparkles, Loader2 } from 'lucide-react';

interface AstroGuideModeProps {
    onInteraction: () => void;
    isPro: boolean;
}

const AstroGuideMode: React.FC<AstroGuideModeProps> = ({ onInteraction, isPro }) => {
    const [userInfo, setUserInfo] = useState('');
    const [prediction, setPrediction] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handlePrediction = async () => {
        if (!userInfo.trim()) {
            setError('Please tell me your zodiac sign or date of birth.');
            return;
        }
        setIsLoading(true);
        setError('');
        setPrediction('');
        onInteraction();

        const result = await getAstroPrediction(userInfo);
        setPrediction(result);
        setIsLoading(false);
    };

    const ringColor = isPro ? 'border-purple-500/50' : 'border-blue-500/50';
    
    return (
        <div className="relative flex flex-col h-full w-full p-4 md:p-6 animate-subtle-fade-in-up overflow-hidden">
            <div className={`galaxy-bg ${isPro ? 'is-pro-astro' : ''}`}></div>
            <div className="relative z-10 flex flex-col h-full">
                <div className="flex items-center mb-6 self-center text-center flex-col">
                    <Star className={`w-12 h-12 mb-3 ${isPro ? 'text-[rgb(var(--pro-accent))]' : 'text-[rgb(var(--base-accent))]'}`} />
                    <h2 className="mode-title">Cosmic Oracle</h2>
                </div>
                <p className="text-gray-300 mb-8 text-center max-w-2xl mx-auto">Peer into the cosmic currents. Share your zodiac sign or date of birth to unveil what the stars have in store for you.</p>

                <div className="w-full max-w-lg mx-auto">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <input
                            type="text"
                            value={userInfo}
                            onChange={(e) => setUserInfo(e.target.value)}
                            placeholder="e.g., 'Aries' or 'March 21, 1995'"
                            className={`w-full flex-grow glassmorphic !bg-black/20 border-2 border-transparent rounded-full py-3 px-6 text-white placeholder-gray-400 focus:outline-none transition-all duration-300 interactive-glow ${ringColor}`}
                        />
                        <button
                            onClick={handlePrediction}
                            disabled={isLoading}
                            className={`w-full sm:w-auto flex items-center justify-center p-4 rounded-full text-white transition-all duration-300 disabled:opacity-50 ${isPro ? 'bg-[rgb(var(--pro-accent))] hover:bg-[rgba(var(--pro-accent),0.8)]' : 'bg-[rgb(var(--base-accent))] hover:bg-[rgba(var(--base-accent),0.8)]'} interactive-glow`}
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : <Sparkles />}
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-center mt-4">{error}</p>}
                </div>

                <div className="flex-1 mt-8 flex items-center justify-center">
                    {isLoading && <Loader2 className={`w-16 h-16 ${isPro ? 'text-[rgb(var(--pro-accent))]' : 'text-[rgb(var(--base-accent))]'} animate-spin`} />}
                    {prediction && (
                        <div className={`p-6 md:p-8 border-2 border-dashed border-white/20 rounded-xl glassmorphic !bg-black/30 animate-subtle-fade-in max-w-3xl interactive-glow`}>
                            <p className="text-lg leading-relaxed text-center font-medium">{prediction}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AstroGuideMode;