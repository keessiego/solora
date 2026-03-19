<?php 
    $pageTitle = "Codeblock"; 
    $basePath = "../"; 
    include '../layout/header.php'; 
    include '../layout/sidebar.php'; 
?>

<h1 class="text-3xl font-black mb-2">Codeblock</h1>
<p class="text-lg opacity-60 mb-10">Een interactieve macOS-stijl code editor view.</p>


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
            

<h2 class="text-xl font-bold mb-4">HTML Code</h2>
<div class="codeblock">
    <div class="pre-top"><div class="pre-top-btns"><span class="pre-btn-red"></span><span class="pre-btn-orange"></span><span class="pre-btn-green"></span></div></div>
    <div class="pre-content p-4 text-xs font-mono">
        <pre><code>&lt;div class="codeblock draggable mb-8"&gt;
                    &lt;div class="pre-top"&gt;
                        &lt;div class="pre-top-btns"&gt;
                            &lt;span class="pre-btn-red close-btn"&gt;&lt;/span&gt;
                            &lt;span class="pre-btn-orange minimize-btn"&gt;&lt;/span&gt;
                            &lt;span class="pre-btn-green maximize-btn"&gt;&lt;/span&gt;
                        &lt;/div&gt;
                    &lt;/div&gt;
                    &lt;button class="pre-copy-btn btn-in-pre btn btn-glass btn-sm"&gt;Copy&lt;/button&gt;
                    &lt;div class="pre-content p-6 text-sm font-mono"&gt;
&lt;pre data-language="javascript"&gt;&lt;code&gt;const solora = "prachtig";
console.log(`Dit ziet er ${solora} uit!`);&lt;/code&gt;&lt;/pre&gt;
                    &lt;/div&gt;
                &lt;/div&gt;</code></pre>
    </div>
</div>

<?php include '../layout/footer.php'; ?>