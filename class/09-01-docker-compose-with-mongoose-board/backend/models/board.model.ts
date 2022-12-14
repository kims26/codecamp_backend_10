import mongoose from 'mongoose'

export interface IBoard {
    writer: string,
    title: string,
    contents: string,
  }

const boardSchema = new mongoose.Schema<IBoard>({
    writer: String,
    title: String,
    contents: String
})

export const Board = mongoose.model("Board", boardSchema)
