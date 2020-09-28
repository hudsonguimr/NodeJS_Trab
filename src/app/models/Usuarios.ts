import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Usuarios')
class Usuarios {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  matricula: string;

  @Column()
  password: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Usuarios;
