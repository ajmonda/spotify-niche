import axios from "axios";

export const getTopArtists = async (accessToken, timeRange) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        params: {
          limit: "50",
          time_range: timeRange,
        },
      }
    );

    const topArtists = response.data.items;
    sortArtistsByUniqueness(topArtists);

    return topArtists;
  } catch (error) {
    throw error;
  }
};

const sortArtistsByUniqueness = (topArtists) => {
  topArtists.sort(
    (a, b) => parseFloat(a.popularity) - parseFloat(b.popularity)
  );
};

export const rankArtists = (artists) => {
  const ranking = {
    obscurityRating: 0,
    green: {
      color: '#36FC99',
      artists: [],
      percentage: null,
    },
    yellow: {
      color: '#E5C88B',
      artists: [],
      percentage: null,
    },
    orange: {
      color: '#EE896D',
      artists: [],
      percentage: null,
    },
    red: {
      color: '#F96269',
      artists: [],
      percentage: null,
    },
  };

  artists.map((artist) => {

    if (artist.popularity <= 25) {
      ranking.red.artists.push(artist);
      ranking.obscurityRating += 2;
    } else if (artist.popularity > 25 && artist.popularity <= 50) {
      ranking.orange.artists.push(artist);
      ranking.obscurityRating += 1.5;
    } else if (artist.popularity > 50 && artist.popularity <= 75) {
      ranking.yellow.artists.push(artist);
      ranking.obscurityRating += 1;
    } else if (artist.popularity > 75) {
      ranking.green.artists.push(artist);
    }
    
  });

  ranking.red.percentage = Math.floor((ranking.red.artists.length / 50) * 100);
  ranking.orange.percentage = Math.floor(
    (ranking.orange.artists.length / 50) * 100
  );
  ranking.yellow.percentage = Math.floor(
    (ranking.yellow.artists.length / 50) * 100
  );
  ranking.green.percentage = Math.floor(
    (ranking.green.artists.length / 50) * 100
  );
  return ranking
};

export const getTopGenres = (topArtists) => {
  const genres = [];
  topArtists.map((artist) => {
    genres.push(...artist.genres);
    return genres;
  });
  const genreFrequencies = {};
  for (let i = 0; i < genres.length; i++) {
    if (genreFrequencies[genres[i]]) {
      genreFrequencies[genres[i]] += 1;
    } else {
      genreFrequencies[genres[i]] = 1;
    }
  }
  return Object.entries(genreFrequencies).sort((a, b) => b[1] - a[1]);
};
