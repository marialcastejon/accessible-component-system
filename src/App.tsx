// src/App.tsx
import { Button } from './components/Button/Button';

function App() {
  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: '#fff' }}>
      <h1>Accessible Multi-Brand Component Library</h1>
      <p style={{ color: '#94a3b8' }}>WCAG 2.1 AA Compliant React Components</p>

      <section style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
        <Button variant="primary" size="md">Primary Action</Button>
        <Button variant="secondary" size="md">Secondary Action</Button>
        <Button variant="ghost" size="md">Ghost Button</Button>
        <Button variant="primary" size="md" isLoading>Loading</Button>
      </section>
    </div>
  );
}

export default App;