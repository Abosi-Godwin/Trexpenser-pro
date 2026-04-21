import { useEffect } from "react";
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
