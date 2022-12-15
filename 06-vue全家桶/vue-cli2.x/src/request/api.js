import http from './http';

const apiTest = {
    downloadFile(params, config) {
        return http.post('/springboot/download/downloadFile', params, config);
    },
    getFileInfo(params) {
        return http.get('/springboot/download/getFileInfo', params);
    }
}

export default {
    apiTest
}
