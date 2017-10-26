/* In this server, it would simulate millions of lines of calls for raw ad data to the message bus in standard queue order (fifo does not matter here)

  The ec2 works will then pick up from the queue and translate those ads into the proper pinterest pin format and save them to the cache/database
  This could send in updates to the specific ads and the converted pins would be updated with the proper descriptions/etc.
  Also could have instructions to delete the ads all together if the ad agency decides to get rid of the ad compaign. 
*/

const request = require('request');

const adGeneration = () => {

  

}

