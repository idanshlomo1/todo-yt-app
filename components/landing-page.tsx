"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const features = [
    "Create and manage tasks with ease",
    "Track your progress with intuitive dashboards",
    "Organize tasks with categories and priorities",
    "Collaborate with team members",
    "Set reminders and due dates",
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="border-b bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="text-xl font-bold">
                TODO APP YOUTUBE
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <Link
                  href="#features"
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                >
                  Features
                </Link>
                <Link
                  href="#testimonials"
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                >
                  Testimonials
                </Link>
                <Link
                  href="#pricing"
                  className="px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                >
                  Pricing
                </Link>
                <ThemeToggle />
                <Link
                  href="/auth/login"
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="ml-2 px-3 py-2 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button
                  onClick={toggleMenu}
                  className="inline-flex items-center justify-center rounded-md p-2 text-foreground/60 hover:bg-accent hover:text-foreground"
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
          <div className="md:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              <Link
                href="#features"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 rounded-md text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <div className="border-t border-border/30 mt-4 pt-4 flex flex-col space-y-2">
                <Link
                  href="/auth/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={toggleMenu}
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div className="flex flex-col justify-center space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  Manage Your Tasks with Ease
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  Streamline your workflow, boost productivity, and never miss a deadline again with our intuitive task management app.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link
                  href="/auth/sign-up"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Get Started
                </Link>
                <Link
                  href="/auth/login"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Learn More
                </Link>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <div className="relative h-[350px] w-full md:h-[420px] lg:h-[450px]">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-20 blur-xl"></div>
                <div className="relative h-full w-full rounded-lg border bg-card p-4 shadow-xl">
                  <div className="flex items-center justify-between border-b pb-4">
                    <h3 className="font-semibold">My Tasks</h3>
                    <span className="text-sm text-muted-foreground">Today</span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
                        className="flex items-center gap-3 rounded-md border p-3"
                      >
                        <div className={`h-5 w-5 rounded-full ${i === 3 ? "bg-green-500" : "border border-muted-foreground"}`}></div>
                        <div className="flex-1">
                          <p className={`font-medium ${i === 3 ? "line-through text-muted-foreground" : ""}`}>
                            {["Complete project proposal", "Review client feedback", "Update documentation", "Send weekly report"][i - 1]}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {["High priority", "Medium priority", "Low priority", "Completed"][i - 1]}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Features</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Everything you need to manage your tasks efficiently
              </p>
            </motion.div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8 md:mt-16">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex flex-col items-center space-y-2 rounded-lg border bg-card p-6 shadow-sm"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center space-y-4 text-center"
          >
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Get Started?</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of users who are already managing their tasks efficiently.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href="/auth/sign-up"
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              >
                Sign Up Now
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © {new Date().getFullYear()} TODO APP YOUTUBE. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 