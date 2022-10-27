module.exports = class CodeError extends Error {
  status:number
  constructor (message:string, status:number) {
    super(message)
    this.status = status
  }
}
