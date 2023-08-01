export interface BoardColumn {
    type: string
    _id: string
    date: string
    activities: Activity[]
  }
  
  export interface Activity {
    type: string
    _id: string
    name: string
    description: string
  }