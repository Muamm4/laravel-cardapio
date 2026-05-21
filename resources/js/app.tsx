import '../css/app.css';
import '../css/scrollbar.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { useVirtualKeyboard } from './hooks/use-virtual-keyboard';
import { ToastProvider } from './components/ui/Toast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

function KeyboardAwareApp({ children }: { children: React.ReactNode }) {
    useVirtualKeyboard();
    return <>{children}</>;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')) as any,
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <KeyboardAwareApp>
                <ToastProvider><App {...props} /></ToastProvider>
            </KeyboardAwareApp>
        );
    },
    progress: {
        color: '#fc4646',
    },
});

// This will set light / dark mode on load...
initializeTheme();
