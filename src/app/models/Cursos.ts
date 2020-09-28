import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Cursos')
class Cursos {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nomecurso: string;

  @Column()
  carga_horaria: string;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Cursos;
