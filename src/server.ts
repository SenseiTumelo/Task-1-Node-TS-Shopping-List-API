import http, {IncomingMessage, ServerResponse } from 'http';
import {shoppingListRoute} from './routes/shoppingList.ts'


const PORT = 3000; 

const requestListener = (req: IncomingMessage, res: ServerResponse) =>{
    if(req.url?.startsWith('/shoppingList')){
        shoppingListRoute(req,res);
    }
    else {
        res.writeHead(200, {"content-type":"application/json"});
        res.end(JSON.stringify({message: "Hello World, the shopping Server is responding"}))
    }
};

const server = http.createServer(requestListener);

server.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});