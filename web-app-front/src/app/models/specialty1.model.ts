
export class Specialty1Model {
  private id: number;
  private cathedraId: number;
  private name: string;
  private fullName: string;
  private specialtyNumber: string;


  constructor(id: number, cathedraId: number, name: string, fullName: string, specialtyNumber: string) {
    this.id = id;
    this.cathedraId = cathedraId;
    this.name = name;
    this.fullName = fullName;
    this.specialtyNumber = specialtyNumber;
  }

  getId(): number {
    return this.id;
  }

  setId(id: number): void {
    this.id = id;
  }

  getCathedraId(): number {
    return this.cathedraId;
  }

  setCathedraId(cathedraId: number): void {
    this.cathedraId = cathedraId;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getFullName(): string {
    return this.fullName;
  }

  setFullName(fullName: string): void {
    this.fullName = fullName;
  }

  getSpecialtyNumber(): string {
    return this.specialtyNumber;
  }

  setSpecialtyNumber(specialtyNumber: string): void {
    this.specialtyNumber = specialtyNumber;
  }

}
