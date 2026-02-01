import React, { useState, useEffect, useCallback } from 'react';
import { supabase, UserProfile } from '../lib/supabase';

interface DashboardProps {
    onLogout: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onLogout }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    const [formData, setFormData] = useState({
        goal: '',
        income: 0,
        clients: 0
    });

    // Fetch profile on mount
    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) throw error;

            setProfile(data);
            setFormData({
                goal: data.goal || '',
                income: data.income || 0,
                clients: data.clients || 0
            });
        } catch (error) {
            console.error('Error fetching profile:', error);
        } finally {
            setLoading(false);
        }
    };

    // Debounced save
    const saveProfile = useCallback(async (data: typeof formData) => {
        if (!profile) return;

        setSaving(true);
        try {
            const { error } = await supabase
                .from('user_profiles')
                .update({
                    goal: data.goal,
                    income: data.income,
                    clients: data.clients
                })
                .eq('id', profile.id);

            if (error) throw error;
            setLastSaved(new Date());
        } catch (error) {
            console.error('Error saving profile:', error);
        } finally {
            setSaving(false);
        }
    }, [profile]);

    // Auto-save with debounce
    useEffect(() => {
        if (!profile) return;

        const timer = setTimeout(() => {
            saveProfile(formData);
        }, 1000);

        return () => clearTimeout(timer);
    }, [formData, profile, saveProfile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? parseFloat(value) || 0 : value
        }));
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        onLogout();
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-emerald-900/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-cyan-900/20 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">{profile?.name}</span>
                        </h1>
                        <p className="text-gray-400">{profile?.website || 'No website set'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {saving && (
                            <span className="text-sm text-emerald-400 flex items-center gap-2">
                                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                </svg>
                                Saving...
                            </span>
                        )}
                        {lastSaved && !saving && (
                            <span className="text-sm text-gray-500">
                                Saved at {lastSaved.toLocaleTimeString()}
                            </span>
                        )}
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-white transition-all cursor-pointer"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    {/* Goal Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Your Goal</span>
                        </div>
                        <input
                            type="text"
                            name="goal"
                            value={formData.goal}
                            onChange={handleChange}
                            placeholder="e.g., 10k MRR by Q4"
                            className="w-full text-2xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600"
                        />
                    </div>

                    {/* Income Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Monthly Income</span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-500">$</span>
                            <input
                                type="number"
                                name="income"
                                value={formData.income}
                                onChange={handleChange}
                                placeholder="0"
                                className="w-full text-2xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600"
                            />
                        </div>
                    </div>

                    {/* Clients Card */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6 hover:border-emerald-500/30 transition-all group">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <span className="text-gray-400 text-sm font-medium">Total Clients</span>
                        </div>
                        <input
                            type="number"
                            name="clients"
                            value={formData.clients}
                            onChange={handleChange}
                            placeholder="0"
                            className="w-full text-2xl font-bold text-white bg-transparent border-none focus:outline-none focus:ring-0 placeholder-gray-600"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Profile Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <span className="text-sm text-gray-500">Email</span>
                            <p className="text-white">{profile?.email}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Website</span>
                            <p className="text-white">{profile?.website || 'Not set'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Member Since</span>
                            <p className="text-white">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'Unknown'}</p>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">Last Updated</span>
                            <p className="text-white">{profile?.updated_at ? new Date(profile.updated_at).toLocaleDateString() : 'Never'}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
