import React from 'react';
import { graphql, useLazyLoadQuery, useMutation } from 'react-relay/hooks';
import { AppTeamQuery } from './__generated__/AppTeamQuery.graphql';

const TeamQuery = graphql`
  query AppTeamQuery {
    teams {
      id
      name
      activityStatus {
        hasPersonalMention
        hasChannelMention
        hasTeamMention
        hasUnreadMessage
        isNewForUser
      }
    }
  }
`;

const UpdateTeamStatusMutation = graphql`
  mutation AppUpdateTeamStatusMutation($id: ID!, $hasUnreadMessage: Boolean!) {
    updateTeamStatus(id: $id, hasUnreadMessage: $hasUnreadMessage) {
      id
      activityStatus {
        hasUnreadMessage
      }
    }
  }
`;

function App() {
  const data = useLazyLoadQuery<AppTeamQuery>(TeamQuery, {});
  const [commitUpdate] = useMutation(UpdateTeamStatusMutation);

  const handleUpdate = (id: string) => {
    commitUpdate({
      variables: { id, hasUnreadMessage: false },
    });
  };

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {data.teams?.map((team: any) => (
          <li
            key={team.id}
            style={{ fontWeight: team.activityStatus.hasUnreadMessage ? 'bold' : 'normal' }}
            onClick={() => handleUpdate(team.id)}
          >
            {team.name} - Unread Messages: {team.activityStatus.hasUnreadMessage ? 'Yes' : 'No'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
