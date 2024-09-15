/**
 * @generated SignedSource<<1084c6364bd9e5fd0d01f6ea0efd9f58>>
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
      readonly hasUnreadMessage: boolean | null | undefined;
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
    "cacheID": "fc80788ed28e0552991ace436fd2f1e9",
    "id": null,
    "metadata": {},
    "name": "AppTeamQuery",
    "operationKind": "query",
    "text": "query AppTeamQuery {\n  teams {\n    id\n    name\n    activityStatus {\n      hasUnreadMessage\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "84fe7c04ccc32422db5a5c3fcf738435";

export default node;
