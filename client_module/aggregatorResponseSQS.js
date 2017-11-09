const AWS = require('aws-sdk');
AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

//Simulates response back to the client after getting the Ads

let i = 1;

const simulateResponse = (i) => {
  return {
    userId: [9875, 9876, 9877][Math.floor(Math.random() * 3)],
    ads: [{
      id: 1,
      ad_description: 'The Next iPhone X will be awesome',
      ad_url: 'https://www.apple.com/iphone-x/',
      ad_img_url: 'http://drop.ndtv.com/TECH/product_database/images/913201720152AM_635_iphone_x.jpeg',
      ad_group: 'food',
    },
    {
      id: 2,
      ad_description: 'The Next Pixel will be cool',
      ad_url: 'https://store.google.com/us/product/pixel_2?hl=en-US',
      ad_img_url: 'http://drop.ndtv.com/TECH/product_database/images/1042016101841PM_635_google_pixel.jpeg',
      ad_group: 'events',
    },
    {
      id: 3,
      ad_description: 'The Next Xperia phone will be sick',
      ad_url: 'https://www.sonymobile.com/us/products/phones/xperia-xz1/',
      ad_img_url: 'http://drop.ndtv.com/TECH/product_database/images/831201751753PM_635_sony_xperia_xz1_silver.jpeg',
      ad_group: 'sports',
    }]
  };
};

const sendMessage = (i) => {
  const params = {
    MessageBody: JSON.stringify(simulateResponse(i)),
    QueueUrl: 'https://sqs.us-west-1.amazonaws.com/854541618844/client_response',
  };

  sqs.sendMessage(params, (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('sent back: ', params.MessageBody);
      console.log('Success', data.MessageId);
    }
  });
};
  
// sends a 10 messages a second to the clients response queue
setInterval(()=> {sendMessage(i); i++; }, 5000);
