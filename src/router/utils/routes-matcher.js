export function routes_matcher(mask, route) {
  const maskSegments = mask.split("/").filter(Boolean);
  const routeSegments = route.split("/").filter(Boolean);
  let i = 0, j = 0;
  while (i < maskSegments.length && j < routeSegments.length) {
    const maskSegment = maskSegments[i];
    const routeSegment = routeSegments[j];
    if (maskSegment.startsWith("[...") && maskSegment.endsWith("]")) {
      const remainingMaskSegments = maskSegments.length - i - 1;
      if (remainingMaskSegments === 0) return true;
      // Calculate minimum required route segments for remaining mask
      let requiredSegments = 0;
      for (let k = i + 1; k < maskSegments.length; k++) {
        if (!maskSegments[k].endsWith("]+")) {
          requiredSegments++;
        }
      }
      const remainingRouteSegments = routeSegments.length - j;
      if (remainingRouteSegments < requiredSegments) return false;
      const segmentsToConsume = remainingRouteSegments - requiredSegments;
      if (segmentsToConsume < 1) return false;
      j += segmentsToConsume;
      i++;
      continue;
    }
    if (maskSegment.startsWith("[") && maskSegment.endsWith("]+")) {
      if (routeSegment) j++;
      i++;
      continue;
    }
    if (maskSegment.startsWith("[") && maskSegment.endsWith("]")) {
      i++;
      j++;
      continue;
    }
    if (maskSegment !== routeSegment) return false;
    i++;
    j++;
  }
  while (i < maskSegments.length) {
    const seg = maskSegments[i];
    if (seg.endsWith("]+")) {
      i++;
      continue;
    }
    return false;
  }
  return i === maskSegments.length && j === routeSegments.length;
}


// // DEMO
// console.log("=== EXISTING TESTS ===");
// console.log(routes_matcher("/user/[id]+", "/user")); // true
// console.log(routes_matcher("/user/[id]+", "/user/42")); // true
// console.log(routes_matcher("/blog/[...slug]", "/blog/a/b")); // true
// console.log(routes_matcher("/blog/[id]", "/blog")); // false
// console.log(routes_matcher("/product/:id", "/product/99")); // true

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


// // Only the last one that can be optional 