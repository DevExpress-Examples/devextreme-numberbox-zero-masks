$(() => {
  $('#currency1').dxNumberBox({
    format: '$ 0,###.##',
    width: 400,
    label: 'zero-based format',
    value: null,
    valueChangeEvent: 'keyup',
    onKeyDown(e) {
      if (e.event.keyCode === 8 && e.component.option('value') === 0) {
        e.component.option('format', '');
      } else {
        e.component.option('format', '$ #,##0.##');
      }
    },
  });
  const nonZeroFormat = '##.######';
  const zeroFormat = '0#.######';

  $('#currency2').dxNumberBox({
    format: nonZeroFormat,
    label: 'non-zero format',
    width: 400,
    value: null,
    valueChangeEvent: 'keyup',

    onContentReady(e) {
      if (!e.component.isLoaded) {
        e.component.isLoaded = true;
        if (e.component.option('value') === 0) { e.component.option('format', zeroFormat); }
      }
    },
    onKeyDown(e) {
      const value = e.component.option('value');
      if (e.event.keyCode === 48 && value === null) {
        e.component.option('format', zeroFormat);
      } else if (e.event.keyCode === 8 && value === 0) {
        e.component.option('format', '');
      } else if (value > -1 && value < 1) {
        e.component.option('format', zeroFormat);
      } else {
        e.component.option('format', nonZeroFormat);
      }
    },
  });
  $('#gridContainer').dxDataGrid({
    dataSource: payments,
    keyExpr: 'PaymentId',
    showBorders: true,
    onEditorPreparing(e) {
      if (e.parentType !== 'filterRow') return;
      if (e.dataField === 'PaymentId') {
        e.editorOptions.onContentReady = (args) => {
          const editorInstance = args.component;
          if (!editorInstance.isLoaded) {
            editorInstance.isLoaded = true;
            if (editorInstance.option('value') === 0) { editorInstance.option('format', zeroFormat); }
          }
        };
        e.editorOptions.onKeyDown = (args) => {
          const editorInstance = args.component;
          const value = editorInstance.option('value');
          if (args.event.keyCode === 48 && value === null) {
            editorInstance.option('format', zeroFormat);
          } else if (args.event.keyCode === 8 && value === 0) {
            editorInstance.option('format', '');
          } else if (value > -1 && value < 1) {
            editorInstance.option('format', zeroFormat);
          } else {
            editorInstance.option('format', nonZeroFormat);
          }
        };
      }
      if (e.dataField === 'Amount') {
        e.editorOptions.onKeyDown = (args) => {
          const editorInstance = args.component;
          if (args.event.keyCode === 8 && editorInstance.option('value') === 0) {
            editorInstance.option('format', '');
          } else {
            editorInstance.option('format', '$ #,##0.##');
          }
        };
      }
    },
    columns: [
      {
        dataField: 'PaymentId',
        caption: 'Payment Id (non-zero format)',
        allowEditing: false,
        width: '200px',
        format: nonZeroFormat,
        editorOptions: {
          format: nonZeroFormat,
        },
      },
      {
        dataField: 'Amount',
        caption: 'Amount (zero-based format)',
        dataType: 'number',
        format: '$ #,##0.##',
        editorOptions: {
          format: '$ #,##0.##',
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
