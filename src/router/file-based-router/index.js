import { 
    get_root,
    normalize_path,
    routes_matcher,
    is_dynamic,
    dynamic_routes_parser
 } from "../utils/index.js"
export async function createSPAFileBasedRouter(pages, target) {
    let path = globalThis.location.pathname;
    let params, mask = null, component = null;
    if(path.endsWith("/")) path = path.slice(0, -1);
    const routes = Object.keys(pages);
    console.log({routes})
    const root = get_root(routes);
    const pairs = {}
    for(let i=0; i<routes.length; i++){
      const module = await pages[routes[i]]()
      const component = await module.default
      Object.assign(pairs,{[normalize_path(routes[i], root)]:component})
   }
   const entries = Object.entries(pairs)
   for(let i=0; i<entries.length; i++){
    if(routes_matcher(entries[i][0], `/${path}`)){
      mask = entries[i][0];
      component = entries[i][1]
      break;
    }
   }
  if(mask){
    if(is_dynamic(mask)) params = dynamic_routes_parser(mask, path);
    (
      params 
      ? await component(params) 
      : await component()
    ).mount(document.body) 
  }
  return {mask, component, params}
}

