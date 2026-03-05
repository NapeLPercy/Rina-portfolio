import Brand from "./Brand";
import { Mail, Facebook } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import img from "../assets/whatsapp.png";
import img1 from "../assets/tiktok.png";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 space-y-10">
        {/* Top section */}
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand + Description */}
          <div>
            <Brand variant="footer" />
            <p className="mt-4 text-sm text-white/70 font-body leading-relaxed">
              Writing with purpose. Campaigning with impact. Advocating for
              meaningful change through voice and action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-white/70 font-body">
              <li>
                <HashLink
                  to="/#about"
                  className="hover:text-rose-400 transition"
                >
                  About
                </HashLink>
              </li>
              <li>
                <a
                  href="/blog-posts"
                  className="hover:text-rose-400 transition"
                >
                  Blog
                </a>
              </li>

              <li>
                <a href="/petitions" className="hover:text-rose-400 transition">
                  Petitions
                </a>
              </li>

              <li>
                <a
                  href="/contact-me"
                  className="hover:text-rose-400 transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h4 className="font-heading text-lg mb-4">Connect</h4>

            <div className="flex items-center gap-4">
              <a
                href="mailto:rinalekoloane@gmail.com"
                className="h-10 w-10 rounded-xl bg-white/10 hover:bg-rose-600 transition flex items-center justify-center"
              >
                <Mail className="h-4 w-4" />
              </a>

              <a
                href="https://www.tiktok.com/@emelela_"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-white/10 hover:bg-rose-600 transition flex items-center justify-center"
              >
                <img src={img1} alt="TikTok link" className="h-6 w-6" />
              </a>

              <a
                href="https://www.facebook.com/share/14UQdoboam4/"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-white/10 hover:bg-rose-600 transition flex items-center justify-center"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://wa.me/27848103855"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-white/10 hover:bg-rose-600 transition flex items-center justify-center"
              >
                <img src={img} alt="WhatsApp link" className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 text-center text-xs text-white/50 font-body">
          © {new Date().getFullYear()} Lekoloane Mankoele Rina. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
