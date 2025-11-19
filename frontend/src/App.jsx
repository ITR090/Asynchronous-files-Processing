import './App.css'
// routers
import { RouterProvider} from 'react-router-dom'
import { routers_definitions } from './routers/index.jsx';

function App() {

  return (
    <div className='h-screen'>
      <RouterProvider router={routers_definitions} />
    </div>
  );
}

export default App;
