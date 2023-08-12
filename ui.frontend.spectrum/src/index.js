import './spectrum-web-components/index.js';

import './components/layout.css';
import './components/search/results/results.css';


/* Placeholder JS */
function toInput(sourceEL) {
    const targetName = sourceEL.dataset.assetShareTargetInputName;
    const targetEl =  document.querySelector('input[name="' + targetName + '"]');


    if (targetEl.matches('input[type="hidden"], input[type="text"], textarea')) {
        targetEl.value = sourceEL.value;
    } else if (targetEl.matches('input[type="checkbox"], input[type="radio"]')) {
        targetEl.checked = sourceEL.checked;
    }

    const event = new Event('change', { 'bubbles': true, 'cancelable': true });
    targetEl.dispatchEvent(event);
}

window.AssetShare = window.AssetShare || {};
window.AssetShare.Spectrum = {
    toInput: toInput
}
