
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'yarn start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/movie',
        'http://localhost:3000/tv',
        'http://localhost:3000/search?q=mulan',
        'http://localhost:3000/movie/464052',
        'http://localhost:3000/tv/96677',
        'http://localhost:3000/person/90633',
        'http://localhost:3000/genre/14/movie',
        'http://localhost:3000/genre/9648/tv',
        'http://localhost:3000/movie/category/top_rated',
        'http://localhost:3000/tv/category/top_rated'
      ],
      numberOfRuns: 5
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 1 }],
        'categories:accessibility': ['warn', { minScore: 1 }]
      }
    },
    upload: {
      target: 'lhci',
      serverBaseUrl: 'https://rocky-taiga-72405.herokuapp.com',
      token: '10faf6b0-db14-4445-a9d0-75d60f425dab'
    }
  }
};
