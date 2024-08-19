/**
 * @generated SignedSource<<6b4688c904700f6f188a53c39d3039c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AppTeamQuery$variables = Record<PropertyKey, never>;
export type AppTeamQuery$data = {
  readonly teams: ReadonlyArray<{
    readonly activityStatus: {
      readonly hasChannelMention: boolean | null | undefined;
      readonly hasPersonalMention: boolean | null | undefined;
      readonly hasTeamMention: boolean | null | undefined;
      readonly hasUnreadMessage: boolean | null | undefined;
      readonly isNewForUser: boolean | null | undefined;
    } | null | undefined;
    readonly id: string | null | undefined;
    readonly name: string | null | undefined;
  } | null | undefined> | null | undefined;
};
export type AppTeamQuery = {
  response: AppTeamQuery$data;
  variables: AppTeamQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Team",
    "kind": "LinkedField",
    "name": "teams",
    "plural": true,
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
        "name": "name",
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
            "name": "hasPersonalMention",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasChannelMention",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasTeamMention",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "hasUnreadMessage",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "isNewForUser",
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
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppTeamQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppTeamQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "96db315ea6eb059f729f151b68803857",
    "id": null,
    "metadata": {},
    "name": "AppTeamQuery",
    "operationKind": "query",
    "text": "query AppTeamQuery {\n  teams {\n    id\n    name\n    activityStatus {\n      hasPersonalMention\n      hasChannelMention\n      hasTeamMention\n      hasUnreadMessage\n      isNewForUser\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "fb96ec3066ae322b0fa91d94a5890410";

export default node;
