export function dynamic_routes_parser(mask, route) {
  const maskSegments = mask.split("/").filter(Boolean);
  const routeSegments = route.split("/").filter(Boolean);
  const params = {};
  let i = 0, j = 0;
  while (i < maskSegments.length && j < routeSegments.length) {
    const maskSegment = maskSegments[i];
    const routeSegment = routeSegments[j];
    if (maskSegment.startsWith("[...") && maskSegment.endsWith("]")) {
      const paramName = maskSegment.slice(4, -1);
      const remainingMaskSegments = maskSegments.length - i - 1;
      if (remainingMaskSegments === 0) {
        params[paramName] = routeSegments.slice(j).join("/");
        break;
      }
      let requiredSegments = 0;
      for (let k = i + 1; k < maskSegments.length; k++) {
        if (!maskSegments[k].endsWith("]+")) requiredSegments++;
      }
      const remainingRouteSegments = routeSegments.length - j;
      const segmentsToConsume = remainingRouteSegments - requiredSegments;
      if (segmentsToConsume >= 1) {
        params[paramName] = routeSegments
          .slice(j, j + segmentsToConsume)
          .join("/");
        j += segmentsToConsume;
      } 
      else return {};
      i++;
      continue;
    }
    if (maskSegment.startsWith("[") && maskSegment.endsWith("]+")) {
      const paramName = maskSegment.slice(1, -2);
      if (routeSegment) {
        params[paramName] = routeSegment;
        j++;
      }
      i++;
      continue;
    }
    if (maskSegment.startsWith("[") && maskSegment.endsWith("]")) {
      const paramName = maskSegment.slice(1, -1);
      params[paramName] = routeSegment;
    } 
    else if (maskSegment !== routeSegment) return {};
    i++;
    j++;
  }
  return params;
}