import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the no of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items AND there arent enough items the requested amount AND we are on the last page - JUST GIMME THAT
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from cache
      if (items.length) {
        return items;
      }

      return false; // fallback to network

      // First thing is return items because they are already in the cache

      // Second thing: return false from here (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client come back from the network with products
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; i++) {
        merged[i] = incoming[i - skip];
      }
      // Return the merged items from the cache
      return merged;
    },
  };
}
