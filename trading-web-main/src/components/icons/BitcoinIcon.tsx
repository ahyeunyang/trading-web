import type { SVGProps } from "react";

export function BitcoinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label="Bitcoin"
      {...props}
    >
      <circle cx="12" cy="12" r="11.75" fill="#f7931a" stroke="#ffb11f" strokeWidth=".5" />
      <text
        x="12"
        y="17"
        fill="#fff"
        fontFamily="Arial, sans-serif"
        fontSize="15"
        fontWeight="700"
        textAnchor="middle"
        transform="rotate(14 12 12)"
      >
        ₿
      </text>
    </svg>
  );
}
