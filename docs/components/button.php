<?php 
    $pageTitle = "Button"; 
    $basePath = "../"; 
    include '../layout/header.php'; 
    include '../layout/sidebar.php'; 
?>

<h1 class="text-3xl font-black mb-2">Button</h1>
<p class="text-lg opacity-60 mb-10">Compacte knoppen met hover-filters en glaseffecten.</p>


                <div class="flex flex-wrap gap-4 items-center justify-center p-10 bg-black/5 dark:bg-white/5 rounded-3xl mb-8">
                    <button class="btn btn-primary btn-md">Primary</button>
                    <button class="btn btn-secondary btn-md">Secondary</button>
                    <button class="btn btn-glass btn-md">Glass Effect</button>
                    <button class="btn btn-danger btn-sm">Small Danger</button>
                </div>
            

<h2 class="text-xl font-bold mb-4">HTML Code</h2>
<div class="codeblock">
    <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
    <div class="pre-content p-4 text-xs font-mono">
        <pre><code>&lt;div class="flex flex-wrap gap-4 items-center justify-center p-10 bg-black/5 dark:bg-white/5 rounded-3xl mb-8"&gt;
                    &lt;button class="btn btn-primary btn-md"&gt;Primary&lt;/button&gt;
                    &lt;button class="btn btn-secondary btn-md"&gt;Secondary&lt;/button&gt;
                    &lt;button class="btn btn-glass btn-md"&gt;Glass Effect&lt;/button&gt;
                    &lt;button class="btn btn-danger btn-sm"&gt;Small Danger&lt;/button&gt;
                &lt;/div&gt;</code></pre>
    </div>
</div>

<?php include '../layout/footer.php'; ?>