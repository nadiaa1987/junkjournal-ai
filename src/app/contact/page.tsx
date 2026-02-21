"use client";
import React from 'react';
import Link from 'next/link';

export default function ContactPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--accent-sepia)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 600 }}>
                    ← Back to Home
                </Link>

                <div className="paper-card" style={{ padding: '4rem', textAlign: 'center' }}>
                    <h1 className="handwritten" style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>Contact Us</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem' }}>
                        Have a question or need assistance with your vintage creations? We're here to help!
                    </p>

                    <div style={{ display: 'grid', gap: '2rem', marginBottom: '3rem' }}>
                        <div style={{ padding: '2rem', background: '#fdfbf7', borderRadius: '12px', border: '1px solid var(--border-sepia)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✉️</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Email Us</h3>
                            <a href="mailto:Contact@junkjournalai.shop" style={{ color: 'var(--accent-sepia)', fontSize: '1.2rem', fontWeight: 600, textDecoration: 'none' }}>
                                Contact@junkjournalai.shop
                            </a>
                        </div>

                        <div style={{ padding: '2rem', background: '#fdfbf7', borderRadius: '12px', border: '1px solid var(--border-sepia)' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🌐</div>
                            <h3 style={{ marginBottom: '0.5rem' }}>Official Website</h3>
                            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                junkjournalai.shop
                            </p>
                        </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                        We typically respond within 24-48 hours during business days.
                    </p>
                </div>
            </div>
        </div>
    );
}
