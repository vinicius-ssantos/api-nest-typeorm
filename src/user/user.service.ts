import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParameters, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { UserEntity } from '../db/entities/user.entity';
import { FindOptionsWhere, Like, Repository } from "typeorm";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}



  async create(user: UserDto): Promise<UserDto> {
    const userToSave: UserEntity = {
      id: uuid(),
      name: user.name,
      email: user.email,
    };
    const createdUser = await this.userRepository.save(userToSave);
    return this.mapEntityToDto(createdUser);
  }

  async  findById(id: string): Promise<UserDto> {
    const foundUser = await this.userRepository.findOne({ where: { id }, })

    if (!foundUser) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.NOT_FOUND,);
    }
    return this.mapEntityToDto(foundUser);

  }

  async findAll(params: FindAllParameters): Promise<UserDto[]> {
    const searchParams: FindOptionsWhere<UserEntity> = {};
    if (params.name) {
      searchParams.name = Like(`%${params.name}%`);
    }
    if (params.email) {
      searchParams.email = Like(`%${params.email}%`);
    }
    const taskFound = await this.userRepository.find({
      where: searchParams,
    });
    return taskFound.map((taskEntity) => this.mapEntityToDto(taskEntity));
  }

  async update(id: string,user: UserDto) {
    const foundUser = await this.userRepository.findOne({ where: { id } });
    if (!foundUser) {
      throw new HttpException(`User with ID ${user.id} not found`, HttpStatus.BAD_REQUEST,);
    }
    await this.userRepository.update(id , this.mapDtoToEntity(user));
  }

  async remove(id: string) {
    const result = await this.userRepository.delete(id);
    if (!result.affected) {
      throw new HttpException(`User with ID ${id} not found`, HttpStatus.BAD_REQUEST,
      );
    }
  }

  private mapEntityToDto(userEntity: UserEntity): UserDto {
    return {
      id: userEntity.id,
      name: userEntity.name,
      email: userEntity.email,
    };
  }

  private mapDtoToEntity(userDto: UserDto): Partial<UserEntity> {
    return {
      id: userDto.id,
      name: userDto.name,
      email: userDto.email,
    };
  }
}
