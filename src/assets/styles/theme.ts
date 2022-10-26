const font = {
  Heading2Bold: `{
    font-size: 4.25rem;
    font-weight: 800;
    line-height: 1.38;
  }`,

  Heading3Bold: `{
    font-size: 3rem;
    font-weight: 800;
    line-height: 1.5;
  }`,

  Heading4Bold: `{
    font-size: 2.25rem;
    font-weight: 800;
    line-height: 1.44;
  }`,

  Heading4Medium: `{
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.44;
  }`,

  Heading5Bold: `{
    font-size: 1.875rem;
    font-weight: 800;
    line-height: 1.47;
  }`,

  Heading5Medium: `{
    font-size: 1.875rem;
    font-weight: 600;
    line-height: 1.47;
  }`,

  Heading6Bold: `{
    font-size: 1.5rem;
    font-weight: 800;
    line-height: 1.5;
  }`,

  Heading6Medium: `{
    font-size: 1.5rem;
    font-weight: 600;
    line-height: 1.5;
  }`,

  Heading7Bold: `{
    font-size: 1.25rem;
    font-weight: 800;
    line-height: 1.5;
    letter-spacing: -0.4px;
  }`,

  Heading7Medium: `{
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: -0.4px;
  }`,

  Body1Bold: `{
    font-size: 1.125rem;
    font-weight: 800;
    line-height: 1.56;
    letter-spacing: -0.18px;
  }`,

  Body1Label: `{
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.33;
    letter-spacing: -0.27px;
  }`,

  Body1Paragraph: `{
    font-size: 1.125rem;
    line-height: 1.56;
    letter-spacing: -0.27px;
  }`,

  Body2Bold: `{
    font-size: 1rem;
    font-weight: 800;
    line-height: 1.5;
    letter-spacing: -0.05px;
  }`,

  Body2Label: `{
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.25;
    letter-spacing: -0.05px;
  }`,

  Body2Paragraph: `{
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: -0.05px;
  }`,

  Body3Bold: `{
    font-size: 0.875rem;
    font-weight: 800;
    line-height: 1.57;
    letter-spacing: -0.04px;
  }`,

  Body3Label: `{
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.21;
    letter-spacing: -0.04px;
  }`,

  Body3Paragraph: `{
    font-size: 0.875rem;
    line-height: 1.57;
    letter-spacing: -0.04px;
  }`,

  Caption1Label: `{
    font-size: 0.75rem;
    font-weight: 600;
    line-height: 1.33;
  }`,

  Caption1Paragraph: `{
    font-size: 0.75rem;
    line-height: 1.5;
  }`,

  Caption2Label: `{
    font-size: 0.625rem;
    font-weight: 600;
    line-height: 1.6;
  }`,

  Caption2Paragraph: `{
    font-size: 0.625rem;
    line-height: 1.6;
  }`,
};

const color = {
  black: '#000',
  'red-50': '#fef2f2',
  white: '#fff',
  'red-500': '#ef4444',
  'red-400': '#f87171',
  'red-600': '#dc2626',
  'red-100': '#fee2e2',
  'red-700': '#b91c1c',
  'red-800': '#991b1b',
  'red-900': '#7f1d1d',
  'red-200': '#fecaca',
  'red-300': '#fca5a5',
  'grey-900': '#111827',
  'grey-800': '#1f2937',
  'grey-700': '#374151',
  'grey-600': '#4b5563',
  'grey-500': '#6b7280',
  'grey-400': '#9ca3af',
  'grey-300': '#d1d5db',
  'grey-200': '#e5e7eb',
  'grey-100': '#f3f4f6',
  'grey-50': '#f9fafb',
  'yellow-800': '#92400e',
  'yellow-700': '#b45309',
  'yellow-400': '#fbbf24',
  'yellow-50': '#fffbeb',
  'yellow-300': '#fcd34d',
  'yellow-200': '#fde68a',
  'yellow-100': '#fef3c7',
  'yellow-500': '#f59e0b',
  'yellow-600': '#d97706',
  'yellow-900': '#78350f',
  'green-800': '#065f46',
  'green-700': '#047857',
  'green-400': '#34d399',
  'green-50': '#ecfdf5',
  'blue-800': '#1e40af',
  'blue-700': '#1d4ed8',
  'blue-400': '#60a5fa',
  'blue-50': '#eff6ff',
  'green-900': '#064e3b',
  'green-600': '#059669',
  'green-500': '#10b981',
  'green-300': '#6ee7b7',
  'green-200': '#a7f3d0',
  'green-100': '#d1fae5',
  'blue-900': '#1e3a8a',
  'blue-600': '#2563eb',
  'blue-500': '#3b82f6',
  'blue-300': '#93c5fd',
  'blue-200': '#bfdbfe',
  'blue-100': '#dbeafe',
};

const ui = {
  hover_bg: `{
    cursor: pointer;
    transition: background-color 200ms;

    &:hover {
      background-color: ${color['grey-100']};
    }

    &:active:hover {
      background-color: ${color['grey-200']};
    }
  }`,
};

export const theme = { font, color, ui };

export type Theme = typeof theme;
