import { useEffect, useLayoutEffect, useRef, useState } from "react";

interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  className?: string;
}

const MARGIN = 8;

// Mouse: shows on hover. Touch: the first tap shows the tooltip and the next
// tap goes through to the child, so anything can be read before it is used.
export function Tooltip({ children, content, className }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const pointerType = useRef("mouse");

  // Place beside the anchor (left, then right), else above or below it,
  // and keep the whole tooltip inside the viewport.
  useLayoutEffect(() => {
    if (!isVisible || !anchorRef.current || !tooltipRef.current) return;
    const anchor = anchorRef.current.getBoundingClientRect();
    const tip = tooltipRef.current.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let x: number;
    let y: number;
    if (anchor.left - tip.width - MARGIN >= 0) {
      x = anchor.left - tip.width - MARGIN;
      y = anchor.top;
    } else if (anchor.right + tip.width + MARGIN <= vw) {
      x = anchor.right + MARGIN;
      y = anchor.top;
    } else {
      x = anchor.left + anchor.width / 2 - tip.width / 2;
      y =
        anchor.top - tip.height - MARGIN >= 0
          ? anchor.top - tip.height - MARGIN
          : anchor.bottom + MARGIN;
    }
    x = Math.round(Math.max(MARGIN, Math.min(x, vw - tip.width - MARGIN)));
    y = Math.round(Math.max(MARGIN, Math.min(y, vh - tip.height - MARGIN)));

    if (!position || position.x !== x || position.y !== y) {
      setPosition({ x, y });
    }
  });

  // Close on a tap elsewhere, or when anything scrolls under the tooltip
  useEffect(() => {
    if (!isVisible) return;
    const hide = () => setIsVisible(false);
    const handlePointerDown = (e: PointerEvent) => {
      if (!anchorRef.current?.contains(e.target as Node)) hide();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("scroll", hide, true);
    window.addEventListener("resize", hide);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("scroll", hide, true);
      window.removeEventListener("resize", hide);
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) setPosition(null);
  }, [isVisible]);

  return (
    <>
      <div
        ref={anchorRef}
        className={className}
        onPointerDown={(e) => {
          pointerType.current = e.pointerType;
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") setIsVisible(true);
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") setIsVisible(false);
        }}
        onClickCapture={(e) => {
          if (pointerType.current === "mouse" || isVisible) return;
          e.preventDefault();
          e.stopPropagation();
          setIsVisible(true);
        }}
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className="fixed z-50 pointer-events-none max-w-[calc(100vw-1rem)]"
          style={{
            left: `${position?.x ?? 0}px`,
            top: `${position?.y ?? 0}px`,
            visibility: position ? "visible" : "hidden",
          }}
        >
          {content}
        </div>
      )}
    </>
  );
}
