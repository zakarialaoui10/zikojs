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


// console.log("\n=== PARSER TESTS ===");
// console.log(dynamic_routes_parser("/user/[id]+", "/user"));
// // 👉 {}

// console.log(dynamic_routes_parser("/user/[id]+", "/user/42"));
// // 👉 { id: "42" }

// console.log(dynamic_routes_parser("/blog/[...slug]", "/blog/2025/oct/post"));
// // 👉 { slug: "2025/oct/post" }

// console.log(
//   dynamic_routes_parser("/product/[category]/[id]+", "/product/electronics"),
// );
// // 👉 { category: "electronics" }

// console.log("\n=== FIX TEST ===");
// console.log(dynamic_routes_parser("/[...slug]/[id]", "/sl1/sl2/9"));
// // 👉 { slug: "sl1/sl2", id: "9" }

// console.log(dynamic_routes_parser("/[slug]/[...id]", "/sl1/id1/id2"));
// // 👉 { slug: "sl1", id: "id1/id2" }

// console.log(dynamic_routes_parser("/blog/lang/[lang]/id/[id]", "/blog/lang/en/id/10"));
// // 👉 { lang: "en", id: "10" }