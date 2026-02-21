"use client";
export const runtime = 'edge';

import React from 'react';
import Link from 'next/link';

export default function PrivacyPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--accent-sepia)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 600 }}>
                    ← Back to Home
                </Link>

                <div className="paper-card" style={{ padding: '4rem', lineHeight: '1.8' }}>
                    <h1 className="handwritten" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Privacy Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last updated: February 21, 2026</p>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you create an account, use our AI generation services, or communicate with us. This includes your name, email address, and any imagery you upload for style extraction.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. How We Use Your Information</h2>
                        <p>We use the information we collect to provide, maintain, and improve our services, including to process your AI generations and manage your credit balance.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Data Storage and Security</h2>
                        <p>Your data is securely stored using industry-standard encryption. We use Firebase for authentication and database management, ensuring your personal information is protected.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>4. Third-Party Services</h2>
                        <p>We use Stripe for payment processing and Pollinations AI for image generation. These third parties have their own privacy policies governing how they handle your data.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>5. Contact Us</h2>
                        <p>If you have any questions about this Privacy Policy, please contact us at support@junkjournalai.com.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
