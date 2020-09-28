import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
  ManyToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Cursos from './Cursos';
import Funcionarios from './Funcionarios';

@Entity('Treinamentos')
class Treinamentos {
  @PrimaryGeneratedColumn('uuid')
  id: 'string';

  @Column()
  id_funcionarios: string;

  @ManyToOne(() => Funcionarios)
  @JoinColumn({ name: 'id_funcionarios' })
  id_func: Funcionarios;

  @Column()
  id_cursos: string;

  @ManyToOne(() => Cursos)
  @JoinColumn({ name: 'id_cursos' })
  id_curso: Cursos;

  @Column('timestamp with time zone')
  data_treinamento: Date;

  @Column('timestamp with time zone')
  data_final: Date;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
export default Treinamentos;
