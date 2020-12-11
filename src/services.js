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
    sortArtists(topArtists);
    return topArtists;
  } catch (error) {
    throw error;
  }
};

const sortArtists = (topArtists) => {
  topArtists.sort(
    (a, b) => parseFloat(a.popularity) - parseFloat(b.popularity)
  );
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

// export const getMostObscureArtist = (topArtists) => {
//   topArtists.sort(
//     (a, b) => parseFloat(a.popularity) - parseFloat(b.popularity)
//   );
//   return topArtists[0];
// };

// export const rankArtists = (artists) => {
//   const ranking = {
//     green: {
//       color: "#36FC99",
//       artists: [],
//       percentage: null,
//     },
//     yellow: {
//       color: "#E5C88B",
//       artists: [],
//       percentage: null,
//     },
//     orange: {
//       color: "#EE896D",
//       artists: [],
//       percentage: null,
//     },
//     red: {
//       color: "#F96269",
//       artists: [],
//       percentage: null,
//     },
//   };

//   artists.map((artist) => {
//     if (artist.popularity <= 25) {
//       ranking.red.percentage += 1
//     } else if (artist.popularity > 25 && artist.popularity <= 50) {
//       ranking.orange.percentage += 1
//     } else if (artist.popularity > 50 && artist.popularity <= 75) {
//       ranking.yellow.percentage += 1
//     } else if (artist.popularity > 75) {
//       ranking.green.percentage += 1
//     }
//     return ranking;
//   });

//   ranking.red.percentage = Math.floor(ranking.red.percentage / 50);
//   ranking.orange.percentage = Math.floor
//     (ranking.orange.artists.length / 50);
//   ranking.yellow.percentage = Math.floor
//     (ranking.yellow.percentage / 50);
//   ranking.green.percentage = Math.floor(ranking.green.percentage / 50);
//   return ranking;
// };

// export const groupArtistsByPopularity = (topArtists) => {
//   const groupedArtists = topArtists.reduce((accumulator, value) => {
//     if (!accumulator[value.popularity]) {
//       accumulator[value.popularity] = [];
//     }
//     accumulator[value.popularity].push(value);
//     return accumulator;
//   }, []);
//   return groupedArtists
// };

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
