import tl = require('azure-pipelines-task-lib/task');
import path = require('path');
import trm = require('azure-pipelines-task-lib/toolrunner');
import * as engine from 'artifact-engine/Engine';
import * as providers from 'artifact-engine/Providers';
import * as httpc from 'typed-rest-client/HttpClient';

async function run() {
    try {
        const inputString: string | undefined = tl.getInput('samplestring', true);
        if (inputString == 'bad') {
            tl.setResult(tl.TaskResult.Failed, 'Bad input was given');
            return;
        }
        console.log('Hello', inputString);
    }
    catch (err) {
        tl.setResult(tl.TaskResult.Failed, err.message);
    }
}

run();