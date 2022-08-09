import {setConfig} from '../utils/confStore';
import {loginToWorkspace} from '../libs/doppler';

export const retrive = async (token: string) => {
    if(token.match(/dp\.pt\.[a-zA-Z0-9]{40,44}/)){
        setConfig("apiKey", token);
        const workspace = await loginToWorkspace();
        console.log("Login to workspace of " + workspace.name);
    } else {
        console.log("Invalid token");
    } 
}