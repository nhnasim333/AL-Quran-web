import { useEffect, useState } from "react";

export function useCachedAssets(cacheName: string, dependencies: any[] = []) {
  const [cachedUrls, setCachedUrls] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if ("caches" in window) {
      caches.open(cacheName).then((cache) => {
        cache.keys().then((requests) => {
          const urlObject: Record<string, boolean> = {};
          requests.forEach((request) => {
            urlObject[request.url] = true;
          });
          setCachedUrls(urlObject);
        });
      });
    }
  }, dependencies);

  return cachedUrls;
}
