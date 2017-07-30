import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLList,
  GraphQLString
} from 'graphql';

const posts = [
  { id: 1, imageUrl: 'bla.com', description: 'bla.com image' },
  { id: 2, imageUrl: 'bla1.com', description: 'bla1.com image' },
  { id: 3, imageUrl: 'bla2.com', description: 'bla2.com image' }
]

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    id: { type: GraphQLInt },
    imageUrl: { type: GraphQLString },
    description: { type: GraphQLString }
  }
});


let schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      allPosts: {
        type: new GraphQLList(PostType),
        resolve: function() {
          return posts;
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      createPost: {
        type: PostType,
        args: {
          imageUrl: { type: GraphQLString },
          description: { type: GraphQLString }
        },
        description: 'Add new Post',
        resolve: function(_, { imageUrl, description }) {
          const newPost = { id: posts.length + 1, imageUrl, description };
          posts.push(newPost);
          return newPost;
        }
      }
    }
  })
});

export default schema;
