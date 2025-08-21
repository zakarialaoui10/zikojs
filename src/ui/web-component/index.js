export function defineWC(name, UIElement, props = {}, { mode = 'open'} = {}){
    globalThis.customElements?.define(
        name,
        class extends HTMLElement{
            static observedAttributes = ['style',...Object.keys(props)];
            constructor(){
                super()
                this.attachShadow({ mode });
                this.props = {};
                this.PropsMask = {
                    ...props,
                    ...{
                        style : { type : Object}
                    }
                }
            }
            connectedCallback(){
                this.render()
                console.log(this.props)   
            }
            render(){
                this.shadowRoot.innerHTML = ''
                this.UIElement = UIElement(this.props);
                this.UIElement.setTarget(this.shadowRoot)
            }
            attributeChangedCallback(name, _, newValue) {
                Object.assign(this.props, {[name] : this.PropsMask[name].type(newValue)});
                // if(name === "style") this.
                this.render()
            }
        }
    )
}