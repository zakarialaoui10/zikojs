import {tags} from 'ziko'

tags.p('Hello World').mount(document.body).onClickAway(e=>console.log(e))