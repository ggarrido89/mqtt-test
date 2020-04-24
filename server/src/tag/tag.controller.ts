import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { CreateTagDTO } from './dto/tag.dto';
import { TagService } from './tag.service';
import { AuthGuard } from 'src/shared/auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('tag')
// //@UseGuards(new AuthGuard())
export class TagController {
  constructor(
    private tagService: TagService,
    private userService:UserService
  ) {}

  @Get('user/:userId')
  async getTagsByUserId(@Param('userId') userId, @Res() res) {
    const tags = await this.tagService.getTagsByUser(userId);
    const msg = tags.length == 0 ? 'Tags not found' : 'Tags fetched';

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: msg,
      data: tags,
      count: tags.length,
    });
  }

  @Get('/:tagId')
  async getTagById(@Res() res, @Param('tagId') tagId) {
    if (!tagId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Tag id is not a valid  ObjectId');
    }

    const tag = await this.tagService.getTag(tagId);
    if (!tag) {
      throw new NotFoundException('Tag not found');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Tag found',
      data: tag,
    });
  }

  @Post()
  async addTag(@Res() res, @Body() body: CreateTagDTO) {
    const newTag = await this.tagService.createTag(body);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'Tag created successfully',
      data: newTag,
    });
  }

  @Put('/:tagId')
  async updateTag(
    @Res() res,
    @Body() body: CreateTagDTO,
    @Param('tagId') tagId,
  ) {
    if (!tagId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Tag id is not a valid  ObjectId');
    }

    const updatedTag = await this.tagService.updateTag(tagId, body);
    if (!updatedTag) {
      throw new NotFoundException('Tag not updated');
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Tag updated',
      data: updatedTag,
    });
  }

  @Delete('/:tagId')
  async deleteTag(@Res() res, @Param('tagId') tagId) {
    if (!tagId.match(/^[0-9a-fA-F]{24}$/)) {
      throw new BadRequestException('Tag id is not a valid  ObjectId');
    }

    const deletedTag = await this.tagService.deleteTag(tagId);

    if (!deletedTag) {
      throw new NotFoundException('Tag not found');
    }
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Tag deleted',
      data: deletedTag,
    });
  }
}
