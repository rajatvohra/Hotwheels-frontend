
import algoliasearch from 'algoliasearch';

export const Alclient = algoliasearch(process.env.REACT_APP_ALGOLIA_KEY+"", process.env.REACT_APP_ALGOLIA_SECRET+"");
export const index = Alclient.initIndex(process.env.REACT_APP_ALGOLIA_INDEX+"");