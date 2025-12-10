interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const Logo = ({ className = "", size = "md" }: LogoProps) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12"
  };

  return (
    <div className={`${sizes[size]} ${className} relative`}>
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background circle */}
        <circle cx="24" cy="24" r="24" className="fill-primary" />
        
        {/* Brain/Mind icon stylized */}
        <g className="fill-primary-foreground">
          {/* Left hemisphere */}
          <path d="M14 24c0-5.5 4.5-10 10-10v4c-3.3 0-6 2.7-6 6s2.7 6 6 6v4c-5.5 0-10-4.5-10-10z" />
          
          {/* Right hemisphere */}
          <path d="M34 24c0 5.5-4.5 10-10 10v-4c3.3 0 6-2.7 6-6s-2.7-6-6-6v-4c5.5 0 10 4.5 10 10z" />
          
          {/* Connection line */}
          <rect x="23" y="14" width="2" height="20" rx="1" />
          
          {/* Heart accent */}
          <path d="M24 32l-1.5-1.4C19.4 27.8 17 25.6 17 23c0-2.2 1.8-4 4-4 1.2 0 2.4.5 3 1.4.6-.9 1.8-1.4 3-1.4 2.2 0 4 1.8 4 4 0 2.6-2.4 4.8-5.5 7.6L24 32z" className="fill-primary-foreground/90" />
        </g>
      </svg>
    </div>
  );
};

export default Logo;
