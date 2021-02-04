
<template>
  <footer :class="$style.footer">
    <p>
      <!-- TODO: should change the copyright name -->
      &copy; {{ new Date().getFullYear() }} The Nuxt Movies authors. All rights reserved.&nbsp;
      <a target="_blank" href="https://jason.codes/cookie-policy" rel="noopener">
        Cookie Policy
      </a>
      .
    </p>
    <p>
      Designed and built by the Nuxt Movies authors, data provided by&nbsp;
      <a target="_blank" href="https://www.themoviedb.org/" rel="noopener">
        TMDb
      </a>
      .
    </p>

    <!-- TODO: should change the owner's social links -->
    <ul class="nolist">
      <li>
        <a
          href="https://twitter.com/jasonujmaalvis"
          target="_blank"
          aria-label="Link to Twitter account"
          rel="noopener">
          <!-- TODO: fill color is hardcoded -->
          <TwitterIcon />
        </a>
      </li>
      <li>
        <a
          href="https://github.com/addyosmani/nuxt-movies"
          target="_blank"
          aria-label="Link to GitHub account"
          rel="noopener">
          <GitHubIcon />
        </a>
      </li>
      <li>
        <a
          href="https://www.linkedin.com/in/jason-ujma-alvis"
          target="_blank"
          aria-label="Link to LinkedIn account"
          rel="noopener">
          <LinkedInIcon />
        </a>
      </li>
      <li>
        <a
          href="mailto:hello@jason.codes"
          aria-label="Link to Email"
          rel="noopener">
          <EmailIcon />
        </a>
      </li>
    </ul>
  </footer>
</template>

<script>
import TwitterIcon from '~/assets/images/twitter.svg?inline';
import GitHubIcon from '~/assets/images/git-hub.svg?inline';
import LinkedInIcon from '~/assets/images/linked-in.svg?inline';
import EmailIcon from '~/assets/images/email.svg?inline';

export default {
  components: {
    TwitterIcon,
    GitHubIcon,
    LinkedInIcon,
    EmailIcon
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.footer {
  padding: 2rem 1.5rem 6.5rem;
  color: $text-color-grey;

  @media (min-width: $breakpoint-small) {
    padding-right: 4rem;
    padding-left: 4rem;
  }

  @media (min-width: $breakpoint-large) {
    padding: 2rem 5rem;
  }

  p {
    margin: 0.3rem 0;
    font-size: 1.4rem;
  }

  a {
    color: $text-color-grey;
    text-decoration: underline;
  }

  ul {
    display: flex;
    margin: 2rem 0 0 -0.5rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.4rem;
      height: 4.4rem;

      svg {
        transition: all 0.3s ease-in-out;
      }

      &:hover,
      &:focus {
        svg {
          fill: #fff;
        }
      }
    }
  }
}
</style>
