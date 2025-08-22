export function defineWC(name, UIElement, props = {}, { mode = 'open'} = {}) {
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
