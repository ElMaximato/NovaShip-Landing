export function FloatingLights() {
  const lights = [
    { size: 4, left: '8%', delay: '0s', duration: '38s', color: '#8DC63F', opacity: 0.35 },
    { size: 3, left: '18%', delay: '4s', duration: '45s', color: '#8DC63F', opacity: 0.25 },
    { size: 5, left: '30%', delay: '8s', duration: '32s', color: '#2D6E7E', opacity: 0.3 },
    { size: 2, left: '42%', delay: '2s', duration: '50s', color: '#8DC63F', opacity: 0.2 },
    { size: 4, left: '55%', delay: '12s', duration: '40s', color: '#2D6E7E', opacity: 0.25 },
    { size: 3, left: '65%', delay: '6s', duration: '36s', color: '#8DC63F', opacity: 0.35 },
    { size: 6, left: '75%', delay: '10s', duration: '48s', color: '#8DC63F', opacity: 0.2 },
    { size: 3, left: '85%', delay: '3s', duration: '42s', color: '#2D6E7E', opacity: 0.3 },
    { size: 4, left: '92%', delay: '14s', duration: '35s', color: '#8DC63F', opacity: 0.25 },
    { size: 2, left: '50%', delay: '9s', duration: '55s', color: '#2D6E7E', opacity: 0.2 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lights.map((light, i) => (
        <span
          key={i}
          className="absolute rounded-full animate-float-light"
          style={{
            width: `${light.size}px`,
            height: `${light.size}px`,
            left: light.left,
            bottom: '-10%',
            backgroundColor: light.color,
            opacity: light.opacity,
            filter: `blur(${light.size > 4 ? 1 : 0.5}px)`,
            animationDelay: light.delay,
            animationDuration: light.duration,
            boxShadow: `0 0 ${light.size * 2}px ${light.color}`,
          }}
        />
      ))}
    </div>
  );
}