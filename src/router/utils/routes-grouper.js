export function is_dynamic(path) {
  const DynamicPattern = /(:\w+|\[\.\.\.\w+\]|\[\w+\]\+?)/;
  return DynamicPattern.test(path);
}
export function routes_grouper(routeMap) {
  const grouped = {
    static: {},
    dynamic: {},
  };
  for (const [path, value] of Object.entries(routeMap)) {
    if (is_dynamic(path)) {
      const segments = path.split("/").filter(Boolean);
      const optionalIndex = segments.findIndex(seg => seg.endsWith("]+"));
      const hasInvalidOptional =
        optionalIndex !== -1 && optionalIndex !== segments.length - 1;
      if (hasInvalidOptional) throw new Error(`Invalid optional param position in route: "${path}" — optional parameters can only appear at the end.`);
      grouped.dynamic[path] = value;
    } 
    else grouped.static[path] = value;
  }
  return grouped;
}