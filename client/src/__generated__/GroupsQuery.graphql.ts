/**
 * @generated SignedSource<<539195869f86833a3fc7db77fa69849a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type GroupsQuery$variables = Record<PropertyKey, never>;
export type GroupsQuery$data = {
  readonly groups: ReadonlyArray<{
    readonly id: string;
    readonly members: ReadonlyArray<{
      readonly consumptionHorizon: number;
      readonly id: string;
      readonly name: string;
    }>;
    readonly name: string;
    readonly threads: ReadonlyArray<{
      readonly id: string;
      readonly messages: ReadonlyArray<{
        readonly arrivalTime: string;
        readonly id: string;
        readonly mentions: ReadonlyArray<{
          readonly id: string;
          readonly name: string;
        }>;
        readonly text: string;
      }>;
      readonly title: string;
    }>;
  }>;
};
export type GroupsQuery = {
  response: GroupsQuery$data;
  variables: GroupsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Group",
    "kind": "LinkedField",
    "name": "groups",
    "plural": true,
    "selections": [
      (v0/*: any*/),
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Member",
        "kind": "LinkedField",
        "name": "members",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "consumptionHorizon",
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Thread",
        "kind": "LinkedField",
        "name": "threads",
        "plural": true,
        "selections": [
          (v0/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "title",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Message",
            "kind": "LinkedField",
            "name": "messages",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "text",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "arrivalTime",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Member",
                "kind": "LinkedField",
                "name": "mentions",
                "plural": true,
                "selections": [
                  (v0/*: any*/),
                  (v1/*: any*/)
                ],
                "storageKey": null
              }
            ],
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
    "name": "GroupsQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "GroupsQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "5fefef116818b37c8e4a8332b3b0aa04",
    "id": null,
    "metadata": {},
    "name": "GroupsQuery",
    "operationKind": "query",
    "text": "query GroupsQuery {\n  groups {\n    id\n    name\n    members {\n      id\n      name\n      consumptionHorizon\n    }\n    threads {\n      id\n      title\n      messages {\n        id\n        text\n        arrivalTime\n        mentions {\n          id\n          name\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e38fbf2dd4d8c542a89d73854242f5da";

export default node;
