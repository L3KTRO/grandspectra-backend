import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import axios from 'axios';
import { setupFirebaseMessaging } from './lib/firebase';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
}).then((r) => r);

// This will set light / dark mode on load...
initializeTheme();

// // Ensure CSRF header is present for all requests
// const tokenMeta = document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement | null;
// if (tokenMeta) {
//     axios.defaults.headers.common['X-CSRF-TOKEN'] = tokenMeta.content;
// }

// // Sanctum: send credentials and use Laravel's XSRF cookie/header names
// axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = 'XSRF-TOKEN';
// axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN';
// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Expose axios globally so Inertia uses it instead of fetch
// @ts-ignore
window.axios = axios;

// Initialize Firebase messaging (no permission request yet)
// setupFirebaseMessaging();
