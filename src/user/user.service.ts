import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserQueryDto, UserSortField, SortOrder } from './dto/user-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new user with email and password authentication
   * 
   * @param email - User email
   * @param password - User password (will be hashed)
   * @returns Created user or undefined if already exists
   */
  async createUser(email: string, password: string) {
    const userExists = await this.findUserByEmail(email);
    if (userExists) {
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  /**
   * Find a user by their email
   * 
   * @param email - User email
   * @returns User or null if not found
   */
  async findUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  /**
   * Get all users with filtering and pagination
   * 
   * @param query - Query parameters
   * @returns Paginated list of users
   */
  async findAll(query: UserQueryDto) {
    const {
      page = 1,
      pageSize = 10,
      sortBy = UserSortField.CREATED_AT,
      sortOrder = SortOrder.DESC,
      search,
      firstName,
      lastName,
      email,
    } = query;

    const skip = (page - 1) * pageSize;
    const take = pageSize;

    // Build the where clause for filtering
    const where: Prisma.UserWhereInput = {};

    // Full text search across multiple fields
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Specific field filters
    if (firstName) {
      where.firstName = { contains: firstName, mode: 'insensitive' };
    }
    
    if (lastName) {
      where.lastName = { contains: lastName, mode: 'insensitive' };
    }
    
    if (email) {
      where.email = { contains: email, mode: 'insensitive' };
    }

    // Get total count for pagination
    const total = await this.prisma.user.count({ where });

    // Query users with filters, pagination, and sorting
    const users = await this.prisma.user.findMany({
      where,
      skip,
      take,
      orderBy: {
        [sortBy]: sortOrder.toLowerCase(),
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        // Exclude password field for security
      },
    });

    return {
      data: users,
      total, // Top-level total for Refine compatibility
      meta: {
        page,
        pageSize,
        pageCount: Math.ceil(total / pageSize),
      },
    };
  }

  /**
   * Get a single user by ID
   * 
   * @param id - User ID
   * @returns User details or null if not found
   */
  async findOne(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        role: true,
        // Exclude password field for security
      },
    });
  }

  /**
   * Create a new user with additional fields
   * 
   * @param data - User data
   * @returns Created user
   */
  async create(data: any) {
    const { password, ...userData } = data;
    
    // If password is provided, hash it
    const createData: any = { ...userData };
    if (password) {
      createData.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.create({
      data: createData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
  }

  /**
   * Update an existing user
   * 
   * @param id - User ID
   * @param data - Updated user data
   * @returns Updated user
   */
  async update(id: string, data: any) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const { password, ...updateData } = data;
    
    // If password is provided, hash it
    const finalUpdateData: any = { ...updateData };
    if (password) {
      finalUpdateData.password = await bcrypt.hash(password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data: finalUpdateData,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        createdAt: true,
        updatedAt: true,
        role: true,
      },
    });
  }

  /**
   * Delete a user by ID
   * 
   * @param id - User ID
   * @returns Deletion confirmation
   */
  async remove(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    await this.prisma.user.delete({ where: { id } });
    return { success: true };
  }
}
