import { useEffect } from "react";

interface UseScrollToCitationOptions {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
}

export const useScrollToCitation = (
  citationId: string | null | undefined,
  options: UseScrollToCitationOptions = {}
): void => {
  const { behavior = "smooth", block = "center" } = options;

  useEffect(() => {
    if (!citationId) return;

    const citationElement = document.querySelector(
      `[data-citation-id="${citationId}"]`
    );

    if (citationElement) {
      citationElement.scrollIntoView({ behavior, block });
    }
  }, [citationId, behavior, block]);
};
