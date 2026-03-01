import {tags} from 'ziko/dom'

export default async function App({id}){
    console.log({id})
    return tags.h1('hello')
}