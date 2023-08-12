export enum FORM_INPUT_FIELD {
  EMAIL = "email",
  PASSWORD = "password",
  CONFIRM_PASSWORD = "confirmPassword",
  USERNAME = "username",
  DISPLAY_IMAGE_URL = "displayImgUrl",
  DISPLAY_NAME = "displayName",
}

export interface UserForm {
  email: string
  password: string
  username: string
  displayImgUrl: string
  displayName: string
}
