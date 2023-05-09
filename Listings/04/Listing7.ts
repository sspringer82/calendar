@Entity('appointments')
export class Appointment {
  ...
  @MinLength(2, { message: 'Title is too short' })
  @MaxLength(25, { message: 'Title is too long' })
  @ApiProperty({
    example: 'Breakfast',
    description: 'The title of an appointment',
  })
  @Column()
  title: string;
  ...
}