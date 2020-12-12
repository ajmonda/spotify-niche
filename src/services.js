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
    sortByPopularity(topArtists)
    return topArtists;
  } catch (error) {
    throw error;
  }
};
export const getTopTracks = async (accessToken, timeRange) => {
  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
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
    const topTracks = response.data.items;
    sortByPopularity(topTracks);
    return topTracks;
  } catch (error) {
    throw error;
  }
};

const sortByPopularity = (data) => {
  data.sort((a, b) => parseFloat(a.popularity) - parseFloat(b.popularity));
};

export const getNicheScore = (artists) => {
  let sum = 0;
  artists.map((artist) => {
    sum += artist.popularity;
  });
  return 100 - Math.floor(sum / 100);
};

export const getScoreDescriptor = (nicheScore) => {
  if (nicheScore > 85) {
    return "Extremely Obscure";
  } else if (nicheScore > 75) {
    return "Very Obscure";
  } else if (nicheScore > 50) {
    return "Pretty Obscure";
  } else if (nicheScore > 25) {
    return "Kinda Basic";
  } else {
    return "Basic";
  }
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

export const groupArtistsByPopularity = (topArtists) => {
  const groupedArtists = topArtists.reduce((accumulator, value) => {
    if (!accumulator[value.popularity]) {
      accumulator[value.popularity] = [];
    }
    accumulator[value.popularity].push(value);
    return accumulator;
  }, []);
  groupedArtists.filter(
    (group) => group.length
  );
  return groupedArtists
};