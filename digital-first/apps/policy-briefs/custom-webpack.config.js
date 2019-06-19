const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  module : {
    rules: [
      
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        hash: true,
        sp:{
          pageLanguageDirective:`<%@ Page Language="C#" %>`,
          tagPrefixDirective:`<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>`,
          basePath:`<base runat="server" href="<% $SPUrl:~site/SitePages/policy-briefs.aspx/ %>" />`,
          favIcon:`<link rel="icon" type="image/png" sizes="32x32" href="<% $SPUrl:~site/SiteAssets/apps/css/images/favicon/favicon-32x32.png %>">`
        },
        template: './sharepoint.template.html',
        filename: './policy-briefs.aspx' //relative to root of the application
      }),
  ]
};