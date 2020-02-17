# What is this tool

The tool makes possible to visualize the search working, add items and remove items ( by id ) so the user is able to see how the algorithm used now responds to different items.

# How to Run 

 - Make sure the elasticSearch docker image is running on doors 9200 and 9300 

    ```docker run -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" docker.elastic.co/elasticsearch/elasticsearch:7.6.0```
    
 - Simple `npm install` or `yarn install` to install the dependencies.
 - Run `npm start dev` or `yarn dev` -> the tool should be available in http://localhost:3000

### Please, DO NOT submit node_modules or .next folders
