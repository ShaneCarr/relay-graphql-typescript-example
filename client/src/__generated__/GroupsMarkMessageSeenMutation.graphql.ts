/**
 * @generated SignedSource<<f98823ae6bc5b2bed196a25c2ffee7b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type GroupsMarkMessageSeenMutation$variables = {
  groupId: string;
  memberId: string;
  messageId: number;
};
export type GroupsMarkMessageSeenMutation$data = {
  readonly markMessageAsSeen: {
    readonly consumptionHorizon: number;
    readonly id: string;
  };
};
export type GroupsMarkMessageSeenMutation = {
  response: GroupsMarkMessageSeenMutation$data;
  variables: GroupsMarkMessageSeenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "groupId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "memberId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "messageId"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "groupId",
        "variableName": "groupId"
      },
      {
        "kind": "Variable",
        "name": "memberId",
        "variableName": "memberId"
      },
      {
        "kind": "Variable",
        "name": "messageId",
        "variableName": "messageId"
      }
    ],
    "concreteType": "Member",
    "kind": "LinkedField",
    "name": "markMessageAsSeen",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "consumptionHorizon",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "GroupsMarkMessageSeenMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "GroupsMarkMessageSeenMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "09335430df48445a884b4dc76eb6029d",
    "id": null,
    "metadata": {},
    "name": "GroupsMarkMessageSeenMutation",
    "operationKind": "mutation",
    "text": "mutation GroupsMarkMessageSeenMutation(\n  $groupId: ID!\n  $memberId: ID!\n  $messageId: Int!\n) {\n  markMessageAsSeen(groupId: $groupId, memberId: $memberId, messageId: $messageId) {\n    id\n    consumptionHorizon\n  }\n}\n"
  }
};
})();

(node as any).hash = "4a59fe424d0d11d86e1a33b50af4084d";

export default node;
