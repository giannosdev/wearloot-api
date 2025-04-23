import { Controller, Get, Post, Body, Param, Query, Delete, Put, HttpCode, HttpStatus, NotFoundException, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { UserQueryDto } from './dto/user-query.dto';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Controller responsible for managing user endpoints
 */
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Get all users with pagination and filtering
   * 
   * @param queryDto - Query parameters for filtering and pagination
   * @returns Paginated list of users
   */
  @Get()
  async findAll(@Query() queryDto: UserQueryDto) {
    return this.userService.findAll(queryDto);
  }

  /**
   * Get a specific user by ID
   * 
   * @param id - User ID
   * @returns User details
   */
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  /**
   * Create a new user
   * 
   * @param userData - User data
   * @returns Created user
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }

  /**
   * Update an existing user
   * 
   * @param id - User ID
   * @param userData - Updated user data
   * @returns Updated user
   */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() userData: any) {
    return this.userService.update(id, userData);
  }

  /**
   * Delete a user
   * 
   * @param id - User ID
   * @returns Deletion confirmation
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
