import { Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-trustiq-blue-900 text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
                    <div className="sm:col-span-2 lg:col-span-1">
                        <h3 className="text-xl font-bold mb-4">
                            Trust<span className="text-trustiq-teal">HQ</span>
                        </h3>
                        <p className="text-trustiq-neutral-300 text-sm leading-relaxed mb-4">
                        AI-Powered Trust at Scale
                        </p>
                        <Link to="/schedule-meeting">
                            <Button size="lg" className="bg-trustiq-teal hover:bg-trustiq-teal-600 text-trustiq-blue-900  font-semibold text-primary px-3 py-1">
                                Let's Talk
                            </Button>
                        </Link>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Options</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#problem-section" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm">
                                    Product
                                </a>
                            </li>
                            <li>
                                <a href="#use-cases" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm">
                                    Use Cases
                                </a>
                            </li>
                            <li>
                                <a href="#how-it-works" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm">
                                    How it Works
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-white">Company</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm" >
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm" >
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm" >
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-trustiq-neutral-300 hover:text-trustiq-teal transition-colors text-sm" >
                                    Case Studies
                                </a>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* <div className="mt-12 border-t border-trustiq-blue-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-trustiq-neutral-400 text-sm text-center md:text-left">
                        © 2025 Onelab Ventures Pvt Ltd
                    </div>
                    <div className="flex space-x-4">
                  
                        <a href="https://www.linkedin.com/company/onelab-ventures?leadOwner=Harish+Lodhi&leadSource=SDR+Harish&mailId=harish%40onelabventures.com" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn">
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </a>
                        <a href="mailto:info@onelabventures.com?subject=Contact%20from%20TrustHQ&body=Hello%2C%20I%27d%20like%20to%20get%20in%20touch." aria-label="Email us">
                            <Mail className="h-5 w-5" />
                        </a>

                    </div>
                </div> */}
            </div>
        </footer>
    )
}