import React from 'react';
import './App.css';
import 'devextreme/dist/css/dx.material.blue.light.compact.css';
import NumberBox, { NumberBoxTypes } from 'devextreme-react/number-box';
import type dxNumberBox from 'devextreme/ui/number_box';
import DxDataGrid, { DataGridTypes, Column, FilterRow } from 'devextreme-react/data-grid';
import { payments } from './data';

const nonZeroFormat = '##.######';
const zeroFormat = '0#.######';
const zeroFormatEditorOptions = {
  format: nonZeroFormat,
};
const nonZeroFormatEditorOptions = {
  format: '$ #,##0.##',
};

type CustomContentReadyEvent = NumberBoxTypes.ContentReadyEvent & {
  component: ExtendedNumberBox;
};
type ExtendedNumberBox = dxNumberBox & {
  isLoaded: boolean;
};

function onContentReady(e: CustomContentReadyEvent): void {
  if (!e.component.isLoaded) {
    e.component.isLoaded = true;
    if (e.component.option('value') === 0) { e.component.option('format', zeroFormat); }
  }
}

function NonZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
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

function ZeroKeyDown(e: NumberBoxTypes.KeyDownEvent): void {
  if (e.event?.key === 'Backspace' && e.component.option('value') === 0) {
    e.component.option('format', '');
  } else {
    e.component.option('format', '$ #,##0.##');
  }
}

function onEditorPreparing(e: DataGridTypes.EditorPreparingEvent): void {
  if (e.parentType !== 'filterRow') return;
  if (e.dataField === 'PaymentId') {
    e.editorOptions.onContentReady = (args: CustomContentReadyEvent): void => {
      const editorInstance = args.component;
      if (!editorInstance.isLoaded) {
        editorInstance.isLoaded = true;
        if (editorInstance.option('value') === 0) { editorInstance.option('format', zeroFormat); }
      }
    };
    e.editorOptions.onKeyDown = (args: NumberBoxTypes.KeyDownEvent): void => {
      const editorInstance = args.component;
      const value = editorInstance.option('value');
      if (args.event?.key === '0' && value === null) {
        editorInstance.option('format', zeroFormat);
      } else if (args.event?.key === 'Backspace' && value === 0) {
        editorInstance.option('format', '');
      } else if (value != null && (value > -1 && value < 1)) {
        editorInstance.option('format', zeroFormat);
      } else {
        editorInstance.option('format', nonZeroFormat);
      }
    };
  }
  if (e.dataField === 'Amount') {
    e.editorOptions.onKeyDown = (args: NumberBoxTypes.KeyDownEvent): void => {
      const editorInstance = args.component;
      if (args.event?.key === 'Backspace' && editorInstance.option('value') === 0) {
        editorInstance.option('format', '');
      } else {
        editorInstance.option('format', '$ #,##0.##');
      }
    };
  }
}

function App(): JSX.Element {
  return (
    <div className="main">
      <NumberBox
        defaultValue={0}
        width={400}
        label="zero-based format"
        format="$ 0,###.##"
        valueChangeEvent="keyup"
        onKeyDown={ZeroKeyDown}
      />
      <NumberBox
        defaultValue={0}
        width={400}
        label="non-zero format"
        format={nonZeroFormat}
        valueChangeEvent="keyup"
        /* @ts-expect-error : a custom event type is used */
        onContentReady={onContentReady}
        onKeyDown={NonZeroKeyDown}
      />
      <DxDataGrid dataSource={payments} keyExpr="PaymentId" onEditorPreparing={onEditorPreparing} showBorders>
        <Column dataField='PaymentId' caption='Payment Id (non-zero format)' dataType='number' width={200} format={nonZeroFormat}
          editorOptions={zeroFormatEditorOptions}
        />
        <Column dataField='Amount' caption='Amount (zero-based format)' dataType='number' format="$ #,##0.##"
          editorOptions={nonZeroFormatEditorOptions}
        />
        <Column dataField='PaymentDate' dataType='date' />
        <FilterRow visible applyFilter="auto" />
      </DxDataGrid>
    </div>
  );
}

export default App;
