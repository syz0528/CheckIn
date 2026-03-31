export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  createdAt: string
}

export interface CheckIn {
  id: string
  subjectId: string
  date: string
  note?: string
}
