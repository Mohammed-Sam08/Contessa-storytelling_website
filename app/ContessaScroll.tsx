"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

interface ContessaScrollProps {
    frameCount?: number;
}

const ContessaScroll: React.FC<ContessaScrollProps> = ({ frameCount = 40 }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);

    // Scroll progress for the sticky animation section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Smooth scroll for cinematic feel
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Map progress to frame index (01 to 040)
    const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

    // Image sequence paths
    const imageUrls = useMemo(() => {
        return Array.from({ length: frameCount }, (_, i) => {
            const frameNumber = (i + 1).toString().padStart(3, "0");
            return `/frames/ezgif-frame-${frameNumber}.jpg`;
        });
    }, [frameCount]);

    // Pre-load images for zero-lag canvas drawing
    useEffect(() => {
        let loadedCount = 0;
        const loadedImages: HTMLImageElement[] = [];

        const loadImage = (url: string, index: number) => {
            const img = new Image();
            img.src = url;
            img.onload = () => {
                loadedImages[index] = img;
                loadedCount++;
                setLoadProgress(Math.floor((loadedCount / frameCount) * 100));
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoading(false);
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame: ${url}`);
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImages(loadedImages);
                    setIsLoading(false);
                }
            };
        };

        imageUrls.forEach((url, i) => loadImage(url, i));
    }, [imageUrls, frameCount]);

    // High-performance Canvas Rendering Loop
    useEffect(() => {
        let animationId: number;

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            if (!canvas || !ctx || images.length === 0) return;

            const currentIndex = Math.round(frameIndex.get());
            const img = images[currentIndex];

            if (img) {
                // Clear with Deep Noir background
                ctx.fillStyle = "#080808";
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                // Responsive object-contain logic
                const canvasAspect = canvas.width / canvas.height;
                const imgAspect = img.width / img.height;
                let drawWidth, drawHeight, offsetX, offsetY;

                if (canvasAspect > imgAspect) {
                    drawHeight = canvas.height;
                    drawWidth = canvas.height * imgAspect;
                    offsetX = (canvas.width - drawWidth) / 2;
                    offsetY = 0;
                } else {
                    drawWidth = canvas.width;
                    drawHeight = canvas.width / imgAspect;
                    offsetX = 0;
                    offsetY = (canvas.height - drawHeight) / 2;
                }

                ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
            }

            animationId = requestAnimationFrame(render);
        };

        animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [images, frameIndex]);

    // Handle Resize for High-DPI displays
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div ref={containerRef} className="relative h-[400vh] bg-[#080808]">
            {/* Premium Loader */}
            {isLoading && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#080808]">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-20 h-20 border-4 border-accent-amber border-t-transparent rounded-full flex items-center justify-center mb-8"
                    >
                        <div className="w-14 h-2 bg-accent-silver absolute rotate-45" />
                        <div className="w-14 h-2 bg-accent-silver absolute -rotate-45" />
                        <div className="w-10 h-10 rounded-full bg-[#080808] z-10 flex items-center justify-center border border-accent-amber/30">
                            <div className="w-4 h-4 rounded-full bg-accent-amber animate-pulse" />
                        </div>
                    </motion.div>
                    <div className="text-center">
                        <h2 className="text-3xl font-impact italic tracking-tighter text-white/90 mb-4">TUNING THE LEGEND</h2>
                        <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden mx-auto">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                                className="h-full bg-accent-amber shadow-[0_0_15px_#ffbf00]"
                            />
                        </div>
                        <p className="mt-4 text-white/30 font-inter text-[10px] tracking-[0.3em] uppercase">
                            Calibrating Cylinders... {loadProgress}%
                        </p>
                    </div>
                </div>
            )}

            {/* Sticky Canvas Viewport */}
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[#080808]">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full pointer-events-none"
                    style={{ width: "100vw", height: "100vh" }}
                />
            </div>
        </div>
    );
};

export default ContessaScroll;