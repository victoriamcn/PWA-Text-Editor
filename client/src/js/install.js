const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // store the triggered events
    window.deferredPrompt = event;

    // remove hiddle class from the button
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    //show prompt
    promptEvent.prompt();

    // reset the deferred prompt variable, it can only be used once
    window.deferredPrompt = null;

    butInstall.classList.toggle('hidden', true)
});

// TODO: Add an handler for the `app installed` event
window.addEventListener('appinstalled', (event) => {
    // clear prompt
    window.deferredPrompt = null;
});
