import { useId } from "react";
import type { SVGProps } from "react";

export function BrandLogo(props: SVGProps<SVGSVGElement>) {
  const id = useId();
  const top = `${id}-top`;
  const bottom = `${id}-bottom`;

  return (
    <svg viewBox="0 0 135 145" fill="none" aria-hidden="true" {...props}>
      <path d="M100.986 0 0 144.988h31.005L132.514 0h-31.528Z" fill="currentColor" />
      <path d="m34.235 0 29.712 42.723-15.502 23.304L2.584 0h31.65Z" fill={`url(#${top})`} />
      <path d="M103.995 145 71.053 97.746 86.555 75.09 135 145h-31.005Z" fill={`url(#${bottom})`} />
      <defs>
        <linearGradient id={top} x1="27.129" y1="9.063" x2="69.773" y2="60.432" gradientUnits="userSpaceOnUse">
          <stop stopColor="currentColor" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".55" />
        </linearGradient>
        <linearGradient id={bottom} x1="111.1" y1="133.996" x2="58.696" y2="63.5" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6966ff" />
          <stop offset="1" stopColor="#6966ff" stopOpacity=".36" />
        </linearGradient>
      </defs>
    </svg>
  );
}
