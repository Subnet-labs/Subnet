import React, { useEffect, useRef } from 'react';

declare global {
    interface Window {
        THREE: any;
        setScannerScanning: (active: boolean) => void;
        getScannerStats: () => any;
    }
}

const codeChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789(){}[]<>;:,._-+=!@#$%^&*|\\/\"'`~?";

const cardImages = [
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b55e654d1341fb06f8_4.1.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5a080a31ee7154b19_1.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5c1e4919fd69672b8_3.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5f6a5e232e7beb4be_2.png",
    "https://cdn.prod.website-files.com/68789c86c8bc802d61932544/689f20b5bea2f1b07392d936_4.png",
];

const CardScanner: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardLineRef = useRef<HTMLDivElement>(null);
    const particleCanvasRef = useRef<HTMLCanvasElement>(null);
    const scannerCanvasRef = useRef<HTMLCanvasElement>(null);

    const animationStateRef = useRef({
        position: 0,
        velocity: 120,
        direction: -1,
        isAnimating: true,
        isDragging: false,
        lastTime: 0,
        containerWidth: 0,
        cardLineWidth: 0,
    });

    // Generate code for ASCII effect
    const generateCode = (width: number, height: number): string => {
        const randInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
        const pick = <T,>(arr: T[]): T => arr[randInt(0, arr.length - 1)];

        const library = [
            "// compiled preview • scanner demo",
            "const SCAN_WIDTH = 8;",
            "const FADE_ZONE = 35;",
            "const MAX_PARTICLES = 2500;",
            "function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }",
            "function lerp(a, b, t) { return a + (b - a) * t; }",
            "const now = () => performance.now();",
            "class Particle { constructor(x, y) { this.x = x; this.y = y; } }",
            "const scanner = { x: window.innerWidth / 2, width: 8 };",
            "function tick(t) { requestAnimationFrame(tick); }",
        ];

        for (let i = 0; i < 40; i++) {
            library.push(`const v${i} = (${randInt(1, 9)} + ${randInt(10, 99)}) * 0.${randInt(1, 9)};`);
        }

        let flow = library.join(" ").replace(/\s+/g, " ").trim();
        const totalChars = width * height;
        while (flow.length < totalChars + width) {
            flow += " " + pick(library).replace(/\s+/g, " ").trim();
        }

        let out = "";
        let offset = 0;
        for (let row = 0; row < height; row++) {
            let line = flow.slice(offset, offset + width);
            if (line.length < width) line = line + " ".repeat(width - line.length);
            out += line + (row < height - 1 ? "\n" : "");
            offset += width;
        }
        return out;
    };

    useEffect(() => {
        const container = containerRef.current;
        const cardLine = cardLineRef.current;
        const particleCanvas = particleCanvasRef.current;
        const scannerCanvas = scannerCanvasRef.current;

        if (!container || !cardLine || !particleCanvas || !scannerCanvas) return;

        const state = animationStateRef.current;

        // Populate cards
        cardLine.innerHTML = '';
        for (let i = 0; i < 30; i++) {
            const wrapper = document.createElement('div');
            wrapper.className = 'card-wrapper';

            const normalCard = document.createElement('div');
            normalCard.className = 'card card-normal';

            const cardImage = document.createElement('img');
            cardImage.className = 'card-image';
            cardImage.src = cardImages[i % cardImages.length];
            cardImage.alt = 'Credit Card';
            normalCard.appendChild(cardImage);

            const asciiCard = document.createElement('div');
            asciiCard.className = 'card card-ascii';

            const asciiContent = document.createElement('div');
            asciiContent.className = 'ascii-content';
            asciiContent.textContent = generateCode(66, 19);
            asciiCard.appendChild(asciiContent);

            wrapper.appendChild(normalCard);
            wrapper.appendChild(asciiCard);
            cardLine.appendChild(wrapper);
        }

        // Calculate dimensions
        state.containerWidth = container.offsetWidth;
        state.cardLineWidth = (400 + 60) * 30;
        state.position = state.containerWidth;

        // Update card clipping based on scanner position
        const updateCardClipping = () => {
            const scannerX = window.innerWidth / 2;
            const scannerWidth = 8;
            const scannerLeft = scannerX - scannerWidth / 2;
            const scannerRight = scannerX + scannerWidth / 2;
            let anyScanningActive = false;

            document.querySelectorAll('.card-scanner-section .card-wrapper').forEach((wrapper) => {
                const rect = wrapper.getBoundingClientRect();
                const cardLeft = rect.left;
                const cardRight = rect.right;
                const cardWidth = rect.width;

                const normalCard = wrapper.querySelector('.card-normal') as HTMLElement;
                const asciiCard = wrapper.querySelector('.card-ascii') as HTMLElement;

                if (normalCard && asciiCard) {
                    if (cardLeft < scannerRight && cardRight > scannerLeft) {
                        anyScanningActive = true;
                        const scannerIntersectLeft = Math.max(scannerLeft - cardLeft, 0);
                        const scannerIntersectRight = Math.min(scannerRight - cardLeft, cardWidth);

                        const normalClipRight = (scannerIntersectLeft / cardWidth) * 100;
                        const asciiClipLeft = (scannerIntersectRight / cardWidth) * 100;

                        normalCard.style.setProperty('--clip-right', `${normalClipRight}%`);
                        asciiCard.style.setProperty('--clip-left', `${asciiClipLeft}%`);
                    } else {
                        if (cardRight < scannerLeft) {
                            normalCard.style.setProperty('--clip-right', '100%');
                            asciiCard.style.setProperty('--clip-left', '100%');
                        } else {
                            normalCard.style.setProperty('--clip-right', '0%');
                            asciiCard.style.setProperty('--clip-left', '0%');
                        }
                    }
                }
            });

            if (window.setScannerScanning) {
                window.setScannerScanning(anyScanningActive);
            }
        };

        // Animation loop
        let animationId: number;
        const animate = () => {
            const currentTime = performance.now();
            const deltaTime = (currentTime - state.lastTime) / 1000;
            state.lastTime = currentTime;

            if (state.isAnimating && !state.isDragging) {
                state.position += state.velocity * state.direction * deltaTime;

                if (state.position < -state.cardLineWidth) {
                    state.position = state.containerWidth;
                } else if (state.position > state.containerWidth) {
                    state.position = -state.cardLineWidth;
                }

                cardLine.style.transform = `translateX(${state.position}px)`;
                updateCardClipping();
            }

            animationId = requestAnimationFrame(animate);
        };

        state.lastTime = performance.now();
        animate();

        // Scanner Canvas Effect
        const ctx = scannerCanvas.getContext('2d');
        if (ctx) {
            const w = window.innerWidth;
            const h = 300;
            scannerCanvas.width = w;
            scannerCanvas.height = h;

            // Create gradient cache
            const gradientCanvas = document.createElement('canvas');
            const gradientCtx = gradientCanvas.getContext('2d');
            gradientCanvas.width = 16;
            gradientCanvas.height = 16;

            if (gradientCtx) {
                const half = 8;
                const gradient = gradientCtx.createRadialGradient(half, half, 0, half, half, half);
                gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
                gradient.addColorStop(0.3, 'rgba(16, 185, 129, 0.8)');
                gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.4)');
                gradient.addColorStop(1, 'transparent');
                gradientCtx.fillStyle = gradient;
                gradientCtx.beginPath();
                gradientCtx.arc(half, half, half, 0, Math.PI * 2);
                gradientCtx.fill();
            }

            // Particles
            const particles: any[] = [];
            const maxParticles = 800;
            const lightBarX = w / 2;
            const lightBarWidth = 3;
            const fadeZone = 60;

            const createParticle = () => ({
                x: lightBarX + (Math.random() - 0.5) * lightBarWidth,
                y: Math.random() * h,
                vx: Math.random() * 0.8 + 0.2,
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 0.6 + 0.4,
                alpha: Math.random() * 0.4 + 0.6,
                life: 1.0,
                decay: Math.random() * 0.02 + 0.005,
                time: 0,
                twinkleSpeed: Math.random() * 0.06 + 0.02,
                twinkleAmount: Math.random() * 0.15 + 0.1,
                originalAlpha: 0,
            });

            for (let i = 0; i < maxParticles; i++) {
                const p = createParticle();
                p.originalAlpha = p.alpha;
                particles.push(p);
            }

            let scannerAnimId: number;
            const renderScanner = () => {
                ctx.globalCompositeOperation = 'source-over';
                ctx.clearRect(0, 0, w, h);

                // Draw light bar
                const verticalGradient = ctx.createLinearGradient(0, 0, 0, h);
                verticalGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                verticalGradient.addColorStop(fadeZone / h, 'rgba(255, 255, 255, 1)');
                verticalGradient.addColorStop(1 - fadeZone / h, 'rgba(255, 255, 255, 1)');
                verticalGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.globalCompositeOperation = 'lighter';

                // Core glow
                const coreGradient = ctx.createLinearGradient(lightBarX - lightBarWidth / 2, 0, lightBarX + lightBarWidth / 2, 0);
                coreGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
                coreGradient.addColorStop(0.5, 'rgba(255, 255, 255, 1)');
                coreGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.globalAlpha = 1;
                ctx.fillStyle = coreGradient;
                ctx.beginPath();
                ctx.roundRect(lightBarX - lightBarWidth / 2, 0, lightBarWidth, h, 15);
                ctx.fill();

                // Outer glows
                const glow1Gradient = ctx.createLinearGradient(lightBarX - lightBarWidth * 2, 0, lightBarX + lightBarWidth * 2, 0);
                glow1Gradient.addColorStop(0, 'rgba(16, 185, 129, 0)');
                glow1Gradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.8)');
                glow1Gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

                ctx.globalAlpha = 0.8;
                ctx.fillStyle = glow1Gradient;
                ctx.beginPath();
                ctx.roundRect(lightBarX - lightBarWidth * 2, 0, lightBarWidth * 4, h, 25);
                ctx.fill();

                const glow2Gradient = ctx.createLinearGradient(lightBarX - lightBarWidth * 4, 0, lightBarX + lightBarWidth * 4, 0);
                glow2Gradient.addColorStop(0, 'rgba(6, 182, 212, 0)');
                glow2Gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)');
                glow2Gradient.addColorStop(1, 'rgba(6, 182, 212, 0)');

                ctx.globalAlpha = 0.6;
                ctx.fillStyle = glow2Gradient;
                ctx.beginPath();
                ctx.roundRect(lightBarX - lightBarWidth * 4, 0, lightBarWidth * 8, h, 35);
                ctx.fill();

                // Fade mask
                ctx.globalCompositeOperation = 'destination-in';
                ctx.globalAlpha = 1;
                ctx.fillStyle = verticalGradient;
                ctx.fillRect(0, 0, w, h);

                // Draw particles
                ctx.globalCompositeOperation = 'lighter';
                particles.forEach((p, i) => {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.time++;
                    p.alpha = p.originalAlpha * p.life + Math.sin(p.time * p.twinkleSpeed) * p.twinkleAmount;
                    p.life -= p.decay;

                    if (p.x > w + 10 || p.life <= 0) {
                        // Reset particle
                        p.x = lightBarX + (Math.random() - 0.5) * lightBarWidth;
                        p.y = Math.random() * h;
                        p.life = 1.0;
                        p.alpha = Math.random() * 0.4 + 0.6;
                        p.originalAlpha = p.alpha;
                        p.time = 0;
                    }

                    let fadeAlpha = 1;
                    if (p.y < fadeZone) fadeAlpha = p.y / fadeZone;
                    else if (p.y > h - fadeZone) fadeAlpha = (h - p.y) / fadeZone;

                    ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha * fadeAlpha));
                    ctx.drawImage(gradientCanvas, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
                });

                scannerAnimId = requestAnimationFrame(renderScanner);
            };

            renderScanner();

            return () => {
                cancelAnimationFrame(animationId);
                cancelAnimationFrame(scannerAnimId);
            };
        }

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <section className="card-scanner-section py-20 relative overflow-hidden">
            {/* Headline Section */}
            <div className="text-center px-6 mb-12">
                <span className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                    💳 Zero Risk Guarantee
                </span>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white">
                    No Credit Card <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-teal-400">Burned</span>
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Start your project risk-free. We deliver results before you invest a dime.
                </p>
            </div>

            <div className="scanner-container">
                <canvas ref={particleCanvasRef} id="particleCanvas" />
                <canvas ref={scannerCanvasRef} id="scannerCanvas" />

                <div className="scanner" />

                <div ref={containerRef} className="card-stream">
                    <div ref={cardLineRef} className="card-line" />
                </div>
            </div>

            <div className="inspiration-credit">
                Inspired by <a href="https://evervault.com/" target="_blank" rel="noopener noreferrer">@evervault.com</a>
            </div>
        </section>
    );
};

export default CardScanner;
