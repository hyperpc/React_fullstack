import { makeExecutableSchema } from '@graphql-tools/schema';
import { gql } from 'apollo-server-core';

class Node{
    constructor(id, name){
        this.id=id;
        this.name=name;
    }
}

const typeDefs = gql`
    type Node{
        id:ID!,
        name:String!
    }
    type NodeList{
        nodes:[Node!]
    }
    type Query {
        viewer: String!,
        getNode(id:ID!):Node!,
        getNodes(ids:[ID!]):[Node],
        getAllNodes:[Node],
    },
    type Mutation{
        addNode(id:ID!, name:String!):Node!,
        updateNode(id:ID!, name:String!): Node!,
        clearNodes:String!
    }
`;

var fakeDB = [];

const resolvers = {
    Query:{
        viewer:()=>'viewer!',
        getNode:(root, args, context, info)=>{
            let node = fakeDB.find(n=>n.id===args.id);
            if(node){
                console.log(node);
                return node;
            }
            console.log("Invalid NodeId: ("+args.id+")");
            return new Node(args.id, "Invalid NodeId. Not found this node.");
        },
        getNodes:(root, args, context, info)=>{
            console.log(fakeDB);
            let nodes = [];
            console.log(">>>Looping ids...");
            if(fakeDB && fakeDB.length>0){
                args.ids.forEach((id)=>{
                    let node = fakeDB.find(n=>n.id===id);
                    if(node){
                        console.log(node); 
                        nodes.push(node);
                        return;
                    }
                    console.log("Invalid NodeId: ("+id+")");
                    let invalid_node = new Node(id, "Invalid NodeId. Not found this node.");
                    nodes.push(invalid_node);
                });
            }
            console.log(">>>Results...");
            console.log(nodes);
            return nodes;
        },
        getAllNodes:()=>{
            let nodes = [];
            console.log(fakeDB);
            console.log(">>>Looping fakeDB...");
            if(fakeDB && fakeDB.length>0){
                fakeDB.forEach((item)=>{console.log(item); nodes.push(item);});
            }
            console.log(">>>Results...");
            console.log(nodes);
            return fakeDB;
        }
    },
    Mutation:{
        addNode:(root, args,context, info)=>{
            //fakeDB[args.id]=args.name;
            let node = new Node(args.id, args.name);
            console.log(node); 
            fakeDB.push(node);
            return node;
        },
        updateNode:(root, args, context, info)=>{
            if(!fakeDB){
                console.log("Invalid NodeId: ("+args.id+")");
                return new Node(args.id, "Invalid NodeId. Not found this node.");
            }
            let node = fakeDB.find(n=>n.id===args.id);
            node.name=args.name;
            console.log(node);
            return node;
        },
        clearNodes:()=>{
            fakeDB=[];
            return "Empty DB!";
        }
    }
};

export const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
});
