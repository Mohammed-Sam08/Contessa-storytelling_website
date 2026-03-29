"use client";

import React from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ContessaScroll from "./ContessaScroll";

export default function ContessaLanding() {
    const { scrollYProgress } = useScroll();

    // Scroll transforms for the hero section
    const heroOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
    const heroScale = useTransform(scrollYProgress, [0, 0.05], [1, 1.1]);
    const heroY = useTransform(scrollYProgress, [0, 0.05], [0, -50]);

    // Narrative text sync with scroll
    const sec1Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
    const sec1X = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [-50, 0, 50]);

    const sec2Opacity = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]);
    const sec2X = useTransform(scrollYProgress, [0.35, 0.45, 0.55], [50, 0, -50]);

    const sec3Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]);
    const sec3Scale = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0.8, 1, 0.8]);

    // Final CTA at the end of the car animation (around 0.9 - 1.0)
    const ctaOpacity = useTransform(scrollYProgress, [0.85, 0.92, 0.98], [0, 1, 0]);
    const ctaScale = useTransform(scrollYProgress, [0.85, 0.92, 0.98], [0.9, 1, 1.1]);

    return (
        <main className="relative bg-[#080808] text-white selection:bg-accent-amber selection:text-black">

            {/* Hero Section (Start) */}
            <div className="relative z-20">
                <motion.div
                    style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
                    className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none"
                >
                    <motion.h1
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="text-[12vw] font-impact italic tracking-tighter leading-none text-center"
                    >
                        CONTESSA.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-accent-amber font-inter tracking-[0.5em] uppercase text-sm md:text-xl -mt-4"
                    >
                        The Indian Muscle
                    </motion.p>

                    {/* Scroll to Explore Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="absolute bottom-12 flex flex-col items-center gap-2"
                    >
                        <span className="text-[10px] tracking-[0.3em] uppercase text-white/40">Scroll to Explore</span>
                        <div className="w-[1px] h-12 bg-gradient-to-b from-accent-amber to-transparent" />
                    </motion.div>
                </motion.div>
            </div>

            {/* Animation Engine (Sticky Section) */}
            <ContessaScroll frameCount={40} />

            {/* Narrative Overlays (Floating) */}
            <div className="fixed inset-0 pointer-events-none z-10">
                <motion.div style={{ opacity: sec1Opacity, x: sec1X }} className="absolute inset-0 flex items-center justify-start p-12 md:p-24">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-impact italic mb-6">VINTAGE SOUL.</h2>
                        <p className="text-white/50 font-inter text-lg leading-relaxed">
                            Forged in an era of raw mechanics and chrome accents. The Contessa deconstructs the conventional limits of luxury.
                        </p>
                    </div>
                </motion.div>

                <motion.div style={{ opacity: sec2Opacity, x: sec2X }} className="absolute inset-0 flex items-center justify-end p-12 md:p-24 text-right">
                    <div className="max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-impact italic mb-6 text-accent-amber">HEART OF STEEL.</h2>
                        <p className="text-white/50 font-inter text-lg leading-relaxed">
                            Featuring the legendary 1.8L powerhouse. Every component is a testament to the golden age of Indian engineering.
                        </p>
                    </div>
                </motion.div>

                <motion.div style={{ opacity: sec3Opacity, scale: sec3Scale }} className="absolute inset-0 flex items-center justify-center text-center p-12">
                    <div className="max-w-3xl">
                        <h2 className="text-6xl md:text-9xl font-impact italic mb-6 text-white/10 uppercase">MUSCLE LEGACY.</h2>
                        <p className="text-accent-silver font-inter text-lg md:text-2xl uppercase tracking-widest bg-white/5 py-4 px-8 border-y border-white/10">
                            Chassis Rebuilt. Chrome Polished. Legend Reborn.
                        </p>
                    </div>
                </motion.div>

                {/* Final CTA Overlay before landing page content */}
                <motion.div
                    style={{ opacity: ctaOpacity, scale: ctaScale }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-12 pointer-events-auto"
                >
                    <h2 className="text-6xl md:text-[10vw] font-impact italic tracking-tighter mb-8 text-white uppercase leading-none">
                        LONG LIVE<br />THE LEGEND.
                    </h2>
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#080808" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-5 bg-accent-amber text-black font-impact italic tracking-widest uppercase transition-colors"
                    >
                        Explore More
                    </motion.button>
                </motion.div>
            </div>

            {/* LANDING PAGE SECTIONS (Below the animation) */}

            {/* Features Grid */}
            <section className="relative z-30 min-h-screen bg-[#080808] py-32 px-6 border-t border-white/5">
                <div className="max-w-7xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-8xl font-impact italic mb-20 text-center tracking-tighter"
                    >
                        THE SPECIFICATIONS.
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { title: "V8 ENGINE", desc: "A custom 1.8L base expanded for the ultimate muscle performance.", accent: "amber" },
                            { title: "CUSTOM INTERIOR", desc: "Premium leather meets vintage dashboard aesthetics.", accent: "silver" },
                            { title: "CHROME FINISH", desc: "Individually polished elements for a blinding legacy sheen.", accent: "amber" }
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="group p-10 bg-white/5 border border-white/10 hover:border-accent-amber/50 transition-colors"
                            >
                                <div className={`w-12 h-12 mb-8 bg-accent-${feature.accent} rounded-sm rotate-45 group-hover:rotate-90 transition-transform duration-500`} />
                                <h3 className="text-3xl font-impact italic mb-4">{feature.title}</h3>
                                <p className="text-white/40 font-inter leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="relative z-30 py-40 px-6 bg-gradient-to-b from-[#080808] to-[#040404]">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
                        <span className="text-accent-amber font-inter tracking-[1em] uppercase text-xs mb-8 block">Legacy of a Icon</span>
                        <p className="text-3xl md:text-5xl font-inter font-light leading-tight tracking-tight text-white/90 italic">
                            "The Hindustan Contessa wasn't just a car; it was a statement. In a sea of utility, it provided <span className="text-white font-bold border-b-2 border-accent-amber">raw emotion</span> and muscle that defined an entire generation of Indian motoring."
                        </p>
                        <div className="mt-16 w-24 h-1 bg-accent-amber mx-auto" />
                    </motion.div>
                </div>
            </section>

            {/* Newsletter / Contact */}
            <section className="relative z-30 py-32 px-6 bg-[#080808]">
                <div className="max-w-7xl mx-auto rounded-3xl bg-white/5 p-12 md:p-24 border border-white/10 overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent-amber/10 blur-[150px] -mr-48 -mt-48" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                        <div className="max-w-md">
                            <h2 className="text-5xl md:text-7xl font-impact italic tracking-tighter mb-4">JOIN THE CLUB.</h2>
                            <p className="text-white/40 font-inter">Get exclusive updates on custom Contessa builds and vintage events.</p>
                        </div>

                        <div className="w-full max-w-lg">
                            <div className="flex flex-col sm:flex-row gap-4">
                                <input
                                    type="email"
                                    placeholder="EMAIL ADDRESS"
                                    className="flex-1 bg-white/5 border border-white/10 px-8 py-5 font-inter text-sm tracking-widest uppercase focus:outline-none focus:border-accent-amber transition-colors"
                                />
                                <button className="px-12 py-5 bg-accent-amber text-black font-impact italic tracking-widest uppercase hover:bg-white transition-colors">
                                    Join
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-30 py-12 px-6 border-t border-white/5 text-center">
                <p className="text-white/20 font-inter text-xs tracking-[0.5em] uppercase">
                    &copy; 2026 Hindustan Contessa • The Indian Muscle
                </p>
            </footer>

        </main>
    );
}