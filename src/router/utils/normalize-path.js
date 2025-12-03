export function normalize_path(inputPath, root = './src/pages', extensions = ['js', 'ts']) {
    if(root.at(-1)==="/") root = root.slice(0, -1)
    const normalizedPath = inputPath.replace(/\\/g, '/')
                                    // .replace(/\[(\w+)\]/g, '$1/:$1');
    const parts = normalizedPath.split('/');
    const rootParts = root.split('/');
    const rootIndex = parts.indexOf(rootParts[rootParts.length - 1]);
    if (rootIndex !== -1) {
        const subsequentParts = parts.slice(rootIndex + 1);
        const lastPart = subsequentParts[subsequentParts.length - 1];
        const isIndexFile = lastPart === 'index.js' || lastPart === 'index.ts';
        const hasValidExtension = extensions.some(ext => lastPart === `.${ext}` || lastPart.endsWith(`.${ext}`));
        if (isIndexFile) return '/' + (subsequentParts.length > 1 ? subsequentParts.slice(0, -1).join('/') : '');
        if (hasValidExtension) return '/' + subsequentParts.join('/').replace(/\.(js|ts)$/, '');
    }
    return '';
 }