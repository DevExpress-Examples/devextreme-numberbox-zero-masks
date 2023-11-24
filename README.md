<!-- default badges list -->
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1185196)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# NumberBox for DevExtreme - Extend features of mask formats that contain 0 

In NumberBox, you can use [LDML-pattern masks](https://js.devexpress.com/Documentation/Guide/Common/Value_Formatting/#Format_UI_Component_Values/Custom_Format_String) for formatting values. `#` and `0` special characters apply the following limitations to NumberBox behavior:

- If `0` is in the mask, users cannot erase this character in NumberBox.
- If one or more `#` characters are in the mask (without `0` characters), users cannot enter numbers starting with `0` (for example, 0.123).

This example demonstrates how to overcome these limitations. You can test this implementation in standalone and DataGrid FilterRow editors:

![NumberBox for DevExtreme - Extend features of mask formats that contain 0](https://github.com/DevExpress-Examples/devextreme-numberbox-zero-masks/assets/22076961/daca8be7-fc47-4ac7-a499-8ec11c0ffbaa)

Define the [onKeyDown](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#onKeyDown) event handler and switch between zero-based and non-zero formats of the same structure to get the desired result.

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)

## Documentation

- [NumberBox.format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format)
- [Custom Format String](https://js.devexpress.com/Documentation/Guide/Common/Value_Formatting/#Format_UI_Component_Values/Custom_Format_String)


