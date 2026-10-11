/** Servidor estático opcional + pontos de integração em modo seguro.
 * Nenhum pagamento é criado até que o backend do proprietário seja implementado.
 * Rodar: node server/server.js  (Node.js >=18; sem dependências)
 */
'use strict';
const http=require('node:http');const fs=require('node:fs');const path=require('node:path');const url=require('node:url');
const root=path.resolve(__dirname,'..'),port=Number(process.env.PORT)||8080;
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.ico':'image/x-icon','.json':'application/json; charset=utf-8'};
http.createServer((req,res)=>{
 const pathname=new URL(req.url,'http://localhost').pathname;
 const headers={'X-Content-Type-Options':'nosniff','Referrer-Policy':'strict-origin-when-cross-origin','Content-Security-Policy':"default-src 'self'; img-src 'self' https://media.pichau.com.br data:; script-src 'self'; style-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; frame-ancestors 'none'"};
 if(pathname==='/api/health'){res.writeHead(200,{...headers,'Content-Type':'application/json'});res.end(JSON.stringify({ok:true,paymentsConfigured:false,shippingConfigured:false}));return}
 if(pathname.startsWith('/api/')){res.writeHead(503,{...headers,'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify({ok:false,error:'Integração não configurada',code:'INTEGRATION_REQUIRED'}));return}
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405,headers);res.end('Método não permitido');return}
 const relative=decodeURIComponent(pathname==='/'?'index.html':pathname.replace(/^\//,''));const target=path.resolve(root,relative);
 if(!(target===root||target.startsWith(root+path.sep))){res.writeHead(403,headers);res.end('Acesso negado');return}
 if(!['.html','.css','.js','.svg','.ico','.json'].includes(path.extname(target))){res.writeHead(404,headers);res.end('Não encontrado');return}
 fs.readFile(target,(err,data)=>{if(err){res.writeHead(404,headers);res.end('Não encontrado');return}res.writeHead(200,{...headers,'Content-Type':mime[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});if(req.method==='HEAD'){res.end();return}res.end(data)});
}).listen(port,()=>console.log(`Prévia: http://localhost:${port} (PIX e frete DESATIVADOS)`));
