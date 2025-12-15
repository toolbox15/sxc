import { useState, useEffect } from 'react';
import { WifiOff } from 'lucide-react';

// 1. IMPORT ALL YOUR THEME COMPONENTS
import FinalMenu from './FinalMenu'; // Your original "Game Day"
import MikesBar from './MikesBar';
import BearsTheme from './BearsTheme';
import BistroTheme from './BistroTheme';
import ChristmasTheme from './ChristmasTheme';
import CinematicTheme from './CinematicTheme';
import NeonGameDayTheme from './NeonGameDayTheme';
import SpaceMenu from './SpaceMenu';
import TireShopTheme from './TireShopTheme';
import SuspendedTheme from './SuspendedTheme';
import SlideshowTheme from './SlideshowTheme';
import LiveStreamTheme from './LiveStreamTheme';
import BroadcastTheme from './BroadcastTheme';
import StaticGameDayTheme from './StaticGameDayTheme';
import AIControl from './AIControl';
import SlotMachine from './SlotMachine';

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL;
const queryParams = new URLSearchParams(window.location.search);
const deviceId = queryParams.get('id') || "Lobby_Screen_1";

export default function AdDisplay() {
    const [ads, setAds] = useState<any[]>([]);
    const [theme, setTheme] = useState("Corporate");
    const [isLoading, setIsLoading] = useState(true);
    const [isOffline, setIsOffline] = useState(false);

    // --- 1. UPDATED TRAFFIC COP LOGIC ---
    useEffect(() => {
        const lowerId = deviceId.toLowerCase();
        let selectedTheme = "FinalMenu"; // Changed default

        // Map device IDs to your specific themes
        if (lowerId.includes("bears")) selectedTheme = "Bears";
        else if (lowerId.includes("mikes") || lowerId.includes("pub")) selectedTheme = "MikesBar";
        else if (lowerId.includes("bistro") || lowerId.includes("cafe")) selectedTheme = "Bistro";
        else if (lowerId.includes("christmas") || lowerId.includes("holiday") || lowerId.includes("joespizza")) selectedTheme = "Christmas";
        else if (lowerId.includes("cinematic") || lowerId.includes("theater")) selectedTheme = "Cinematic";
        else if (lowerId.includes("neon")) selectedTheme = "Neon";
        else if (lowerId.includes("space")) selectedTheme = "Space";
        else if (lowerId.includes("tire") || lowerId.includes("shop")) selectedTheme = "TireShop";
        else if (lowerId.includes("live") || lowerId.includes("broadcast")) selectedTheme = "Broadcast";
        else if (lowerId.includes("tv") || lowerId.includes("slide")) selectedTheme = "Slideshow";
        else if (lowerId.includes("static")) selectedTheme = "Static";
        else if (lowerId.includes("ai")) selectedTheme = "AI";
        else if (lowerId.includes("slot")) selectedTheme = "Slot";
        // "FinalMenu" is now the catch-all default

        setTheme(selectedTheme);

        // --- 2. ORIGINAL DATA FETCHER (BUNKER MODE) ---
        const fetchData = async () => {
            try {
                if (!API_URL) throw new Error("No API URL");
                
                const tabName = selectedTheme === "Slideshow" ? "Playlist" : "Ads";
                const res = await fetch(`${API_URL}?tab=${tabName}`);
                if (!res.ok) throw new Error("Network response was not ok");
                const data = await res.json();

                const relevantData = data.filter((item: any) => {
                     const target = item.Target_Screen || item.Client_ID;
                     if (!target) return false;
                     return target === 'All' || target === deviceId;
                });

                localStorage.setItem(`backup_${deviceId}`, JSON.stringify(relevantData));
                setAds(relevantData);
                setIsLoading(false);
                setIsOffline(false);

            } catch (error) {
                console.warn("Internet Down! Switching to Bunker Mode.");
                setIsOffline(true);
                
                const backup = localStorage.getItem(`backup_${deviceId}`);
                if (backup) {
                    setAds(JSON.parse(backup));
                    setIsLoading(false);
                }
            }
        };
        
        fetchData();
        const dataInterval = setInterval(fetchData, 30000);

        return () => {
            clearInterval(dataInterval);
        };

    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen bg-black text-white">Loading System...</div>;
    }

    // --- UPDATED RENDER LOGIC ---
    return (
        <>
            {isOffline && (
                <WifiOff className="fixed top-2 right-2 z-50 h-8 w-8 text-red-500 animate-pulse" />
            )}

            {/* 1. KILL SWITCH CHECK */}
            const isLocked = ads.some((ad: any) => ad.Category === 'LOCKED' && ad.Status === 'Active');
            if (isLocked) return <SuspendedTheme ads={ads} />;

            {/* 2. UPDATED THEME ROUTER */}
            switch (theme) {
                case 'Bears':
                    return <BearsTheme ads={ads} />;
                case 'MikesBar':
                    return <MikesBar ads={ads} />;
                case 'Bistro':
                    return <BistroTheme ads={ads} />;
                case 'Christmas':
                    return <ChristmasTheme ads={ads} />;
                case 'Cinematic':
                    return <CinematicTheme ads={ads} />;
                case 'Neon':
                    return <NeonGameDayTheme ads={ads} />;
                case 'Space':
                    return <SpaceMenu ads={ads} />;
                case 'TireShop':
                    return <TireShopTheme ads={ads} />;
                case 'Broadcast':
                    return <BroadcastTheme ads={ads} />;
                case 'Slideshow':
                    return <SlideshowTheme ads={ads} />;
                case 'LiveStream':
                    return <LiveStreamTheme ads={ads} />;
                case 'Static':
                    return <StaticGameDayTheme ads={ads} />;
                case 'AI':
                    return <AIControl ads={ads} />;
                case 'Slot':
                    return <SlotMachine ads={ads} />;
                case 'FinalMenu':
                default:
                    return <FinalMenu ads={ads} />;
            }
        </>
    );
}
