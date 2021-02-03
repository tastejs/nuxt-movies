
import { joinURL } from 'ufo';

import { TMDB_IMAGE_URL } from '~/config/tmdbAPI';

// RE: https://image.nuxtjs.org/advanced/custom-provider
export function getImage(src, { modifiers = {} } = {}) {
  const { width, height } = modifiers;

  let operations = '';
  if (width) {
    operations += 'w' + width;
  }
  if (height) {
    operations += (operations ? '_and_' : '') + 'h' + height;
  }
  if (operations) {
    operations += '_bestv2';
  }

  if (src.startsWith(TMDB_IMAGE_URL)) {
    src = src.substr(TMDB_IMAGE_URL.length);
  }

  if (!operations && !src.includes('original/')) {
    operations = 'original';
  }

  return {
    url: joinURL(TMDB_IMAGE_URL, operations, src)
  };
}
