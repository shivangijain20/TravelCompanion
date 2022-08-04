import axios from 'axios';

const URL = 'https://travel-advisor.p.rapidapi.com/hotels/list-in-boundary';


  

export const getPlacesData = async (type, sw, ne) => {
    try{
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            'X-RapidAPI-Key': 'bc3d7c7631msh316ee5b859e94abp195ac6jsnb3ff92e5ee84',
            'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
          }
          });
        return data;
    } catch (error) {

    }
}