import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import User from './user.model';

@Table
export default class Avatar extends Model<Avatar> {
  @Column
  name: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  path: string;

  @Column
  mimeTipe: string;

  @Column(DataType.INTEGER)
  size: number;

  @Default(false)
  @Column(DataType.BOOLEAN)
  isDefault: boolean;

  @CreatedAt
  createdAt?: Date;

  @UpdatedAt
  updatedAt?: Date;
}
