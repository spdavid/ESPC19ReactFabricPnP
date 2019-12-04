import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IToDoWebPartProps {
  description: string;
  ctx : WebPartContext;
}
