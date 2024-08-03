# AIchatTests  
In this repository, I will put scripts related to open source AI chatbots.  
Purpose 
I believe current technology is competing with education in many ways, including language learning.  

I believe we can use the same technology to learn languages.
One of the things we can do is to use chatbots to practice conversation in foreign languages. It doesn't fully replace conversation with real people, but it's cheaper and the user can practice a lot before talking to a real person.

##### Test 1  
Using Replicate to create a simple chat system using LLama 3, nodeJS.  
I took a chat script I found [online](https://dev.to/jaimaldullat/building-a-real-time-chat-system-with-nodejs-and-websockets-a-step-by-step-guide-2m61) and I modified it.  
It uses llama 3 8B-instruct model, after doing some tests with the models available on Replicate, Llama 2 models with less than 70 B parameters performed poorly in German.  
This script uses llama 3 synthax so another llama 3 model can be chosen. The system prompt just tells it to speak German, it can be edited for another language. 
In order to run it run `node replicateTest1.js`, and `http-server` in the server folder, but you need to have http-server installed, or use another alternative for the http server.  
Create a `.env` file with `export REPLICATE_API_TOKEN=your Replicate API key`.

