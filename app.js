

const express = require('express');
const app = express();
const https = require('https');

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"))


app.get('/', function(request, response){
    response.sendFile(__dirname + '/signup.html');
})

app.post('/', function(request, response){
    const firstname = request.body.fig1;
    const lastname = request.body.fig2;
    const email = request.body.fig3;

    var data = {
        members:[{
            email_address: email,
            status: 'subscribed',
            merge_fields : {
                FNAME: firstname,
                LNAME: lastname
            }
        }]
    }

    var jsonData = JSON.stringify(data);

    const url = 'https://us21.api.mailchimp.com/3.0/lists/53dad00fbe'
    const options = {
        method: 'POST',
        auth: 'franklin:1d0e26ce6a444a225acf15ad3c394a5f-us21'
    }

  const req =  https.request(url, options, function(response){
        
        response.on('data', function(data){
            
            console.log(JSON.parse(data));
        })
        

    })
    req.write(jsonData)
    req.end();
    if (response.statusCode != 200) {
        response.sendFile(__dirname + '/failure.html');
    }else{
        response.sendFile(__dirname + '/success.html');
    }

   
})

app.post('/failure', function(request, response){
    response.redirect('/');
})





app.listen(process.env.PORT || 3000, function(){
    console.log(('already started'));
})