const CosmicBlue = {
    background: '#1B2836',
    currentLine: '#223348',
    selection: '#39516D',
    foreground: '#C0D4E5',
    comment: '#728CAB',
    cyan: '#75A6FF',
    green: '#5ED99F',
    orange: '#FFAD6F',
    pink: '#FF90B6',
    purple: '#A889C5',
    red: '#FF6E6E',
    yellow: '#FCD256'
}
class ZikoUseRoot {
    constructor(PropsMap, namespace = 'Ziko'){
        this.currentPropsMap = PropsMap;
        this.namespace = namespace;
        // this.pairs = {};
        this.#maintain()
    }
    use(PropsMap){
        this.currentPropsMap = PropsMap;
        this.#maintain()
    }
    #maintain(){
       const root = globalThis?.document?.documentElement?.style
       for(let prop in this.currentPropsMap){
           root.setProperty(`--${this.namespace}-${prop}`, this.currentPropsMap[prop]); 
        //    Object.assign(this.pairs, {
        //     [prop] : `var(--${this.namespace}-${prop})`
        //    })
           Object.defineProperty(this, prop, {
                value: `var(--${this.namespace}-${prop})`,
                writable: true,
                configurable: true,
                enumerable: false 
           })
       }
    }
}


const useRoot = (PropsMap, namespace) => new ZikoUseRoot(PropsMap, namespace);

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
  bordrr : '2px darkblue solid"'
 },
 S2 : {
  background : 'darkblue',
  color : 'white'
  bordrr : '2px green solid"'
 }
}
const {use, border, background, color} = useRoot(Style.S1)

*/