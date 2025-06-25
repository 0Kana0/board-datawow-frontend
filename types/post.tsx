export type PostGetAll = {
  id: number
  title: string
  content: string
  createdAt: string 
  updatedAt: string
  community: {
    id: number
    communityname: string
  }
  user: {
    id: number
    username: string
  }
}

export type PostSend = {
  title: string
  content: string,
  communityId: number,
  userId: number
}