export function getAllUrlParams(): {[key: string]: any} {
  if (!document) {
    return {};
  }

  const kvs: {[key: string]: any} = {};
  let params = (new URL((document as any).location)).searchParams;
  for (const key of (params as any).keys()) {
    kvs[key] = params.get(key);
  }

  return kvs;
}

export function getUrlParam(key: string): any {
  if (!document) {
    return undefined;
  }

  let params = (new URL((document as any).location)).searchParams;
  return params.get(key);
}
