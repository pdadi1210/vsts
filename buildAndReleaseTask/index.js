"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tl = require("azure-pipelines-task-lib/task");
var path = require("path");
var Utility_1 = require("./Utility");
var requestPromise = __importStar(require("request-promise"));
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var taskManifestPath, sourceVersion, repositoryURI, sourceBranchName, githubEndpoint, githubEndpointToken, repositoryName, inputString, newBranchName, endpoint_url, request_data, request_headers, options;
        return __generator(this, function (_a) {
            try {
                taskManifestPath = path.join(__dirname, "task.json");
                tl.debug("Setting resource path to " + taskManifestPath);
                tl.setResourcePath(taskManifestPath);
                sourceVersion = tl.getInput("sourceVersion", true);
                repositoryURI = tl.getInput("repositoryURI", true);
                sourceBranchName = tl.getInput("sourceBranchName", true);
                githubEndpoint = tl.getInput("connection", true);
                githubEndpointToken = Utility_1.Utility.getGithubEndPointToken(githubEndpoint);
                repositoryName = tl.getInput("repositoryName", true);
                inputString = tl.getInput('repositoryName', true);
                if (inputString == 'bad') {
                    tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
                    return [2 /*return*/];
                }
                newBranchName = tl.getInput("newBranchName", true);
                endpoint_url = "https://api.github.com/repos/" + repositoryName + "/git/refs";
                request_data = { "ref": "refs/heads/" + newBranchName, "sha": sourceVersion };
                request_headers = { 'Content-Type': 'application/json', 'Authorization': 'token ' + githubEndpointToken, 'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' };
                console.log("printing repositoryURI");
                console.log(repositoryURI);
                console.log("printing githubEndpointToken");
                //console.log('Hello', githubEndpointToken);
                //console.log(githubEndpoint)
                //console.log(githubEndpointToken)
                console.log("printing repositoryName");
                console.log(repositoryName);
                console.log("printing sourceVersion");
                console.log(sourceVersion);
                console.log("printing sourceBranchName");
                console.log(sourceBranchName);
                console.log(request_data);
                console.log(endpoint_url);
                options = {
                    method: "POST",
                    uri: endpoint_url,
                    body: request_data,
                    headers: request_headers,
                    json: true
                };
                requestPromise.post(options, function (error, response) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        if (response.statusCode !== 200) {
                            console.log(response.statusCode);
                        }
                        else {
                            console.log(response);
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
            return [2 /*return*/];
        });
    });
}
run().then(function () { return tl.setResult(tl.TaskResult.Succeeded, ''); })
    .catch(function (error) { return tl.setResult(tl.TaskResult.Failed, error.message); });
