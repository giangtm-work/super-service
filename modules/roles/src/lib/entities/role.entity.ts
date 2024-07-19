import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'enum', enum: ['1', '0'], default: '1' })
  /**
   * 1 - active
   * 0 - inactive
   */
  status: string;
}
