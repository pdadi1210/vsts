"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tl = require("azure-pipelines-task-lib/task");
var Utility = /** @class */ (function () {
    function Utility() {
    }
    Utility.getGithubEndPointToken = function (githubEndpoint) {
        var githubEndpointObject = tl.getEndpointAuthorization(githubEndpoint, false);
        var githubEndpointToken = "";
        if (!!githubEndpointObject) {
            tl.debug("Endpoint scheme: " + githubEndpointObject.scheme);
            if (githubEndpointObject.scheme === 'PersonalAccessToken') {
                githubEndpointToken = githubEndpointObject.parameters.accessToken;
            }
            else if (githubEndpointObject.scheme === 'OAuth') {
                // scheme: 'OAuth'
                githubEndpointToken = githubEndpointObject.parameters.AccessToken;
            }
            else if (githubEndpointObject.scheme === 'Token') {
                // scheme: 'Token'
                githubEndpointToken = githubEndpointObject.parameters.AccessToken;
            }
            else if (githubEndpointObject.scheme) {
                throw new Error(tl.loc("InvalidEndpointAuthScheme", githubEndpointObject.scheme));
            }
        }
        if (!githubEndpointToken) {
            throw new Error(tl.loc("InvalidGitHubEndpoint", githubEndpoint));
        }
        return githubEndpointToken;
    };
    return Utility;
}());
exports.Utility = Utility;
