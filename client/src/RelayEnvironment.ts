import { Environment, Network, RecordSource, Store } from 'relay-runtime';

function fetchQuery(operation: any, variables: any) {
  return fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    console.log('Raw response:', response); // This logs the raw response object
    return response.json(); // This parses the response as JSON
  });
}


const RelayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
