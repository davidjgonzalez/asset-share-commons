let csrfToken = await fetchCsrfToken();

setInterval(async () => {
    csrfToken = await fetchCsrfToken();
}, 500000); // 500 seconds as CSRF token life is 600 seconds

export async function getCsrfToken() { return csrfToken || await fetchCsrfToken(); }

export async function fetchCsrfToken() {
    const response = await fetch('/libs/granite/csrf/token.json');
    const json = await response.json();
    return json?.token || null;
}

export function formSubmitListener(event) {
    event.preventDefault();

    const form = event.target;

    // Create a form input named ``:cq_csrf_token`` with the CSRF token.
    let csrfTokenInput = form.querySelector('input[name=":cq_csrf_token"]');
    if (!csrfTokenInput?.value) {
        // If the form does not have a CSRF token input, add one.
        form.insertAdjacentHTML('beforeend', `<input type="hidden" name=":cq_csrf_token" value="${csrfToken}">`);
    } else {
        // If the form already has a CSRF token input, update the value.
        csrfTokenInput.value = csrfToken;
    }
    // Submit the form with the hidden input containing the CSRF token
    form.submit();
}