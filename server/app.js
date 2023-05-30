const express = require('express')
const graphqlHTTP = require('express-graphql'); //midddle point for graphql endpoint route
const schema = require('./schema/schema')
const app = express();

app.use('/graphql', graphqlHTTP.graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000,(req,error)=>{
    if(error){
        console.error(error)
    }else{
        console.log("App is listening in port 3000")
    }
})