import { IncomingMessage, ServerResponse } from "http";
import {getShoppingList, getListById, addShoppingList} from '../controllers/shoppingList.js'


//http://localhost:3000/shoppingList

export const shoppingListRoute = async (req:IncomingMessage, res: ServerResponse) => {
    if(req.url?.startsWith('/shoppingList')){
        console.log(req.url, 'request url');

        const parts = req.url.split("/");
        console.log(parts, 'url parts');

        const id = parts[2] ? parseInt(parts[2]) : undefined;

        if(req.method === 'GET' && !id){
            res.writeHead(200, {"content-type":"application/json"});
            res.end(JSON.stringify(getShoppingList()));
            return;
        }

        if(req.method === 'GET'  && id){
            const shoppingList = getListById(id);
            res.writeHead(shoppingList ? 200 : 404, {"content-type" : "application/json"});
            res.end(JSON.stringify(shoppingList || {message: 'not found'}));
            return;
        }

        if(req.method === 'POST'){
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
                console.log(body, 'body');
            });
            req.on('end', ()=>{
                const {name, color, userId} = JSON.parse(body);
                const newShoppingList = addShoppingList(name, color, userId);
                res.writeHead(201, {"content-type" : "application/jsopn"});
                res.end(JSON.stringify(newShoppingList));
                return;
            });
        }
    };
};