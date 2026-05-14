interface RadialGradientProps {
  className?: string;
}

export function RadialGradient({ className = '' }: RadialGradientProps) {
  return (
    <div 
      className={`absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none ${className}`}
      style={{
        background: 'radial-gradient(50% 50% at 50% 50%, rgba(33, 150, 243, 0.15) 0%, rgba(33, 150, 243, 0) 100%)'
      }}
    />
  );
}
