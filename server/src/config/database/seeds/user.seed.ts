import * as bcrypt from 'bcrypt';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';
import { User } from '../../../users/entities/user.entity';
import { usersData } from '../data/users';

export class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const hashedUsersData = await Promise.all(
      usersData.map(async (userData) => {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(userData.password, salt);
        return { ...userData, password: hashedPassword };
      }),
    );

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(hashedUsersData)
      .execute();
  }
}
