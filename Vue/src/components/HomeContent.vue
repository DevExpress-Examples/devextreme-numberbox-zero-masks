<script setup lang="ts">
import 'devextreme/dist/css/dx.material.blue.light.compact.css';

import DxNumberBox from 'devextreme-vue/number-box';
import DxDataGrid, { DxColumn, DxFilterRow } from 'devextreme-vue/data-grid';

import { payments } from '../data';

import type { DxNumberBoxTypes } from 'devextreme-vue/number-box';
import type dxNumberBox from 'devextreme/ui/number_box';
import type { DxDataGridTypes } from 'devextreme-vue/data-grid';

type CustomContentReadyEvent = DxNumberBoxTypes.ContentReadyEvent & {
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

const onContentReady = (e: CustomContentReadyEvent): void => {
  if (!e.component.isLoaded) {
    e.component.isLoaded = true;
    if (e.component.option('value') === 0) e.component.option('format', zeroFormat);
  }
};

const onNonZeroKeyDown = (e: DxNumberBoxTypes.KeyDownEvent): void => {
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
};

const onZeroKeyDown = (e: DxNumberBoxTypes.KeyDownEvent): void => {
  if (e.event?.key === 'Backspace' && e.component.option('value') === 0) {
    e.component.option('format', '');
  } else {
    e.component.option('format', currencyFormat);
  }
};

const onEditorPreparing = (e: DxDataGridTypes.EditorPreparingEvent): void => {
  if (e.parentType !== 'filterRow') return;
  if (e.dataField === 'PaymentId') {
    e.editorOptions.onContentReady = onContentReady;
    e.editorOptions.onKeyDown = onNonZeroKeyDown;
  }
  if (e.dataField === 'Amount') e.editorOptions.onKeyDown = onZeroKeyDown;
};
</script>
<template>
  <div>
    <DxNumberBox
      :value="0"
      :width="400"
      label="zero-based format"
      :format="currencyFormat"
      value-change-event="keyup"
      @key-down="onZeroKeyDown"
    />
    <DxNumberBox
      :value="0"
      :width="400"
      label="non-zero format"
      :format="nonZeroFormat"
      value-change-event="keyup"
      @content-ready="onContentReady"
      @key-down="onNonZeroKeyDown"
    />
    <DxDataGrid
      :data-source="payments"
      key-expr="PaymentId"
      @editor-preparing="onEditorPreparing"
      :show-borders="true"
    >
      <DxColumn
        data-field="PaymentId"
        caption="Payment Id (non-zero format)"
        data-type="number"
        :width="200"
        :format="nonZeroFormat"
        :editor-options="paymentIdEditorOptions"
      />
      <DxColumn
        data-field="Amount"
        caption="Amount (zero-based format)"
        data-type="number"
        :format="currencyFormat"
        :editor-options="amountEditorOptions"
      />
      <DxColumn
        data-field="PaymentDate"
        data-type="date"
      />
      <DxFilterRow
        :visible="true"
        apply-filter="auto"
      />
    </DxDataGrid>
  </div>
</template>
