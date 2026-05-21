<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="manifest" href="/manifest.json">
        <meta name="theme-color" content="#ef4444">
        <link rel="apple-touch-icon" href="/icons/icon-128x128.png">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="mobile-web-app-capable" content="yes">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    <title data-inertia>{{ config('app.name', 'Cardapio') }}</title>

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

    <body class="font-sans antialiased nativephp-safe-area">
        @inertia
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/sw.js')
                        .then(reg => console.log('SW registered!', reg))
                        .catch(err => console.log('SW registration failed:', err));
                });
            }
        </script>
        <script>
            // NativePHP Back Button Handling - Double Tap to Exit
            let lastBackPress = 0;
            window.addEventListener('popstate', function (event) {
                if (window.location.pathname === '/' || window.location.pathname === '/menu') {
                    const currentTime = new Date().getTime();
                    const timeDiff = currentTime - lastBackPress;

                    if (timeDiff < 2000) {
                        if (window.Native && window.Native.app) {
                            window.Native.app.quit();
                        }
                    } else {
                        lastBackPress = currentTime;
                        // Optional: Show a toast or alert to the user
                        if (window.Native && window.Native.app) {
                            // We can't easily show a native toast here without a specific API, 
                            // but we can use a simple alert or a custom DOM element.
                            console.log('Press back again to exit');
                        }
                    }
                }
            });
        </script>
    </body>
</html>
