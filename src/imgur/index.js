import axios from 'axios';
const imgurClient = axios.create({
  baseURL: 'https://api.imgur.com/3',
  headers: {
    Authorization: `Client-ID ${process.env.REACT_APP_IMGUR_CLIENT_ID}`,
    // 'Access-Control-Allow-Origin': '*',
    // 'Content-Type': 'application/x-www-form-urlencoded',
    // 'Access-Control-Allow-Headers':
    //   'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  },
});

class Imgur {
  upload(dataUrl) {
    return imgurClient.post('image', {
      image: dataUrl,
      type: 'base64',
    });
  }
  delete(hash) {
    return imgurClient.delete(hash);
  }
  get(hash) {
    return imgurClient.get(hash);
  }
}

const imgur = new Imgur();

export default imgur;
