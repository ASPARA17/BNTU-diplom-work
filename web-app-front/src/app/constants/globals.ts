import {IStudy} from '../models/student.module'

export const STUDY:IStudy = {
  faculty:{
    table: 'faculty',
    f_key: 'fk_university',
    formName: 'userFaculty',
  },
  cathedra:{
    table: 'cathedra',
    f_key: 'fk_faculty',
    formName: 'userCathedra',
  },
  specialty:{
    table: 'specialty',
    f_key: 'fk_cathedra',
    formName: 'userSpecialty',
  },
  group:{
    table: 'groups',
    f_key: 'fk_specialty',
    formName: 'userGroup',
  }
}