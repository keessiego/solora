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