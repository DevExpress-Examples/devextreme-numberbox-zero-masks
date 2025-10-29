$(() => {
  const KeyCode = {
    BACKSPACE: 8,
    ZERO: 48,
  };
  const nonZeroFormat = '##.######';
  const zeroFormat = '0#.######';
  const currencyFormat = '$ #,##0.##';
  const isLoadedName = 'isLoaded';

  function keyDownHandlerZeroFormat(e) {
    if (e.event.keyCode === KeyCode.BACKSPACE && e.component.option('value') === 0) {
      e.component.option('format', '');
    } else {
      e.component.option('format', currencyFormat);
    }
  }
  
  function keyDownHandlerNonZeroFormat(e) {
    const value = e.component.option('value');
    if (e.event.keyCode === KeyCode.ZERO && value === null) {
      e.component.option('format', zeroFormat);
    } else if (e.event.keyCode === KeyCode.BACKSPACE && value === 0) {
      e.component.option('format', '');
    } else if (value > -1 && value < 1) {
      e.component.option('format', zeroFormat);
    } else {
      e.component.option('format', nonZeroFormat);
    }
  }

  function contentReadyNonZeroFormat(e) {
    if (!e.component.option(isLoadedName)) {
      e.component.option(isLoadedName, true);
      const value = e.component.option('value');
      if (value > -1 && value < 1) { e.component.option('format', zeroFormat); }
      //if (e.component.option('value') === 0) { e.component.option('format', zeroFormat); }
    }
  }

  $('#currency1').dxNumberBox({
    format: currencyFormat,
    width: 400,
    label: 'zero-based format',
    value: null,
    valueChangeEvent: 'keyup',
    onKeyDown: keyDownHandlerZeroFormat
  });


  $('#currency2').dxNumberBox({
    format: nonZeroFormat,
    label: 'non-zero format',
    width: 400,
    value: null,
    valueChangeEvent: 'keyup',
    onContentReady: contentReadyNonZeroFormat,
    onKeyDown: keyDownHandlerNonZeroFormat
  });

  $('#gridContainer').dxDataGrid({
    dataSource: payments,
    keyExpr: 'PaymentId',
    showBorders: true,
    onEditorPreparing(e) {
      if (e.parentType !== 'filterRow') return;
      if (e.dataField === 'PaymentId') {
        e.editorOptions.onContentReady = contentReadyNonZeroFormat;
        e.editorOptions.onKeyDown = keyDownHandlerNonZeroFormat;
      }
      if (e.dataField === 'Amount') {
        e.editorOptions.onKeyDown = keyDownHandlerZeroFormat;
      }
    },
    columns: [
      {
        dataField: 'PaymentId',
        caption: 'Payment Id (non-zero format)',
        width: 200,
        format: nonZeroFormat,
        editorOptions: {
          format: nonZeroFormat,
        },
      },
      {
        dataField: 'Amount',
        caption: 'Amount (zero-based format)',
        dataType: 'number',
        format: currencyFormat,
        editorOptions: {
          format: currencyFormat,
        },
      },
      {
        dataField: 'PaymentDate',
        dataType: 'date',
      },
    ],
    filterRow: {
      visible: true,
      applyFilter: 'auto',
    },
  });
});
