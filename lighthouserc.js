
module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run start',
      url: [
        'http://localhost:3000',
        'http://localhost:3000/movie',
        'http://localhost:3000/tv',
        'http://localhost:3000/search?q=mulan',
        'http://localhost:3000/movie/464052',
        'http://localhost:3000/tv/96677',
        'http://localhost:3000/person/90633'
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
      target: 'temporary-public-storage'
    }
  }
};
