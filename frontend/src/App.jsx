import { BrowserRouter } from 'react-router-dom';
import Router from './routes/router';

function App() {
  return (
    <BrowserRouter>
      <main>
        <Router />
      </main>
    </BrowserRouter>
  );
}

export default App;
