
<template>
  <ul class="nolist">
    <li v-if="links.twitter_id">
      <a
        :href="`https://twitter.com/${links.twitter_id}`"
        target="_blank"
        aria-label="Link to Twitter account"
        rel="noopener">
        <TwitterIcon />
      </a>
    </li>
    <li v-if="links.facebook_id">
      <a
        :href="`https://www.facebook.com/${links.facebook_id}`"
        target="_blank"
        aria-label="Link to Facebook account"
        rel="noopener">
        <FacebookIcon />
      </a>
    </li>
    <li v-if="links.instagram_id">
      <a
        :href="`https://instagram.com/${links.instagram_id}`"
        target="_blank"
        aria-label="Link to Instagram account"
        rel="noopener">
        <InstagramIcon />
      </a>
    </li>
    <li v-if="links.imdb_id">
      <a
        :href="`https://www.imdb.com/${imdb}/${links.imdb_id}`"
        target="_blank"
        aria-label="Link to IMDb account"
        rel="noopener">
        <ImdbIcon />
      </a>
    </li>
    <li v-if="links.homepage">
      <a
        :href="links.homepage"
        target="_blank"
        aria-label="Link to Homepage"
        rel="noopener">
        <LinkIcon />
      </a>
    </li>
  </ul>
</template>

<script>
import TwitterIcon from '~/assets/images/twitter.svg?inline';
import FacebookIcon from '~/assets/images/facebook.svg?inline';
import InstagramIcon from '~/assets/images/instagram.svg?inline';
import ImdbIcon from '~/assets/images/imdb.svg?inline';
import LinkIcon from '~/assets/images/link.svg?inline';

export default {
  components: {
    TwitterIcon,
    FacebookIcon,
    InstagramIcon,
    ImdbIcon,
    LinkIcon
  },

  props: {
    media: {
      type: String,
      required: false,
      default: ''
    },

    links: {
      type: Object,
      required: true
    }
  },

  computed: {
    // TODO: `person`, `name`, and `title` are hardcoded
    imdb() {
      if (this.media === 'person') {
        return 'name';
      } else {
        return 'title';
      }
    }
  }
};
</script>
