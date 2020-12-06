import axios from "axios";

export const getTopArtists = async (accessToken) => {
  try {
    const response = await axios.get(
      `https://api.spotify.com/v1/me/top/artists`,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        params: {
          limit: "50",
          time_range: "short_term",
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
    red: {
      artists: [],
      percentage: null,
    },
    orange: {
      artists: [],
      percentage: null,
    },
    yellow: {
      artists: [],
      percentage: null,
    },
    green: {
      artists: [],
      percentage: 100,
    },
  };

  artists.map((artist) => {
    if (artist.popularity <= 25) {
      ranking.red.artists.push(artist);
    } else if (artist.popularity > 25 && artist.popularity <= 50) {
      ranking.orange.artists.push(artist);
    } else if (artist.popularity > 50 && artist.popularity <= 75) {
      ranking.yellow.artists.push(artist);
    } else {
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
  
  return ranking;
};