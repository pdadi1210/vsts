import tl = require('azure-pipelines-task-lib/task');
import path = require('path');
import { Utility } from './Utility';
//import httpClient = require("typed-rest-client/HttpClient");
//import httpInterfaces = require("typed-rest-client/Interfaces");
//import util = require("util");
import * as requestPromise from 'request-promise';
//import * as engine from 'artifact-engine/Engine';
//import * as providers from 'artifact-engine/Providers';
//import * as httpc from 'typed-rest-client/HttpClient';

async function run() {
    try {
        var taskManifestPath = path.join(__dirname, "task.json");
        tl.debug("Setting resource path to " + taskManifestPath);
        tl.setResourcePath(taskManifestPath);
        const sourceVersion = tl.getInput("sourceVersion", true);
        const repositoryURI = tl.getInput("repositoryURI", true);
        const sourceBranchName = tl.getInput("sourceBranchName", true);
        const githubEndpoint :any= tl.getInput("connection", true);
        const githubEndpointToken = Utility.getGithubEndPointToken(githubEndpoint);
        const repositoryName = tl.getInput("repositoryName", true);
        const inputString: string | undefined = tl.getInput('repositoryName', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        const newBranchName = tl.getInput("newBranchName", true);
        let endpoint_url = "https://api.github.com/repos/"+repositoryName+"/git/refs/heads";
        let request_data :any = JSON.stringify({ "ref":"refs/heads/"+newBranchName,"sha": sourceVersion});
        let request_headers = {
            "Content-Type": "application/json",
            "Authorization": `token $(githubEndpointToken)`,
            "User-Agent": tl.getVariable("AZURE_HTTP_USER_AGENT")
        };
        console.log("printing repositoryURI");
        console.log(repositoryURI);
        console.log("printing githubEndpointToken");
        console.log('Hello', githubEndpointToken);
        console.log(githubEndpoint)
        console.log(githubEndpointToken)
        console.log("printing repositoryName");
        console.log(repositoryName)
        console.log("printing sourceVersion");
        console.log(sourceVersion)
        console.log("printing sourceBranchName");
        console.log(sourceBranchName)
        console.log(request_data)
        console.log(endpoint_url)
        var options = {
            method: 'POST',
            uri: endpoint_url,
            body: request_data,
            headers: request_headers,
            json: true
        };
        requestPromise.post(options, (error, response) => {
            if (error) {
                console.log(error)
            } else {
                if (response.statusCode !== 200) {
                     console.log(response.statusCode)
                } else {
                     console.log(response)
                }
            }
        });
        /*
        let proxyUrl: any = (tl.getVariable("agent.proxyurl")? tl.getVariable("agent.proxyurl") : "");
        var getVariableTemp :any = tl.getVariable("agent.proxybypasslist");
        var requestOptions: httpInterfaces.IRequestOptions = proxyUrl ? {
            proxy: {
                proxyUrl: proxyUrl,
                proxyUsername: tl.getVariable("agent.proxyusername"),
                proxyPassword: tl.getVariable("agent.proxypassword"),
                proxyBypassHosts: tl.getVariable("agent.proxybypasslist") ? JSON.parse(getVariableTemp) : null
            }
        } : {};
        var tempNulll :any =null;
        //let retriableStatusCodes: number[] =  [408, 409, 500, 502, 503, 504];
        //let ignoreSslErrors: any = tl.getVariable("VSTS_ARM_REST_IGNORE_SSL_ERRORS");
        //requestOptions.ignoreSslError = ignoreSslErrors && ignoreSslErrors.toLowerCase() == "true";
        //var httpCallbackClient = new httpClient.HttpClient(tl.getVariable("AZURE_HTTP_USER_AGENT"), tempNulll,requestOptions);
        var httpCallbackClient = new httpClient.HttpClient(tl.getVariable("AZURE_HTTP_USER_AGENT"), tempNulll);
        var response: httpClient.HttpClientResponse = await httpCallbackClient.request("POST", endpoint_url, request_data, request_headers);
        let retryCount = 5
        while (true){
            if (retriableStatusCodes.indexOf(response.statusCode) != -1 && ++i < retryCount) {
                tl.debug(util.format("Encountered a retriable status code: %s. Message: '%s'.", response.statusCode, response.statusMessage));
                await sleepFor(timeToWait);
                timeToWait = timeToWait * retryIntervalInSeconds + retryIntervalInSeconds;
                continue;
            }
        }
        */
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();