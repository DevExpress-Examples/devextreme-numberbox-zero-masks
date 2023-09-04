<!-- default badges list -->
![](https://img.shields.io/endpoint?url=https://codecentral.devexpress.com/api/v1/VersionRange/681150229/23.1.3%2B)
[![](https://img.shields.io/badge/Open_in_DevExpress_Support_Center-FF7200?style=flat-square&logo=DevExpress&logoColor=white)](https://supportcenter.devexpress.com/ticket/details/T1185196)
[![](https://img.shields.io/badge/📖_How_to_use_DevExpress_Examples-e9f6fc?style=flat-square)](https://docs.devexpress.com/GeneralInformation/403183)
<!-- default badges end -->
# NumberBox for DevExtreme - Customize behavior for values that contain zeros 

This example demonstrates the following features:

 - allow entering `0` if [format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format) doesn't contain the `0` symbol
 - hide `0` when using `Backspace` if [format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format) contains the `0` symbol

You can test how this implementation works in stand-alone editors and inside DataGrid's FilterRow editors.


The main idea is to define the [onKeyDown](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#onKeyDown) event handler and switch between zero-based and non-zero formats of the same structure to get the desired result.


## Files to Review

- **jQuery**
    - [index.js](jQuery/src/index.js)
- **Angular**
    - [app.component.html](Angular/src/app/app.component.html)
    - [app.component.ts](Angular/src/app/app.component.ts)
- **Vue**
    - [Home.vue](Vue/src/components/HomeContent.vue)
- **React**
    - [App.tsx](React/src/App.tsx)
- **NetCore**    
    - [Index.cshtml](ASP.NET%20Core/Views/Home/Index.cshtml)

## Documentation

- [NumberBox|format](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxNumberBox/Configuration/#format)
- [Custom Format String](https://js.devexpress.com/Documentation/Guide/Common/Value_Formatting/#Format_UI_Component_Values/Custom_Format_String)


