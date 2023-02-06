import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

// import App from './App.jsx'
import router from './views'

const container : any = document.getElementById('root')
const root = createRoot(container)
root.render(<RouterProvider router={router} />)

// import reportWebVitals from './reportWebVitals';
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
