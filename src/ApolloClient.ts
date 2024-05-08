import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://ration.phys.su/graphql/',  // Укажите URL вашего GraphQL сервера
    headers: {
      'content-type': 'application/json',
      'api-key': "b286af26d2c8ca15c934eb497484682a6fef3ec3d4dd50d2705ac2a764be35a8"
    }
  }),
  cache: new InMemoryCache()
});

export default client;
