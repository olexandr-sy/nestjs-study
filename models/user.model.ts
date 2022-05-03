import { Column, CreatedAt, HasMany, IsEmail, Model, Table, UpdatedAt } from 'sequelize-typescript';
import Avatar from './avatar.model';

@Table({
  timestamps: true,
  indexes: [
    {
      unique: true,
      name: 'unique_email_index',
      fields: ['email'],
    },
  ],
})
export default class User extends Model<User> {
  @IsEmail
  @Column
  email: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  password?: string;

  @HasMany(() => Avatar)
  avatars: Avatar[];

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
