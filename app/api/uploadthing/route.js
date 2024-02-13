import { createRouteHandler } from "uploadthing/next";
import { UTrouter } from "./core";
 
export const { GET, POST } = createRouteHandler({
  router: UTrouter
});