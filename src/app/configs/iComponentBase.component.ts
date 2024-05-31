import {Component} from '@angular/core';
import {iFunction} from './iFunction';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Title} from '@angular/platform-browser';
import {
    AppBreadcrumbService
} from '../../../app-systems/app-breadcrumb-component/app.breadcrumb.service';
import {IStaticModuleComponent} from '../components/static-module/iStaticModule';

export const enum cType {
    question,
    trash,
    edit
}

export const enum mType {
    success,
    info,
    warn,
    error
}

export const VN_LOCAL = {
    firstDayOfWeek: 0,
    dayNames: ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    dayNamesMin: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['TH1', 'TH2', 'TH3', 'TH4', 'TH5', 'TH6', 'TH7', 'TH8', 'TH9', 'TH10', 'TH11', 'TH12'],
    today: 'Hôm nay',
    clear: 'Xóa'
};

@Component({
    selector: 'app-i-com',
    template: `<p></p>`,
})

export class iComponentBase extends iFunction {
    constructor(public messageService: MessageService, public breadcrumbService?: AppBreadcrumbService, public titleService?: Title) {
        super();
        if (breadcrumbService != undefined && titleService != undefined) {
            this.setBreadCrumbSubMenu(false);
        }
    }

    setBreadCrumbSubMenu(isParentMenu = true) {
        if (isParentMenu) {
            const parentMenuSession = sessionStorage.getItem('currentMenu2');
            const currentMenuSession = sessionStorage.getItem('currentMenu');

            if (parentMenuSession != undefined && currentMenuSession != undefined) {
                const objCurrentParent = JSON.parse(parentMenuSession);
                const objCurrent = JSON.parse(currentMenuSession);
                this.titleService.setTitle(objCurrent.label);
                objCurrentParent.push({label: objCurrent.label});
                this.breadcrumbService.setItems(objCurrentParent);
            }
        } else {
            const currentMenuSession = sessionStorage.getItem('currentMenu');
            if (currentMenuSession != undefined) {
                const objCurrent = JSON.parse(currentMenuSession);
                this.titleService.setTitle(objCurrent.label);
                this.breadcrumbService.setItems([{label: objCurrent.label}]);
            }
        }

    }
    showMessage(iType: mType, strheader, strmessage, key?: string) {
        if (iType == 0) {
            if (key != undefined) {
                this.messageService.add({
                    key,
                    severity: 'success',
                    summary: strheader,
                    detail: strmessage
                });
            } else {
                this.messageService.add({
                    severity: 'success',
                    summary: strheader,
                    detail: strmessage
                });
            }

        }

        if (iType == 1) {
            if (key != undefined) {
                this.messageService.add({
                    key,
                    severity: 'info',
                    summary: strheader,
                    detail: strmessage
                });
            } else {
                this.messageService.add({severity: 'info', summary: strheader, detail: strmessage});
            }
        }

        if (iType == 2) {
            if (key != undefined) {
                this.messageService.add({
                    key,
                    severity: 'warn',
                    summary: strheader,
                    detail: strmessage
                });
            } else {
                this.messageService.add({severity: 'warn', summary: strheader, detail: strmessage});
            }
        }

        if (iType == 3) {
            if (key != undefined) {
                this.messageService.add({
                    key,
                    severity: 'error',
                    summary: strheader,
                    detail: strmessage
                });
            } else {
                this.messageService.add({
                    severity: 'error',
                    summary: strheader,
                    detail: strmessage
                });
            }
        }
    }
    clearMessage(key? : string){
        this.messageService.clear();
    }
    showConfirmBase(ev: any, type: cType, mess: string, hed: string) {
        let strIcon;
        if (type == 0) {
            strIcon = 'pi pi-question-circle';
        }
        if (type == 1) {
            strIcon = 'pi pi-trash';
        }

        if (type == 2) {
            strIcon = 'pi pi-pencil';
        }

        let _iConfirmSer: ConfirmationService;
        _iConfirmSer = IStaticModuleComponent.injector.get(ConfirmationService);
        _iConfirmSer.confirm({
            message: mess,
            header: hed,
            icon: strIcon.toString(),
            accept: () => ev()
        });
    }

    convertToUnaccentedChars(input: string) {
        const map: { [key: string]: string } = {
            'à': 'a', 'á': 'a', 'ả': 'a', 'ã': 'a', 'ạ': 'a',
            'ă': 'a', 'ằ': 'a', 'ắ': 'a', 'ẳ': 'a', 'ẵ': 'a', 'ặ': 'a',
            'â': 'a', 'ầ': 'a', 'ấ': 'a', 'ẩ': 'a', 'ẫ': 'a', 'ậ': 'a',
            'đ': 'd',
            'è': 'e', 'é': 'e', 'ẻ': 'e', 'ẽ': 'e', 'ẹ': 'e',
            'ê': 'e', 'ề': 'e', 'ế': 'e', 'ể': 'e', 'ễ': 'e', 'ệ': 'e',
            'ì': 'i', 'í': 'i', 'ỉ': 'i', 'ĩ': 'i', 'ị': 'i',
            'ò': 'o', 'ó': 'o', 'ỏ': 'o', 'õ': 'o', 'ọ': 'o',
            'ô': 'o', 'ồ': 'o', 'ố': 'o', 'ổ': 'o', 'ỗ': 'o', 'ộ': 'o',
            'ơ': 'o', 'ờ': 'o', 'ớ': 'o', 'ở': 'o', 'ỡ': 'o', 'ợ': 'o',
            'ù': 'u', 'ú': 'u', 'ủ': 'u', 'ũ': 'u', 'ụ': 'u',
            'ư': 'u', 'ừ': 'u', 'ứ': 'u', 'ử': 'u', 'ữ': 'u', 'ự': 'u',
            'ỳ': 'y', 'ý': 'y', 'ỷ': 'y', 'ỹ': 'y', 'ỵ': 'y',
            'À': 'A', 'Á': 'A', 'Ả': 'A', 'Ã': 'A', 'Ạ': 'A',
            'Ă': 'A', 'Ằ': 'A', 'Ắ': 'A', 'Ẳ': 'A', 'Ẵ': 'A', 'Ặ': 'A',
            'Â': 'A', 'Ầ': 'A', 'Ấ': 'A', 'Ẩ': 'A', 'Ẫ': 'A', 'Ậ': 'A',
            'Đ': 'D',
            'È': 'E', 'É': 'E', 'Ẻ': 'E', 'Ẽ': 'E', 'Ẹ': 'E',
            'Ê': 'E', 'Ề': 'E', 'Ế': 'E', 'Ể': 'E', 'Ễ': 'E', 'Ệ': 'E',
            'Ì': 'I', 'Í': 'I', 'Ỉ': 'I', 'Ĩ': 'I', 'Ị': 'I',
            'Ò': 'O', 'Ó': 'O', 'Ỏ': 'O', 'Õ': 'O', 'Ọ': 'O',
            'Ô': 'O', 'Ồ': 'O', 'Ố': 'O', 'Ổ': 'O', 'Ỗ': 'O', 'Ộ': 'O',
            'Ơ': 'O', 'Ờ': 'O', 'Ớ': 'O', 'Ở': 'O', 'Ỡ': 'O', 'Ợ': 'O',
            'Ù': 'U', 'Ú': 'U', 'Ủ': 'U', 'Ũ': 'U', 'Ụ': 'U',
            'Ư': 'U', 'Ừ': 'U', 'Ứ': 'U', 'Ử': 'U', 'Ữ': 'U', 'Ự': 'U',
            'Ỳ': 'Y', 'Ý': 'Y', 'Ỷ': 'Y', 'Ỹ': 'Y', 'Ỵ': 'Y'
        };

        let result = '';
        for (let i = 0; i < input.length; i++) {
            const char = input[i];
            const unaccentedChar = map[char] || char;
            result += unaccentedChar;
        }
        return result;
    }

    toDate(dateStr: string): Date {
        const [day, month, year] = dateStr.split('/');
        return new Date(Number.parseInt(year), Number.parseInt(month) - 1, Number.parseInt(day));
    }

    getWidthMonitor() {
        return window.innerWidth;
    }

    getHeightMonitor() {
        return window.innerHeight;
    }

}
