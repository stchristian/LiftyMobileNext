import axios from 'axios';

const googleApi = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api',
  params: {
    key: 'AIzaSyDSdcWiZMi8BnJaVUyC-3MaBagmiDFx2rI',
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
