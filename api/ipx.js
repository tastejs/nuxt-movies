
// ray test touch <
import {
  createIPX,
  createIPXMiddleware
} from 'ipx';

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

const ipx = createIPX({
  domains: [
    TMDB_IMAGE_URL
  ]
});

const middleware = createIPXMiddleware(ipx);

export default (req, res) => {
  req.url = `/${TMDB_IMAGE_URL}/original${req.url}`;

  return middleware(req, res);
};
// ray test touch >
