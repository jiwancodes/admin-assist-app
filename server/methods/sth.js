const myfunction=(req,res)=>{
    const name = req.body.name;
    const email= req.body.email;
    var password= req.body.password;
    var password2 = req.body.password2;
    let errors = [];

    //Check required fields
    if(!name || !email || !password || !password2){
        errors.push({msg: 'Please fill in all the fields'});
        res.send({message:'Please fill in all the fields'});
    }

    //Check passwords match
    if(password != password2){
        console.log('Passwords dont match');
        errors.push({msg: 'Passwords dont match'});
        res.send({message:'Passwords dont match'});
    }

    if(errors.length>0){

    }else{
        if(email){
            db.query('SELECT * FROM users WHERE email = ?', [email], 
            (error, results, fields)=>{
                if (results.length>0){
                    res.send('Email exists');
                }else{
                    res.send('Reg success')
                    bcrypt.hash(password, salt, (err, hash)=> {
                        if(err)throw err;
                        password = hash;
                        db.query('INSERT INTO users(name, email, password) VALUES("'+name+'", "'+email+'", "'+password+'")',
                       [name, email, password]);
                      });
                }
            });
            }else{
                res.send('Enter Email');
            };
    }
    },