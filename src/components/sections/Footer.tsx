import { Heart, Github, Linkedin, Twitter } from "lucide-react";
import { personalInfo, navItems } from "@/data/portfolio-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800 py-8 sm:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          {/* Logo & Description */}
          <div>
            <a href="#home" className="text-xl sm:text-2xl font-bold text-white">
              V<span className="text-blue-400">.</span>
            </a>
            <p className="text-xs sm:text-sm text-zinc-500 mt-3 max-w-xs">
              Building beautiful, performant mobile experiences that make a difference.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Quick Links</h4>
            <nav className="flex flex-col gap-2">
              {navItems.slice(0, 5).map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-xs sm:text-sm text-zinc-500 hover:text-white transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-4">Connect</h4>
            <div className="flex gap-2">
              {[
                { icon: Github, href: personalInfo.social.github },
                { icon: Linkedin, href: personalInfo.social.linkedin },
                { icon: Twitter, href: personalInfo.social.twitter },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center hover:border-zinc-600 hover:bg-zinc-800 transition-colors"
                >
                  <social.icon className="w-4 h-4 text-zinc-400" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-zinc-500">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-zinc-500 flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
