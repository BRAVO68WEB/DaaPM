import API from '../utils/axios';
import {
    getConfig,
    setConfig
} from '../utils/confStore';

export const loginToWorkspace = async () => {
    try {
        const token = getConfig('apiKey') as string;
        if (!token) {
            throw new Error('Please login first.');
        }
        const res = await API.get('/workplace');
        setConfig("account", res.data.workplace.name);
        setConfig("workplace_id", res.data.workplace.id);
        return res.data.workplace;
    } catch (e) {
        console.log(e);
    }
}

export const setupProject = async (pname: string) => {
    try {
        const token = getConfig('apiKey') as string;
        if (!token) {
            throw new Error('Please login first.');
        }
        const CheckIfProjectExists = await API.get(`/projects/project?project=${pname}`);
        if (CheckIfProjectExists.data.success) {
            setConfig("project", CheckIfProjectExists.data.project.name);
            return CheckIfProjectExists.data.project;
        } else {
            const res = await API.post('/projects', {
                name: pname,
                description: "Project used by DaaPM to store passwords"
            });
            setConfig("project", res.data.project.name);
            return res.data.project;
        }
    } catch (e) {
        console.log(e);
    }
}

export const setupEnvironment = async (pname: string) => {
    try {
        const token = getConfig('apiKey') as string;
        if (!token) {
            throw new Error('Please login first.');
        }
        const CheckIfEnvAlreadyExists = await API.get(`/environments/environment?project=${pname}&environment=daapm-cli`);
        if (CheckIfEnvAlreadyExists.data.success) {
            setConfig("environment", CheckIfEnvAlreadyExists.data.environment.name);
            return CheckIfEnvAlreadyExists.data.environment;
        } else {
            const res = await API.post('/environments', {
                project: pname,
                name: "daapm-cli",
                slug: "daapm-cli"
            });
            setConfig("environment", res.data.environment.name);
            return res.data.environment;
        }
    } catch (e) {
        console.log(e)
    }
}

export const viewSecrets = async (sname: string) => {
    try {
        sname = sname.toUpperCase();
        const token = getConfig('apiKey') as string;
        if (!token) {
            throw new Error('Please login first.');
        }
        const res = await API.get(`/configs/config/secret?project=${getConfig("project")}&config=${getConfig("environment")}&name=${sname}`);
        return res.data
    } catch (e) {
        console.log(e.response.data);
    }
}

export const updateSecret = async (sname: string, svalue: string) => {
    sname = sname.toUpperCase();
    let secrets = {} as any;
    secrets[`${sname}`] = svalue;
    try {
        const res = await API.post(`/configs/config/secrets`, {
            "project": getConfig("project"),
            "config": getConfig("environment"),
            secrets
        });
        return res.data
    }
    catch(e){
        console.log(e)
    }
        
}