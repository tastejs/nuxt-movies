import { joinURL } from 'ufo';

const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p';

// https://image.nuxtjs.org/advanced/custom-provider

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

  return {
    url: joinURL(TMDB_IMAGE_URL, operations || 'original', src)
  };
}
