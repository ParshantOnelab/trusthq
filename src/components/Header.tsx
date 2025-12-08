import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

export default function Header() {
    return (
        <header className="bg-trustiq-blue-900 text-white sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">
                        Trust<span className="text-trustiq-teal">HQ</span>
                    </span>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="/#problem-section" className="text-white/80 hover:text-white transition-colors font-medium font-primary">
                        Product
                    </a>
                    <a href="/#use-cases" className="text-white/80 hover:text-white transition-colors font-medium font-primary">
                        Use Cases
                    </a>
                    <a href="/#how-it-works" className="text-white/80 hover:text-white transition-colors font-medium font-primary">
                        How it Works
                    </a>
                </nav>
                <div>
                    <Link to="/schedule-meeting">
                        <Button size="lg" className="bg-white text-trustiq-blue-900 hover:bg-white/80 px-3 py-2  font-primary font-semibold text-primary">
                            Book Live Demo
                            {/* <ChevronRight className="ml-2 h-4 w-4" /> */}
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    )
}