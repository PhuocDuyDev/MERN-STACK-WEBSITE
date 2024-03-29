import React, { useEffect, useState, lazy } from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout, Spinner } from './components';
import { CART_PAGE, LOGIN_PAGE, PRODUCTS_PAGE, REGISTER_PAGE } from './const/';
import { useAuthContext } from './context/AuthContext';

const PrivateRoutes = lazy(() => import('./utils/PrivateRoutes'));
const Cart = lazy(() => import('./pages/Cart/Cart'));
const Home = lazy(() => import('./pages/Home/Home'));
const Login = lazy(() => import('./pages/Login/Login'));
const SingleProduct = lazy(() => import('./pages/Product/Product'));
const Products = lazy(() => import('./pages/Products/Products'));
const Register = lazy(() => import('./pages/Register/Register'));

const App = () => {
  const [loadingCheckAuth, setLoadingCheckAuth] = useState(true);
  const { checkAuth } = useAuthContext();
  useEffect(() => {
    const authenticate = async () => {
      //   await checkAuth();
      await Promise.race([
        new Promise((resolve) => {
          setTimeout(() => {
            resolve();
          }, 3000);
        }),
        checkAuth(),
      ]);
      setLoadingCheckAuth(false);
    };

    authenticate();
  }, [checkAuth]);

  if (loadingCheckAuth) {
    return <Spinner fullPage={true} />;
  }

  return (
    <BrowserRouter>
      <main className='main'>
        <Routes>
          <Route
            element={
              <Layout
                hideHeaderPaths={[
                  LOGIN_PAGE,
                  REGISTER_PAGE,
                  CART_PAGE,
                  'forgot-password',
                ]}
              />
            }
          >
            <Route
              path='/'
              index
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path={PRODUCTS_PAGE}
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <Products />
                </Suspense>
              }
            />
            <Route
              path={`${PRODUCTS_PAGE}/:productId`}
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <SingleProduct />
                </Suspense>
              }
            />
            <Route
              path={LOGIN_PAGE}
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path={REGISTER_PAGE}
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              element={
                <Suspense fallback={<Spinner fullPage={true} />}>
                  <PrivateRoutes />
                </Suspense>
              }
            >
              <Route
                path={CART_PAGE}
                element={
                  <Suspense fallback={<Spinner fullPage={true} />}>
                    <Cart />
                  </Suspense>
                }
              />
            </Route>
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
