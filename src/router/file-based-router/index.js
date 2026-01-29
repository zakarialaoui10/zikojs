import { 
    get_root,
    normalize_path,
    routes_matcher,
    is_dynamic,
    dynamic_routes_parser
 } from "../utils/index.js"
export async function createSPAFileBasedRouter({
  pages = {},
  target = globalThis?.document?.body,
  extensions = ['js', 'ts'],
  domifier = null,
  renderer
} = {}) {
  if(!(target instanceof HTMLElement) && target?.element instanceof HTMLElement) target = target?.element;
  if (!(target instanceof HTMLElement)) {
    throw new Error("Invalid mount target: must be HTMLElement or UIElement");
  }
  let path = decodeURIComponent(globalThis.location.pathname.replace(/\/$/, ''));
  const routes = Object.keys(pages);
  const root = get_root(routes);

  const pairs = {};
  for (const route of routes) {
    const module = await pages[route]();
    const modComponent = await module.default;
    pairs[normalize_path(route, root, extensions)] = modComponent;
  }

  let mask = null;
  let component = null;

  for (const [routePath, comp] of Object.entries(pairs)) {
    if (routes_matcher(routePath, `/${path}`)) {
      mask = routePath;
      component = comp;
      break;
    }
  }
  if (mask === null) return; // no route matched
  const params = is_dynamic(mask) ? dynamic_routes_parser(mask, path) : undefined;
  if(renderer) {
    renderer(target, component, params)
    return;
  }


  let mounted = domifier
        ? await domifier(component, params)
        : await component(params)
  // // let mounted 
  // if(domifier) {
  //   mounted = await domifier(component, params);
  //   target.append(mounted)
  // }
  // console.log({component})

  // return;
  // const mounted = params ? await component(params) : await component();

  if(mounted instanceof HTMLElement) 
      mounted instanceof Array 
        ? target.append(...mounted) 
        : target.append(mounted);
  else mounted instanceof Array 
        ? mounted.forEach(el => el.mount(target)) 
        : mounted.mount(target);

}
