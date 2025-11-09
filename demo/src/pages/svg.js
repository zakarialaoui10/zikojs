import {tags} from 'ziko/ui'
const {svg, circle, animate, animateMotion, path, line} = tags;


//   <rect width="5" height="5" x="3" y="3">
//     <animate
//       attributeName="x"
//       values="0;5;0"
//       dur="2s"
//       count="5" />
//   </rect>

//  <animateMotion
//       dur="10s"
//       repeatCount="indefinite"
//       path="M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z" />
export default function App(){
    return svg({width : 232, height : 232, viewBox : '0 0 50 50'},
            path({d:"M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"}),
    line({ x1: "12", x2: "12", y1: "8", y2: "12" }),
    line({ x1: "12", x2: "12.01", y1: "16", y2: "16" })
    ).style({
        border: '1px red solid'
    })
    return svg({viewbox : '0 0 200 100', width: '200', height : '200'},
        circle({r:5, cx:100, cy:50, fill:'red'},
            // animate({attributeName : 'r', values : '0;.1;.2;.3;.4;.5;.6;.7;.8;.9;1', dur:'1s', count : 5})
            animateMotion({
                dur : '5s', 
                repeatCount:"indefinite", 
                path:"M20,50 C20,-50 180,150 180,50 C180-50 20,150 20,50 z"
            })
        )
    ).style({
        border : '1px red solid'
    })
}