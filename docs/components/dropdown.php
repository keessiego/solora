<?php 
    $pageTitle = "Dropdown"; 
    $basePath = "../"; 
    include '../layout/header.php'; 
    include '../layout/sidebar.php'; 
?>

<h1 class="text-3xl font-black mb-2">Dropdown</h1>
<p class="text-lg opacity-60 mb-10">Onze trots: de meest compacte en stijlvolle dropdown op de markt.</p>


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
            

<h2 class="text-xl font-bold mb-4">HTML Code</h2>
<div class="codeblock">
    <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
    <div class="pre-content p-4 text-xs font-mono">
        <pre><code>&lt;div class="flex justify-center p-20 bg-black/5 dark:bg-white/5 rounded-3xl mb-8 h-80"&gt;
                    &lt;div class="dropdown" data-name="demo-select"&gt;
                        &lt;button class="dropdown-btn w-48"&gt;Selecteer Item&lt;/button&gt;
                        &lt;div class="dropdown-content"&gt;
                            &lt;div class="dropdown-label"&gt;Systeem&lt;/div&gt;
                            &lt;div class="dropdown-item active" data-value="1"&gt;Instellingen&lt;/div&gt;
                            &lt;div class="dropdown-item" data-value="2"&gt;Gebruikers&lt;/div&gt;
                            &lt;div class="dropdown-divider"&gt;&lt;/div&gt;
                            &lt;div class="dropdown-item" data-value="3"&gt;Uitloggen&lt;/div&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                &lt;/div&gt;</code></pre>
    </div>
</div>

<?php include '../layout/footer.php'; ?>