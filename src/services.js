import axios from "axios";

const sortArtists = (topArtists) => {
  topArtists.sort(
    (a, b) => parseFloat(a.popularity) - parseFloat(b.popularity)
  );
};

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
    sortArtists(topArtists);
    return topArtists;
  } catch (error) {
    throw error;
  }
};

export const groupArtists = (artists) => {
  const ranking = {
    extremelyUnique: [],
    veryUnique: [],
    somewhatUnique: [],
    popular: [],
  };

  artists.map((artist) => {
    if (artist.popularity <= 25) {
      ranking.extremelyUnique.push(artist);
    } else if (artist.popularity > 25 && artist.popularity <= 50) {
      ranking.veryUnique.push(artist);
    } else if (artist.popularity > 50 && artist.popularity <= 75) {
      ranking.somewhatUnique.push(artist);
    } else {
      ranking.popular.push(artist);
    }
  });
  return ranking;
};

export const getPercentages = (ranking) => {
  
  const extremelyUniquePercent = Math.floor((ranking.extremelyUnique.length / 50) * 100)
  const veryUniquePercent = Math.floor((ranking.veryUnique.length / 50) * 100)
  const somewhatUniquePercent = Math.floor((ranking.somewhatUnique.length / 50) * 100)
  const popularPercent = Math.floor((ranking.popular.length / 50) * 100)
  return {
    extremelyUniquePercent,
    veryUniquePercent,
    somewhatUniquePercent,
    popularPercent,
  };

};
