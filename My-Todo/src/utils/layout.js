export function computeAvailableViewportHeight(topOffset, bottomPadding = 0, min = 200) {
  const viewportH = window.innerHeight || document.documentElement.clientHeight;
  return Math.max(min, viewportH - topOffset - bottomPadding);
}

export function calcListHeight(listElement, pageElement, min = 200) {
  if (!listElement) return min;
  const top = listElement.getBoundingClientRect().top;
  let bottomPadding = 0;
  if (pageElement) {
    const computedStyle = window.getComputedStyle(pageElement);
    bottomPadding = parseFloat(computedStyle.paddingBottom) || 0;
  }
  return computeAvailableViewportHeight(top, bottomPadding, min);
}
