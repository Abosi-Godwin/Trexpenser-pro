import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { slideUpVariant } from "../../utils/AnimationVariants";

export default function VerifyEmail() {
    const [resent, setResent] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleResend() {
        setLoading(true);

        setTimeout(() => {
            setResent(true);
            setLoading(false);
        }, 1000);
    }

    return (
        <div className="flex items-center justify-center px-4 text-light-text">
            <motion.div
                variants={slideUpVariant}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-2xl shadow-md shadow-color-2 p-10 max-w-sm w-full flex flex-col items-center gap-5 text-center"
            >
                <div className="w-14 h-14 rounded-xl bg-light-primaryCTA/10 flex items-center justify-center">
                    <svg
                        className="w-6 h-6 text-light-primaryCTA"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                    </svg>
                </div>

                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-light-text">
                        Check your inbox
                    </h2>
                    <p className="text-sm text-light-text/60 leading-relaxed">
                        We sent a verification link to your email. Click it to
                        activate your TrExpenser account.
                    </p>
                </div>

                <div className="w-full h-px bg-light-dividers" />

                <div className="flex flex-col items-center gap-1">
                    <p className="text-sm text-light-text/50">
                        Didn't receive it?
                    </p>
                    {resent ? (
                        <p className="text-light-primaryCTA text-sm font-semibold">
                            Email resent ✓
                        </p>
                    ) : (
                        <button
                            onClick={handleResend}
                            disabled={loading}
                            className="text-light-primaryCTA text-sm font-semibold hover:text-light-secondaryAccent transition-colors disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Resend email"}
                        </button>
                    )}
                </div>

                <p className="text-sm text-light-text/50">
                    Wrong email?{" "}
                    <Link
                        to="/signup"
                        className="text-light-primaryCTA font-semibold hover:text-light-secondaryAccent transition-colors"
                    >
                        Go back
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}
