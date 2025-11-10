import {tags} from 'ziko/ui'
import {Switch} from 'ziko/ui'
const {svg} = tags;

globalThis.s = key => Switch({
    key ,
    cases : {
        1 : tags.p('Case 1').useClient(),
        2 : tags.p('Case 2'),
        default : tags.p('default')
    }
})

s(1)
s(2)
s(6)


const AArrowDown = (props) => 
    svg(
        {
        ...{
         "viewBox": "0 0 24 24",
         "fill": "none",
         "width": 24,
         "height": 24,
         "stroke": "green",
         "stroke-width": 2,
         "stroke-linecap": "round",
         "stroke-linejoin": "round"
        },
        ...props
        },
    tags.path({"d":"m14 12 4 4 4-4"}),
	tags.path({"d":"M18 16V7"}),
	tags.path({"d":"m2 16 4.039-9.69a.5.5 0 0 1 .923 0L11 16"}),
	tags.path({"d":"M3.304 13h6.392"})
    )

export default function App(){
    return AArrowDown({stroke : 'red'})
}

