import { BriefProvider } from './context';

import { Home } from './pages';

function App() {
  return (
    <BriefProvider>
      <Home />
    </BriefProvider>
  );
}

export default App;
