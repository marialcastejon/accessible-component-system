# 🎨 Accessible Multi-Brand Component System

> A production-grade React & TypeScript component system engineered with strict **WCAG 2.1 AA accessibility compliance**, dynamic design tokens, and interactive micro-interactions.

![Figma & Component Banner](./Figma-Specs/02_accessibility_audit.png)

---

## 💡 Overview

This project bridges the gap between design system architecture in Figma and production front-end engineering in React. Built from the ground up to support modern design tokens, full keyboard navigation, screen reader accessibility, and scalable component state management.

### Key Highlights
- ♿ **WCAG 2.1 AA Compliant:** Minimum 4.5:1 text contrast ratios and dynamic `2px` offset focus rings for high-visibility keyboard navigation.
- 🎨 **Design Token Driven:** Centralized color variables and spatial scales mapped directly from Figma token architecture.
- ⌨️ **Keyboard & Assistive Tech Support:** Programmatic `aria-busy` state handling, decorative element masking with `aria-hidden`, and `.sr-only` screen reader announcements.
- ⚡ **Zero-Dependency Modern CSS:** Built with native CSS Custom Properties, modern nesting, and zero runtime preprocessor overhead.

---

## 🧩 Component Architecture & Variants

### Button States & Contrast Ratios

| Variant | State | Background | Text Color | Focus Ring / Border | Contrast Ratio |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Primary** | Default | `#38BDF8` *(Sky 400)* | `#0F172A` *(Dark Slate)* | `2px` Offset `#38BDF8` | **8.33:1** (AAA) |
| **Primary** | Hover | `#0284C7` *(Sky 600)* | `#FFFFFF` *(White)* | `2px` Offset `#0284C7` | **4.96:1** (AA) |
| **Secondary** | Default | `#F8FAFC` *(Slate 50)* | `#0F172A` *(Dark Slate)* | `1px` Solid `#CBD5E1` | **17.06:1** (AAA) |
| **Ghost** | Default | Transparent | `#95A0B7` *(Ghost 700)* | `2px` Offset `#7DD3FC` | **5.56:1** (AA) |

### New Dialog Primitive

The project now includes an accessible dialog component built for design-system workflows and modal confirmations.

Features:
- `isOpen` control for open/closed state management
- Escape key handling to dismiss the dialog
- Focus trap to keep keyboard navigation inside the modal
- Body scroll lock while the dialog is open
- Focus restoration back to the triggering element on close
- Screen-reader-friendly `aria-modal`, `aria-labelledby`, and `aria-describedby`
- Backdrop click dismissal and close button support

Example usage:

```tsx
<Dialog
  isOpen={isDialogOpen}
  onClose={handleCloseDialog}
  title="Confirm System Reset"
  description="This action will revert all design tokens to factory defaults."
  footerActions={
    <>
      <Button variant="ghost" size="md" onClick={handleCloseDialog}>Cancel</Button>
      <Button variant="primary" size="md" onClick={handleConfirmAction}>Reset Tokens</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Dialog>
```

---

## 📂 Repository Structure

```text
accessible-component-system/
├── .storybook/
│   ├── main.ts               # Story discovery, framework, and addons
│   └── preview.tsx           # Global Storybook parameters
├── public/                   # Static public assets
├── src/
│   ├── components/
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.css
│   │   │   └── Button.stories.tsx
│   │   └── Dialog/
│   │       ├── Dialog.tsx
│   │       ├── Dialog.css
│   │       ├── Dialog.types.ts
│   │       ├── Dialog.test.tsx
│   │       └── Dialog.stories.tsx
│   ├── tokens/
│   │   └── colors.css        # Design token definitions
│   ├── App.tsx
│   ├── App.css
│   ├── main.tsx
│   └── index.css
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── vitest.shims.d.ts
├── tsconfig.app.json
├── tsconfig.node.json
├── tsconfig.json
└── README.md
```

## 💻 Quick Start & Installation

### Prerequisites
Make sure you have Node.js (v18.0.0 or higher) installed on your machine.

1. Clone the Repository
```
git clone [https://github.com/your-username/accessible-component-system.git](https://github.com/your-username/accessible-component-system.git)
cd accessible-component-system
```

2. Install Dependencies
```
npm install
```

3. Run Development Server
```
npm run dev
```

Open your browser and navigate to http://localhost:5173 to interact with the component library!

## 📚 Storybook

Storybook provides an isolated workspace for previewing and interacting with the component stories. Start it with:

```bash
npm run storybook
```

Then open http://localhost:6006. Stories are kept alongside their components (for example, `src/components/Button/Button.stories.tsx`) and include interactive controls for supported component props. The accessibility addon is enabled for reviewing stories.

To create a production-ready static Storybook build, run:

```bash
npm run build-storybook
```

The generated site is written to `storybook-static/`.

## 🛠️ Usage Example

```tsx
import React from 'react';
import { Button } from './components/Button/Button';

export const UserActionGroup = () => {
  return (
    <div style={{ display: 'flex', gap: '12px' }}>
      <Button onClick={() => alert('Confirmed!')} size="md" variant="primary">
        Confirm Order
      </Button>

      <Button isLoading size="md" variant="primary">
        Processing
      </Button>

      <Button size="md" variant="ghost">
        Cancel
      </Button>
    </div>
  );
};
```

## ✅ Testing

This project uses Vitest with Testing Library for component-level verification.

Run the tests:

```bash
npm test
```

Or run once without watch mode:

```bash
npx vitest run
```

The current suite covers the Dialog component behavior, including:
- open and close state rendering
- accessibility attributes and labeling
- Escape key and backdrop dismissal
- focus trap behavior
- body scroll lock and restoration

## ♿ Accessibility Implementation Details

- **WCAG 2.1 SC 2.4.7 (Focus Visible)**: Outlines use custom dual-box shadows to provide high-visibility focus indicators across both dark and light backgrounds.

- **WCAG 2.1 SC 1.4.11 (Non-Text Contrast)**: Animated UI status spinners inherit currentColor dynamically to guarantee a $>3:1$ contrast boundary.

- **WCAG 2.1 SC 4.1.3 (Status Messages)**: Dynamic button loading states trigger hidden .sr-only live regions to announce process updates to screen reader users (NVDA / VoiceOver).

## 🎨 Design System Handoff

- Figma Canvas Specs: [Figma](https://www.figma.com/design/e48NyHFCIArq4y4chuqMI4/Maria_Luisa_Castejon_Design_Engineering_Portfolio?node-id=0-1&m=dev&t=EvtmKyou3So4cS1Y-1) 

- Tested Tools: axe-core, Lighthouse Accessibility Audit, VoiceOver Screen Reader.

## 📄 License

Distributed under the [MIT License](https://mit-license.org/). See LICENSE for more information.