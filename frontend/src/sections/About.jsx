import { useEffect, useState } from "react";
import { PenLine, Megaphone, HeartHandshake, Sparkles } from "lucide-react";
import WhyCard from "../components/ui/WhyCard";
import img1 from "../assets/rinah-board.jpeg";
import img2 from "../assets/rinah-sitted.jpeg"; // replace
import img3 from "../assets/group.jpeg"; // replace

export default function About() {
  const images = [img1, img2, img3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 },
    );

    const section = document.getElementById("about");
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(id);
  }, [images.length]);

  return (
    <section
      id="about"
      className="relative bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-32 space-y-20">
        {/* Top: Text + Rotating Image Grid */}
        <div
          className={`grid gap-12 lg:gap-16 lg:grid-cols-2 items-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Text Content */}
          <div className="space-y-6">
            {/* Section Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-100 to-plum-100 border border-rose-200/60 shadow-sm">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <span className="font-body text-sm font-semibold bg-gradient-to-r from-rose-700 to-plum-700 bg-clip-text text-transparent">
                About Me
              </span>
            </div>

            <div className="space-y-5">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl text-ink leading-[1.1] tracking-tight">
                Lekoloane Mankoele{" "}
                <span className="bg-gradient-to-r from-rose-500 via-rose-400 to-plum-500 bg-clip-text text-transparent">
                  Rina
                </span>
              </h2>

              <div className="space-y-4 text-lg text-ink/70 font-body leading-relaxed">
                <p className="animate-[fadeSlideIn_0.8s_ease-out_0.2s_backwards]">
                  I am a purpose-driven writer and campaigner committed to
                  shaping conversations that matter. Through thoughtful
                  storytelling and strategic advocacy, I work to amplify voices,
                  challenge injustice, and inspire meaningful action within
                  communities.
                </p>

                <p className="animate-[fadeSlideIn_0.8s_ease-out_0.4s_backwards]">
                  My work blends research, empathy, and clarity — crafting
                  messages that are not only powerful, but responsible and
                  human. Whether leading campaigns, supporting petitions, or
                  engaging public audiences, I believe words can move people —
                  and people can move change.
                </p>
              </div>

              {/* Role Tags with Stagger */}
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { label: "Writer", color: "plum" },
                  { label: "Campaigner", color: "rose" },
                  { label: "Advocate", color: "plum" },
                ].map((tag, i) => (
                  <span
                    key={tag.label}
                    className={`group px-5 py-2.5 rounded-full text-sm font-body font-semibold
                      ${
                        tag.color === "rose"
                          ? "bg-gradient-to-br from-rose-100 to-rose-200/60 text-rose-700 border-2 border-rose-300/40"
                          : "bg-gradient-to-br from-plum-100 to-plum-200/60 text-plum-700 border-2 border-plum-300/40"
                      }
                      shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default
                      animate-[fadeSlideIn_0.6s_ease-out_backwards]`}
                    style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="relative animate-[fadeSlideIn_0.8s_ease-out_0.3s_backwards]">
            <div className="group relative rounded-3xl bg-white shadow-[0_20px_70px_rgba(0,0,0,0.12)] p-3 transition-all duration-500 hover:shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-2xl aspect-[4/3]">
                {/* Impact Badge 
                <div className="absolute top-6 left-6 z-20">
                  <div className="flex items-center gap-2.5 bg-white/95 backdrop-blur-xl border-2 border-plum-200/60 rounded-2xl px-4 py-2.5 shadow-lg">
                    <span className="text-2xl font-heading font-bold bg-gradient-to-r from-plum-600 to-rose-600 bg-clip-text text-transparent">
                      90+
                    </span>
                    <div className="h-8 w-px bg-plum-200" />
                    <span className="text-sm font-body font-medium text-ink/70">
                      Projects
                    </span>
                  </div>
                </div>*/}

                {/* Images with Crossfade */}
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Rinah showcase ${i + 1}`}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                      i === currentIndex
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-105"
                    }`}
                  />
                ))}

                {/* Elegant Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`transition-all duration-500 rounded-full ${
                      i === currentIndex
                        ? "w-8 h-2 bg-gradient-to-r from-rose-500 to-plum-500"
                        : "w-2 h-2 bg-plum-200 hover:bg-plum-300"
                    }`}
                    aria-label={`View image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Me Section */}
        <div
          className={`space-y-10 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          }`}
        >
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <h3 className="font-heading text-4xl md:text-5xl text-ink">
              Why Work With{" "}
              <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
                Me
              </span>
            </h3>
            <p className="text-lg font-body text-ink/70 leading-relaxed">
              Three core strengths that define my approach to impactful
              storytelling, authentic advocacy, and meaningful campaign work.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-3">
            <WhyCard
              icon={<PenLine className="h-6 w-6" />}
              title="Impactful Writing"
              text="Clear, compelling storytelling that connects with people and drives action."
              gradient="from-plum-500 to-plum-600"
              bgGradient="from-plum-50 to-plum-100/60"
              delay="0.1s"
            />
            <WhyCard
              icon={<Megaphone className="h-6 w-6" />}
              title="Campaign Experience"
              text="Hands-on experience supporting campaigns, petitions, and community engagement."
              gradient="from-rose-500 to-rose-600"
              bgGradient="from-rose-50 to-rose-100/60"
              delay="0.2s"
            />
            <WhyCard
              icon={<HeartHandshake className="h-6 w-6" />}
              title="Authentic Voice"
              text="A grounded, human voice focused on real issues and meaningful outcomes."
              gradient="from-plum-500 to-rose-500"
              bgGradient="from-plum-50 to-rose-100/60"
              delay="0.3s"
            />
          </div>
        </div>
      </div>

      {/* Keyframe Animations */}
      <style>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
