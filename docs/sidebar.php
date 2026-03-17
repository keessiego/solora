<?php 
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<div class="flex flex-col h-full w-82 p-3 border-r bg-zinc-100 border-zinc-300 min-w-xs">
  <button
    onclick="window.location.href = 'install.php'"
    class="btn-secondary btn-sm text-left w-full <?= $currentPage === 'install.php' ? 'active' : '' ?> rounded-full my-1"
  >
    Get Started
  </button>
  <button
    onclick="window.location.href = 'buttons.php'"
    class="btn-secondary btn-sm text-left w-full <?= $currentPage === 'buttons.php' ? 'active' : '' ?> rounded-full my-1"
  >
    Buttons
  </button>
</div>
