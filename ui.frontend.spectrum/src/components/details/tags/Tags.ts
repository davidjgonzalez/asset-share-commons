import { LitElement, html, property, customElement } from 'lit-element';
import {Atoms} from '../../commons/Atoms';

@customElement('details-tags')
export class Tags extends LitElement {
    @property({type : Boolean}) hideLabel = false;
    @property({type : String}) label = 'Tags';
 
    @property({type : String}) tags = '';
    @property({type : String}) emptyText = "";
    
    render() {
        const tagsArray:Array<String> = JSON.parse(this.tags);

        return html`
            ${Atoms.renderLabel(this.label, this.hideLabel)}
            
            ${this.tags.length > 0 ?
                html`<sp-tags>
                        ${tagsArray.map(tag => html`<sp-tag>${tag}</sp-tag>`)}
                    </sp-tags>`
                :
                html`${this.emptyText}`}
    `;
    }
}
