export default function WhyCard({
  icon,
  title,
  text,
  gradient,
  bgGradient,
  delay,
}) {
  return (
    <div
      className="group relative rounded-3xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-8 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] hover:-translate-y-2 animate-[fadeSlideIn_0.8s_ease-out_backwards] overflow-hidden"
      style={{ animationDelay: delay }}
    >
      {/* Hover Gradient Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Content */}
      <div className="relative z-10 space-y-4">
        {/* Icon Container */}
        <div
          className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}
        >
          <div className="text-white">{icon}</div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h4 className="font-heading text-xl text-ink group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-ink group-hover:to-ink/80 group-hover:bg-clip-text transition-all duration-300">
            {title}
          </h4>
          <p className="font-body text-ink/70 leading-relaxed">{text}</p>
        </div>
      </div>

      {/* Decorative corner accent */}
      <div
        className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-500`}
      />
    </div>
  );
}
