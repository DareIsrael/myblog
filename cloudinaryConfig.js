import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dvntutcf4' // Replace with your Cloudinary cloud name
  }
});

export default cld;