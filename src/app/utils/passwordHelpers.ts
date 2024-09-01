import bcrypt from "bcrypt";

const hashPassword = async (plainText: string, saltRounds: number) => {
  const password = await bcrypt.hash(plainText, saltRounds);

  return password;
};

const comparePassword = async (plainText: string, hashPassword: string) => {
  const isCorrect = await bcrypt.compare(plainText, hashPassword);
  return isCorrect;
};



export const passwordHelpers = { 
  hashPassword, 
  comparePassword
}