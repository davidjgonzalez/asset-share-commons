import Bem from '../../../../util/Bem';

/**

 Given the HTML for this component....

 <div class="cmp-my-component">
    <h1 class="cmp-my-component__title">Hello Holidays!</h1>

    <section class="cmp-my-component__holiday cmp-my-component__holiday--halloween">
        <button class="cmp-my_component__button">I like Halloween!</button>
    </section>

     <section class="cmp-my-component__holiday cmp-my-component__holiday--halloween">
        <button class="cmp-my_component__button">I like Thanksgiving!</button>
    </section>
 </div>

 **/

// Initialize the bem object with the BLOCK selector as const with a global scope in this file, as it helps if you need to use it in deeper abstractions.
const _bem = new Bem('cmp-my-component');


// Declare and export by default the class that represents the component to test
export default class MyComponent {

    constructor() {
        // Make sure NOT to get elements in the constructor!
    }

    /**
     * This returns the first component matching its BEM block selector on the page.
     *
     * This currently supports only 1 matching element on the page, however this could be extended to support multiple.
     *
     * @returns {WebElement JSON object}
     */
    get component() {
        return $(_bem.selector());
    }

    /**
     * Returns the element `<h1 class="cmp-my-component__title">...</h1>`
     *
     * The the single title for the component.
     *
     * This assumes there is only 1 title for the entire component/
     *
     * @returns {*}
     */
    get title() {
        return this.component.element(_bem.selector('title'));
    }

    /**
     * Returns the element `<section class="cmp-my-component__holiday cmp-my-component__holiday--halloween">...</section>`
     *
     * Typically getters returning specific sub-sections are private methods, as the elements of interest are require
     * further selection, and will have their own get methods (as seen below for the buttons);.
     *
     * @returns {*}
     * @private
     */
    get _halloweenSection() {
        return this.component.element(_bem.selector('holiday', 'halloween'));
    }

    /**
     * Returns the element `<section class="cmp-my-component__holiday cmp-my-component__holiday--thanksgiving">...</section>`
     *
     * Typically getters returning specific sub-sections are private methods, as the elements of interest are require
     * further selection, and will have their own get methods (as seen below for the buttons);.
     *
     * @returns {*}
     * @private
     */
    get _thanksgivingSection() {
        return this.component.element(_bem.selector('holiday', 'thanksgiving'));
    }

    /**
     * Returns the element `<button class="cmp-my_component__button">I like Halloween!</button>`
     * @returns {*}
     */
    get halloweenButton() {
        return this._halloweenSection.element(_bem.selector('button'));
    }

    /**
     * Returns the element `<button class="cmp-my_component__button">I like Thanksgiving!</button>`
     *
     * @returns {*}
     */
    get thanksgivingElement() {
        return this._thanksgivingSection.element(_bem.selector('button'));
    }
}