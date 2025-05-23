import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Loading from './components/common/Loading';

const Layout = lazy(() => import('./components/layout/Layout'));
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Payment = lazy(() => import('./pages/Payment'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="payment" element={<Payment />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;