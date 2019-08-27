Function HandleMixedModeWebApplication()
{
    param([Parameter(Mandatory = $true)][object]$clientContext, $binPath)  
    Add-Type -TypeDefinition @"
  using System;
  using Microsoft.SharePoint.Client;
  
  namespace Toth.SPOHelpers
  {
      public static class ClientContextHelper
      {
          public static void AddRequestHandler(ClientContext context)
          {
              context.ExecutingWebRequest += new EventHandler<WebRequestEventArgs>(RequestHandler);
          }
  
          private static void RequestHandler(object sender, WebRequestEventArgs e)
          {
              //Add the header that tells SharePoint to use Windows authentication.
              e.WebRequestExecutor.RequestHeaders.Remove("X-FORMS_BASED_AUTH_ACCEPTED");
              e.WebRequestExecutor.RequestHeaders.Add("X-FORMS_BASED_AUTH_ACCEPTED", "f");
          }
      }
  }
"@ -ReferencedAssemblies "$binPath\Microsoft.SharePoint.Client.dll", "$binPath\Microsoft.SharePoint.Client.Runtime.dll";
    [Toth.SPOHelpers.ClientContextHelper]::AddRequestHandler($clientContext);
}
