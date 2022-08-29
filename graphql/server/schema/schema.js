const {projects,clients} = require('../sampledata')
const Client = require('../models/Client');
const Project = require('../models/Project')
const {GraphQLObjectType,
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType} = require('graphql')

const ProjectType = new GraphQLObjectType({
    name:"projects",
    fields:()=>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        status:{type:GraphQLString},
        client:{
            type: ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId);
            }
        }
    })
})


const ClientType = new GraphQLObjectType({
    name:"Client",
    fields:() =>({
        id:{type:GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLString},
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        clients:{
            type: new GraphQLList(ClientType),
            resolve(parent,args){
                return Client.find();
            }
        },
        client:{
            type:ClientType,
            args: {id:{type:GraphQLID}},
            resolve(parents,args){
                return Client.find(client =>client.id === args.id)
            }
        },
        projects:{
            type:new GraphQLList(ProjectType),
            resolve(parent,args){
                return Project.find();
            }
        },
        project:{
            type: ProjectType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Project.find(project=> project.id === args.id)
            }
        }
    }
})

const mutation = new GraphQLObjectType({
    name:"Mutation",
    fields:{
        addClient:{
            type: ClientType,
            args:{
                name: {type: GraphQLNonNull(GraphQLString)},
                email: {type: GraphQLNonNull(GraphQLString)},
                phone: {type: GraphQLNonNull(GraphQLString)},

            },
            resolve(parent,args){
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                })
                return client.save()
            }
        },
        deleteClient:{
            type: ClientType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},
            },
            reolve(parent,args){
                return Client.findByIdAndRemove(args.id)
            }
        },
        addProject:{
            type: ProjectType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{type: new GraphQLEnumType({
                    name:"projectStatus",
                    values:{
                        "new": {value: "not started"},
                        "progress":{value:"in progress"},
                        "completed":{value:'completed'}
                    },
                    defaultValue:"not started",
                }),
                


            },
            clientId:{type:GraphQLNonNull(GraphQLID)},
        },
        resolve(parent,args){
            const project = new Project({
                name: args.name,
                description: args.description,
                status: args.status,
                clientId: args.clientId
            });
            return project.save()
        }
    
        },
        deleteProject:{
            type:ProjectType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)}
            },
            resolve(parent,args){
                return Project.findByIdAndRemove(args.id)
            }
        },
        updateProject:{
            type: ProjectType,
            args:{
                id:{type: GraphQLNonNull(GraphQLID)},
                name:{type: GraphQLNonNull(GraphQLString)},
                description:{type: GraphQLNonNull(GraphQLString)},
                status:{type: new GraphQLEnumType({
                    name:"projectStatusupdated",
                    values:{
                        "new": {value: "not started"},
                        "progress":{value:"in progress"},
                        "completed":{value:'completed'}
                    }
                })
            }
        },
        resolve(parent,args){
            return Project.findByIdAndUpdate(args.id,{
                $set:{
                    name:args.name,
                    description:args.description,
                    status:args.status,
                },
            },
            {new: true}
            )
        }
    }
}
}
);

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})