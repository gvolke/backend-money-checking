export default interface ICreateTransactionDTO {
  type: string;
  description: string;
  observation: string;
  value: number;
  user_id: string;
  date: Date;
  category: string;
}
