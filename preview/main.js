Ziko.ExtractAll()
Ziko.Math.ExtractAll()
Ziko.Graphics.ExtractAll()
const B=p(
    text("f"),
    p(),
    h1("l"),
    h2(),
    h3(),
    h4(),
    h5(),
    h6(),
    btn(),
    br(),
    hr(),
    ...hrs(3),
    ...brs(3),
    link(),
    input(),
    search(),
    slider(),
    checkbox(),
    radio(),
    datalist(),
    inputNumber(),
    inputColor(),
    inputDate(),
    inputDateTime(),
    inputEmail(),
    inputPassword(),
    inputTime(),
    select(),
    textarea(),
    Flex(),
    Header(),
    FlexHeader(),
    Main(),
    FlexMain(),
    Section(),
    FlexSection(),
    Article(),
    FlexArticle(),
    Aside(),
    FlexAside(),
    Nav(),
    FlexNav(),
    Footer(),
    FlexFooter(),
    Table(),
    Svg(),
    svgCircle(0,0,0),
    svgEllipse(0,0,0,0),
    svgImage(),
    svgLine(0,0,0,0),
    svgPolygon(),
    svgRect(0,0,0,0),
    svgText("",0,0),
    svgGroupe(),
    Notebook(),
    image(""),
    video(""),
    audio(""),
    
)
 B.remove()
// C=inputImage()
// C.remove()

c=Canvas().view(-10,-10,10,10).size(500,500).adjust()
a1=canvasCircle(-2,0,5).fill().color({fill:"#5555AA"})
a2=canvasCircle(2,0,5).fill().color({fill:"#AA5555"})
c.append(a1)
c.append(a2)
a1.ca

pp=Pointer(c)
pp.onDown(e=>{
    c.ctx.beginPath()
    c.ctx.moveTo(
        map(e.dx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0]),
        map(e.dy,0,c.element.offseHeight,c.axisMatrix[0][1],c.axisMatrix[1][1])
        )
})
pp.onMove(e=>{
    if(e.isDown){
        const x=map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0])
        const y=map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
    // c.ctx.lineTo(
    //     map(e.mx,0,c.element.offsetWidth,c.axisMatrix[0][0],c.axisMatrix[1][0]),
    //     map(e.my,0,c.element.offsetHeight,c.axisMatrix[1][1],c.axisMatrix[0][1])
    //     )
    c.ctx.stroke()
    c.append(canvasCircle(x,y,1).color({fill:"#5555AA"}).fill())
    }
})
pp.handle({
    down:true,
    move:true,
    up:true
})

// class Threed{
//     #workerContent;
//     constructor(){
//         this.#workerContent=(
//             function (msg){
//                 console.log({Main:msg.data})
//                 const func = new Function("return " + msg.data.fun)();
//                     let a=func()
//                     //postMessage("msg from worker " + a);
//                     postMessage(a);
//                     if(msg.data.close)self.close()
//             }
//             ).toString()
//             this.blob = new Blob(["this.onmessage = "+this.#workerContent], { type: "text/javascript" }) 
//             this.worker = new Worker(window.URL.createObjectURL(this.blob));
//     }
//     call(func,callback,close=true){
//         this.worker.postMessage({
//             fun:func.toString(),
//             close
//         });
//         this.worker.onmessage=function(e){
//             callback(e.data)
//         }
//         return this
//     }
// }

// const Multi=(func,callback)=>{
//     const T=new Threed()
//     if(func){
//         T.call(func,callback)
//     }
//     return T;
// }

//Multi(()=>{s=0;for(i=0;i<10000000000;i++)s+=i;return s},console.log)


class Threed {
    #workerContent;
    constructor() {
        this.#workerContent = (
            function (msg) {
                try {
                    const func = new Function("return " + msg.data.fun)();
                    let result = func();
                    postMessage({ result });
                } catch (error) {
                    postMessage({ error: error.message });
                } finally {
                    if (msg.data.close) self.close();
                }
            }
        ).toString();
        this.blob = new Blob(["this.onmessage = " + this.#workerContent], { type: "text/javascript" });
        this.worker = new Worker(window.URL.createObjectURL(this.blob));
    }
    call(func, callback, close = true) {
        this.worker.postMessage({
            fun: func.toString(),
            close
        });
        this.worker.onmessage = function (e) {
            if (e.data.error) {
                console.error(e.data.error);
            } else {
                callback(e.data.result);
            }
        };
        return this;
    }
}

const Multi = (func, callback , close) => {
    const T = new Threed();
    if (func) {
        T.call(func, callback , close);
    }
    return T;
}




