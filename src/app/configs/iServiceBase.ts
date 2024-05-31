import {HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import * as API from 'src/app/services/apiURL';
import {LoadingService} from '../shared-data-services/loading.service';
import {ConfigService} from '../shared-data-services/config.service';

@Injectable()
export class iServiceBase {
    strIP = '';
    strIP_GateWay = '';
    strIP_EVNID = '';
    strCSBT = '';
    strEVNHUB = '';
    strIP_Report = '';
    strIPSocket = '';
    strVersion = '';
    strProjectName = '';
    strCMIS3URL = '';
    strCMIS4URL = '';
    apiKey = '';
    onlyCMIS3: any = '0';
    onlyCMIS4: any = '0';

    constructor(public httpClient: HttpClient, public loadingService: LoadingService,
                public configService: ConfigService) {
        this.configService.loadConfig()
        .then(() => {
            this.strIPSocket = this.configService.getConfig('SocketUri');
            this.strVersion = this.configService.getConfig('Version');
            this.strProjectName = this.configService.getConfig('PROJECT_NAME');

            // IP của service đây nhé
            this.strIP = this.configService.getConfig('APISERVICE');
            this.strIP_GateWay = this.configService.getConfig('APIGATEWAY');

            this.strIP_EVNID = this.configService.getConfig('EVNID');

            this.strCMIS3URL = this.configService.getConfig('CMIS3URL');
            this.strCMIS4URL = this.configService.getConfig('CMIS4URL');
            this.onlyCMIS3 = this.configService.getConfig('IS_ONLY_CMIS3');
            this.onlyCMIS4 = this.configService.getConfig('IS_ONLY_CMIS4');
            this.apiKey = this.configService.getConfig('APIKEY');

            // Lấy IP riêng vì phần này xây dựng service riêng  với CMIS 3.0
            this.strCSBT = this.configService.getConfig('CSBT');
            this.strEVNHUB = this.configService.getConfig('EVNHUB');
            this.strIP_Report = this.configService.getConfig('Report');

            // Set IP các service vào localStorage để dùng
            localStorage.setItem('IP_API_SERVICE', this.strIP);
            localStorage.setItem('IP_API_SERVICE_CSBT', this.strCSBT);
            localStorage.setItem('IP_API_SERVICE_EVNHUB', this.strEVNHUB);
            localStorage.setItem('IP_API_SERVICE_REPORT', this.strIP_Report);
            localStorage.setItem('IP_API_SERVICE_SOCKET', this.strIPSocket);
            localStorage.setItem('VERSION', this.strVersion);
            localStorage.setItem('PROJECT_NAME', this.strProjectName);
            localStorage.setItem('IP_API_GATEWAY', this.strIP_GateWay);
            localStorage.setItem('IP_EVNID', this.strIP_EVNID);
            localStorage.setItem('CMIS3URL', this.strCMIS3URL);
            localStorage.setItem('CMIS4URL', this.strCMIS4URL);
            localStorage.setItem('IS_ONLY_CMIS3', this.onlyCMIS3);
            localStorage.setItem('IS_ONLY_CMIS4', this.onlyCMIS4);
            localStorage.setItem('APIKEY', this.apiKey);
        });
    }

    getCookie(name: string) {
        let ca: Array<string> = document.cookie.split(';');
        let caLen: number = ca.length;
        let cookieName = `${name}=`;
        let c: string;

        for (let i: number = 0; i < caLen; i += 1) {
            c = ca[i].replace(/^\s+/g, '');
            if (c.indexOf(cookieName) == 0) {
                return c.substring(cookieName.length, c.length);
            }
        }
        return '';
    }

    decipher = salt => {
        const textToChars = text => text.split('').map(c => c.charCodeAt(0));
        const applySaltToChar = code => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded => encoded.match(/.{1,2}/g)
            .map(hex => parseInt(hex, 16))
            .map(applySaltToChar)
            .map(charCode => String.fromCharCode(charCode))
            .join('');
    };

    getOptionsRequest(ignoreLoading?: boolean, responseType?: string) {
        const options: any = {};
        if (ignoreLoading != undefined && ignoreLoading) {
            // this.loadingService.setIgnoreLoading();
            options.reportProgress = true;
        }
        if (responseType != undefined && responseType) {
            // this.loadingService.setIgnoreLoading();
            options.responseType = responseType;
        }
        return options;
    }

    async getDataByURLAsync(url, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {
            url = `${url}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return error;
        }
    }

    async getDataAsync(service, api, ignoreLoading?: boolean): Promise<any> {
        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.get(url, this.getOptionsRequest(ignoreLoading)).toPromise();
        document.body.style.cursor = 'default';


        return response;
    }

    async getDataAsyncByPostRequest(service, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {
            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }

            const url = `${service}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    async getDataWithParamsAsync(service, api, Params, ignoreLoading?: boolean): Promise<any> {

        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.get(url, {params: Params}).pipe(catchError(this.handleError)).toPromise();
        document.body.style.cursor = 'default';

        return response;
    }

    public getData(service, api, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.get(url, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public downloadFilePDF(service, api, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            let headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/pdf');


            return this.httpClient.get(url, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public downloadFilePDFPost(service, api, param, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            let headers = new HttpHeaders();
            headers = headers.set('Accept', 'application/pdf');


            return this.httpClient.post(url, param, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public downloadFileByType(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);
            const url = `${service}${api}`;
            // Set header
            let headers = new HttpHeaders();
            if (inputData.exportType == 'pdf') {
                headers = headers.set('Accept', 'application/pdf');
            } else if (inputData.exportType == 'doc') {
                // headers = headers.set('Accept', 'application/doc');
            } else if (inputData.exportType == 'xls') {
                // headers = headers.set('Accept', 'application/xls');
            } else if (inputData.exportType == 'docx') {
                // headers = headers.set('Accept', 'application/docx');
            } else if (inputData.exportType == 'xls-only') {
                // headers = headers.set('Accept', 'application/xls');
            }

            return this.httpClient.post(url, inputData, {headers, responseType: 'blob'});
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public getDataByPostRequest(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public getDataWithParams(service, api, Params, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.get(url, {params: Params}).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }


    async postDataAsync(service, api, inputData, ignoreLoading?: boolean, responseType?: string): Promise<any> {
        try {
            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }
            const url = `${service}${api}`;
            const response = await this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading, responseType)).toPromise();
            document.body.style.cursor = 'default';

            return response;
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public postData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public postFormData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    public postDataURL(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {

            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';

            return this.httpClient.post(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';

            console.log(error);
            return error;
        }
    }

    async putDataAsync(service, api, inputData, ignoreLoading?: boolean): Promise<any> {
        try {

            // Get IP và URL
            service = await this.getURLService(service);

            if (service == null) {
                return null;
            }

            const url = `${service}${api}`;
            const response = await this.httpClient.put(url, inputData, this.getOptionsRequest(ignoreLoading)).toPromise();
            document.body.style.cursor = 'default';
            return response;
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return error;
        }
    }

    public putData(service, api, inputData, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.put(url, inputData, this.getOptionsRequest(ignoreLoading)).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return error;
        }
    }

    async deleteDataAsync(service, api, ignoreLoading?: boolean): Promise<any> {
        // Get IP và URL
        service = await this.getURLService(service);

        if (service == null) {
            return null;
        }

        const url = `${service}${api}`;
        const response = await this.httpClient.delete(url).toPromise();
        document.body.style.cursor = 'default';
        return response;
    }

    public deleteData(service, api, ignoreLoading?: boolean): Observable<any> {
        try {
            // Get IP và URL
            service = this.getURLService(service);

            const url = `${service}${api}`;
            document.body.style.cursor = 'default';
            return this.httpClient.delete(url).pipe(catchError(this.handleError));
        } catch (error) {
            document.body.style.cursor = 'default';
            console.log(error);
            return error;
        }
    }

    public uploadAsync(service, api, inputData, ignoreLoading?: boolean) {
        // Get IP và URL
        service = this.getURLService(service);

        const url = `${service}${api}`;


        return new HttpRequest('POST', url, inputData);
    }

    // Đoạn này chỉ cần lưu IP của API gateway rồi lần sau lấy ra cộng lại thôi
    getURLService(phanhe) {
        try {

            switch (phanhe) {
                case API.PHAN_HE.DICHVU: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.DICHVU;
                    //return 'http://127.0.0.1:7001/ServiceDichVu/resources/serviceDichVu/'
                }
                case API.PHAN_HE.FILEDTU: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.FILEDTU;
                }
                case API.PHAN_HE.HOPDONG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.HOPDONG;
                }
                case API.PHAN_HE.HOSOTBI: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.HOSOTBI;
                    //return 'http://127.0.0.1:7001/ServiceHoSoTBi/resources/serviceHoSoTBi/';
                }
                case API.PHAN_HE.BDONGTBI: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.BDONGTBI;
                }
                case API.PHAN_HE.BDONGTTHAO: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.BDONGTTHAO;
                }
                case API.PHAN_HE.QLYSOGCS: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.QLYSOGCS;
                }
                case API.PHAN_HE.CHISOKHANG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.CHISOKHANG;
                }
                case API.PHAN_HE.HDONPSINH: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.HDONPSINH;
                }
                case API.PHAN_HE.HDONDCHINH: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.HDONDCHINH;
                }
                case API.PHAN_HE.HDONDTU: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.HDONDTU;
                }
                case API.PHAN_HE.TTIENCNO: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.TTIENCNO;
                }
                case API.PHAN_HE.NOKHODOI: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.NOKHODOI;
                }
                case API.PHAN_HE.PHIDCAT: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.PHIDCAT;
                }
                case API.PHAN_HE.KHONO: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.KHONO;
                }
                case API.PHAN_HE.CAYTTHAT: {
                    // return 'http://127.0.0.1:7001/ServiceCayTThat/resources/serviceCayTThat/';
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.CAYTTHAT;
                }
                case API.PHAN_HE.CHISOTTHAT: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.CHISOTTHAT;
                }
                case API.PHAN_HE.GNHANDNANG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.GNHANDNANG;
                }
                case API.PHAN_HE.QTRIHTHONG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.QTRIHTHONG;
                    //return 'http://127.0.0.1:7001/ServiceQTriHThong/resources/serviceQTriHThong/';
                }
                case API.PHAN_HE.SMS: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.SMS;
                }
                case API.PHAN_HE.EMAIL: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.EMAIL;
                }
                case API.PHAN_HE.TBIHTRUONG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.TBIHTRUONG;
                }
                case API.PHAN_HE.KTRAGSATMBD: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.KTRAGSATMBD;
                }
                case API.PHAN_HE.BANLEDNANG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.BANLEDNANG;
                }
                case API.PHAN_HE.DANHMUC: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.DANHMUC;
                }
                case API.PHAN_HE.BCAOTHANG: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.BCAOTHANG;
                }
                case API.PHAN_HE.BCAOLICHSU: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.BCAOLICHSU;
                }
                case API.PHAN_HE.QTRIDHANH: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.QTRIDHANH;
                }
                case API.PHAN_HE.REPORT: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.REPORT;
                }
                case API.PHAN_HE.COMMON: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.COMMON;
                }
                case API.PHAN_HE.INTERFACE: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.INTERFACE;
                    // return 'http://127.0.0.1:7001/ServiceInterface/resources/serviceInterface/';
                }
                case API.PHAN_HE.DIENNTHON: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.DIENNTHON;
                }
                case API.PHAN_HE.CSBT: {
                    return localStorage.getItem('IP_API_GATEWAY') + '/csapi/api/';
                }
                case API.PHAN_HE.EVNHUB: {
                    return localStorage.getItem('IP_API_GATEWAY') + '/api/';
                }
                case API.PHAN_HE.UDUNGHTRUONGHCMC: {
                    return localStorage.getItem('IP_API_GATEWAY') + API.SERVICE_GATEWAY.UDUNGHTRUONGHCMC;
                }
                default: {
                    return localStorage.getItem('IP_API_GATEWAY') + '/';
                }
            }
        } catch (error) {
            console.log('Lỗi lấy IP APT Gate way' + error);
            return error;
        }
    }

    protected extractData(res: Response): any {
        const body = res;
        return body || {};
    }

    protected extractDataNoLoading(res: Response): any {
        const body = res;
        return body || {};
    }

    protected extractDataWParams(res: Response): any {
        const body = res;
        return body || {};
    }

    // protected handleError(error: Response | any): any {
    //     let errMsg;
    //     if (error instanceof Response) {
    //         const body = JSON.stringify(error) || '';
    //         const err = JSON.parse(body).error || '';
    //         errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    //     } else {
    //         errMsg = error.message ? error.message : error.toString();
    //     }
    //     console.log(errMsg);
    //     return Observable.throw(errMsg);
    // }

    protected handleErrorWParams(error: Response | any): any {
        let errMsg;
        if (error instanceof Response) {
            const body = JSON.parse(JSON.stringify(error)) || '';
            const err = body.error;
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.log(errMsg);
        return Observable.throw(errMsg);
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else if (error.error != ErrorEvent) {
            return null;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }
}
