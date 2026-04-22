import {Outlet } from "react-router-dom";
import { Logo } from "./Logo";
export default function AuthLayout() {
    return (
        <div className="bg-light-sectionBackground min-h-screen flex flex-col text-light-text">
            <header className="px-6 py-4 grid grid-cols-2">
                <Logo />
            </header>

            <main className="flex-1 flex items-center justify-center px-4">
                <Outlet />
            </main>

            <footer className="px-6 py-4 flex items-center justify-between text-xs text-light-text/40">
                <p>
                    © {new Date().getFullYear()} Trexpenser. All rights
                    reserved.
                </p>
                <a
                    href="mailto:support@trexpenser.com"
                    className="hover:text-light-primaryCTA transition-colors"
                >
                    support@trexpenser.com
                </a>
            </footer>
        </div>
    );
}
