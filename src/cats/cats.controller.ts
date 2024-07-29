import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { AnimalsService } from '../animals/animals.service';
// import { HttpExceptionFilter } from '../common/exceptions/filters/http-exception.filter';

@Controller('cats')
// Apply exception filter(s) in the controller scope.
// @UseFilters(HttpExceptionFilter, ...)
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly animalsService: AnimalsService,
  ) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return this.catsService.create(createCatDto);
  }

  // Apply exception filter(s) in the method scope.
  // @UseFilters(HttpExceptionFilter, ...)
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('generate-name')
  generateName(): string {
    return this.animalsService.generateName();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(+id, updateCatDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(+id);
  }
}
