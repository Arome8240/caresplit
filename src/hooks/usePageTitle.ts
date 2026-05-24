import { useEffect } from 'react';

const BASE_TITLE = 'CareSplit - Community Savings on Celo';

export const usePageTitle = (title?: string) => {
  useEffect(() => {
    document.title = title ? `${title} | CareSplit` : BASE_TITLE;
    return () => { document.title = BASE_TITLE; };
  }, [title]);
};
