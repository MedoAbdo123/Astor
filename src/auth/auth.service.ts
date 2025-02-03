import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrybt from 'bcryptjs'
import { Types } from 'mongoose';
import { LoginUserDro } from './dto/loginUser.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private UserModel: Model<User>,
        private jwtService: JwtService   
    ){}

    async RigsterUser(createUserDto: CreateUserDto) {
        const {username, email, profile, role, password} = createUserDto
        
        const user = await this.UserModel.findOne({email})
        if(user) throw new UnauthorizedException("Email already exists")
        
        const hashPassword = await bcrybt.hash(password,10)
        const newUser = await this.UserModel.create({
            username,
            email,
            profile,
            role,
            password: hashPassword
        })

        const token = this.jwtService.sign({
            id: newUser._id,
            username: username,
            email: email,
            profile: profile,
            role: role
        })

        return {
            data:{
                newUser
            },
            token
        }
    }

    async userUpgrade(userId: string) {
        if(!Types.ObjectId.isValid(userId)) throw new BadRequestException("Invalid ID")      
        const userUpgrade = await this.UserModel.findOneAndUpdate(
            { _id: userId },
            { role: 'admin' },
            { new: true }
        )
        return userUpgrade.save()
    }

    async getAllUsers(){
        return this.UserModel.find()
    }

    async loginUser(loginUserDto: LoginUserDro) {
        const {email, password} = loginUserDto

        const user = await this.UserModel.findOne({email})
        if(!user) throw new UnauthorizedException("Error on password or email")
        
        const PassswordMatch = await bcrybt.compare(password, user.password)
        if(!PassswordMatch) throw new UnauthorizedException("Error on password or email")

        const token = this.jwtService.sign({ 
            id: user._id,
            username: user.username,
            email: user.email, 
            profile: user.profile,
            role: user.role
        });

        return {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                profile: user.profile,
                role: user.role
            },
            token,
        };
    }  
}