import ZikoUIElement from "../../constructors/ziko-ui-element.js"
import { tbody,caption,ZikoUICaption,thead} from "./elements.js";
import { matrix } from "../../../math/matrix/index.js";
import { MatrixToTableUI } from "./utils.js";
class ZikoUITable extends ZikoUIElement {
    constructor(body,{caption=null,head=null,foot=null}={}){
        super("table","Table");
        this.structure={
            caption,
            head,
            body:null,
            foot
        }
        if(body)this.fromMatrix(body);
        if(caption)this.setCaption(caption)
    }
    get isTable(){
        return true;
      }
    get caption(){
        return this.structure.caption;
    }
    get header(){

    }
    get body(){

    }
    get footer(){

    }
    setCaption(c){
        this.removeCaption();
        this.structure.caption=caption(c);
        this.append(this.structure.caption);
        return this;
    }
    removeCaption(){
        if(this.structure.caption)this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        this.structure.caption=null;
        return this;
    }
    setHeader(...c){
        this.tHead=thead(...c);
        this.append(this.tHead);
        return this;
    }
    removeHeader(){
        this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        return this;
    }
    setFooter(c){
        this.structure.caption=caption(c);
        this.append(this.structure.caption);
        return this;
    }
    removeFooter(){
        this.removeItem(...this.items.filter(n=>n instanceof ZikoUICaption));
        return this;
    }
    fromMatrix(bodyMatrix) {
        (bodyMatrix instanceof Array)?this.bodyMatrix=matrix(bodyMatrix):this.bodyMatrix=bodyMatrix;
        if(this.structure.body)this.remove(this.structure.body);
        this.structure.body=tbody()
        this.append(this.structure.body);
        this.structure.body.append(...MatrixToTableUI(this.bodyMatrix))
        //this.structure.body.append(...MatrixToTableUI(matrix))
        //this.cellStyles({ padding: "0.2rem 0.4rem", textAlign: "center" });
        return this;
      }
    transpose() {
        this.fromMatrix(this.bodyMatrix.T);
        return this;
      }
    hstack(m) {
        if(m instanceof ZikoUITable)m=m.bodyMatrix
        this.fromMatrix(this.bodyMatrix.clone.hstack(m));
        return this;
    }
    vstack(m) {
        if(m instanceof ZikoUITable)m=m.bodyMatrix
        this.fromMatrix(this.bodyMatrix.clone.vstack(m));
        return this;
    }
    slice(r0=0,c0=0,r1=this.bodyMatrix.rows-1,c1=this.bodyMatrix.cols-1) {
        this.fromMatrix(this.bodyMatrix.slice(r0,c0,r1,c1));
        return this;
      }
    sortByCols(n, config = { type: "num", order: "asc" }) {
        this.fromMatrix(this.bodyMatrix.clone.sortTable(n, config));
        return this;
    }
    sortByRows(n, config = { type: "num", order: "asc" }) {
        this.fromMatrix(this.bodyMatrix.T.clone.sortTable(n, config).T);
        return this;
    }
    filterByRows(item) {
        this.fromMatrix(this.bodyMatrix.clone.filterByRows(item));
        return this;
    }
    filterByCols(item) {
        this.fromMatrix(this.bodyMatrix.clone.filterByCols(item));
        return this;
      }
    forEachRow(callback){
        this.structure.body.forEach(callback);
        return this;
    }
    forEachItem(callback){
        this.structure.body.forEach(n=>n.forEach(callback));
        return this;
    }
}
const Table=(matrix,config)=>new ZikoUITable(matrix,config)
export {Table}
