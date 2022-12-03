import app from './src/server.config';

//resever server ----------------------------------------------------------------
app.listen(app.get('port'), () => {
    console.log("servidor se encuentra corriendo por el puerto: ", app.get('port'))
})