import { Component } from '@angular/core';

import { DxNumberBoxTypes } from 'devextreme-angular/ui/number-box';
import { DxDataGridTypes } from 'devextreme-angular/ui/data-grid';
import dxNumberBox from 'devextreme/ui/number_box';

import { PaymentInfo, Service } from './app.service';

type CustomContentReadyEvent = DxNumberBoxTypes.ContentReadyEvent & {
  component: ExtendedNumberBox;
};
type ExtendedNumberBox = dxNumberBox & {
  isLoaded?: boolean;
};

@Component({
  selector: 'app-root',
  providers: [Service],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})

export class AppComponent {
  nonZeroFormat = '##.######';

  zeroFormat = '0#.######';

  currencyFormat = '$ #,##0.##';

  paymentIdEditorOptions;

  amountEditorOptions;

  dataSource: PaymentInfo[];

  constructor(service: Service) {
    this.paymentIdEditorOptions = {
      format: this.nonZeroFormat,
    };
    this.amountEditorOptions = {
      format: this.currencyFormat,
    };
    this.dataSource = service.getPayments();
  }

  onContentReady = (e: CustomContentReadyEvent): void => {
    if (!e.component.isLoaded) {
      e.component.isLoaded = true;
      if (e.component.option('value') === 0) e.component.option('format', this.zeroFormat);
    }
  };

  onNonZeroKeyDown = (e: DxNumberBoxTypes.KeyDownEvent): void => {
    const value = e.component.option('value');
    if (e.event?.key === '0' && value === null) {
      e.component.option('format', this.zeroFormat);
    } else if (e.event?.key === 'Backspace' && value === 0) {
      e.component.option('format', '');
    } else if (value != null && (value > -1 && value < 1)) {
      e.component.option('format', this.zeroFormat);
    } else {
      e.component.option('format', this.nonZeroFormat);
    }
  };

  onZeroKeyDown = (e: DxNumberBoxTypes.KeyDownEvent): void => {
    if (e.event?.key === 'Backspace' && e.component.option('value') === 0) {
      e.component.option('format', '');
    } else {
      e.component.option('format', this.currencyFormat);
    }
  };

  onEditorPreparing(e: DxDataGridTypes.EditorPreparingEvent): void {
    if (e.parentType !== 'filterRow') return;
    if (e.dataField === 'PaymentId') {
      e.editorOptions.onContentReady = this.onContentReady;
      e.editorOptions.onKeyDown = this.onNonZeroKeyDown;
    }
    if (e.dataField === 'Amount') e.editorOptions.onKeyDown = this.onZeroKeyDown;
  }
}
