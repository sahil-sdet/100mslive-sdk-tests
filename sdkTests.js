import  { HMSPeer,HMSClientConfig,HMSClient} from 'https://cdn.skypack.dev/@100mslive/hmsvideo-web';
const getLocalStream = async(client) => {
    return await client.getLocalStream({
      resolution: "vga",
      bitrate: 256,
      codec: "VP8",
      frameRate: 20,
      shouldPublishAudio:true,
      shouldPublishVideo:false,
      advancedMediaConstraints: {
      audio: { deviceId: "default" } 
    }
  });
  }
  const clientA = 'sahilkashyap4069@gmail.com';
  const clientB = 'kashbros1990@gmail.com';
  const authTokenA = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI2MDQxZTUxZDg5YTk2ZTczYjIzZDFiMzciLCJhY2Nlc3Nfa2V5IjoiNjA0MWU1MWQ4OWE5NmU3M2IyM2QxYjM4Iiwicm9vbV9pZCI6IjYwNGEwYzE3Yjc5YmQwZGE0ZTU4YTU0OCIsInVzZXJfaWQiOiIzNTAiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTYxNjkyMTk3NSwiZXhwIjoxNjQ4NDc5NTc1LCJpc3MiOiI2MDQxZTUxZDg5YTk2ZTczYjIzZDFiMzUiLCJqdGkiOiI4ZDE4YzUwMC0zNDUxLTRiN2QtODFmNy0wYWRjZmExMDYyMDMifQ._YcOCweOKAYbOiQ6MfXPsUU7gMd2hzwu3Q9RFA5Wuf4';
  const authTokenB = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcHBfaWQiOiI2MDQxZTUxZDg5YTk2ZTczYjIzZDFiMzciLCJhY2Nlc3Nfa2V5IjoiNjA0MWU1MWQ4OWE5NmU3M2IyM2QxYjM4Iiwicm9vbV9pZCI6IjYwNGEwYzE3Yjc5YmQwZGE0ZTU4YTU0OCIsInVzZXJfaWQiOiIzNTAiLCJyb2xlIjoiaG9zdCIsImlhdCI6MTYxNjkyMTk3NSwiZXhwIjoxNjQ4NDc5NTc1LCJpc3MiOiI2MDQxZTUxZDg5YTk2ZTczYjIzZDFiMzUiLCJqdGkiOiI4ZDE4YzUwMC0zNDUxLTRiN2QtODFmNy0wYWRjZmExMDYyMDMifQ._YcOCweOKAYbOiQ6MfXPsUU7gMd2hzwu3Q9RFA5Wuf4';
  const roomA = '604a0c17b79bd0da4e58a548';
  const roomB = '60604314994e65fe1fe87495';
  const createClient = async(u,p) => {
    let client;
    let peer = new HMSPeer(u, p);
    let config = new HMSClientConfig({
      endpoint: 'wss://prod-in.100ms.live',
    });
    client = new HMSClient(peer, config);
    return client;
  }
  let expectedOptions = {
    "bandwidth": 256,
    "codec": "VP8",
    "resolution": "vga",
    "audio": {
      "deviceId": "default"
    },
    "video": false,
    "override": false,
    "screen": false
    };

describe('100msLive SDK tests', async() => {

  it('Client tries to join room without connecting to SFU', async () => {
    let client = await createClient(clientA,authTokenA);
    let disconnected = false;
    client.on('disconnect', async () => {
      disconnected =  true;
  });
    await client.connect();
    await new Promise(r => setTimeout(r, 2000));
    await client.disconnect();
    await new Promise(r => setTimeout(r, 2000));
    await client.join(roomA);
  }).timeout(35000);

  
  it('Client is able to connect to SFU', async () => {
    let client = await createClient(clientA,authTokenA);
    let connected = false;
    client.on('connect', async () => {
      connected =  true;
  });
    await client.connect();
    await new Promise(r => setTimeout(r, 2000));
    chai.expect(connected).to.equal(true);
    await client.disconnect();
  }).timeout(35000);

  it('Client is able to disconnect from SFU', async () => {
    let client = await createClient(clientA,authTokenA);
    let disconnected = false;
    client.on('disconnect', async () => {
      disconnected =  true;
  });
    await client.connect();
    await new Promise(r => setTimeout(r, 2000));
    await client.disconnect();
    await new Promise(r => setTimeout(r, 2000));
    chai.expect(disconnected).to.equal(true);
  }).timeout(35000);

  it('Client is able to publish stream', async () => {
    let client = await createClient(clientA,authTokenA);
    client.on('connect', async () => {
      await client.join(roomA);
  });
    await client.connect();
    await new Promise(r => setTimeout(r, 2000));
    let stream = await getLocalStream(client);
    let publishedStream = await client.publish(stream,'60604314994e65fe1fe87495');
    console.log('Verifying published stream..')
    chai.expect(publishedStream.options).to.deep.equal(expectedOptions);
    await client.disconnect();
  }).timeout(35000);
  
  it('Client is able to unpublish stream', async () => {
    let client = await createClient(clientA,authTokenA);
      client.on('connect', async () => {
        await client.join(roomA);
    });
      await client.connect();
      await new Promise(r => setTimeout(r, 2000));
      let stream = await getLocalStream(client);
      let publishedStream = await client.publish(stream,roomA);
      console.log('Verifying published stream..')
      chai.expect(publishedStream.options).to.deep.equal(expectedOptions);
      await client.unpublish(stream,roomA);
      await client.disconnect();
  }).timeout(35000);

  it('Client is not able to random room', async () => {
    let client = await createClient(clientA,authTokenA);
    let errorMsg = '';
     client.on('connect', async () => {
       try {
         await client.join('9888350769883380');
     } catch(e){
     errorMsg = e.message;}
  });
     await client.connect();
     await new Promise(r => setTimeout(r, 2000));
     console.log(errorMsg);
     chai.expect(errorMsg).to.equal('User 350 is Not Authorized to Join the room 9888350769883380');
     await client.disconnect();
  }).timeout(35000); 
   
  it('Client is able to broadcast message to room', async () => {
    let client = await createClient(clientA,authTokenA);
    var payload = {
      senderName: 'Sahil',
      msg: 'Testing broadcast',
    };
    client.on('broadcast', (room, peer ,message) => {
      console.log("message broadcasted");
  });
    client.on('connect', async () => {
      await client.join(roomA);
  });
    await client.connect();
    await new Promise(r => setTimeout(r, 2000));
    let d = await client.broadcast(payload, roomA);
    await new Promise(r => setTimeout(r, 3000));
    await client.disconnect();
  }).timeout(35000);

  it('Client is able to subscribe stream', async () => 
  {
    let client = await createClient(clientA,authTokenA);
    let client2 = await createClient(clientB,authTokenB);
    client.on('stream-add', (room,  peer, streamInfo) => {
      console.log('Inside stream add1');
      console.log(room);
      console.log(peer);
      console.log(streamInfo);
   }); 
   client2.on('stream-add', (room,  peer, streamInfo) => {
    console.log('Inside stream add2');
    console.log(room);
    console.log(peer);
    console.log(streamInfo);
 });
    client.on('connect', async () => {
      await client.join(roomA);
  });
  client2.on('connect', async () => {
    await client2.join(roomA);
});
    await client.connect();
    await new Promise(r => setTimeout(r, 3000));
    await client2.connect();
    await new Promise(r => setTimeout(r, 3000));
    let stream = await getLocalStream(client);
      let data = await client.publish(stream,roomA);
      let stream2 = await getLocalStream(client2);
      let data2 = await client2.publish(stream2,roomA);
      console.log('************');
      console.log(data2.mid);
      await client.subscribe(data2.mid, roomA);
     
      
  }).timeout(35000);
});
