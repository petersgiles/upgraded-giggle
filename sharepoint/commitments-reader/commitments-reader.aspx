<%@ Page Language="C#" %>
<%@ Register tagprefix="SharePoint" namespace="Microsoft.SharePoint.WebControls" assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<!doctype html>
<!--[if lte IE 7]>      <html class="no-js lte-ie9 lte-ie8 lte-ie7 no-mediaqueries legacy" lang="en" dir="ltr" id="app"> <![endif]-->
<!--[if IE 8]>          <html class="no-js lte-ie9 lte-ie8 no-mediaqueries legacy" lang="en" dir="ltr" id="app"> <![endif]-->
<!--[if IE 9]>          <html class="no-js lte-ie9" lang="en" dir="ltr" id="app"> <![endif]-->
<!--[if gte IE 9]>      <html class="no-js ie11" lang="en" dir="ltr" id="app"> <![endif]-->
<!--[if !IE]> -->
<html lang="en" dir="ltr" id="app" class="no-js">
<!-- <![endif]-->

<head runat="server">
	<base runat="server" href="<% $SPUrl:~site/SitePages/commitments-reader.aspx/ %>" />
	<script type="text/javascript" src="/_layouts/15/init.js"></script>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />

	<!-- KILL THIS LATER -->
	<meta http-equiv="cache-control" content="max-age=0" />
	<meta http-equiv="cache-control" content="no-cache" />
	<meta http-equiv="expires" content="0" />
	<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
	<meta http-equiv="pragma" content="no-cache" />
	<!-- KILL THIS LATER -->

	<title page-title>
		<SharePoint:ProjectProperty property="Title" runat="server" />
	</title>
	<meta http-equiv="X-UA-Compatible" content="IE=Edge" />
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="mobile-web-app-capable" content="yes" />

	<meta name="viewport" content="user-scalable=yes,width=device-width" />

	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="icon" type="image/png" sizes="32x32" href="<% $SPUrl:~site/SiteAssets/apps/css/images/favicon/favicon-32x32.png %>">
	<link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons" type="text/css">
	<link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:300,400,500" type="text/css">
	<link rel="stylesheet" href="//cdn.materialdesignicons.com/2.1.19/css/materialdesignicons.min.css" type="text/css" />

	{{css}}

	<style>
		.cssload-box-loading {
			width: 94px;
			height: 94px;
			margin: auto;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
		}

		.cssload-box-loading:before {
			content: '';
			width: 94px;
			height: 9px;
			background: rgb(0, 0, 0);
			opacity: 0.1;
			position: absolute;
			top: 111px;
			left: 0;
			border-radius: 50%;
			animation: shadow 0.445s linear infinite;
			-o-animation: shadow 0.445s linear infinite;
			-ms-animation: shadow 0.445s linear infinite;
			-webkit-animation: shadow 0.445s linear infinite;
			-moz-animation: shadow 0.445s linear infinite;
		}

		.cssload-box-loading:after {
			content: '';
			width: 94px;
			height: 94px;
			background: rgb(255, 102, 0);
			position: absolute;
			top: 0;
			left: 0;
			border-radius: 6px;
			animation: cssload-animate 0.445s linear infinite;
			-o-animation: cssload-animate 0.445s linear infinite;
			-ms-animation: cssload-animate 0.445s linear infinite;
			-webkit-animation: cssload-animate 0.445s linear infinite;
			-moz-animation: cssload-animate 0.445s linear infinite;
		}

		@keyframes cssload-animate {
			17% {
				border-bottom-right-radius: 6px;
			}

			25% {
				transform: translateY(17px) rotate(22.5deg);
			}

			50% {
				transform: translateY(34px) scale(1, 0.9) rotate(45deg);
				border-bottom-right-radius: 75px;
			}

			75% {
				transform: translateY(17px) rotate(67.5deg);
			}

			100% {
				transform: translateY(0) rotate(90deg);
			}
		}

		@-o-keyframes cssload-animate {
			17% {
				border-bottom-right-radius: 6px;
			}

			25% {
				-o-transform: translateY(17px) rotate(22.5deg);
			}

			50% {
				-o-transform: translateY(34px) scale(1, 0.9) rotate(45deg);
				border-bottom-right-radius: 75px;
			}

			75% {
				-o-transform: translateY(17px) rotate(67.5deg);
			}

			100% {
				-o-transform: translateY(0) rotate(90deg);
			}
		}

		@-ms-keyframes cssload-animate {
			17% {
				border-bottom-right-radius: 6px;
			}

			25% {
				-ms-transform: translateY(17px) rotate(22.5deg);
			}

			50% {
				-ms-transform: translateY(34px) scale(1, 0.9) rotate(45deg);
				border-bottom-right-radius: 75px;
			}

			75% {
				-ms-transform: translateY(17px) rotate(67.5deg);
			}

			100% {
				-ms-transform: translateY(0) rotate(90deg);
			}
		}

		@-webkit-keyframes cssload-animate {
			17% {
				border-bottom-right-radius: 6px;
			}

			25% {
				-webkit-transform: translateY(17px) rotate(22.5deg);
			}

			50% {
				-webkit-transform: translateY(34px) scale(1, 0.9) rotate(45deg);
				border-bottom-right-radius: 75px;
			}

			75% {
				-webkit-transform: translateY(17px) rotate(67.5deg);
			}

			100% {
				-webkit-transform: translateY(0) rotate(90deg);
			}
		}

		@-moz-keyframes cssload-animate {
			17% {
				border-bottom-right-radius: 6px;
			}

			25% {
				-moz-transform: translateY(17px) rotate(22.5deg);
			}

			50% {
				-moz-transform: translateY(34px) scale(1, 0.9) rotate(45deg);
				border-bottom-right-radius: 75px;
			}

			75% {
				-moz-transform: translateY(17px) rotate(67.5deg);
			}

			100% {
				-moz-transform: translateY(0) rotate(90deg);
			}
		}

		@keyframes shadow {

			0%,
			100% {
				transform: scale(1, 1);
			}

			50% {
				transform: scale(1.2, 1);
			}
		}

		@-o-keyframes shadow {

			0%,
			100% {
				-o-transform: scale(1, 1);
			}

			50% {
				-o-transform: scale(1.2, 1);
			}
		}

		@-ms-keyframes shadow {

			0%,
			100% {
				-ms-transform: scale(1, 1);
			}

			50% {
				-ms-transform: scale(1.2, 1);
			}
		}

		@-webkit-keyframes shadow {

			0%,
			100% {
				-webkit-transform: scale(1, 1);
			}

			50% {
				-webkit-transform: scale(1.2, 1);
			}
		}

		@-moz-keyframes shadow {

			0%,
			100% {
				-moz-transform: scale(1, 1);
			}

			50% {
				-moz-transform: scale(1.2, 1);
			}
		}
	</style>

</head>

<body class="mdc-typography">
	<!-- SharePoint Dross -->
	<form runat="server">
		<SharePoint:FormDigest ID="FormDigest1" runat="server"></SharePoint:FormDigest>
	</form>

	<!-- No Javascript Message -->
	<noscript>
		<div>
			<div>
				<div>
					<h4>Warning!</h4>
					<p>You need to have <a href="http://en.wikipedia.org/wiki/JavaScript" target="_blank">JavaScript</a> enabled to
						use
						this site.</p>
				</div>
			</div>
		</div>
	</noscript>

	<!-- Application Here-->

	<digital-first-root>
		<div class="cssload-box-loading"></div>
	</digital-first-root>

	<!-- SharePoint Scripts -->
	<SharePoint:ScriptLink Name="MicrosoftAjax.js" runat="server" Defer="False" />
	<SharePoint:ScriptLink Name="SP.core.js" runat="server" Defer="False" Localizable="false" />
	<SharePoint:ScriptLink Name="SP.Runtime.js" runat="server" Defer="False" Localizable="false" />
	<SharePoint:ScriptLink Name="SP.js" runat="server" Defer="False" Localizable="false" />
	<SharePoint:ScriptLink Name="SP.UserProfiles.js" runat="server" Defer="False" Localizable="false" />
	<SharePoint:ScriptLink Name="SP.RequestExecutor.js" runat="server" Defer="False" Localizable="false" />

	{{scripts}}

	<style>
		/* Scheduler overrides to account for strange sharepoint basepath */
		@font-face {
			font-family: 'Font Awesome 5 Pro';
			font-style: normal;
			font-weight: 900;
			src: url(../../SiteAssets/apps/commitments-reader/fa-solid-900.eot);
			src: url(../../SiteAssets/apps/commitments-reader/fa-solid-900.eot?#iefix) format("embedded-opentype"), url(../../SiteAssets/apps/commitments-reader/fa-solid-900.woff2) format("woff2"), url(../../SiteAssets/apps/commitments-reader/fa-solid-900.woff) format("woff"), url(../../SiteAssets/apps/commitments-reader/fa-solid-900.ttf) format("truetype"), url(../../SiteAssets/apps/commitments-reader/fa-solid-900.svg#fontawesome) format("svg"); 
		}  
	</style>
</body>

</html>