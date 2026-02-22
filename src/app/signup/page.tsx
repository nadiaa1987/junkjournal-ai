"use client";
export const runtime = 'edge';

import React, { useState, useEffect } from 'react';
import { auth, googleProvider } from '../../lib/firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/dashboard');
        }
    }, [user, authLoading, router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    if (authLoading) return null;

    return (
        <div style={{
            minHeight: 'calc(100vh - 80px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--bg-main)'
        }}>
            <div className="paper-card fade-in" style={{ width: '100%', maxWidth: '450px', padding: '3rem' }}>
                <h1 className="handwritten" style={{ fontSize: '2.5rem', textAlign: 'center', marginBottom: '1rem' }}>Start Your Journey</h1>
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                    Join 10,000+ creators and start designing unique junk journals today.
                </p>

                {error && (
                    <div style={{ background: '#fee2e2', color: '#dc2626', padding: '0.75rem', borderRadius: '6px', marginBottom: '1.5rem', fontSize: '0.9rem', border: '1px solid #fecaca' }}>
                        ⚠️ {error}
                    </div>
                )}

                <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Email Address</label>
                        <input
                            type="email"
                            className="input-field"
                            placeholder="your@email.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>Create Password</label>
                        <input
                            type="password"
                            className="input-field"
                            placeholder="Min. 8 characters"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn" style={{ width: '100%', marginTop: '0.5rem' }} disabled={loading}>
                        {loading ? 'Creating Account...' : 'Get My 5 Free Credits'}
                    </button>
                </form>

                <div style={{ margin: '2rem 0', textAlign: 'center', position: 'relative' }}>
                    <hr style={{ border: 'none', borderTop: '1px solid var(--border-sepia)' }} />
                    <span style={{ position: 'absolute', top: '-0.7rem', left: '50%', transform: 'translateX(-50%)', background: 'var(--bg-paper)', padding: '0 15px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        OR
                    </span>
                </div>

                <button onClick={handleGoogleSignup} className="btn-secondary" style={{ width: '100%', padding: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: '20px', marginRight: '10px' }} />
                    Sign up with Google
                </button>

                <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
                    Already have an account? <Link href="/login" style={{ color: 'var(--accent-sepia)', fontWeight: 700, textDecoration: 'none' }}>Log in here</Link>
                </p>
            </div>
        </div>
    );
}
