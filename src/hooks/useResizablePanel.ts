import { useState, useRef, useEffect, useCallback } from "react";

interface UseResizablePanelOptions {
  initialHeight?: number;
  minHeight?: number;
  maxHeightRatio?: number;
}

interface UseResizablePanelReturn {
  panelHeight: number;
  handleDragStart: (e: React.MouseEvent) => void;
  isDragging: boolean;
}

export const useResizablePanel = ({
  initialHeight = 320,
  minHeight = 200,
  maxHeightRatio = 0.8,
}: UseResizablePanelOptions = {}): UseResizablePanelReturn => {
  const [panelHeight, setPanelHeight] = useState(initialHeight);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaY = startY.current - e.clientY;
      const newHeight = Math.min(
        Math.max(startHeight.current + deltaY, minHeight),
        window.innerHeight * maxHeightRatio
      );
      setPanelHeight(newHeight);
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [minHeight, maxHeightRatio]);

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
    startHeight.current = panelHeight;
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
  }, [panelHeight]);

  return {
    panelHeight,
    handleDragStart,
    isDragging: isDragging.current,
  };
};
