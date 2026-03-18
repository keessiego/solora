<div class="min-h-16 w-full bg-zinc-100 border-b border-zinc-300 content-center pl-6 text-sm sticky top-0">
    <div>
        Home
    <?php
    foreach ($pathSegments as $segment) {
        echo " / <a href='" . $segment["link"] . "' >" . $segment["name"] . "</a>";
    }
    ?>
    </div>
</div>