# Check where AdDisplay.tsx is
find . -name "AdDisplay.tsx"

# If it's in components, run:
echo "import AdDisplay from './components/AdDisplay';

function App() {
  return <AdDisplay />;
}

export default App;" > App.tsx
