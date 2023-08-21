import { isOpen, getModal, getFormData, addCancelEventListener } from "./modals";

export default class ShareModalElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        if (!isOpen(this)) { return; }

        const shareModalPath = this.getAttribute('data-asset-share-modal');

        // Share modal     
        const fragment = await this.prepareShareModal(shareModalPath);

        this.shadowRoot.replaceChildren(fragment);
    }


    async prepareShareModal(shareModalPath) {
        const fragment = await getModal(shareModalPath, getFormData(this));

        addCancelEventListener(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', (event) => {
            event.target.querySelector('form').submit()
        });

        return fragment;
    }
}

customElements.define('asset-share-share-modal', ShareModalElement);
