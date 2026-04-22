import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/Supabase";

export default function AuthCallback() {
    const navigate = useNavigate();
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => (prev.length >= 3 ? "" : prev + "."));
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                navigate("/");
            } else {
                navigate("/login");
            }
        });
    }, []);

    return (
        <div className="flex flex-col items-center gap-6 text-center">
            {/* Spinner */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-2 border-light-dividers" />
                <div className="absolute inset-0 rounded-full border-2 border-t-light-primaryCTA border-r-light-primaryCTA/50 border-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-light-primaryCTA animate-pulse" />
                </div>
            </div>

            {/* Text */}
            <div>
                <p className="text-light-text text-sm font-semibold tracking-widest uppercase">
                    Verifying your email{dots}
                </p>
                <p className="text-light-text/40 text-xs mt-1">
                    You'll be redirected shortly.
                </p>
            </div>
        </div>
    );
}
