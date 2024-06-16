import validator from "validator";

export async function validEmail(email: string): Promise<boolean> {
    if (!validator.isEmail(email)) {
      return false;
    }
    return true;
}