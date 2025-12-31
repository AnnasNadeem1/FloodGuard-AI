// src/auth/auth.service.ts
import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  // 1. REGISTER
  async register(registerDto: any) {
    const { email } = registerDto;
    
    // Check if user already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    // Create and save new user
    const newUser = new this.userModel(registerDto);
    return newUser.save();
  }

  // 2. LOGIN
  async login(loginDto: any) {
    const { email, password } = loginDto;
    
    // Find user
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check password (simple check)
    if (user.password !== password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return user info (excluding password ideally)
    return { 
      message: 'Login successful', 
      user: { id: user._id, name: user.fullName, email: user.email } 
    };
  }
}