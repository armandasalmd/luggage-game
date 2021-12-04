import { TouchBackendOptions } from "react-dnd-touch-backend";

export enum ItemTypes {
  Card = "card"
};

export const dndOptions: Partial<TouchBackendOptions> = {
  enableMouseEvents: true
};

export interface DropPayload {
  cardId: string;
}