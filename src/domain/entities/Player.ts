import { Status, StatusEnum } from "../../shared/types/general.types";

export class Player {
  public id?: string;

  constructor(
    public username: string,
    public status: Status = StatusEnum.OUT_OF_GAME
  ) {}
}
