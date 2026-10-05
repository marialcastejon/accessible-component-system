// src/App.tsx
import { useState } from 'react';
import './App.css';
import { Button } from './components/Button/Button';
import { Dialog } from './components/Dialog/Dialog';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => setIsDialogOpen(true);
  const handleCloseDialog = () => setIsDialogOpen(false);

  const handleConfirmAction = () => {
    console.log('System action confirmed');
    setIsDialogOpen(false);
  };

  return (
    <div className="app-shell">
      <h1 className="app-title">Accessible Multi-Brand Component Library</h1>
      <p className="app-subtitle">WCAG 2.1 AA Compliant React Components</p>

      {/* Existing Button Showcase */}
      <section className="button-showcase">
        <Button variant="primary" size="md">Primary Action</Button>
        <Button variant="secondary" size="md">Secondary Action</Button>
        <Button variant="ghost" size="md">Ghost Button</Button>
        <Button variant="primary" size="md" isLoading>Loading</Button>
      </section>

      {/* Dialog Trigger Section */}
      <section className="dialog-section">
        <h2 className="dialog-section-title">Interactive Modal Primitive</h2>
        <Button variant="primary" size="md" onClick={handleOpenDialog}>
          Open System Dialog
        </Button>
      </section>

      {/* Accessible Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        title="Confirm System Reset"
        description="This action will revert all design tokens to factory defaults."
        footerActions={
          <>
            <Button variant="ghost" size="md" onClick={handleCloseDialog}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleConfirmAction}>
              Reset Tokens
            </Button>
          </>
        }
      >
        <div className="dialog-content">
          <p>
            Are you sure you want to proceed? Reverting tokens will override active
            color themes, typography scales, and spatial primitives across all linked Figma libraries.
          </p>
          <div className="dialog-warning">
            Warning: 14 pending token changes will be lost.
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default App;