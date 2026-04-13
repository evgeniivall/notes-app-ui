import { createRoot } from 'react-dom/client';
import Tag from './Tag';

const renderTagToMeasure = (tagName: string): Promise<number> => {
  return new Promise((resolve) => {
    const container = document.createElement('div');
    container.style.visibility = 'hidden';
    container.style.position = 'absolute';
    container.style.whiteSpace = 'nowrap';

    document.body.appendChild(container);
    const root = createRoot(container);

    const observer = new MutationObserver(() => {
      const tagElement = container.firstChild as HTMLElement | null;
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

export const getTagStyles = async (tagName: string): Promise<{ width: number }> => {
  const width = await renderTagToMeasure(tagName);
  return { width };
};

const calculateTextWidth = (text: string, font: string): number => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
};

export const calculateTagWidth = (
  tagName: string,
  font: string,
  padding: { left: number; right: number },
): number => {
  const textWidth = calculateTextWidth(tagName, font);
  return textWidth + padding.left + padding.right;
};

const TAGS_GAP_PX = 8;
const SHOW_MORE_BUTTON_WIDTH_PX = 24;

export function getFitTagsCount(tags: Array<{ width?: number }>, containerWidth: number): number {
  let totalWidth = 0;
  let fitTagsCount = 0;

  for (let i = 0; i < tags.length; i++) {
    const tagWidth = tags[i].width ?? 0;
    const nextTotalWidth =
      totalWidth + tagWidth + (fitTagsCount > 0 ? TAGS_GAP_PX : 0);

    if (nextTotalWidth > containerWidth) {
      if (
        totalWidth +
          SHOW_MORE_BUTTON_WIDTH_PX +
          (fitTagsCount > 0 ? TAGS_GAP_PX : 0) <=
        containerWidth
      ) {
        return fitTagsCount;
      } else {
        return fitTagsCount - 1;
      }
    }

    totalWidth = nextTotalWidth;
    fitTagsCount++;
  }

  return fitTagsCount;
}
