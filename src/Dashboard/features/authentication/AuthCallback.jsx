/*import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../services/Supabase";

export default function AuthCallback() {
    const navigate = useNavigate();

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_IN" && session) {
                navigate("/");
            } else {
                navigate("/login");
            }
        });
    }, []);

    return <p>Verifying your email...</p>;
}
*/
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
        <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
            {/* Glow background */}
            <div className="absolute w-[400px] h-[400px] rounded-full bg-emerald-500/10 blur-[120px] pointer-events-none" />

            <div className="relative flex flex-col items-center gap-6">
                {/* Spinner ring */}
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-white/5" />
                    <div className="absolute inset-0 rounded-full border-2 border-t-emerald-400 border-r-emerald-400/50 border-transparent animate-spin" />
                    {/* Inner dot */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    </div>
                </div>

                {/* Text */}
                <div className="text-center">
                    <p className="text-white/90 text-sm font-medium tracking-widest uppercase">
                        Verifying your email{dots}
                    </p>
                    <p className="text-white/30 text-xs mt-1">
                        You'll be redirected shortly
                    </p>
                </div>
            </div>
        </div>
    );
}
