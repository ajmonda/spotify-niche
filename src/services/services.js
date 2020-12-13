import axios from "axios";
import { sortByPopularity } from "../utilities/utils.js";

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
    sortByPopularity(topArtists);
    return topArtists;
  } catch (error) {
    throw error;
  }
};
