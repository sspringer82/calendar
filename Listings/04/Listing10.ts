@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('appointments')
export class AppointmentsController {
  @ApiOperation({ summary: 'Remove an existing appointment' })
  @ApiResponse({
    status: 204,
    description: 'Deletion was successful, no content',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  @ApiParam({
    name: 'id',
    description: 'The id of the appointment',
    required: true,
    type: String,
    example: 1,
  })
  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.appointmentService.remove(id);
  }
}
