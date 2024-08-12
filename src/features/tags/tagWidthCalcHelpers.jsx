import { createRoot } from 'react-dom/client';
import Tag from './Tag'; // Adjust the path to your Tag component

const renderTagToMeasure = (tagName) => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.style.whiteSpace = 'nowrap';

    document.body.appendChild(container);
    const root = createRoot(container);

    const observer = new MutationObserver(() => {
      const tagElement = container.firstChild;
      if (tagElement) {
        const width = tagElement.offsetWidth;

        observer.disconnect();
        root.unmount();
        document.body.removeChild(container);

        resolve(width);
      }
    });

    observer.observe(container, { childList: true });

    root.render(<Tag name={tagName} />);
  });
};

export const getTagStyles = async (tagName) => {
  const width = await renderTagToMeasure(tagName);
  return { width };
};

const calculateTextWidth = (text, font) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

export const calculateTagWidth = (tagName, font, padding) => {
  const textWidth = calculateTextWidth(tagName, font);
  const totalWidth = textWidth + padding.left + padding.right;
  return totalWidth;
};

const TAGS_GAP_PX = 8;
const SHOW_MORE_BUTTON_WIDTH_PX = 24;

export function getFitTagsCount(tags, containerWidth) {
  let totalWidth = 0;
  let fitTagsCount = 0;

  for (let i = 0; i < tags.length; i++) {
    const tagWidth = tags[i].width;
    const nextTotalWidth =
      totalWidth + tagWidth + (fitTagsCount > 0 ? TAGS_GAP_PX : 0);

    // Check if adding the next tag would exceed the container width
    if (nextTotalWidth > containerWidth) {
      // Check if adding the "More" button will fit
      if (
        totalWidth +
          SHOW_MORE_BUTTON_WIDTH_PX +
          (fitTagsCount > 0 ? TAGS_GAP_PX : 0) <=
        containerWidth
      ) {
        return fitTagsCount; // If "More" button fits, return the current count
      } else {
        return fitTagsCount - 1; // If not, return count excluding the last tag
      }
    }

    totalWidth = nextTotalWidth;
    fitTagsCount++;
  }

  // All tags fit, no need for "More" button
  return fitTagsCount;
}
