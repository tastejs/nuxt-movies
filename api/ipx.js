
import {
  createIPX,
  createIPXMiddleware
} from 'ipx';

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

const YOUTUBE_IMAGE_URL = 'https://img.youtube.com/vi';
const YOUTUBE_THUMBNAIL_QUALITY_NAME = 'maxresdefault.jpg';

const ipx = createIPX({
  domains: [
    TMDB_IMAGE_URL,
    YOUTUBE_IMAGE_URL
  ]
});

const middleware = createIPXMiddleware(ipx);

export default (req, res) => {
  if (req.url.includes(YOUTUBE_THUMBNAIL_QUALITY_NAME)) {
    req.url = `/${YOUTUBE_IMAGE_URL}${req.url}`;
  } else {
    req.url = `/${TMDB_IMAGE_URL}/original${req.url}`;
  }

  return middleware(req, res);
};
