import type { SVGProps } from "react";

type IconPlaceholderProps = SVGProps<SVGSVGElement> & {
  label?: string;
};

/**
 * 임시 아이콘입니다.
 * 다운로드한 SVG의 path를 전달받으면 이 컴포넌트를 실제 아이콘으로 교체합니다.
 * SVG의 fill/stroke는 currentColor를 사용해야 CSS에서 색상을 변경할 수 있습니다.
 */
export function IconPlaceholder({
  label = "icon",
  ...props
}: IconPlaceholderProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-label={label}
      role="img"
      {...props}
    >
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        stroke="currentColor"
      />
      <path d="M8 12h8M12 8v8" stroke="currentColor" strokeLinecap="round" />
    </svg>
  );
}
