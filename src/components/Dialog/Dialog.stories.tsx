import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

const meta: Meta<typeof Dialog> = {
  title: 'Primitives/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible modal dialog primitive adhering to WCAG 2.1 AA standards. Built with React Portals, focus trapping, escape key dismissal, and background scroll locking.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Controls the visibility state of the modal dialog overlay.',
    },
    title: {
      control: 'text',
      description: 'Accessible title header announced by screen readers (aria-labelledby).',
    },
    description: {
      control: 'text',
      description: 'Optional accessible description text (aria-describedby).',
    },
    onClose: { action: 'closed' },
  },
};

export default meta;
type Story = StoryObj<typeof Dialog>;

// 1. Standard Interactive Dialog with Trigger Button
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="primary" size="md" onClick={() => setIsOpen(true)}>
          Open Confirmation Dialog
        </Button>
        <Dialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footerActions={
            <>
              <Button variant="ghost" size="md" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="md" onClick={() => setIsOpen(false)}>
                Confirm Action
              </Button>
            </>
          }
        >
          <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.5' }}>
            Are you sure you want to proceed? This action will sync all updated Figma token variables directly to the production CSS registry.
          </p>
        </Dialog>
      </>
    );
  },
  args: {
    title: 'Sync Design Tokens',
    description: 'This action impacts all active multi-brand themes.',
  },
};

// 2. Destructive System Action Variant
export const Destructive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="secondary" size="md" onClick={() => setIsOpen(true)}>
          Delete Token Branch
        </Button>
        <Dialog
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footerActions={
            <>
              <Button variant="ghost" size="md" onClick={() => setIsOpen(false)}>
                Keep Branch
              </Button>
              <Button variant="primary" size="md" onClick={() => setIsOpen(false)}>
                Delete Permanently
              </Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ margin: 0, color: '#cbd5e1', lineHeight: '1.5' }}>
              Deleting the <code style={{ color: '#38bdf8' }}>v2.4-dark-theme</code> branch is permanent and cannot be undone.
            </p>
            <div
              style={{
                padding: '12px 16px',
                backgroundColor: '#020617',
                borderRadius: '8px',
                border: '1px solid #334155',
                fontSize: '0.875rem',
                color: '#f87171',
                fontFamily: 'monospace',
              }}
            >
              Warning: 14 published components currently reference these token variables.
            </div>
          </div>
        </Dialog>
      </>
    );
  },
  args: {
    title: 'Delete Token Branch',
    description: 'Irreversible system administrative action.',
  },
};

// 3. Static Open State (For Visual Regression / Documentation Testing)
export const StaticOpen: Story = {
  args: {
    isOpen: true,
    title: 'System Notification',
    description: 'Modal preview displayed in an active state.',
    children: (
      <p style={{ margin: 0, color: '#cbd5e1' }}>
        This static story allows testing of the dialog layer rendering, accessibility tree, and color contrast without requiring manual interaction.
      </p>
    ),
    footerActions: (
      <Button variant="primary" size="md">
        Acknowledge
      </Button>
    ),
  },
};