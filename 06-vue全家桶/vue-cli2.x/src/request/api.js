import http from './http';

const apiTest = {
    downloadFile(config) {
        return http.get('/springboot/download/downloadFile', config);
    },
    getFileInfo(params) {
        return http.get('/springboot/download/getFileInfo', params);
    }
}

export default {
    apiTest
}
