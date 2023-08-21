import {formSubmitListener, getCsrfToken} from './csrf.js';

export async function getModal(path, formData) {
    formData = formData || new FormData();
    formData.append('timezone', Intl.DateTimeFormat().resolvedOptions().timeZone);
    formData.append(':cq_csrf_token', await getCsrfToken());

    if (path.indexOf('.') > -1) {
        path = path.substring(0, path.indexOf('.'));
    }

    const response = await fetch(`${path}.fragment.html`, {
        method: 'POST',
        body: formData,
    });

    const html = await response.text();
    console.log(html);
    const fragment = document.createRange().createContextualFragment(html).querySelector('sp-dialog-wrapper');

    fragment.querySelectorAll('form')?.forEach(form => {
        form.addEventListener('submit', formSubmitListener);
        form.insertAdjacentHTML('afterbegin', `<input type="hidden" name="timezone" value="${Intl.DateTimeFormat().resolvedOptions().timeZone}">`);
    });

    return fragment || '';
}

export function isOpen(el) {
    console.log(el.parentElement.tagName.toUpperCase());
    return el.parentElement.tagName.toUpperCase() === 'ACTIVE-OVERLAY';
}

export function getFormData(el) {
    const PREFIX = 'data-asset-share-form-param-';

    const formData = new FormData();
    
    [...el.attributes].forEach((attr) => {
        if (attr.name?.startsWith(PREFIX)) {
            const name = attr?.name.substring(PREFIX.length)?.trim();
            const value = attr?.value?.trim();

            if (name && value.startsWith('[') && value.endsWith(']')) {
                const values = value.substring(1, value.length - 1).split(',');
                values.forEach((v) => {
                    formData.append(name, v?.trim());
                });
            } else if (name) {
                formData.append(name, value);
            }
        }      
    });

    return formData;
}

export function addCancelEventListener(fragment, shadowRoot) {
    fragment.addEventListener('cancel', () => {
        document.querySelectorAll('overlay-trigger').forEach(overlayTrigger => overlayTrigger.open = undefined);
        // Clear the shadow root so that the modal does not flicker on next open.
        shadowRoot.innerHTML = '';
    });
}
