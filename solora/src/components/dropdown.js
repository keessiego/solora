export function initDropdowns() {
  if (typeof window === "undefined") return;

  document.querySelectorAll(".dropdown").forEach((drop) => {
    // VOORKOM DUBBELE INITIALISATIE
    if (drop.dataset.initialized) return;
    drop.dataset.initialized = "true";

    const btn = drop.querySelector(".dropdown-btn");
    const content = drop.querySelector(".dropdown-content");
    if (!btn || !content) return;

    let hiddenInput = drop.querySelector('input[type="hidden"]');
    if (!hiddenInput) {
      hiddenInput = document.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = drop.dataset.name || "dropdown";
      drop.appendChild(hiddenInput);
    }

    // Helper om items op te halen (exclusief disabled)
    const getItems = () => Array.from(content.querySelectorAll('.dropdown-item:not([aria-disabled="true"])'));

    const setValue = (item) => {
      if (item.getAttribute("aria-disabled") === "true") return;
      
      // Gebruik innerHTML als je icons wilt behouden, of trim() voor schone tekst
      btn.innerHTML = item.innerHTML; 
      
      content.querySelectorAll(".dropdown-item").forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
      hiddenInput.value = item.dataset.value ?? item.textContent.trim();
      
      // Trigger een event voor als je hierop wilt reageren met andere JS
      drop.dispatchEvent(new CustomEvent('change', { detail: hiddenInput.value }));
    };

    // Initiële waarde zetten
    const initialItem = content.querySelector(".dropdown-item.active") || content.querySelector('.dropdown-item:not([aria-disabled="true"])');
    if (initialItem) setValue(initialItem);

    const toggle = () => drop.classList.toggle("open");
    const close = () => drop.classList.remove("open");

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });

    document.addEventListener("click", (e) => {
      if (!drop.contains(e.target)) close();
    });

    // Toetsenbord navigatie
    btn.addEventListener("keydown", (e) => {
      if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
      
      const items = getItems();
      let currentIndex = items.findIndex((i) => i.classList.contains("active"));

      e.preventDefault();
      drop.classList.add("open"); // Altijd openen bij pijltjes

      if (e.key === "ArrowDown") {
        currentIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowUp") {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (e.key === "Enter") {
        if (currentIndex >= 0) setValue(items[currentIndex]);
        close();
        return;
      } else if (e.key === "Escape") {
        close();
        return;
      }

      // Update visuele focus tijdens navigeren
      items.forEach((i) => i.classList.remove("active"));
      items[currentIndex].classList.add("active");
      items[currentIndex].scrollIntoView({ block: "nearest" });
    });

    // Item kliks
    content.addEventListener("click", (e) => {
      const item = e.target.closest(".dropdown-item");
      if (item) {
        setValue(item);
        close();
      }
    });

    btn.setAttribute("tabindex", "0");
    btn.setAttribute("role", "combobox");
    btn.setAttribute("aria-haspopup", "listbox");
  });
}