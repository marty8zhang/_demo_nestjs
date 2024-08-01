import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpStatus,
  Query,
  DefaultValuePipe,
  ParseBoolPipe,
  UseInterceptors,
  // UsePipes,
  // UseFilters,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto, updateCatSchema } from './dto/update-cat.dto';
import { AnimalsService } from '../animals/animals.service';
import { SchemaValidationPipe } from '../common/pipes/schema-validation.pipe';
import { ResponseMappingInterceptor } from '../common/interceptors/response-mapping.interceptor';
import { CachingInterceptor } from '../common/interceptors/caching.interceptor';
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

  /*
   * Apply exception filter(s) in the method scope.
   */
  // @UseFilters(HttpExceptionFilter, ...)
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  @Get('generate-name')
  generateName(
    @Query('genderNeutral', new DefaultValuePipe(true), ParseBoolPipe)
    genderNeutral: boolean,
    @Query('numberOfNames', new DefaultValuePipe(1), ParseIntPipe)
    numberOfNames: number,
  ): string {
    return this.animalsService.generateName({
      genderNeutral,
      numberOfNames,
    });
  }

  @Get(':id')
  @UseInterceptors(ResponseMappingInterceptor)
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.findOne(id);
  }

  @Patch(':id')
  /*
   * The below `@UsePipes()` will cause problems because the validation pipe
   * will be bound in the method scope. This will result in the pipe receiving
   * the `@Param(...)` value(s) for validation too, whereas the intention of the
   * pipe is only to validation the request body, and hence might create
   * unexpected validation failure.
   * Instead, the pipe should be bound in the particular method argument scope.
   */
  // @UsePipes(new SchemaValidationPipe(updateCatSchema))
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body(new SchemaValidationPipe(updateCatSchema)) updateCatDto: UpdateCatDto,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  @Delete(':id')
  @UseInterceptors(CachingInterceptor)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.catsService.remove(id);
  }
}
