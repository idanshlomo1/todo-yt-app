"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { LogOut, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { ThemeToggle } from "./ui/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    {
      name: "Dashboard",
      href: "/app",
    },
    {
      name: "Tasks",
      href: "/app/tasks",
    },
  ];

  return (
    <nav className={`nav-fixed transition-all duration-300 ${scrolled ? 'shadow-sm' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/app" className="text-xl font-bold text-foreground transition-colors hover:text-primary">
              Task Manager
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground/60 hover:text-foreground hover:bg-accent/10"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <div className="flex items-center gap-4">
                <ThemeToggle />
                <div className="text-sm text-foreground/60">
                  {session?.user?.name}
                </div>
                <button
                  onClick={() => signOut({ callbackUrl: "/auth/login" })}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent/10 transition-all duration-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent/10 hover:text-foreground transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                  pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:text-foreground hover:bg-accent/10"
                }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="border-t border-border/30 mt-4 pt-4">
              <div className="px-3 py-2 text-sm text-foreground/60">
                {session?.user?.name}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/auth/login" })}
                className="flex w-full items-center gap-2 px-3 py-2 text-sm text-foreground/60 hover:text-foreground hover:bg-accent/10 rounded-md transition-all duration-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 