import { DataSource, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import UserModel from '../models/user.model';


class UserService {
  private repository: Repository<UserModel>;

  constructor(dataSource: DataSource) {
    this.repository = dataSource.getRepository(UserModel);
  }

  public async getAllUsers(): Promise<UserModel[]> {
    return this.repository.find();
  }

  public async getUserById(userId: string): Promise<UserModel | null> {
    return this.repository.findOneBy({ id: userId });
  }

  public async createUser(createUserDto: CreateUserDto): Promise<void> {
    const newUser = this.repository.create(createUserDto);
    await this.repository.save(newUser);
  }

  public async updateUserBalance(userId: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.repository.update(userId, updateUserDto);
  }

  public async deleteUser(userId: string): Promise<void> {
    await this.repository.delete(userId);
  }
}

export default UserService;