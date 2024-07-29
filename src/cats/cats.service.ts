import {
  // ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';

@Injectable()
export class CatsService {
  create(createCatDto: CreateCatDto) {
    return `This action adds a new cat: ${JSON.stringify(createCatDto)}`;
  }

  findAll() {
    throw new HttpException(
      `This action is supposed to return all cats, but it has been implemented yet.`,
      HttpStatus.FORBIDDEN,
    );
    /*
     * Method 2 - customised response body:
    throw new HttpException(
      {
        message: `This action is supposed to return all cats, but it has been implemented yet.`,
        statusCode: HttpStatus.FORBIDDEN,
        additionalAttribute:
          'Any arbitrary value can be added to the response body',
      },
      // When a response object is being provided, the status provided here will
      // still be returned, but it won't be merged into the response body as a
      // `statusCode` attribute as in the first example.
      HttpStatus.FORBIDDEN,
    );
     */
    /*
     * Method 3 - use the built-in Nest HTTP exceptions:
    throw new ForbiddenException(
      `This action is supposed to return all cats, but it has been implemented yet.`,
      {
        cause: new Error(),
        description:
          'This optional `cause` object can provide additional error information to the response body as an `Error` attribute.',
      },
      // 'As an alternative to the `cause` object, this optional string is the other way to provide additional error information to the response body as an `error` attribute.'
    );
     */
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat with ${JSON.stringify(updateCatDto)}.`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
