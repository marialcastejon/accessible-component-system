// src/components/Dialog/Dialog.test.tsx
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Dialog } from './Dialog';

describe('Dialog Component', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    title: 'Confirm Reset',
    description: 'This will reset your settings.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <Dialog {...defaultProps} isOpen={false}>
        <p>Modal Content</p>
      </Dialog>
    );

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders correctly with accessibility attributes when isOpen is true', () => {
    render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    const title = screen.getByText('Confirm Reset');
    const description = screen.getByText('This will reset your settings.');

    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', title.id);
    expect(dialog).toHaveAttribute('aria-describedby', description.id);
  });

  it('calls onClose when clicking the close icon button', async () => {
    const user = userEvent.setup();
    render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    await user.click(closeBtn);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking on the backdrop overlay', async () => {
    const user = userEvent.setup();
    render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    const backdrop = screen.getByTestId('dialog-backdrop');
    await user.click(backdrop);

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('does NOT call onClose when clicking inside the dialog card', async () => {
    const user = userEvent.setup();
    render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    const content = screen.getByText('Modal Content');
    await user.click(content);

    expect(defaultProps.onClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing the Escape key', () => {
    render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  it('traps focus within the modal during Tab navigation', async () => {
    const user = userEvent.setup();
    render(
      <Dialog
        {...defaultProps}
        footerActions={
          <>
            <button type="button">Cancel</button>
            <button type="button">Confirm</button>
          </>
        }
      >
        <p>Modal Content</p>
      </Dialog>
    );

    const closeBtn = screen.getByRole('button', { name: /close dialog/i });
    const cancelBtn = screen.getByRole('button', { name: /cancel/i });
    const confirmBtn = screen.getByRole('button', { name: /confirm/i });

    // Focus starts inside dialog container on mount
    closeBtn.focus();
    expect(document.activeElement).toBe(closeBtn);

    // Tab forward through interactive elements
    await user.tab();
    expect(document.activeElement).toBe(cancelBtn);

    await user.tab();
    expect(document.activeElement).toBe(confirmBtn);

    // Tab past last element loops back to first element (close button)
    await user.tab();
    expect(document.activeElement).toBe(closeBtn);

    // Shift + Tab backwards loops back to last element (confirm button)
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(confirmBtn);
  });

  it('locks body scrolling when opened and restores it when unmounted', () => {
    const { unmount } = render(
      <Dialog {...defaultProps}>
        <p>Modal Content</p>
      </Dialog>
    );

    expect(document.body.style.overflow).toBe('hidden');

    unmount();

    expect(document.body.style.overflow).not.toBe('hidden');
  });
});