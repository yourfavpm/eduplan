import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
    const regions = [
        { name: "All Regions", href: "/regions" },
        { name: "Northern Africa", href: "/regions/northern-africa" },
        { name: "Southern Africa", href: "/regions/southern-africa" },
        { name: "East Africa", href: "/regions/east-africa" },
        { name: "West Africa", href: "/regions/west-africa" },
        { name: "Central Africa", href: "/regions/central-africa" },
        { name: "Asia", href: "/regions/asia" },
    ];

    return (
        <footer className="border-t mt-auto bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-1">
                        <div className="mb-4">
                            <Image
                                src="/eduplan.png"
                                alt="EduPlan360"
                                width={160}
                                height={45}
                                className="h-10 w-auto brightness-0 invert"
                            />
                        </div>
                        <p className="text-sm text-brand-100 leading-relaxed">
                            Expert guidance for your international education journey.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-brand-100 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-700/50">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-brand-100 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-700/50">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-brand-100 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-700/50">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-brand-100 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-700/50">
                                <Linkedin className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-brand-100 hover:text-white transition-colors p-2 rounded-full hover:bg-brand-700/50">
                                <Youtube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Contact</h4>
                        <ul className="space-y-4 text-sm text-brand-100">
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-brand-300" />
                                <span>65A, Aba Johnson Street, Akora Villa Estate, Adeniyi Jones, Ikeja, Lagos</span>
                            </li>
                            <li className="flex gap-3">
                                <MapPin className="w-5 h-5 flex-shrink-0 text-brand-300" />
                                <span>7644, MapleFord Blvd, Regina S4Y 0H1, Canada</span>
                            </li>
                            <li className="flex gap-3">
                                <Phone className="w-5 h-5 flex-shrink-0 text-brand-300" />
                                <div className="flex flex-col">
                                    <a href="tel:+2348052829316" className="hover:text-white transition-colors">+234-8052829316</a>
                                    <a href="tel:+2348027442902" className="hover:text-white transition-colors">+234-8027442902</a>
                                </div>
                            </li>
                            <li className="flex gap-3">
                                <Mail className="w-5 h-5 flex-shrink-0 text-brand-300" />
                                <a href="mailto:info@eduplan360.com" className="hover:text-white transition-colors">info@eduplan360.com</a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-brand-100 hover:text-white transition-colors">About</Link></li>
                            <li><Link href="/blog" className="text-brand-100 hover:text-white transition-colors">Blog</Link></li>
                            <li><Link href="/events" className="text-brand-100 hover:text-white transition-colors">Events</Link></li>
                            <li><Link href="/contact" className="text-brand-100 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Resources</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/english-test" className="text-brand-100 hover:text-white transition-colors">English Test</Link></li>
                            <li><Link href="/associates" className="text-brand-100 hover:text-white transition-colors">Associates</Link></li>
                            <li><Link href="/become-associate" className="text-brand-100 hover:text-white transition-colors">Become an Associate</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/policies/privacy" className="text-brand-100 hover:text-white transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/policies/terms" className="text-brand-100 hover:text-white transition-colors">Terms of Service</Link></li>
                            <li><Link href="/policies/refund" className="text-brand-100 hover:text-white transition-colors">Refund Policy</Link></li>
                            <li><Link href="/policies/cookies" className="text-brand-100 hover:text-white transition-colors">Cookie Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Regions Section */}
                <div className="mt-12 pt-8 border-t border-brand-700">
                    <h4 className="font-semibold mb-4 text-center text-white">Regions We Serve</h4>
                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                        {regions.map((region) => (
                            <Link
                                key={region.href}
                                href={region.href}
                                className="text-sm text-brand-100 hover:text-white transition-colors font-medium"
                            >
                                {region.name}
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="border-t border-brand-700 mt-8 pt-8 text-center text-sm text-brand-200">
                    <p>&copy; {new Date().getFullYear()} EduPlan360. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
