
<template>
  <div class="spacing" :class="$style.info">
    <div :class="$style.left">
      <div :class="$style.poster">
        <nuxt-picture
          v-if="avatar"
          :width="AVATAR_WIDTH"
          :height="AVATAR_HEIGHT"
          :sizes="AVATAR_SIZES"
          :alt="person.name"
          :src="avatar" />
        <PlaceholderIcon v-else />
      </div>
    </div>

    <div :class="$style.right">
      <div :class="$style.overview">
        <h2 :class="$style.title">
          {{ person.name }}
        </h2>

        <div v-if="person.biography">
          <nuxt-picture
            v-if="avatar"
            :width="AVATAR_WIDTH"
            :height="AVATAR_HEIGHT"
            :sizes="AVATAR_SIZES"
            :alt="person.name"
            :src="avatar" />
          <!-- eslint-disable-next-line vue/no-v-html -->
          <div v-html="formatContent(person.biography)" />
        </div>
      </div>

      <div :class="$style.stats">
        <ul class="nolist">
          <li v-if="person.known_for_department">
            <div :class="$style.label">
              Known For
            </div>

            <div :class="$style.value">
              {{ person.known_for_department }}
            </div>
          </li>
          <li v-if="person.birthday">
            <div :class="$style.label">
              Born
            </div>

            <div :class="$style.value">
              {{ person.birthday | fullDate }}
              <span v-if="!person.deathday">(age {{ age }})</span>
            </div>
          </li>
          <li v-if="person.place_of_birth">
            <div :class="$style.label">
              Place of Birth
            </div>

            <div :class="$style.value">
              {{ person.place_of_birth }}
            </div>
          </li>
          <li v-if="person.deathday">
            <div :class="$style.label">
              Died
            </div>

            <div :class="$style.value">
              {{ person.deathday | fullDate }}
              <span v-if="person.birthday">(aged {{ age }})</span>
            </div>
          </li>
        </ul>
      </div>

      <div :class="$style.external">
        <ExternalLinks
          media="person"
          :links="person.external_ids" />
      </div>
    </div>
  </div>
</template>

<script>
import ExternalLinks from '~/components/ExternalLinks';
import PlaceholderIcon from '~/assets/images/placeholder.svg?inline';

export default {
  components: {
    ExternalLinks,
    PlaceholderIcon
  },

  props: {
    person: {
      type: Object,
      required: true
    }
  },

  computed: {
    avatar() {
      return this.person.profile_path;
    },

    age() {
      const born = this.person.birthday;
      const died = this.person.deathday;

      if (born && !died) {
        return this.getAge(born);
      } else if (born && died) {
        return this.getAge(born, died);
      } else {
        return false;
      }
    }
  },

  created() {
    if (this.person.homepage) {
      // TODO: avoid mutating props
      // eslint-disable-next-line vue/no-mutating-props
      this.person.external_ids.homepage = this.person.homepage;
    }

    this.AVATAR_SIZES = 'large:20vw xlarge:20vw xlarge1:18vw xlarge3:780';
    this.AVATAR_WIDTH = 370;
    this.AVATAR_HEIGHT = 556;
  },

  methods: {
    formatContent(string) {
      return string.split('\n').filter(section => section !== '').map(section => `<p>${section}</p>`).join('');
    },

    getAge(born, died) {
      const startDate = new Date(born);
      let endDate;
      let age;

      if (died) {
        endDate = new Date(died);
      } else {
        endDate = new Date();
      }

      const month = endDate.getMonth() - startDate.getMonth();
      age = endDate.getFullYear() - startDate.getFullYear();

      if (month < 0 || (month === 0 && endDate.getDate() < startDate.getDate())) {
        age--;
      }

      return age;
    }
  }
};
</script>

<style lang="scss" module>
@import '~/assets/css/utilities/_variables.scss';

.info {
  @media (min-width: $breakpoint-medium) {
    display: flex;
  }
}

.left {
  display: none;

  @media (min-width: $breakpoint-medium) {
    display: block;
    width: 25%;
    max-width: 400px;
    padding-right: 3rem;
  }

  @media (min-width: $breakpoint-large) {
    padding-right: 5rem;
  }
}

.right {
  @media (min-width: $breakpoint-medium) {
    flex: 1;
  }
}

.poster {
  background-color: $secondary-color;

  // TODO: should add styling for span element

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.overview {
  max-width: 1000px;
  margin-bottom: 3rem;
  overflow: hidden;
  font-size: 1.5rem;
  color: $text-color;

  @media (min-width: $breakpoint-large) {
    font-size: 1.6rem;
  }

  img {
    float: left;
    width: 40%;
    max-width: 200px;
    margin: 0 1.5rem 0 0;

    @media (min-width: $breakpoint-medium) {
      display: none;
    }
  }
}

.title {
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: #fff;
  letter-spacing: $letter-spacing;

  @media (min-width: $breakpoint-large) {
    font-size: 2.4rem;
  }
}

.stats {
  margin-bottom: 3rem;
  font-size: 1.5rem;
  color: $text-color;

  @media (min-width: $breakpoint-large) {
    font-size: 1.6rem;
  }

  ul {
    @media (min-width: $breakpoint-medium) {
      display: flex;
      flex-wrap: wrap;
    }
  }

  li {
    display: flex;
    padding: 0.2rem 0;

    @media (min-width: $breakpoint-medium) {
      width: 50%;
    }

    @media (min-width: $breakpoint-xlarge) {
      width: 100%;
    }
  }

  a {
    color: $primary-color;
    text-decoration: underline;
  }
}

.label {
  flex: 1;
  max-width: 90px;
  margin-right: 1.5rem;
  color: #fff;

  @media (min-width: $breakpoint-xsmall) {
    max-width: 110px;
  }
}

.value {
  flex: 2;
}

.external {
  ul {
    display: flex;
    margin-left: -0.5rem;
  }

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
        fill: $primary-color;
      }
    }
  }
}
</style>
