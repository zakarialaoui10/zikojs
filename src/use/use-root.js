class ZikoUseRoot {
    constructor(PropsMap, {namespace = 'Ziko', register, ValidateCssProps = false} = {}){
        this.currentPropsMap = PropsMap;
        this.namespace = namespace;
        this.ValidateCssProps = ValidateCssProps;
        // this.pairs = {};
        // this.#maintain()
        this.use(PropsMap)
    }
    use(PropsMap){
        if(this.ValidateCssProps) ValidateCssProps(PropsMap)
        this.currentPropsMap = PropsMap;
        this.#maintain()
        return this;
    }
    #maintain(){
       const root = globalThis?.document?.documentElement?.style
       for(let prop in this.currentPropsMap){
        const cssProp = this.namespace ? `--${this.namespace}-${prop}` : `--${prop}`
           root.setProperty(
            cssProp, 
            this.currentPropsMap[prop]
            ); 
        //    Object.assign(this.pairs, {
        //     [prop] : `var(--${this.namespace}-${prop})`
        //    })
           Object.defineProperty(this, prop, {
                value: `var(${cssProp})`,
                writable: true,
                configurable: true,
                enumerable: false 
           })
       }
    }
}

function ValidateCssProps(PropsMap){
    const validProps = new Set(Object.keys(document.documentElement.style));
    for (let key in PropsMap) {
        if (!validProps.has(key)) {
            throw new Error(`Invalid CSS property: "${key}"`);
        }
    }
}

const useRoot = (PropsMap, {namespace, register, ValidateCssProps} = {}) => new ZikoUseRoot(PropsMap, {namespace, register, ValidateCssProps});

export{
    ZikoUseRoot,
    useRoot
}

// Usage 

/*
const Styles = {
 S1 : {
  background : 'white',
  color : 'darkblue'
  border : '2px darkblue solid"'
 },
 S2 : {
  background : 'darkblue',
  color : 'white'
  border : '2px green solid"'
 }
}
const {use, border, background, color} = useRoot(Style.S1)

tags.p("Test useRoot ").style({
  border,
  color,
  background,
  padding : '10px'
})

*/