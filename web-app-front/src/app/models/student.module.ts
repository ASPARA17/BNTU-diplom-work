
export interface IStudy{
  faculty: IStudyStep;
  cathedra: IStudyStep;
  specialty: IStudyStep;
  group: IStudyStep;
}

interface IStudyStep{
  id?: number;
  table: string;
  f_key: string;
  formName: string;
}


