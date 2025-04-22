import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete, Patch,
} from '@nestjs/common';
import { WorkoutsService } from './workouts.service';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutResponseDto } from './dto/workout-response.dto';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Post()
  async create(@Body() createWorkoutDto: CreateWorkoutDto): Promise<WorkoutResponseDto> {
    return this.workoutsService.create(createWorkoutDto);
  }

  @Get()
  async findAll(): Promise<WorkoutResponseDto[]> {
    return this.workoutsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WorkoutResponseDto | null> {
    return this.workoutsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateWorkoutDto: UpdateWorkoutDto): Promise<WorkoutResponseDto> {
    return this.workoutsService.update(id, updateWorkoutDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.workoutsService.remove(id);
  }
}
