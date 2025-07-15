
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const desktopNavItems = [
    { href: "#", icon: "🧠", label: "Fundamentos" },
    { href: "#", icon: "📚", label: "Métodos" },
    { href: "#", icon: "💻", label: "Tecnología" },
    { href: "#", icon: "✏️", label: "Grafomotricidad" },
    { href: "#", icon: "✨", label: "Asistente de IA", active: true },
    { href: "#", icon: "🗂️", label: "Recursos" },
];

const mobileNavItems = [
    { href: "#", label: "Inicio"},
    { href: "#", label: "Fundamentos Neuropsicológicos"},
    { href: "#", label: "Métodos de Enseñanza"},
    { href: "#", label: "Herramientas Digitales"},
    { href: "#", label: "Grafomotricidad"},
    { href: "#", label: "Asistente de IA", active: true},
    { href: "#", label: "Bibliografía"},
];

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
                <a href="#" className="text-xl font-bold text-gris-oscuro font-poppins">Playbook de Lectoescritura</a>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="md:hidden text-3xl text-gris-oscuro"
                    aria-label="Toggle menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
                <ul className="hidden md:flex items-center space-x-6 text-sm">
                    {desktopNavItems.map(item => (
                         <li key={item.label}>
                            <a href={item.href} className={`nav-link flex items-center space-x-2 text-gray-600 hover:text-magenta-principal ${item.active ? 'active' : ''}`}>
                                <span className="emoji-icon">{item.icon}</span>
                                <span>{item.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Menú Móvil */}
            <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
                <ul className="flex flex-col space-y-4">
                    {mobileNavItems.map(item => (
                        <li key={item.label}>
                          <a href={item.href} className={`nav-link block py-2 text-gray-600 ${item.active ? 'active' : ''}`}>
                            {item.label}
                          </a>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    </header>
  );
};
