import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  Query,
  UseGuards
} from '@nestjs/common';
import { AllocatedWorkoutsService } from './allocated-workouts.service';
import { CreateAllocatedWorkoutDto, UpdateAllocatedWorkoutDto } from './dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('allocated-workouts')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('allocated-workouts')
export class AllocatedWorkoutsController {
  constructor(private readonly allocatedWorkoutsService: AllocatedWorkoutsService) {}

  /**
   * Create a new allocated workout
   */
  @Post()
  @ApiOperation({ summary: 'Create a new allocated workout' })
  create(@Body() createAllocatedWorkoutDto: CreateAllocatedWorkoutDto) {
    return this.allocatedWorkoutsService.create(createAllocatedWorkoutDto);
  }

  /**
   * Get all allocated workouts, optionally filtered by program
   */
  @Get()
  @ApiOperation({ summary: 'Get all allocated workouts' })
  @ApiQuery({ name: 'programId', required: false })
  findAll(@Query('programId') programId?: string) {
    return this.allocatedWorkoutsService.findAll(programId);
  }

  /**
   * Get a specific allocated workout by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a specific allocated workout' })
  @ApiParam({ name: 'id', description: 'Allocated workout ID' })
  findOne(@Param('id') id: string) {
    return this.allocatedWorkoutsService.findOne(id);
  }

  /**
   * Update an allocated workout
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update an allocated workout' })
  @ApiParam({ name: 'id', description: 'Allocated workout ID' })
  update(
    @Param('id') id: string, 
    @Body() updateAllocatedWorkoutDto: UpdateAllocatedWorkoutDto
  ) {
    return this.allocatedWorkoutsService.update(id, updateAllocatedWorkoutDto);
  }

  /**
   * Delete an allocated workout
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete an allocated workout' })
  @ApiParam({ name: 'id', description: 'Allocated workout ID' })
  remove(@Param('id') id: string) {
    return this.allocatedWorkoutsService.remove(id);
  }

  /**
   * Clone an allocated workout
   */
  @Post(':id/clone')
  @ApiOperation({ summary: 'Clone an allocated workout' })
  @ApiParam({ name: 'id', description: 'Allocated workout ID to clone' })
  @ApiQuery({ name: 'programId', required: false, description: 'Optional new program ID to assign' })
  clone(
    @Param('id') id: string,
    @Query('programId') programId?: string
  ) {
    return this.allocatedWorkoutsService.clone(id, programId);
  }
}
