export function define_wc(name, UIElement, props = {}, { mode = 'open'} = {}) {
    if (globalThis.customElements?.get(name)) {
        console.warn(`Custom element "${name}" is already defined`);
        return; // skip redefinition
    }
    if(name.search('-') === -1){
        console.warn(`"${name}" is not a valid custom element name`);
        return; 
    }
    globalThis.customElements?.define(
        name,
        class extends HTMLElement {
            static get observedAttributes() {
                return ['style', ...Object.keys(props)];
            }

            constructor() {
                super();
                this.attachShadow({ mode });
                this.props = {};
                this.mask = {
                    ...props,
                    // style: { type: Object }
                };
            }

            connectedCallback() {
                this.render();
            }

            render() {
                this.shadowRoot.innerHTML = '';
                this.UIElement = UIElement(this.props).render(this.shadowRoot);
            }

            attributeChangedCallback(name, _, newValue) {
                Object.assign(this.props, {
                    [name]: this.mask[name].type(newValue)
                });
                this.render();
            }
        }
    );
}
