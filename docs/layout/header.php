<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo $pageTitle; ?> | Solora UI</title>
    <script src="https://unpkg.com/@tailwindcss/browser@4"></script>
    <link rel="stylesheet" href="<?php echo $basePath; ?>css/style.css">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800;900&display=swap');
        
        :root {
            --apple-bg: #ffffff;
            --apple-text: #1d1d1f;
        }

        .dark {
            --apple-bg: #000000;
            --apple-text: #f5f5f7;
        }

        body { 
            font-family: 'Inter', -apple-system, sans-serif; 
            background: var(--apple-bg); 
            color: var(--apple-text);
            transition: background 0.3s ease, color 0.3s ease;
        }
        
        /* Solora Glass Logo */
        .glass-logo {
            font-weight: 900;
            font-size: 1.4rem;
            letter-spacing: -0.05em;
            background: linear-gradient(135deg, rgba(0,113,227,0.8) 0%, rgba(255,255,255,0.4) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            backdrop-filter: blur(10px);
            padding: 4px 10px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.2);
            text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .nav-header {
            background: rgba(255, 255, 255, 0.7);
            backdrop-filter: saturate(180%) blur(20px);
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        
        .dark .nav-header {
            background: rgba(0, 0, 0, 0.7);
            border-bottom: 1px solid rgba(255,255,255,0.1);
        }

        .sidebar { 
            width: 240px; 
            border-right: 1px solid rgba(0,0,0,0.1); 
        }
        .dark .sidebar { border-right: 1px solid rgba(255,255,255,0.1); }
    </style>
    <script>
        // Check voor theme voorkeur
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    </script>
</head>
<body class="min-h-screen flex flex-col">
    <header class="h-14 nav-header fixed top-0 w-full z-50 flex items-center justify-between px-6">
        <div class="flex items-center gap-4">
            <div class="glass-logo">Solora.</div>
        </div>
        
        <div class="flex items-center gap-6">
            <button id="theme-toggle" class="btn btn-glass btn-sm" style="padding: 4px 8px;">
                <span class="dark:hidden">🌙 Dark</span>
                <span class="hidden dark:inline">☀️ Light</span>
            </button>
            <span class="text-[10px] font-bold opacity-50 uppercase tracking-tighter">v1.0.0</span>
        </div>
    </header>

    <div class="flex flex-1 pt-14">