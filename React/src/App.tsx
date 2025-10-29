import { useCallback, useState } from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import NumberBox, { type NumberBoxTypes } from 'devextreme-react/number-box';
import type dxNumberBox from 'devextreme/ui/number_box';
import DxDataGrid, { type DataGridTypes, Column, FilterRow } from 'devextreme-react/data-grid';
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

function getFormatForZero(key: string, value: number | undefined): string {
  return key === 'Backspace' && value === 0 ? '' : currencyFormat;
}

function getFormatForNonZero(key: string, value: number | undefined | null): string {
  if (key === '0' && (value === undefined || value === null)) {
    return zeroFormat;
  }
  if (key === 'Backspace' && value === 0) {
    return '';
  }
  if (value != null && (value > -1 && value < 1)) {
    return zeroFormat;
  }
  return nonZeroFormat;
}

function onContentReady(e: CustomContentReadyEvent): void {
  if (!e.component.isLoaded) {
    e.component.isLoaded = true;
    const value = e.component.option('value');
    if (value !== null && value !== undefined && value > -1 && value < 1) {
      e.component.option('format', zeroFormat);
    }
  }
}

function onNonZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
  const newFormat = getFormatForNonZero(e.event?.key ?? '', e.component.option('value'));
  e.component.option('format', newFormat);
}

function onZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
  const newFormat = getFormatForZero(e.event?.key ?? '', e.component.option('value'));
  e.component.option('format', newFormat);
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
  const [zeroEditorFormat, setZeroEditorFormat] = useState(currencyFormat);
  const [nonZeroEditorFormat, setNonZeroEditorFormat] = useState(nonZeroFormat);

  const zeroEditorKeyDown = useCallback((e: NumberBoxTypes.KeyDownEvent) => {
    const newFormat = getFormatForZero(e.event?.key ?? '', e.component.option('value'));
    setZeroEditorFormat(newFormat);
  }, []);

  const nonZeroEditorKeyDown = useCallback((e: NumberBoxTypes.KeyDownEvent) => {
    const newFormat = getFormatForNonZero(e.event?.key ?? '', e.component.option('value'));
    setNonZeroEditorFormat(newFormat);
  }, []);

  return (
    <div className="main">
      <NumberBox
        defaultValue={0}
        width={400}
        label="zero-based format"
        format={zeroEditorFormat}
        valueChangeEvent="keyup"
        onKeyDown={zeroEditorKeyDown}
      />

      <NumberBox
        defaultValue={0}
        width={400}
        label="non-zero format"
        format={nonZeroEditorFormat}
        valueChangeEvent="keyup"
        onContentReady={onContentReady}
        onKeyDown={nonZeroEditorKeyDown}
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
