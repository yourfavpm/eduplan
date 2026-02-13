"use client";

import { useState } from 'react';
import { CheckCircle2, Calendar, Mail, Phone, User } from 'lucide-react';

const steps = [
    {
        icon: CheckCircle2,
        title: "Know If You Qualify",
        description: "We evaluate your academic background and eligibility upfront."
    },
    {
        icon: CheckCircle2,
        title: "Avoid Costly Application Mistakes",
        description: "We guide you before you submit anything."
    },
    {
        icon: CheckCircle2,
        title: "Understand Your Visa Chances",
        description: "Get honest advice about your pathway."
    },
    {
        icon: CheckCircle2,
        title: "Build a Timeline That Works",
        description: "Know your intake, deadlines, and next milestones."
    },
    {
        icon: CheckCircle2,
        title: "Get Personal Guidance — Not Generic Advice",
        description: "Speak directly with an experienced advisor."
    }
];

export function NextStepsSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
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
            setFormData({ name: '', email: '', phone: '', preferredDate: '', message: '' });

            // Reset success message after 3 seconds
            setTimeout(() => setSubmitStatus('idle'), 3000);
        }, 1000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <section className="py-20 md:py-28 bg-white">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
                    {/* Left: Content */}
                    <div>
                        <div className="mb-12">
                            <h2 className="font-semibold text-ink mb-4">
                                Stop Guessing. Start Planning.
                            </h2>
                            <p className="text-muted leading-relaxed">
                                A 30-minute consultation could save you months of confusion.
                            </p>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                return (
                                    <div
                                        key={index}
                                        className="flex gap-4 group"
                                    >
                                        {/* Number & Icon */}
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center group-hover:bg-brand-100 transition-colors">
                                                <Icon className="w-6 h-6 text-brand-700" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 pt-1">
                                            <h3 className="font-semibold text-ink mb-1">
                                                {step.title}
                                            </h3>
                                            <p className="text-muted text-sm leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="lg:sticky lg:top-24">
                        <div className="bg-surface rounded-2xl p-8 border border-border shadow-soft">
                            <div className="mb-6">
                                <h3 className="font-semibold text-ink mb-2">
                                    Schedule Free Consultation
                                </h3>
                                <p className="text-sm text-muted">
                                    Get personalized guidance from our expert advisors
                                </p>
                            </div>

                            {submitStatus === 'success' ? (
                                <div className="bg-accent-50 border border-accent-200 rounded-lg p-6 text-center">
                                    <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Calendar className="w-6 h-6 text-accent-700" />
                                    </div>
                                    <p className="font-semibold text-ink mb-1">Request Received!</p>
                                    <p className="text-sm text-muted">We'll contact you within 24 hours.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                                            Full Name *
                                        </label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
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
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                required
                                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    {/* Preferred Date */}
                                    <div>
                                        <label htmlFor="preferredDate" className="block text-sm font-medium text-ink mb-2">
                                            Preferred Date
                                        </label>
                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted" />
                                            <input
                                                type="date"
                                                id="preferredDate"
                                                name="preferredDate"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                className="w-full pl-11 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                                            Message (Optional)
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us about your study abroad goals..."
                                        />
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-brand-700 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-transform"
                                    >
                                        {isSubmitting ? 'Sending...' : 'Schedule Consultation'}
                                    </button>

                                    <p className="text-xs text-muted text-center">
                                        By submitting, you agree to our privacy policy
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
