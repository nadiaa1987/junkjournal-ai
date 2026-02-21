"use client";
export const runtime = 'edge';

import React from 'react';
import Link from 'next/link';

export default function RefundPage() {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-main)', padding: '4rem 2rem' }}>
            <div className="container" style={{ maxWidth: '800px' }}>
                <Link href="/" style={{ color: 'var(--accent-sepia)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', fontWeight: 600 }}>
                    ← Back to Home
                </Link>

                <div className="paper-card" style={{ padding: '4rem', lineHeight: '1.8' }}>
                    <h1 className="handwritten" style={{ fontSize: '3rem', marginBottom: '2rem' }}>Refund Policy</h1>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Last updated: February 21, 2026</p>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>1. Digital Goods</h2>
                        <p>Due to the nature of digital goods and the immediate costs associated with AI generation, all purchases of credits are final and non-refundable once any credits have been used.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>2. Exceptional Circumstances</h2>
                        <p>If you experience technical issues that prevent you from using your purchased credits, please contact our support team within 14 days of purchase at support@junkjournalai.com for a resolution.</p>
                    </section>

                    <section style={{ marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>3. Cancellation</h2>
                        <p>There are no recurring subscriptions. You only pay for what you need. Therefore, there is no need to cancel a subscription, and unused credits will expire after 30 days as per our Terms of Service.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}
