import NavBar from './components/navbar/Navbar'
import HomePage from './routes/homePage/homePage'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ListPage from './routes/listPage/listPage';
import { Layout, RequriedAuth, RequriedAdminAuth } from './routes/layouts/layout';
import SinglePage from './routes/singlePage/singlePage';
import ProfilePage from './routes/profilePage/profilePage';
import Register from './routes/register/Register';
import Login from './routes/login/loginPage';
import ProfileUpdatePage from './routes/profileUpdatePage/profileUpdatePage';
import NewPostPage from './routes/newPostPage/NewPostPage';
import { listPageLoader, profiletPageLoader, singlePageLoader } from './lib/loaders';
import AboutUs from './routes/aboutPage/AboutUs';
import ContactUs from './routes/contactPage/ContactUs';
import AdminLogin from './routes/adminLogin/adminLogin';
import Admin from './routes/AdminPage/Admin';
import AdminDashBoard from './routes/AdminPage/AdminComponentPage/AdminDashBoard';
import 'react-perfect-scrollbar/dist/css/styles.css';
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />,
          loader: listPageLoader
        },
        {
          path: "/:id",
          element: <SinglePage />,
          loader: singlePageLoader
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/about",
          element: <AboutUs />
        },
        {
          path: "/contact",
          element: <ContactUs />
        },
      ]
    },

    {
      path: "/",
      element: <RequriedAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
          loader: profiletPageLoader
        },
        {
          path: "/profile/update",
          element: <ProfileUpdatePage />,
        },
        {
          path: "/add",
          element: <NewPostPage />,
        },
      ]
    },

    {
      path: "/admin",
      element: <RequriedAdminAuth />,
      children: [
        {
          path: "adminDB",
          element: <Admin />,
          children: [
            {
              path: "DashBoard",
              element: <AdminDashBoard />,
            },
          ]
        },
      ]
    },

    {
      path: "/admin-login",
      element: <AdminLogin />,
    }
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>

  )
}

export default App