export type CommentSend = {
  content: string
  postId: number	
}

export type CommentGetAll = {
  id: number
  content: string
  createdAt: string 
  updatedAt: string
}