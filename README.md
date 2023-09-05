<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/681150229/23.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1185196)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# NumberBox for DevExtreme - Extend features of mask formats that contain 0 

In NumberBox, you can use [LDML-pattern masks](https://js.devexpress.com/Documentation/Guide/Common/Value_Formatting/#Format_UI_Component_Values/Custom_Format_String) as format. If you specify a combination of two special characters `#` and `0`, NumberBox behavior can be limited.

This example demonstrates how to overcome these limitations in the following ways:

- Enter `0` if [format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format) does not contain the `0` symbol.
- Hide `0` when using `Backspace` if [format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format) contains the `0` symbol.

You can test how this implementation works in stand-alone editors and inside DataGrid's FilterRow editors.

![NumberBox for DevExtreme - Extend features of mask formats that contain 0](https://github.com/DevExpress-Examples/devextreme-numberbox-zero-masks/assets/22076961/daca8be7-fc47-4ac7-a499-8ec11c0ffbaa)

Define the [onKeyDown](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#onKeyDown) event handler and switch between zero-based and non-zero formats of the same structure to get the desired result.

## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)

## Documentation

- [NumberBox.format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format)
- [Custom Format String](https://js.devexpress.com/Documentation/Guide/Common/Value_Formatting/#Format_UI_Component_Values/Custom_Format_String)


