const graphql = require('graphql')
const _ = require('lodash');
const {GraphQLObjectType,GraphQLString,GraphQLID,GraphQLInt,GraphQLList} = graphql;
const books = [
    {name:"Bidyut1",genre:"1",id:"1",authorId:"1"},
    {name:"Bidyut2",genre:"1",id:"2",authorId:"2"},
    {name:"Bidyut3",genre:"1",id:"3",authorId:"3"},
    {name:"Bidyut4",genre:"1",id:"4",authorId:"3"},
    {name:"Bidyut5",genre:"1",id:"5",authorId:"3"},
    {name:"Bidyut6",genre:"1",id:"6",authorId:"3"},
]

const authors = [
    {name:"Author1",age:"1",id:"1"},
    {name:"Author2",age:"2",id:"2"},
    {name:"Author3",age:"3",id:"3"},
]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                return _.find(authors,{id:parent.authorId})
            }
        }
    })
});


const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        book:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return _.filter(books,{authorId:parent.id})
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type:BookType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                //code to get data from db
                return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent,args){
                //code to get data from db
                return _.find(authors,{id:args.id})
            }
        },
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        }
    }
})


module.exports = new graphql.GraphQLSchema({
    query:RootQuery
})

