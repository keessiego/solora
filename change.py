import os

# Configuratie: Directories
BASE_DIR = "docs"
COMPONENTS_DIR = os.path.join(BASE_DIR, "components")
LAYOUT_DIR = os.path.join(BASE_DIR, "layout")
CSS_DIR = os.path.join(BASE_DIR, "css")

def create_structure():
    for folder in [BASE_DIR, COMPONENTS_DIR, LAYOUT_DIR, CSS_DIR]:
        os.makedirs(folder, exist_ok=True)

def write_file(path, content):
    with open(path, "w", encoding="utf-8") as f:
        f.write(content.strip())

# --- LAYOUT: HEADER.PHP ---
def gen_header_php():
    content = """
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
"""
    write_file(os.path.join(LAYOUT_DIR, "header.php"), content)

# --- LAYOUT: SIDEBAR.PHP ---
def gen_sidebar_php():
    content = """
<aside class="sidebar fixed h-full p-6 overflow-y-auto hidden md:block">
    <nav>
        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Start</p>
        <ul class="space-y-1 mb-8">
            <li><a href="<?php echo $basePath; ?>index.php" class="block px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">Home</a></li>
            <li><a href="<?php echo $basePath; ?>install.php" class="block px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">Installatie</a></li>
        </ul>

        <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">Componenten</p>
        <ul class="space-y-1">
            <li><a href="<?php echo $basePath; ?>components/button.php" class="block px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">Button</a></li>
            <li><a href="<?php echo $basePath; ?>components/dropdown.php" class="block px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">Dropdown</a></li>
            <li><a href="<?php echo $basePath; ?>components/codeblock.php" class="block px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-all">Codeblock</a></li>
        </ul>
    </nav>
</aside>
<main class="flex-1 md:ml-[240px] p-8 lg:p-12 max-w-5xl">
"""
    write_file(os.path.join(LAYOUT_DIR, "sidebar.php"), content)

# --- LAYOUT: FOOTER.PHP ---
def gen_footer_php():
    content = """
</main>
    </div>

    <script type="module">
        import { initDropdowns, initCodeblocks } from '<?php echo $basePath; ?>node_modules/@kerkhoff-ict/solora/dist/index.js';
        
        document.addEventListener('DOMContentLoaded', () => {
            initDropdowns();
            initCodeblocks();

            // Theme Toggle Logic
            const toggleBtn = document.getElementById('theme-toggle');
            toggleBtn.addEventListener('click', () => {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.theme = 'light';
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.theme = 'dark';
                }
            });
        });
    </script>
</body>
</html>
"""
    write_file(os.path.join(LAYOUT_DIR, "footer.php"), content)

# --- PAGES: INDEX, INSTALL, COMPONENTS ---

def gen_index_php():
    content = """
<?php 
    $pageTitle = "Home"; 
    $basePath = ""; 
    include 'layout/header.php'; 
    include 'layout/sidebar.php'; 
?>

<div class="max-w-3xl">
    <h1 class="text-5xl font-black tracking-tight mb-4">Solora UI</h1>
    <p class="text-xl opacity-60 mb-10 leading-relaxed">De ultieme component library met een compacte, glazen esthetiek. Geoptimaliseerd voor snelheid, gebruiksgemak en een high-end Apple-look.</p>
    
    <div class="grid gap-4">
        <div class="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
            <h3 class="text-lg font-bold mb-2">Waarom Solora?</h3>
            <p class="text-sm opacity-70">Weinig witruimte, zware blurs en strakke typografie. Solora is niet zomaar een library; het is een design-systeem.</p>
        </div>
    </div>
</div>

<?php include 'layout/footer.php'; ?>
"""
    write_file(os.path.join(BASE_DIR, "index.php"), content)

def gen_install_php():
    content = """
<?php 
    $pageTitle = "Installatie"; 
    $basePath = ""; 
    include 'layout/header.php'; 
    include 'layout/sidebar.php'; 
?>

<h1 class="text-3xl font-black mb-8">Installatie</h1>

<div class="space-y-8">
    <section>
        <h2 class="text-xl font-bold mb-4">1. Download via NPM</h2>
        <div class="codeblock">
            <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
            <div class="pre-content p-4 text-sm font-mono">npm install @kerkhoff-ict/solora</div>
        </div>
    </section>

    <section>
        <h2 class="text-xl font-bold mb-4">2. Tailwind Import</h2>
        <p class="mb-4 opacity-70">Voeg dit toe aan je <code>input.css</code>:</p>
        <div class="codeblock">
            <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
            <div class="pre-content p-4 text-sm font-mono">
<pre>@import 'tailwindcss';
@import '@kerkhoff-ict/solora/dist/index.css';</pre>
            </div>
        </div>
    </section>
</div>

<?php include 'layout/footer.php'; ?>
"""
    write_file(os.path.join(BASE_DIR, "install.php"), content)

def gen_component_pages():
    components = {
        "button": {
            "title": "Button",
            "desc": "Compacte knoppen met hover-filters en glaseffecten.",
            "demo": """
                <div class="flex flex-wrap gap-4 items-center justify-center p-10 bg-black/5 dark:bg-white/5 rounded-3xl mb-8">
                    <button class="btn btn-primary btn-md">Primary</button>
                    <button class="btn btn-secondary btn-md">Secondary</button>
                    <button class="btn btn-glass btn-md">Glass Effect</button>
                    <button class="btn btn-danger btn-sm">Small Danger</button>
                </div>
            """
        },
        "dropdown": {
            "title": "Dropdown",
            "desc": "Onze trots: de meest compacte en stijlvolle dropdown op de markt.",
            "demo": """
                <div class="flex justify-center p-20 bg-black/5 dark:bg-white/5 rounded-3xl mb-8 h-80">
                    <div class="dropdown" data-name="demo-select">
                        <button class="dropdown-btn w-48">Selecteer Item</button>
                        <div class="dropdown-content">
                            <div class="dropdown-label">Systeem</div>
                            <div class="dropdown-item active" data-value="1">Instellingen</div>
                            <div class="dropdown-item" data-value="2">Gebruikers</div>
                            <div class="dropdown-divider"></div>
                            <div class="dropdown-item" data-value="3">Uitloggen</div>
                        </div>
                    </div>
                </div>
            """
        },
        "codeblock": {
            "title": "Codeblock",
            "desc": "Een interactieve macOS-stijl code editor view.",
            "demo": """
                <div class="codeblock draggable mb-8">
                    <div class="pre-top">
                        <div class="pre-top-btns">
                            <span class="pre-btn-red close-btn"></span>
                            <span class="pre-btn-orange minimize-btn"></span>
                            <span class="pre-btn-green maximize-btn"></span>
                        </div>
                    </div>
                    <button class="pre-copy-btn btn-in-pre btn btn-glass btn-sm">Copy</button>
                    <div class="pre-content p-6 text-sm font-mono">
<pre data-language="javascript"><code>const solora = "prachtig";
console.log(`Dit ziet er ${solora} uit!`);</code></pre>
                    </div>
                </div>
            """
        }
    }

    for name, data in components.items():
        content = f"""
<?php 
    $pageTitle = "{data['title']}"; 
    $basePath = "../"; 
    include '../layout/header.php'; 
    include '../layout/sidebar.php'; 
?>

<h1 class="text-3xl font-black mb-2">{data['title']}</h1>
<p class="text-lg opacity-60 mb-10">{data['desc']}</p>

{data['demo']}

<h2 class="text-xl font-bold mb-4">HTML Code</h2>
<div class="codeblock">
    <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
    <div class="pre-content p-4 text-xs font-mono">
        <pre><code>{data['demo'].replace('<', '&lt;').replace('>', '&gt;').strip()}</code></pre>
    </div>
</div>

<?php include '../layout/footer.php'; ?>
"""
        write_file(os.path.join(COMPONENTS_DIR, f"{name}.php"), content)

def gen_css_input():
    content = """
@import 'tailwindcss';
@import '@kerkhoff-ict/solora/dist/index.css';

/* Tailwind v4 Dark Mode werkt via de .dark class */
@variant dark (&:where(.dark, .dark *));
"""
    write_file(os.path.join(CSS_DIR, "input.css"), content)

# --- RUN SCRIPT ---
if __name__ == "__main__":
    create_structure()
    gen_header_php()
    gen_sidebar_php()
    gen_footer_php()
    gen_index_php()
    gen_install_php()
    gen_component_pages()
    gen_css_input()
    print("✅ Solora PHP Doc Site succesvol gegenereerd!")
    print("👉 Start je server: php -S localhost:8000 -t docs")