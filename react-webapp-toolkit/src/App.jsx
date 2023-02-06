import { Outlet } from 'react-router-dom'
import '@/style/app.scss'

import { Provider } from 'react-redux';
import store from '@/store';

const user = {
  a: 1,
}

console.log('-----xxx', user?.child?.name)

function App() {
  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export default App
