interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

const sizes = {
  sm: { box: "h-7 w-7", icon: "h-3.5 w-3.5", text: "text-base" },
  md: { box: "h-8 w-8", icon: "h-4 w-4", text: "text-lg" },
  lg: { box: "h-10 w-10", icon: "h-5 w-5", text: "text-xl" },
};

export default function Logo({ className = "", size = "md", showText = true }: LogoProps) {
  const s = sizes[size];
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${s.box} rounded-lg bg-gradient-premium flex items-center justify-center flex-shrink-0`}>
        <svg viewBox="0 0 32 32" className={s.icon} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-6 2 L-2 -5 L0 0 L2 -5 L6 2" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(16, 14)"/>
          <path d="M-4 -1 L-4 6" stroke="white" strokeWidth="2" strokeLinecap="round" transform="translate(16, 14)"/>
          <path d="M4 -1 L4 6" stroke="white" strokeWidth="2" strokeLinecap="round" transform="translate(16, 14)"/>
          <text x="16" y="27" textAnchor="middle" fill="white" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="5">3</text>
        </svg>
      </div>
      {showText && <span className={`font-bold ${s.text} text-white`}>Write3</span>}
    </div>
  );
}
