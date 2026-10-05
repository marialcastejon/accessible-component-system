import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Core interactive button primitive driven by CSS design tokens. Supports multiple variants, sizing, loading states, and full keyboard interaction.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost'],
      description: 'Defines the visual hierarchy and design token styling.',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'Controls padding, typography scale, and touch target size.',
    },
    isLoading: {
      control: 'boolean',
      description: 'Replaces button text with an accessible loading spinner.',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables user interactions and applies muted token styling.',
    },
    onClick: { action: 'clicked' },
  },
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Button Action',
    isLoading: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Default Interactive Controls
export const Default: Story = {};

// 2. All Variants Overview
export const AllVariants: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button {...args} variant="primary">
        Primary Action
      </Button>
      <Button {...args} variant="secondary">
        Secondary Action
      </Button>
      <Button {...args} variant="ghost">
        Ghost Button
      </Button>
    </div>
  ),
};

// 3. Size Scale Comparison
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small (sm)
      </Button>
      <Button {...args} size="md">
        Medium (md)
      </Button>
      <Button {...args} size="lg">
        Large (lg)
      </Button>
    </div>
  ),
};

// 4. Loading State
export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Saving Changes',
  },
};

// 5. Disabled State
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Unavailable Action',
  },
};