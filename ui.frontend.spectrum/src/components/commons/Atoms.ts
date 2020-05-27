import { html } from 'lit-element';

export class Atoms {

    static renderLabel(label: String, hideLabel: boolean) {
        if (!hideLabel) {
            return html`<h4>${label}</h4>`;
        } else {
            return html``;
        };
    };
}
