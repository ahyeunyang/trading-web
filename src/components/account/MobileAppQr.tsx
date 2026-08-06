import { BrandLogo } from "../icons/BrandLogo";

export function MobileAppQr({ className = "" }: { className?: string }) {
  const modules = Array.from({ length: 45 * 45 }, (_, index) => {
    const x = index % 45;
    const y = Math.floor(index / 45);
    const finder = (x < 7 && y < 7) || (x > 37 && y < 7) || (x < 7 && y > 37);
    const center = x >= 16 && x <= 28 && y >= 15 && y <= 29;
    if (finder || center || (x * 13 + y * 7 + x * y * 3) % 7 > 2) return null;
    return <rect key={index} x={x * 7 + 21} y={y * 7 + 21} width="4.8" height="4.8" rx="1.2" />;
  });

  return (
    <svg
      className={`mobile-app-qr${className ? ` ${className}` : ""}`}
      viewBox="0 0 360 360"
      aria-label="AYXX mobile app QR code"
    >
      <g fill="currentColor">{modules}</g>
      {[[20, 20], [298, 20], [20, 298]].map(([x, y]) => (
        <g key={`${x}-${y}`} fill="none" stroke="currentColor" strokeWidth="7">
          <rect x={x} y={y} width="42" height="42" rx="6" />
          <rect x={x + 12} y={y + 12} width="18" height="18" rx="2" fill="currentColor" stroke="none" />
        </g>
      ))}
      <BrandLogo className="mobile-app-qr__brand" x="129.7" y="116.3" width="100.575" height="108.025" />
    </svg>
  );
}
