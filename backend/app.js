require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

const app = express()
const port = 4000

const cors = require('cors');
app.use(cors({ origin:'*'}));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

app.get('/api/get-speech-token', async (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    const speechKey = process.env.SPEECH_KEY;
    const speechRegion = process.env.SPEECH_REGION;
    console.log("speech key;",speechKey)
    console.log("speech region",speechRegion)

    const headers = {
        headers: {
            'Ocp-Apim-Subscription-Key': speechKey,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    };

    try {
        const tokenResponse = await axios.post(`https://${speechRegion}.api.cognitive.microsoft.com/sts/v1.0/issueToken`, null, headers);
        res.send({ token: tokenResponse.data, region: speechRegion });
    } catch (err) {
        res.status(401).send('There was an error authorizing your speech key.fk');
    }
    
});




app.get('/', (req, res) => {
  const fs = require('fs');

  try {
      const data = JSON.parse(fs.readFileSync('file.txt'));
      let flag=0;
      for(let k in data.data)
      {
        if(data.data[k].email===req.query.email && data.data[k].password===req.query.password)
          {
            console.log(data.data[k].name);
          console.log("success full loging");
          flag=1;}
      }
      if(flag===1)
      return(res.status(200).send("success"))
      else
      return res.status(200).send("failed")
  } catch (err) {
      console.error(err);
  }

})
app.get('/register', (req, res) => {
  const fs = require('fs');

  try {
      const data = JSON.parse(fs.readFileSync('file.txt'));
      let flag=0;
      for(let k in data.data)
      {
        if(data.data[k].email===req.query.email)
          {
            console.log(data.data[k].name);
            console.log("email alredy in use");
            flag=1;  
          }
      }
      if(flag===1)
      {
        return(res.status(200).send("failed"))
      }
      else
      {
        data.data.push(
          {
            name:req.query.name,
            email:req.query.email,
            password:req.query.password
          }
        )
        console.log(data)
        fs.writeFileSync("file.txt",JSON.stringify(data));
        return res.status(200).send("success")
      }
  } catch (err) {
      console.error(err);
  }

})


app.listen(port, () => {
  console.log(`backend listening on port ${port}`)
})


