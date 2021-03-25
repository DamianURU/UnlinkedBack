// routes.post('/login',async(req,res)=>{
//     const user = await Users.getByEmail(req.body.email)
   
//        if(user === undefined){
//            res.json({
//                error:"ERROR, email or password not found"
//            })
//        }else{
//            const equals = bycrypt.compareSync(req.body.password, user.password);
//            if(!equals){
//                res.json({
//                    error:"ERROR, email or password not found  2"
//                })
//            }else{
                   
//                const token = jwt.sign({user:userid},'eltermo',{
//                    expiresIn:60*60
//                })
               
//                res.json({auth:true,token:token})
               
               
//            }
//        }
//    })