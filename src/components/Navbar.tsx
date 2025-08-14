"use client";
import Link from "next/link";
import { Github, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import { Typewriter } from "react-simple-typewriter";
import { useTheme } from "next-themes";

const Navbar = () => {
  const { theme } = useTheme();

  const logoGradient =
    theme === "dark"
      ? "bg-gradient-to-r from-cyan-300 to-yellow-400"
      : "bg-gradient-to-r from-blue-400 to-red-600";

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] rounded-2xl border border-white/20 dark:border-white/10 bg-white/40 dark:bg-black/40 backdrop-blur-xl shadow-lg">
      <div className="flex items-center justify-between px-6 py-3">
        <Link
          href="/"
          className={`flex items-center gap-2 ${logoGradient} bg-clip-text text-transparent hover:opacity-90 transition-opacity animate-pulse`}
          aria-label="Persona AI Buddies"
        >
          <span className="font-light text-3xl">Persona</span>
          <span className="whitespace-nowrap text-3xl font-semibold">
            <Typewriter
              words={["AI Buddies", "AI Companions", "AI Friends"]}
              loop={false}
              cursor
              cursorStyle="|"
              typeSpeed={200}
              deleteSpeed={100}
              delaySpeed={2000}
            />
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:scale-110 transition-transform duration-200"
          >
            <a
              href="https://github.com/mnraza-dev/Persona-AI"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 dark:text-white hover:text-orange-500"
            >
              <Github className="h-5 w-5" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            asChild
            className="rounded-full hover:scale-110 transition-transform duration-200"
          >
            <a
              href="https://x.com/mnraza_codes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-800 dark:text-white hover:text-orange-500"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
