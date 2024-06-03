import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {Data} from "@angular/router";

@Component({
  selector: 'app-search-component',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class SearchComponent {
  title = 'ng-zorro';

  constructor(private fb: FormBuilder,
              private renderer: Renderer2, private elementRef: ElementRef
  ) {
    // default
    this.valueMoney = '';
  }

  // table
  checked = false;
  loading = false;
  indeterminate = false;
  listOfData: {
    id: number;
    in: string;
    loai_dien: string;
    so_tham_chieu: string;
    dien_tu_dong: string;
    so_tien: string;
    ngay_gia_tri: string;
    disabled: boolean;
    ngay_tao: string;
    ma_nuoc_nhan: string
  }[] = [];
  listOfCurrentPageData: readonly Data[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Data[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(({disabled}) => !disabled);
    this.checked = listOfEnabledData.every(({id}) => this.setOfCheckedId.has(id));
    this.indeterminate = listOfEnabledData.some(({id}) => this.setOfCheckedId.has(id)) && !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({disabled}) => !disabled)
      .forEach(({id}) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.listOfData.filter(data => this.setOfCheckedId.has(data.id));

    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      alert('hello world');
      this.loading = false;
    }, 1000);
  }

  ngOnInit(): void {
    this.listOfData = new Array(100).fill(0).map((_, index) => ({
      id: index,
      loai_dien: `loại điện ${index}`,
      dien_tu_dong: `${index} QST-20240325-34567`,
      in: index % 2 === 0 ? `True` : 'False',
      so_tham_chieu: `${index}*20240315123456GT`,
      ngay_tao: `12/03/2024`,
      ngay_gia_tri: `dd/mm/yyyy`,
      so_tien: `30,000`,
      ma_nuoc_nhan: `${index} RTYFF`,
      disabled: false,
    }));
  }

  // test money format
  valueMoney: string;
  formatter = (valueMoney: number) => {
    if (valueMoney === null || valueMoney === undefined) {
      return '';
    }
    return `${valueMoney.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
  };

  parser = (valueMoney: string): number => {
    // do something
    // test
    return 0;
  }

  ngAfterViewInit() {

  }

  @Output() childEvent = new EventEmitter<string>();

  sendEvent() {
    console.log('mfe')
    this.childEvent.emit('Hello from Child');
  }
}
