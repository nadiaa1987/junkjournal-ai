export const runtime = 'edge';

"use client";

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Hero Section */}
      <section style={{
        padding: '8rem 2rem 6rem',
        textAlign: 'center',
        background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 100%)',
        borderBottom: '1px solid var(--border-sepia)'
      }} className="fade-in">
        <div className="header-badge" style={{ marginBottom: '2rem' }}>The #1 AI Tool for Journaling</div>
        <h1 style={{ fontSize: '4.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)', lineHeight: '1.1' }}>
          Craft Timeless <span className="handwritten" style={{ fontSize: '1.2em' }}>Junk Journal</span> Pages
        </h1>
        <p style={{
          fontSize: '1.4rem',
          color: 'var(--text-secondary)',
          maxWidth: '700px',
          margin: '0 auto 3rem',
          lineHeight: '1.6'
        }}>
          Instantly generate high-resolution, vintage ephemera and watercolor illustrations.
          Built specifically for Etsy sellers and creative journalers.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <Link href="/dashboard" className="btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem' }}>
            Create Your First Page →
          </Link>
          <a href="#pricing" className="btn-secondary" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', background: 'white' }}>
            View Offers
          </a>
        </div>

        {/* Etsy Social Proof - Simple Images in a Row */}
        <div style={{
          maxWidth: '800px',
          margin: '0 auto 5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <p style={{
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            marginBottom: '1.5rem',
            fontWeight: 700
          }}>
            Trusted by Top Etsy Creators
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            {[
              { name: "BowArts", pos: "top left" },
              { name: "JunkJournalArtt", pos: "top right" },
              { name: "ArtemisJournals", pos: "bottom left" },
              { name: "MyPorchPrints", pos: "bottom right" },
            ].map((shop, i) => (
              <div key={shop.name} style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                flexShrink: 0,
                background: '#f8f8f8'
              }}>
                <img
                  src="/shop-logos.png"
                  alt={shop.name}
                  style={{
                    width: '200%',
                    height: '200%',
                    objectFit: 'cover',
                    marginLeft: shop.pos.includes('right') ? '-100%' : '0',
                    marginTop: shop.pos.includes('bottom') ? '-100%' : '0'
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '6rem 2rem', background: 'rgba(255,255,255,0.3)' }}>
        <div className="container">
          <h2 className="handwritten" style={{ textAlign: 'center', fontSize: '3.5rem', marginBottom: '4rem' }}>Magic for Digital Crafters</h2>
          <div className="grid">
            <div className="paper-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🎨</div>
              <h3>Bespoke Art Styles</h3>
              <p style={{ color: 'var(--text-secondary)' }}>From Shabby Chic to Steampunk—choose from curated palettes designed for printables.</p>
            </div>
            <div className="paper-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📦</div>
              <h3>Batch Generation</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Generate up to 50 matching pages in one click. Perfect for full Etsy kits.</p>
            </div>
            <div className="paper-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📥</div>
              <h3>Commercial Ready</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Export as high-quality PDFs or ZIP bundles, ready for your digital shop.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '6rem 2rem', borderTop: '1px solid var(--border-sepia)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div className="header-badge" style={{ background: '#704214', color: 'white' }}>Flash Sale: 60% OFF</div>
            <h2 style={{ fontSize: '3rem', marginTop: '1rem' }}>Start Your Creative Portfolio</h2>
            <p style={{ color: 'var(--text-secondary)' }}>One-time payment. Lifetime usage of generated assets.</p>
          </div>

          <div className="grid" style={{ maxWidth: '1150px', margin: '0 auto', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem' }}>
            {/* Free Plan */}
            <div className="paper-card" style={{ textAlign: 'center', border: '1px solid var(--border-sepia)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Free Trial</h3>
              <div style={{ margin: '1.5rem 0' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--text-secondary)' }}>Free</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left', flex: 1 }}>
                <li style={{ marginBottom: '0.8rem' }}>🎁 5 High-Res Credits</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Try All Art Styles</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Personal Use Only</li>
                <li style={{ marginBottom: '0.8rem' }}>❌ No PDF Exports</li>
              </ul>
              <Link href="/dashboard" className="btn-secondary" style={{ width: '100%', padding: '0.8rem' }}>Start Free</Link>
            </div>

            {/* Plan 1 */}
            <div className="paper-card" style={{ textAlign: 'center', border: '1px solid var(--border-sepia)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Starter Pack</h3>
              <div style={{ margin: '1.5rem 0' }}>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>$24.99</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-sepia)' }}>$9.99</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left', flex: 1 }}>
                <li style={{ marginBottom: '0.8rem' }}>✅ 1,000 Credits</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Commercial License</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ PDF & ZIP Exports</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Email Support</li>
              </ul>
              <Link href="/dashboard" className="btn" style={{ width: '100%', padding: '0.8rem' }}>Claim Offer</Link>
            </div>

            {/* Plan 2 */}
            <div className="paper-card" style={{ textAlign: 'center', border: '2px solid var(--accent-sepia)', transform: 'scale(1.05)', boxShadow: 'var(--shadow-md)', background: '#fdfbf7', zIndex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', background: 'var(--accent-sepia)', color: 'white', padding: '4px 15px', fontSize: '0.7rem', borderRadius: '0 0 8px 8px', fontWeight: 'bold' }}>POPULAR</div>
              <h3 style={{ fontSize: '1.4rem', marginTop: '0.5rem' }}>Pro Studio</h3>
              <div style={{ margin: '1.5rem 0' }}>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>$49.99</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-sepia)' }}>$19.99</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left', flex: 1 }}>
                <li style={{ marginBottom: '0.8rem' }}>✅ 3,000 Credits</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Style Extraction</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Priority Queue</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Extended License</li>
              </ul>
              <Link href="/dashboard" className="btn" style={{ width: '100%', padding: '0.8rem' }}>Claim Offer</Link>
            </div>

            {/* Plan 3 */}
            <div className="paper-card" style={{ textAlign: 'center', border: '1px solid var(--border-sepia)', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.4rem' }}>Elite Bundle</h3>
              <div style={{ margin: '1.5rem 0' }}>
                <span style={{ textDecoration: 'line-through', color: '#999', fontSize: '1rem' }}>$74.99</span>
                <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--accent-sepia)' }}>$29.99</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'left', flex: 1 }}>
                <li style={{ marginBottom: '0.8rem' }}>✅ 5,000 Credits</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ 24/7 VIP Support</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Multi-User Access</li>
                <li style={{ marginBottom: '0.8rem' }}>✅ Custom Palette Lab</li>
              </ul>
              <Link href="/dashboard" className="btn" style={{ width: '100%', padding: '0.8rem' }}>Claim Offer</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" style={{ padding: '4rem 2rem', borderTop: '1px solid var(--border-sepia)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p className="logo" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>JunkJournal<span>AI</span></p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <Link href="/about" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>About Us</Link>
            <Link href="/contact" style={{ color: 'var(--text-primary)', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 600 }}>Contact Us</Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <Link href="/privacy" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</Link>
            <Link href="/refund" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem' }}>Refund Policy</Link>
          </div>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>© 2026 Junk Journal AI. Handmade with AI for tea-stained souls.</p>
        </div>
      </footer>
    </div>
  );
}
