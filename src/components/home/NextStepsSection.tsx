"use client";

import { useState } from 'react';
import { Calendar, Mail, Phone, User, Globe, GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react';

export function NextStepsSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        countryOfInterest: '',
        studyLevel: '',
        courseOfInterest: '',
        preferredDate: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitStatus('success');
            setFormData({
                name: '', email: '', phone: '',
                countryOfInterest: '', studyLevel: '', courseOfInterest: '',
                preferredDate: '', message: ''
            });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-20 md:py-28 bg-white" id="consultation">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="font-semibold text-ink mb-4 relative inline-block">
                            Stop Guessing. Start Planning.
                            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-brand-500 rounded-full" />
                        </h2>
                        <p className="text-muted leading-relaxed max-w-2xl mx-auto pt-4">
                            A 30-minute consultation could save you months of confusion. We evaluate your academic background and eligibility upfront.
                        </p>
                    </div>

                    <div className="bg-surface rounded-[2.5rem] p-8 md:p-12 border border-border shadow-soft relative overflow-hidden">
                        {/* Decorative Background */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent-50 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-8 text-center">
                                <h3 className="text-2xl font-bold text-ink mb-2">
                                    Schedule Free Consultation
                                </h3>
                                <p className="text-sm text-muted">
                                    Get personalized guidance from our expert advisors
                                </p>
                            </div>

                            {submitStatus === 'success' ? (
                                <div className="bg-accent-50 border border-accent-200 rounded-2xl p-8 text-center max-w-md mx-auto">
                                    <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <CheckCircle2 className="w-8 h-8 text-accent-700" />
                                    </div>
                                    <h4 className="text-xl font-bold text-ink mb-2">Request Received!</h4>
                                    <p className="text-muted mb-6">We'll be in touch within 24 hours to schedule your session.</p>
                                    <button
                                        onClick={() => setSubmitStatus('idle')}
                                        className="text-brand-700 font-semibold hover:underline"
                                    >
                                        Book another consultation
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                                                Full Name *
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                                                Email Address *
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-medium text-ink mb-2">
                                                Phone Number *
                                            </label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <input
                                                    type="tel"
                                                    id="phone"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                    placeholder="+234..."
                                                />
                                            </div>
                                        </div>

                                        {/* Country of Interest */}
                                        <div>
                                            <label htmlFor="countryOfInterest" className="block text-sm font-medium text-ink mb-2">
                                                Country of Interest
                                            </label>
                                            <div className="relative">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <select
                                                    id="countryOfInterest"
                                                    name="countryOfInterest"
                                                    value={formData.countryOfInterest}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all appearance-none"
                                                >
                                                    <option value="">Select a country</option>
                                                    <option value="UK">United Kingdom</option>
                                                    <option value="USA">United States</option>
                                                    <option value="Canada">Canada</option>
                                                    <option value="Australia">Australia</option>
                                                    <option value="Ireland">Ireland</option>
                                                    <option value="Germany">Germany</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Study Level */}
                                        <div>
                                            <label htmlFor="studyLevel" className="block text-sm font-medium text-ink mb-2">
                                                Study Level
                                            </label>
                                            <div className="relative">
                                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <select
                                                    id="studyLevel"
                                                    name="studyLevel"
                                                    value={formData.studyLevel}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all appearance-none"
                                                >
                                                    <option value="">Select level</option>
                                                    <option value="Undergraduate">Undergraduate (Bachelors)</option>
                                                    <option value="Postgraduate">Postgraduate (Masters)</option>
                                                    <option value="PhD">PhD / Doctorate</option>
                                                    <option value="Vocational">Vocational / Diploma</option>
                                                    <option value="High School">High School / Foundation</option>
                                                </select>
                                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                    <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Course of Interest */}
                                        <div>
                                            <label htmlFor="courseOfInterest" className="block text-sm font-medium text-ink mb-2">
                                                Course of Interest
                                            </label>
                                            <div className="relative">
                                                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                                <input
                                                    type="text"
                                                    id="courseOfInterest"
                                                    name="courseOfInterest"
                                                    value={formData.courseOfInterest}
                                                    onChange={handleChange}
                                                    className="w-full pl-12 pr-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                    placeholder="e.g. Computer Science"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                                            Additional Details (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3.5 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us about your goals or any specific questions..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-700 text-white py-3 px-6 rounded-xl font-medium text-sm md:text-lg md:font-semibold hover:bg-brand-800 transition-all shadow-none md:shadow-lg md:shadow-brand-700/20 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                                    >
                                        {isSubmitting ? 'Sending Request...' : 'Schedule My Free Consultation'}
                                    </button>

                                    <p className="text-xs text-muted text-center">
                                        Your information is secure. By submitting, you agree to our privacy policy.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
