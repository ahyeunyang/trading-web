import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { createPortal } from "react-dom";

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  title?: ReactNode;
  className?: string;
  tooltipClassName?: string;
  portal?: boolean;
  placement?: "auto" | "top" | "bottom";
};

export function Tooltip({ children, content, title, className = "", tooltipClassName = "", portal = false, placement = "auto" }: TooltipProps) {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const popRef = useRef<HTMLSpanElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<CSSProperties>({});
  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    const pop = popRef.current;
    if (!trigger || !pop) return;
    const triggerRect = trigger.getBoundingClientRect();
    const popRect = pop.getBoundingClientRect();
    const left = Math.min(
      window.innerWidth - popRect.width - 8,
      Math.max(8, triggerRect.right - popRect.width),
    );
    const preferredTop = triggerRect.top - popRect.height - 8;
    const showBelow = placement === "bottom" || (placement === "auto" && preferredTop < 8);
    setPosition({
      left,
      top: showBelow ? triggerRect.bottom + 8 : preferredTop,
    });
  }, [placement]);

  useLayoutEffect(() => {
    if (portal && isVisible) updatePosition();
  }, [isVisible, portal, updatePosition]);

  useEffect(() => {
    if (!portal || !isVisible) return;
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isVisible, portal, updatePosition]);

  const pop = (
    <span
      ref={popRef}
      className={`hint__pop${tooltipClassName ? ` ${tooltipClassName}` : ""}${portal ? " hint__pop--portal" : ""}${isVisible ? " is-visible" : ""}`}
      role="tooltip"
      style={portal ? position : undefined}
    >
      {title && <strong className="hint__pop-title">{title}</strong>}
      <span className="hint__pop-content">{content}</span>
    </span>
  );

  return (
    <span
      ref={triggerRef}
      className={`hint${className ? ` ${className}` : ""}`}
      tabIndex={0}
      onMouseEnter={() => portal && setIsVisible(true)}
      onMouseLeave={() => portal && setIsVisible(false)}
      onFocus={() => portal && setIsVisible(true)}
      onBlur={() => portal && setIsVisible(false)}
    >
      {children}
      {portal ? createPortal(pop, document.body) : pop}
    </span>
  );
}
