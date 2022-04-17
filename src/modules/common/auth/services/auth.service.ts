import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '@root/data-access/repositories/user.ropository';
import { GoogleStrategy } from '@root/modules/common/auth/strategy/google.strategy';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepo: UserRepository,
    private googleStrategy: GoogleStrategy
  ) {
  }

  async signIn(data) {
    try {
    } catch (e) {
    }
  }

  async signUp(data) {
    try {
    } catch (e) {

    }
  }

  async googleAuth(req) {
    try {
      if (!req.user) {
      }

      return {
        message: 'User information from google',
        user: req.user
      };
    } catch (e) {

    }

  }


}
