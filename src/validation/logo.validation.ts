import * as yup from 'yup';

export const createLogoSchema = yup.object({
  body: yup.object({
    prompt: yup
      .string()
      .required('Prompt is required')
      .typeError('Prompt must be a string'),
    logo_style: yup
      .string()
      .required('Logo style is required')
      .typeError('Logo style must be a string'),
  }),
});
