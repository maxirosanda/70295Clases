import bcript from 'bcrypt'

export const createHash = password => bcript.hashSync(password,bcript.genSaltSync(10))

export const isValidPassword = (user,password) => bcript.compareSync(password,user.password)

