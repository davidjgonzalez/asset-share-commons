import { LitElement, html, property, customElement } from 'lit-element';

@customElement('details-action-buttons')
export class ActionButtons extends LitElement {

    @property({type: String, reflect: true, 
        converter: { 
            fromAttribute: (value, type) => { 
                console.log('fromAttribute');
                console.log(value);
                console.log(type);

                return value + '!!!';
            },
            toAttribute: (value, type) => { 
                console.log('toAttribute');

                console.log(value);
                console.log(type);
              // `value` is of type `type` 
              // Convert it to a string and return it
              return value + '????';

            }
          }}) myData = '';

    render() {
        return html`
        <div>STR: ${this.myData}</div>
    `;
    }
    
    _render() {
        return html`
      
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
