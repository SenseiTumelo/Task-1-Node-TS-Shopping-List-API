import { IncomingMessage, ServerResponse } from "http";


//http://localhost:3000/shoppingList

export const shoppingListRoute = async (req:IncomingMessage, res: ServerResponse) => {
    if(req.url?.startsWith('/shoppingList'){
        console.log(req.url, 'request url');

        const parts = req.url.split("/");
        console.log(parts, 'url parts');

        const id = parts[2] ? parseInt(parts[2]) : undefined;

        if(req.method === 'GET' && !id){
            res.writeHead(200, {"content-type":"application/json"});
            res.end(JSON.stringify(getShoppingList()));
            return;
        }
    });
};