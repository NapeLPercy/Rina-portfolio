export default function Brand({ variant = "navbar" }) {
  const wrapper =
    "flex items-baseline font-heading tracking-wide transition duration-300";

  const variants = {
    navbar: "text-3xl",
    footer: "text-2xl",
  };
  
  const textColor = variant==="navbar"?"text-ink":"text-rose-700";

  return (
    <a href="/" className={`${wrapper} ${variants[variant]}`}>
      <span className={`font-body font-semibold ${textColor}`}>LM</span>
      <span className="font-heading text-rose-700 ml-1">R</span>
    </a>
  );
}
