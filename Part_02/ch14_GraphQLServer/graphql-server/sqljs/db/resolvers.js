
var fakeDB = [];

export const resolvers = {
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
            let nodes = [];
            return nodes;
        },
        getAllNodes:()=>{
            return fakeDB;
        }
    },
    Mutation:{
        clearNodes:()=>{
            fakeDB=[];
            return "Empty DB!";
        }
    }
};