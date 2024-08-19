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

  const handleMarkAsRead = (id: string) => {
    commitUpdate({
      variables: { id, hasUnreadMessage: false },
    });
  };

  const handleMarkAsUnread = (id: string) => {
    commitUpdate({
      variables: { id, hasUnreadMessage: true },
    });
  };

  const simulateNewMessage = (id: string) => {
    // Simulate a new message by marking as unread
    commitUpdate({
      variables: { id, hasUnreadMessage: true },
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
          >
            {team.name} - Unread Messages: {team.activityStatus.hasUnreadMessage ? 'Yes' : 'No'}
            <button onClick={() => handleMarkAsRead(team.id)}>Mark as Read</button>
            <button onClick={() => handleMarkAsUnread(team.id)}>Mark as Unread</button>
            <button onClick={() => simulateNewMessage(team.id)}>Simulate New Message</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
