import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const client = new ApolloClient({
  link: new HttpLink({
    uri: 'https://ration.phys.su/graphql/',  // Укажите URL вашего GraphQL сервера
    headers: {
      'content-type': 'application/json'
<<<<<<< HEAD
=======
      // Добавьте здесь любые другие заголовки, которые вам нужны
>>>>>>> 36a96d6de79f406defd923d5e84deabd4c09ebb8
    }
  }),
  cache: new InMemoryCache()
});

export default client;
