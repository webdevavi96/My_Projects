import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Routs from './routs.jsx'
import { Home, About, Contact, Github, User } from './components/index.js'
import { githubInfoLoader } from './components/github/Github.jsx'


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Routs />,
//     children: [
//       {
//         path: "", // This will render Home at the root path "/"
//         element: <Home />
//       },
//       {
//         path: "about", // This will render About at "/about"
//         element: <About />
//       },
//       {
//         path: "contact-us", // This will render About at "/about"
//         element: <Contact />
//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Routs />}>
<Route path='' element={<Home />}/>
<Route path='/about' element={<About />}/>
<Route path='/contact-us' element={<Contact />}/>
<Route loader={githubInfoLoader}
 path='/github' 
 element={<Github />}/>
<Route path='user/:userid' element={<User />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
