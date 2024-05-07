import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";
import { createLoggerLink } from 'apollo-link-logger';

// Создаем ссылку на логгер
const loggerLink = createLoggerLink();

// Создаем ссылку на ошибки
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

// Создаем HttpLink
const httpLink = new HttpLink({
  uri: 'https://ration.phys.su/graphql/',
});

// Используем все ссылки вместе
const link = loggerLink.concat(errorLink).concat(httpLink);

// Создаем клиент Apollo
const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
