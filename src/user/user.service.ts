import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import User from 'models/user.model';
import { IUserCreate, IUserFilters, IUserUpdate } from './user.interface';
import { hash, compare } from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userModel: typeof User,
    private configService: ConfigService,
  ) {}

  async find({ email, id }: IUserFilters): Promise<User | null> {
    return this.userModel.findOne<User>({
      where: email
        ? {
            email,
          }
        : {
            id,
          },
    });
  }

  async create(user: IUserCreate): Promise<User | null> {
    return this.userModel.create({
      ...user,
      ...{
        password: await this.hashPassword(user.password),
      },
    });
  }

  async update(user: User, data: IUserUpdate): Promise<User | null> {
    if (data.password) {
      data.password = await this.hashPassword(data.password);
    }

    return user.update(data);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = this.configService.get<number>('auth.passwordSalt');
    return hash(password, Number(salt));
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
