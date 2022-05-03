import { Column, CreatedAt, Index, IsEmail, Model, Table } from 'sequelize-typescript';

@Table({
  timestamps: false,
})
export default class ResetPassword extends Model<ResetPassword> {
  @IsEmail
  @Column
  @Index
  email: string;

  @Column
  code: string;

  @CreatedAt
  @Column
  createdAt?: Date;
}
