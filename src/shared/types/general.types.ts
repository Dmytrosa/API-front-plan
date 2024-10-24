import { CHOICE_VALUES, STATUS_VALUES } from "../constants/general";

export type Status = (typeof STATUS_VALUES)[keyof typeof STATUS_VALUES];

export const StatusEnum = { ...STATUS_VALUES };

export type Choice = (typeof CHOICE_VALUES)[keyof typeof CHOICE_VALUES];

export const ChoiceEnum = { ...CHOICE_VALUES };
