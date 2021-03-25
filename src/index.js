const app= require('./server');


app.listen(app.get('port'),()=>{
    console.log('server on por 4000');
})