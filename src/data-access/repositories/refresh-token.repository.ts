import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '@root/data-access/entities/user.entity';
import { RefreshToken } from '@root/data-access/entities/refresh-token.entity';

@EntityRepository(RefreshToken)
export class RefreshTokensRepository extends Repository<RefreshToken> {
  public async createRefreshToken(user: UserEntity): Promise<RefreshToken> {
    const token = new RefreshToken();
    const today = new Date();
    token.userId = user.id;
    token.isRevoked = false;
    token.expires = new Date(today.setHours(today.getHours() + 24));
    const userTokenExist = this.findTokenByUserId(user.id);
    if (userTokenExist) {
      const userId = token.userId;
      await RefreshToken.delete({
        userId,
      });
    }
    return token.save();
  }

  public async findTokenByUserId(userId: number): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        userId,
      },
    });
  }

  public async findTokenById(id: number): Promise<RefreshToken | null> {
    return RefreshToken.findOne({
      where: {
        id,
      },
    });
  }
}
