<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="alerts">
    <h2>Popups (Alert)</h2>
    <p class="description">
        Solora overschrijft automatisch de standaard JavaScript <code>alert()</code> en <code>confirm()</code> functies met een prachtige Apple-stijl glassmorphism popup.
    </p>

    <div class="demo-card">
        <div class="demo-grid" style="gap: 20px;">
            <sol-button color="primary" onclick="alert('Dit is een custom Apple-stijl alert!')">Toon Alert</sol-button>
            <sol-button color="secondary" onclick="confirm('Weet je zeker dat je dit wilt doen?')">Toon Confirm</sol-button>
            <sol-button color="secondary" onclick="prompt('Hoe heet je?', 'Gebruiker').then(name => name && alert('Hallo ' + name))">Toon Prompt</sol-button>
        </div>
    </div>

    <h3>Hoe het werkt</h3>
    <p>Zodra <code>initAll()</code> of <code>initAlert()</code> is aangeroepen, worden de standaard <code>window.alert</code>, <code>window.confirm</code> en <code>window.prompt</code> vervangen. Je hoeft je bestaande code dus niet aan te passen!</p>

    <sol-code language="javascript" label="Bestaande Code">
// Dit opent nu automatisch de Solora popup
alert("Bestand succesvol opgeslagen");

// Confirm werkt ook (asynchroon via de UI)
if (confirm("Verwijderen?")) {
    console.log("Gekozen voor OK");
}

// Prompt voor gebruikersinvoer
prompt("Wat is je e-mail?", "voorbeeld@mail.com").then(email => {
    if (email) console.log("Ingevoerd:", email);
});
    </sol-code>

    <h3 style="margin-top: 40px;">Input Gebruiken (Prompt)</h3>
    <p>Je kunt <code>solora.prompt</code> gebruiken om de gebruiker om tekstinvoer te vragen. Dit is perfect voor eenvoudige formulieren of instellingen.</p>

    <sol-code language="javascript" label="Prompt Voorbeeld">
solora.prompt({
    title: "Naam Wijzigen",
    message: "Voer je nieuwe gebruikersnaam in:",
    defaultValue: "John Doe",
    placeholder: "Type hier...",
    variant: "default"
}).then(value => {
    if (value !== null) {
        console.log("Nieuwe naam:", value);
    }
});
    </sol-code>

    <h3 style="margin-top: 40px;">Varianten</h3>
    <p>Net als cards ondersteunen popups nu varianten via de <code>solora</code> API.</p>
    
    <div class="demo-card">
        <div class="demo-grid" style="gap: 20px;">
            <sol-button color="primary" onclick="solora.alert({ title: 'Default', message: 'Dit is de standaard variant.', variant: 'default' })">Default Alert</sol-button>
            <sol-button color="secondary" onclick="solora.alert({ title: 'Glass', message: 'Dit is de glass variant (transparanter).', variant: 'glass' })">Glass Alert</sol-button>
        </div>
    </div>

    <sol-code language="javascript" label="Varianten Gebruiken">
// Default (zoals popovers)
solora.alert({
    title: "Update",
    message: "Versie 3.2 is beschikbaar",
    variant: "default"
});

// Glass (subtieler)
solora.alert({
    title: "Melding",
    message: "Bestand is geüpload",
    variant: "glass"
});
    </sol-code>

    <h3 style="margin-top: 40px;">Programmatisch gebruik</h3>
    <p>Je kunt de popups ook direct aanroepen via de <code>solora</code> global voor meer controle of Promise-based gebruik.</p>

    <sol-code language="javascript" label="Advanced">
// Met een custom titel
solora.alert("Systeem", "Je sessie verloopt bijna.");

// Gebruik met Promises (voor confirm)
solora.confirm("Vraag", "Wil je doorgaan?").then(result => {
    if (result) {
        console.log("Gebruiker klikte op OK");
    } else {
        console.log("Gebruiker klikte op Cancel");
    }
});
    </sol-code>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
