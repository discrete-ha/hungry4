import config from '../config';
let foursquare = require('react-foursquare')(config.foursquare);

class Foursquare {

  makeVenueForm = (rawData) => {
    let place = {
      id:rawData.id,
      location:rawData.location,
      url:rawData.url,
      contact:rawData.contact,
      name:rawData.name
    }

    if (rawData.photos && rawData.photos.groups && rawData.photos.groups.length > 0) {
      place.photos = [];
      rawData.photos.groups[0].items.map((item)=>{
        place.photos.push({
          thumbnail:item.prefix + '100' + item.suffix,
          original:item.prefix + '500' + item.suffix
        });
      });
    }

    if (rawData.phrases) 
      place.phrases = rawData.phrases;

    return place;
  };

  makeVenuesForm = (rawData) => {
    let ret = [];
    rawData.map((item)=>{
      let venueData = item.venue || item;
      let place = this.makeVenueForm(venueData);
      ret.push(place);
    });
    return ret;
  };

  getRandomPlace = (ll, callback) => {
    let params = {
      ll: ll,
      radius: 1000,
      intent:"browse",
      limit: 50,
      section:"food"
    };

    foursquare.venues.explore(params)
      .then(res=> {
        if (res.meta.code === 200) {
          callback(this.makeVenuesForm(res.response.groups[0].items));
        }else{
          //error
        }
      });
  };

  searchPlace = (ll, searchText, callback) => {
    var params = {
      ll: ll,
      radius: 1000,
      intent: "browse",
      limit: 10,
      query: searchText
    };

    foursquare.venues.getVenues(params)
        .then(res=> {
        if (res.meta.code === 200) {
          callback(this.makeVenuesForm(res.response.venues));
        }else{
            //error
        }
    });
  };

  getPlaceDetail = (ll, placeId, callback) =>{
      var params = {
        ll: ll,
        venue_id: placeId
      };

      foursquare.venues.getVenue(params)
          .then(res=> {
          if (res.meta.code === 200) {
            callback(this.makeVenueForm(res.response.venue));
          }else{
              //error
          }
      });
  };

}

export default new Foursquare();