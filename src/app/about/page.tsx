"use client";
import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--accent-sepia)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 600 }}>
                    ← Back to Home
                </Link>

                <div className="paper-card" style={{ padding: '4rem', lineHeight: '1.8' }}>
                    <h1 className="handwritten" style={{ fontSize: '3.5rem', marginBottom: '2rem', textAlign: 'center' }}>About Us</h1>

                    <p style={{ fontSize: '1.2rem', color: 'var(--text-primary)', marginBottom: '2rem', textAlign: 'center', fontStyle: 'italic' }}>
                        Empowering digital crafters with the magic of Artificial Intelligence.
                    </p>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-ink)', marginBottom: '1rem' }}>Our Mission</h2>
                        <p>
                            Junk Journal AI was born from a simple idea: making the creation of vintage-style ephemera accessible to everyone. We know how much time it takes to hunt for the perfect aged parchment, delicate watercolor flowers, or unique collage elements. Our tool is designed to cut those hours of searching into seconds of generating.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-ink)', marginBottom: '1rem' }}>Built for Creators</h2>
                        <p>
                            Whether you are an Etsy shop owner looking for unique inventory, a digital scrapbooker, or a traditional junk journaler who loves to print and fussy-cut, our AI is trained to understand the specific "shabby chic" and "vintage" aesthetics that make your journals special.
                        </p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.8rem', color: 'var(--accent-ink)', marginBottom: '1rem' }}>Why junkjournalai.shop?</h2>
                        <p>
                            We provide high-resolution, commercial-ready assets that don't look like generic AI. By focusing on textures like tea-stained paper, watercolor brushstrokes, and authentic vintage color palettes, we ensure your creations feel handmade and timeless.
                        </p>
                    </section>

                    <div style={{ textAlign: 'center', marginTop: '4rem', padding: '2rem', borderTop: '1px solid var(--border-sepia)' }}>
                        <p className="handwritten" style={{ fontSize: '1.5rem', color: 'var(--accent-sepia)' }}>
                            Handmade with AI for tea-stained souls.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
