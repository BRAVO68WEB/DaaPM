import Conf from 'conf';

const config = new Conf({
    configName: 'cli-config',
    projectName: 'daapm',
    projectSuffix: ""
});

export const setConfig = (key, value) => {
    config.set(key, value);
}

export const getConfig = (key) => {
    return config.get(key);
}

export const deleteConfig = (key) => {
    config.delete(key);
}

export const clearConfig = () => {
    config.clear();
}

export const getConfigPath = () => {
    return config.path;
}