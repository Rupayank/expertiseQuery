export default interface Expertise<T> extends Array<T> {
  id: string;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
  skillId: string;
  levelOfExperience: string;
  yearOfExperience: number;
}
