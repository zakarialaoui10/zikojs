import { base2base } from "../functions/conversions/index.js";
import { accum_sum } from "../functions/stats/index.js";
export class Random{
    static int(a, b){
        return Math.floor(this.float(a, b));
    }
    static float(a, b){
        return b ? Math.random() * (b - a) + a : a * Math.random();
    }
    static bin(){
        return this.int(1)
    }
    static oct(){
        return this.int(8)
    }
    static hex(){
        return base2base(this.int(16), 10, 16)
    }
    static char(upperCase){
        const i = upperCase ? this.int(65,90) : this.int(97,120);
        return String.fromCharCode(i);   
    }
    static bool(){
        return Boolean(this.int(1))
    }
    static get color(){
        return {
            hex : () => `#${this.int(0xffffff).toString(16).padStart(6, '0')}`,
            hexa : () => {
                const [r, g, b, a] = Array.from({length : 4}, () => this.int(0xff).toString(16).padStart(2, '0'));
                return `#${r}${g}${b}${a}`;
            },
            rgb : () => {
                const [r, g, b] = Array.from({length : 3}, () => this.int(0xff));
                return `rgb(${r}, ${g}, ${b})`;
            },
            rgba : () => {
                const [r, g, b, a] = Array.from({length : 4}, () => this.int(0xff));
                return `rgb(${r}, ${g}, ${b}, ${a})`;
            },
            hsl : () => {
                const h = this.int(360);
                const s = this.int(100);
                const l = this.int(100);
                return `hsl(${h}, ${s}%, ${l}%)`;
            },
            hsla : () => {
                const h = this.int(360);
                const s = this.int(100);
                const l = this.int(100);
                const a = Math.random().toFixed(2);
                return `hsla(${h}, ${s}%, ${l}%, ${a})`;
            },
            gray : () => {
                const g = this.int(0xff);
                return `rgb(${g}, ${g}, ${g})`;
            },
        }
    }
    static get sample(){
        return {
            int : (n, a, b) => Array.from({ length: n }, () => this.int(a, b)),
            float : (n, a, b) => Array.from({ length: n }, () => this.float(a, b)),
            char : n => Array.from({ length: n }, (upperCase) => this.char(upperCase)),
            bool : n => Array.from({ length: n }, () => this.bool()),
            bin : n => Array.from({ length: n }, () => this.bin()),
            oct : n => Array.from({ length: n }, () => this.oct()),
            dec : n => Array.from({ length: n }, () => this.dec()),
            hex : n => Array.from({ length: n }, () => this.hex()),
            get color(){
                return {
                    hex : n => Array.from({ length: n }, () => this.color.hex()),
                    hexa : n => Array.from({ length: n }, () => this.color.hexa()),
                    rgb : n => Array.from({ length: n }, () => this.color.rgb()),
                    rgba : n => Array.from({ length: n }, () => this.color.rgba()),
                    hsl : n => Array.from({ length: n }, () => this.color.hsl()),
                    hsla : n => Array.from({ length: n }, () => this.color.hsla()),
                    gray : n => Array.from({ length: n }, () => this.color.gray()),
                }
            },
            choice: (n, choices, p) => Array.from({ length : n}, () => this.choice(choices, p))
        }
    }
    static shuffle(...arr){
        return arr.sort(()=> .5 - Math.random())
    }
    static choice(choices = [1, 2, 3], p = new Array(choices.length).fill(1 / choices.length)) {
        let newchoice = new Array(100);
        p = accum_sum(...p).map(n => n*100)
        newchoice.fill(choices[0], 0, p[0]);
        for (let i = 1; i < choices.length; i++) 
            newchoice.fill(choices[i], p[i - 1], p[i]);
        return newchoice[this.int(newchoice.length - 1)];
    }

}

globalThis.Random = Random

// // (upperCase) => upperCase ? : String.fromCharCode(rand_int(97,120))
// class Random {
//     static string(length,upperCase){
//         return length instanceof Array?
//             new Array(this.int(...length)).fill(0).map(() => this.char(upperCase)).join(""):
//             new Array(length).fill(0).map(() => this.char(upperCase)).join("");
//     }

// }
// export{Random}