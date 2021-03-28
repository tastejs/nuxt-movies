/**
 * Name
 */
const name = {
  computed: {
    name() {
      return this.item.title ? this.item.title : this.item.name;
    }
  }
};

/**
 * Star rating
 */
const stars = {
  computed: {
    stars() {
      if (this.item.vote_average) {
        return this.item.vote_average * 10;
      }
    }
  }
};

/**
 * Year started
 */
const yearStart = {
  computed: {
    yearStart() {
      const date = this.item.release_date ? this.item.release_date : this.item.first_air_date;

      if (date) {
        return date.split('-')[0];
      }
    }
  }
};

/**
 * Year ended
 */
const yearEnd = {
  computed: {
    yearEnd() {
      const date = this.item.last_air_date;

      if (date) {
        return date.split('-')[0];
      }
    }
  }
};

/**
 * Backdrop
 */
const backdrop = {
  computed: {
    backdrop() {
      return this.item.backdrop_path;
    }
  }
};

/**
 * Certification
 */
const cert = {
  computed: {
    cert() {
      // movie
      if (this.item.release_dates) {
        const releases =
          this.item.release_dates.results.find(
            release => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === 'US'
          );

        if (!releases) {
          return null;
        }

        const item = releases.release_dates.find(date => date.certification !== '');

        if (item) {
          return item.certification;
        }
      // tv
      } else if (this.item.content_ratings) {
        const releases =
          this.item.content_ratings.results.find(
            release => release.iso_3166_1 === process.env.API_COUNTRY || release.iso_3166_1 === 'US'
          );

        if (!releases) {
          return null;
        }

        return releases.rating;
      }
    }
  }
};

/**
 * Trailer
 */
const trailer = {
  computed: {
    trailer() {
      let videos = this.item.videos.results;

      // if no videos, do nothing
      if (!videos.length) {
        return null;
      }

      // filter by type of video
      videos = videos.find(video => video.type === 'Trailer');

      // if no trailer found, do nothing
      if (!videos) {
        return null;
      }

      return [{
        name: videos.name,
        src: `https://www.youtube.com/embed/${videos.key}?rel=0&showinfo=0&autoplay=1`
      }];
    }
  }
};

/**
 * Directors
 */
const directors = {
  computed: {
    directors() {
      const people = this.item.credits.crew;

      if (people) {
        return people.filter(
          person => person.job === 'Director').map(person => `<a href="/person/${person.id}">${person.name}</a>`
        ).join(', ');
      }
    }
  }
};

/**
 * Creators
 */
const creators = {
  computed: {
    creators() {
      const people = this.item.created_by;

      if (people) {
        return people.map(person => `<a href="/person/${person.id}">${person.name}</a>`).join(', ');
      }
    }
  }
};

export {
  name,
  stars,
  yearStart,
  yearEnd,
  backdrop,
  cert,
  trailer,
  directors,
  creators
};
