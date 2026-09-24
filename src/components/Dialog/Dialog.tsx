import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { DialogProps } from './Dialog.types';
import './Dialog.css';

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  footerActions,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const titleId = useRef(`dialog-title-${Math.random().toString(36).substring(2, 9)}`).current;
  const descId = useRef(`dialog-desc-${Math.random().toString(36).substring(2, 9)}`).current;

  // 1. Manage Body Scroll Lock & Focus Restoration
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement;
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // Focus the modal container on mount
    dialogRef.current?.focus();

    return () => {
      document.body.style.overflow = originalStyle;
      previousActiveElement.current?.focus();
    };
  }, [isOpen]);

  // 2. Keyboard Event Listeners (Escape Key & Focus Trap)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Dismiss on Escape
      if (event.key === 'Escape') {
        event.stopPropagation();
        onClose();
        return;
      }

      // Focus Trap Loop (Tab / Shift+Tab)
      if (event.key === 'Tab' && dialogRef.current) {
        const focusableElements = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="ds-dialog-backdrop" onClick={onClose} data-testid="dialog-backdrop">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className="ds-dialog-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="ds-dialog-header">
          <div>
            <h2 id={titleId} className="ds-dialog-title">
              {title}
            </h2>
            {description && (
              <p id={descId} className="ds-dialog-description">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="ds-dialog-close-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="ds-dialog-body">{children}</div>

        {/* Footer Actions */}
        {footerActions && <div className="ds-dialog-footer">{footerActions}</div>}
      </div>
    </div>,
    document.body
  );
};