require('dotenv').config();
const Replicate = require("replicate");

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});
//console.log(process.env.REPLICATE_API_TOKEN);


    var conversation = "";
  
  const express = require('express');
  const http = require('http');
  const WebSocket = require('ws');
  
  const app = express();
  const server = http.createServer(app);
  const wss = new WebSocket.Server({ server });
  const conversations = {};
  wss.on('connection', (ws) => {
    console.log('OnConection'+ws) ; 
    ws.on('message', (objString) => {
        let receivedObj = JSON.parse(objString);
        let message = receivedObj.msg;
        console.log("objectbeforeif:"+JSON.stringify(conversations[receivedObj.convId]));
        if (!(receivedObj.convId in conversations)) {
            console.log("object created for:"+receivedObj.convId);
            

            conversations[receivedObj.convId] = {
                conversation: ""
            }
         }
        
        if(true){
                     console.log('On message:'+message) ;
                     conversations[[receivedObj.convId]].conversation = conversations[[receivedObj.convId]].conversation + "<|begin_of_text|><|start_header_id|>user<|end_header_id|> \n "+message+"<|eot_id|>";
                      const input = {
                    top_k: 0,
                    top_p: 0.95,
                    prompt: conversation,
                    max_tokens: 512,
                    temperature: 0.7,
                    system_prompt: "Du bist hilfreich, und du antwortest auf Deutsch",
                    length_penalty: 1,
                    max_new_tokens: 512,
                    stop_sequences: "<|end_of_text|>,<|eot_id|>",
                    prompt_template: "<|begin_of_text|><|start_header_id|>system<|end_header_id|>\n\n{system_prompt}<|eot_id|><|start_header_id|>user<|end_header_id|>\n\n{prompt}<|eot_id|><|start_header_id|>assistant<|end_header_id|>\n\n",
                    presence_penalty: 0,
                    log_performance_metrics: false
                };
                input.prompt = "  "+conversations[[receivedObj.convId]].conversation;
                console.log(input);
                replicate.run("meta/meta-llama-3-8b-instruct", { input }).then((value) => {
                    let answer = value.join("");
                    console.log(value.join(""));
                    conversations[[receivedObj.convId]].conversation = conversations[[receivedObj.convId]].conversation + "<|start_header_id|>assistant<|end_header_id|> \n" + answer +"<|eot_id|>" ;
                    wss.clients.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(answer);
                        }
                    });

                });


                wss.clients.forEach((client) => {
                    if (client !== ws && client.readyState === WebSocket.OPEN) {
                        client.send(message);
                    }
                });

        }
        



      });
  });
  
  server.listen(3000, () => {
      console.log('Server started on http://localhost:3000');
  });
  