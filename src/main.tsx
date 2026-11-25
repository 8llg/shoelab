import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';
import { CartProvider } from './hooks/useCart';
import { LangProvider } from './hooks/useLang';
import { ToastProvider } from './hooks/useToast';
import { WishlistProvider } from './hooks/useWishlist';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <LangProvider>
        <ToastProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </ToastProvider>
      </LangProvider>
    </HashRouter>
  </StrictMode>,
);
