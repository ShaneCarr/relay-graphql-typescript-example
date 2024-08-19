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
  })
  .then(response => {
    console.log('Raw response:', response);
    return response.json();
  })
  .then(json => {
    console.log('Parsed JSON:', json);
    return json;
  })
  .catch(error => {
    console.error('Fetch query error:', error);
    throw error;
  });
}



const RelayEnvironment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default RelayEnvironment;
