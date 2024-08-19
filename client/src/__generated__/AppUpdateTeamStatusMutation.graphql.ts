/**
 * @generated SignedSource<<576efea22ffcee8f06924d43073be600>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AppUpdateTeamStatusMutation$variables = {
  hasUnreadMessage: boolean;
  id: string;
};
export type AppUpdateTeamStatusMutation$data = {
  readonly updateTeamStatus: {
    readonly activityStatus: {
      readonly hasUnreadMessage: boolean | null | undefined;
    } | null | undefined;
    readonly id: string | null | undefined;
  } | null | undefined;
};
export type AppUpdateTeamStatusMutation = {
  response: AppUpdateTeamStatusMutation$data;
  variables: AppUpdateTeamStatusMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "hasUnreadMessage"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "hasUnreadMessage",
        "variableName": "hasUnreadMessage"
      },
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Team",
    "kind": "LinkedField",
    "name": "updateTeamStatus",
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
        "concreteType": "ActivityStatus",
        "kind": "LinkedField",
        "name": "activityStatus",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasUnreadMessage",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppUpdateTeamStatusMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "AppUpdateTeamStatusMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "74c6ea9a721ad3241c4dff2d47d0effc",
    "id": null,
    "metadata": {},
    "name": "AppUpdateTeamStatusMutation",
    "operationKind": "mutation",
    "text": "mutation AppUpdateTeamStatusMutation(\n  $id: ID!\n  $hasUnreadMessage: Boolean!\n) {\n  updateTeamStatus(id: $id, hasUnreadMessage: $hasUnreadMessage) {\n    id\n    activityStatus {\n      hasUnreadMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dd6bde94e4ded5c1a3f61f0137112848";

export default node;
