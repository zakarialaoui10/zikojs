import {tags} from 'ziko/ui'

export default async function App({id}){
    console.log({id})
    return tags.h1('hello')
}