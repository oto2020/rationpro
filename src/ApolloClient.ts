import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://ration.phys.su/graphql/',  // Укажите URL вашего GraphQL сервера
    headers: {
      'content-type': 'application/json',
      'api-key': "3ba0d6d83e335efcbe836df64ef713efd036628e8712fc09657bc8172ca867e8"
    }
  }),
  cache: new InMemoryCache()
});

export default client;
