import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'users' })
class UserModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('numeric')
  balance: number;
}

export default UserModel;