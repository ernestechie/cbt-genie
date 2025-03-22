export interface IFaculty {
  id: string;
  name: string;
}

export interface IDepartment {
  id: string;
  name: string;
  facultyId: string;
}

export const departments: IDepartment[] = [
  {
    id: "1",
    facultyId: "1",
    name: "Computer Science",
  },
  {
    id: "2",
    facultyId: "1",
    name: "Biological Science",
  },
  {
    id: "3",
    facultyId: "1",
    name: "Chemical Science",
  },
  {
    id: "4",
    facultyId: "1",
    name: "Geology",
  },
  {
    id: "5",
    facultyId: "1",
    name: "Physics",
  },
  {
    id: "6",
    facultyId: "2",
    name: "Law",
  },
  {
    id: "7",
    facultyId: "2",
    name: "Fine & Applied Arts",
  },
  {
    id: "8",
    facultyId: "2",
    name: "Linguistics",
  },
  {
    id: "9",
    facultyId: "3",
    name: "Pharmacology",
  },
  {
    id: "10",
    facultyId: "3",
    name: "Pharmacognosy",
  },
  {
    id: "11",
    facultyId: "3",
    name: "Cosmetic Pharmacy",
  },
  {
    id: "12",
    facultyId: "4",
    name: "Sociology",
  },
  {
    id: "13",
    facultyId: "4",
    name: "Mass Communication",
  },
  {
    id: "14",
    facultyId: "4",
    name: "Economics & Statistics",
  },
  {
    id: "15",
    facultyId: "5",
    name: "Architecture",
  },
  {
    id: "16",
    facultyId: "5",
    name: "Geography",
  },
  {
    id: "17",
    facultyId: "5",
    name: "Quantity Survey",
  },
];

export const faculties: IFaculty[] = [
  {
    id: "1",
    name: "Science",
  },
  {
    id: "2",
    name: "Arts",
  },
  {
    id: "3",
    name: "Pharmacy",
  },
  {
    id: "4",
    name: "Social Science",
  },
  {
    id: "5",
    name: "Environmental Sciences",
  },
];
