import type { ReactNode } from 'react';

export interface DialogProps {
  /**
   * Controls the visibility of the dialog modal.
   */
  isOpen: boolean;

  /**
   * Callback fired when the dialog requests to close (via Escape key, backdrop click, or close button).
   */
  onClose: () => void;

  /**
   * Primary title displayed in the dialog header. Linked to `aria-labelledby` for screen readers.
   */
  title: string;

  /**
   * Optional descriptive text displayed below the title. Linked to `aria-describedby` for accessibility context.
   */
  description?: string;

  /**
   * Main content area of the modal (forms, body text, data views).
   */
  children: ReactNode;

  /**
   * Action buttons rendered in the sticky/bottom footer slot (e.g., Primary and Secondary buttons).
   */
  footerActions?: ReactNode;
}