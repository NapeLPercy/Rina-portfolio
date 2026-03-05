export default function Button({ children, variant = "primary", onClick }) {
  const base =
    "group relative px-6 py-3 rounded-2xl font-body text-sm font-semibold tracking-wide transition-all duration-500 overflow-hidden focus:outline-none focus:ring-4 focus:ring-plum-300/50 focus:ring-offset-2";

  const variants = {
    primary:
      "bg-plum-900 text-white shadow-[0_8px_30px_rgb(60,27,115,0.3)] hover:shadow-[0_20px_60px_rgb(60,27,115,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_5px_20px_rgb(60,27,115,0.3)]",

    login:
      "bg-plum-900 text-white shadow-[0_8px_30px_rgb(60,27,115,0.3)] hover:shadow-[0_20px_60px_rgb(60,27,115,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[0_5px_20px_rgb(60,27,115,0.3)]",

    logout:
      "bg-white text-rose-700 border-2 border-rose-300 shadow-[0_8px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(230,38,119,0.15)] hover:-translate-y-1 hover:border-rose-400 active:translate-y-0",
  };

  return (
    <button onClick={onClick} className={`${base} ${variants[variant]}`}>
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
      
      {/* Glow effect on hover */}
      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl bg-white/20" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {children}
      </span>
    </button>
  );
}