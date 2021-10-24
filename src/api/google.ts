import axios from 'axios';
import config from '../config';

//ATTENTION: BEFORE IMPLEMENTING ANY API CALLS CHECK IF API KEY IS ALLOWED TO ACCESS THAT API IN GOOGLE CONSOLE
//ALLOWED APIS:
// - DIRECTIONs
// - PLACES

const googleApi = axios.create({
  baseURL: config.GOOGLE_API_BASE_URL,
  params: {
    key: config.GOOGLE_API_KEY,
  },
});

type PlacesResult = {
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  place_id: string;
};

export async function getPlaces(keyword: string) {
  const response = await googleApi.get('/place/findplacefromtext/json', {
    params: {
      input: keyword,
      inputtype: 'textquery',
      fields: 'geometry,name,place_id,formatted_address',
    },
  });
  return response.data.candidates as PlacesResult[];
}

export async function getDirections(
  originPlaceId: string,
  destinationPlaceId: string,
) {
  const response = await googleApi.get('/directions/json', {
    params: {
      origin: `place_id:${originPlaceId}`,
      destination: `place_id:${destinationPlaceId}`,
    },
  });
  return response.data;
}
