import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RoleStatus } from '../models/role.model';

@Entity()
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 30, unique: true })
  name: string;

  @Column({ type: 'enum', enum: [RoleStatus.Active, RoleStatus.Inactive], default: RoleStatus.Active })
  /**
   * 1 - active
   * 0 - inactive
   */
  status: string;
}
