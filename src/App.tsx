import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';

const DemoSimple = lazy(() => import('./page/DemoSimple/DemoSimple'));
const DemoDefaultBackTop = lazy(() => import('./page/DemoDefaultBackTop/DemoDefaultBackTop'));
const DemoDefaultLoad = lazy(() => import('./page/DemoDefaultLoad/DemoDefaultLoad'));
const NormalLoadHandler = lazy(() => import('./page/NormalLoadHandler/NormalLoadHandler'));
const CustomScrollHandler = lazy(() => import('./page/CustomScrollHandler/CustomScrollHandler'));
const CustomLoadersPage = lazy(() => import('./page/CustomLoadersBackTop/CustomLoadersBackTop'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/simple" element={<DemoSimple />} />
          <Route path="/default_backtop" element={<DemoDefaultBackTop />} />
          <Route path="/default_loading" element={<DemoDefaultLoad />} />
          <Route path="/normalfunc__load_handler" element={<NormalLoadHandler />} />
          <Route path="/custom_load_backtop" element={<CustomLoadersPage />} />
          <Route path="/custom_scroll_handler" element={<CustomScrollHandler />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
