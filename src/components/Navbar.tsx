"use client";
import React from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
    const { user, credits, loading, setShowPricing, expirationDate } = useAuth();
    const router = useRouter();

    const getDaysLeft = () => {
        if (!expirationDate) return null;
        const diff = expirationDate - Date.now();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    };

    const daysLeft = getDaysLeft();

    return (
        <>
            <nav className="navbar">
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <div className="logo">JunkJournal<span>AI</span></div>
                </Link>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    {loading ? (
                        <span style={{ fontSize: '0.9rem', color: 'gray' }}>Loading...</span>
                    ) : user ? (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0px' }}>
                                <span style={{ fontWeight: 600, color: 'var(--accent-sepia)' }}>
                                    ⭐️ {credits} Credits
                                </span>
                                {daysLeft !== null && credits > 0 && (
                                    <span style={{ fontSize: '0.65rem', color: daysLeft < 5 ? '#e11d48' : '#6b7280', fontWeight: 500 }}>
                                        Expires in {daysLeft} days
                                    </span>
                                )}
                            </div>
                            <button onClick={() => setShowPricing(true)} className="btn" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
                                Buy Credits
                            </button>
                            <button onClick={async () => {
                                await signOut(auth);
                                router.push('/');
                            }} className="btn-secondary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', cursor: 'pointer', border: '1px solid var(--border-sepia)' }}>
                                Sign Out
                            </button>
                        </>
                    ) : (
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <Link href="/login" className="btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem', textDecoration: 'none', borderRadius: '4px', border: '1px solid var(--border-sepia)' }}>
                                Sign In
                            </Link>
                            <Link href="/signup" className="btn" style={{ padding: '0.5rem 1.2rem', fontSize: '0.9rem', textDecoration: 'none', borderRadius: '4px' }}>
                                Sign Up
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </>
    );
}
