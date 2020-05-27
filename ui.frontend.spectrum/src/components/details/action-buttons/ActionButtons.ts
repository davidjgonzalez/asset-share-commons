import { LitElement, html, property, customElement } from 'lit-element';
import {Atoms} from '../../commons/Atoms';

@customElement('details-action-buttons')
export class ActionButtons extends LitElement {
    @property({type : Boolean}) hideLabel = false;
    @property({type : String}) label = 'Actions';
 
    @property({type : Boolean}) hideDownload = false;
    @property({type : String}) downloadLabel = "";

    @property({type : Boolean}) hideShare = false;
    @property({type : String}) shareLabel = "";

    @property({type : Boolean}) hideAddToCart = false;
    @property({type : String}) addToCartLabel = "";
    
    render() {
        return html`
        ${Atoms.renderLabel(this.label, this.hideLabel)}
        ${this.renderActionButton(this.downloadLabel, this.hideDownload)}
        ${this.renderActionButton(this.shareLabel, this.hideShare)}
        ${this.renderActionButton(this.addToCartLabel, this.hideAddToCart)}
    `;
    }

    renderActionButton(label: String, hide: boolean) {
        if (!hide) {
            return html`
                <sp-action-button>${label}</sp-button>
            `;
        } else {
            return html``;
        }
    }
}
