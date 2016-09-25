var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var bcrypt=require('bcrypt-nodejs');
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.send('<form method="post" action="/signup"><input name="name" type="text" placeholder="İsim"></br><input name="email" type="email" placeholder="Mail"></br><input name="password" type="password" placeholder="Şifre"></br><input name="userType" type="text" placeholder="Kullanıcı Tipi"></br><input  type="submit" text="üye ol"></br></form>');
});

//sync
// bcrypt.compareSync(user.password, passwordHash); // true
app.post('/signup', function (req, res) {
	var user=req.body;
	console.log(user);
	
	if(!user.password){return res.send({status:false,message:"Password Required",data:user});}
	if(!user.email){return res.send({status:false,message:"Email Required",data:user});}
	
	var passwordHash = bcrypt.hashSync(user.password);
 	
	user.password=passwordHash;
		
	fs.writeFile(__dirname +"/users/"+user.email+".json", JSON.stringify(user), function(err) {
		if(err) {
			console.log(err);
			return res.send({status:false,message:"Error While Save",data:user}); 
			}
		return res.send({status:true,message:"Singup Successfull Welcome",data:user});
	});	
});

app.listen(8080, function () { 
console.log('signup app listening on port 3000!');
});
