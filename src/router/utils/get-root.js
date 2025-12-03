export function get_root(paths) {
   if (paths.length === 0) return '';
   const splitPaths = paths.map(path => path.split('/'));
   const minLength = Math.min(...splitPaths.map(parts => parts.length));
   let commonParts = [];
   for (let i = 0; i < minLength; i++) {
       const part = splitPaths[0][i]; 
       if (splitPaths.every(parts => parts[i] === part || parts[i].startsWith('['))) {
           commonParts.push(part);
       } 
       else break; 
       
   }
   const root = commonParts.join('/') + (commonParts.length ? '/' : '');
   return root;
}