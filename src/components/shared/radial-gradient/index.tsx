interface RadialGradientProps {
  className?: string;
}

export function RadialGradient({ className = '' }: RadialGradientProps) {
  return (
    <div 
      className={`absolute inset-y-0 right-0 translate-x-1/2 w-[600px] pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0) 100%)'
      }}
    />
  );
}
