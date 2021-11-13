import { ISectionStatus } from "./sectionStatus";

export interface IHomeResponse{
  teamPoints: number;
  sections: ISectionStatus[];
}
