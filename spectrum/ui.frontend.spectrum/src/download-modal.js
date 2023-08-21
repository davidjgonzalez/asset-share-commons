import { isOpen, getModal, getFormData, addCancelEventListener } from "./modals";

export default class DownloadModalElement extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        if (!isOpen(this)) { return; }

        const downloadModalPath = this.getAttribute('data-asset-share-modal');
        const licenseModalPath = '/content/asset-share-commons/en/actions/license';       
        //const licensePath = this.getAttribute('data-asset-share-license');

        let fragment;

        if (licenseModalPath) {
            // License modal
            fragment = await this.prepareLicenseModal(licenseModalPath, downloadModalPath);
        } else {
            // Download modal     
            fragment = await this.prepareDownloadModal(downloadModalPath);
        }

        this.shadowRoot.replaceChildren(fragment);

    }

    async prepareLicenseModal(licenseModalPath, downloadModalPath) {
        const fragment = await getModal(licenseModalPath, getFormData(this));
        
        addCancelEventListener(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', async () => {
            console.log('confirm', downloadModalPath);
            this.shadowRoot.replaceChildren(await this.prepareDownloadModal(downloadModalPath));
        });

        return fragment;
    }

    async prepareDownloadModal(downloadModalPath) {
        const fragment = await getModal(downloadModalPath, getFormData(this));

        addCancelEventListener(fragment, this.shadowRoot);

        fragment.addEventListener('confirm', (event) => {
            event.target.querySelector('form').submit()
        });

        return fragment;
    }

}

customElements.define('asset-share-download-modal', DownloadModalElement);
