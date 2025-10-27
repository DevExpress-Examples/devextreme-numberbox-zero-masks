import React from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import NumberBox, { NumberBoxTypes } from 'devextreme-react/number-box';
import type dxNumberBox from 'devextreme/ui/number_box';
import DxDataGrid, { DataGridTypes, Column, FilterRow } from 'devextreme-react/data-grid';
import { payments } from './data';

type CustomContentReadyEvent = NumberBoxTypes.ContentReadyEvent & {
  component: ExtendedNumberBox;
};
type ExtendedNumberBox = dxNumberBox & {
  isLoaded?: boolean;
};

const nonZeroFormat = '##.######';
const zeroFormat = '0#.######';
const currencyFormat = '$ #,##0.##';
const paymentIdEditorOptions = {
  format: nonZeroFormat,
};
const amountEditorOptions = {
  format: currencyFormat,
};

function onContentReady(e: CustomContentReadyEvent): void {
  if (!e.component.isLoaded) {
    e.component.isLoaded = true;
    if (e.component.option('value') === 0) { e.component.option('format', zeroFormat); }
  }
}

function onNonZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
  const value = e.component.option('value');
  if (e.event?.key === '0' && value === null) {
    e.component.option('format', zeroFormat);
  } else if (e.event?.key === 'Backspace' && value === 0) {
    e.component.option('format', '');
  } else if (value != null && (value > -1 && value < 1)) {
    e.component.option('format', zeroFormat);
  } else {
    e.component.option('format', nonZeroFormat);
  }
}

function onZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
  if (e.event?.key === 'Backspace' && e.component.option('value') === 0) {
    e.component.option('format', '');
  } else {
    e.component.option('format', currencyFormat);
  }
}

function onEditorPreparing(e: DataGridTypes.EditorPreparingEvent): void {
  if (e.parentType !== 'filterRow') return;
  if (e.dataField === 'PaymentId') {
    e.editorOptions.onContentReady = onContentReady;
    e.editorOptions.onKeyDown = onNonZeroKeyDown;
  }
  if (e.dataField === 'Amount') {
    e.editorOptions.onKeyDown = onZeroKeyDown;
  }
}

function App(): JSX.Element {
  return (
    <div className="main">
      <NumberBox
        defaultValue={0}
        width={400}
        label="zero-based format"
        format={currencyFormat}
        valueChangeEvent="keyup"
        onKeyDown={onZeroKeyDown}
      />
      <NumberBox
        defaultValue={0}
        width={400}
        label="non-zero format"
        format={nonZeroFormat}
        valueChangeEvent="keyup"
        onContentReady={onContentReady}
        onKeyDown={onNonZeroKeyDown}
      />
      <DxDataGrid dataSource={payments} keyExpr="PaymentId" onEditorPreparing={onEditorPreparing} showBorders>
        <Column dataField='PaymentId' caption='Payment Id (non-zero format)' dataType='number' width={200} format={nonZeroFormat}
          editorOptions={paymentIdEditorOptions}
        />
        <Column dataField='Amount' caption='Amount (zero-based format)' dataType='number' format={currencyFormat}
          editorOptions={amountEditorOptions}
        />
        <Column dataField='PaymentDate' dataType='date' />
        <FilterRow visible applyFilter="auto" />
      </DxDataGrid>
    </div>
  );
}

export default App;
