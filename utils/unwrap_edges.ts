type AnyObject = Record<string, any>;

/**
 * Recursively unwraps Shopify GraphQL edges/nodes.
 * @param data The data object from Shopify API
 * @returns Cleaned object with edges/nodes removed
 */
export function unwrapEdges(data: AnyObject): AnyObject {
  if (Array.isArray(data)) {
    return data.map(unwrapEdges);
  }

  if (data && typeof data === "object") {
    // If object has edges, replace it with unwrapped nodes
    if ("edges" in data && Array.isArray(data.edges)) {
      return unwrapEdges(data.edges.map((edge: any) => edge.node));
    }

    // Recursively process properties
    const cleaned: AnyObject = {};
    for (const key in data) {
      cleaned[key] = unwrapEdges(data[key]);
    }
    return cleaned;
  }

  // Primitive value
  return data;
}
