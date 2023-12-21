import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';

const PostInput = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Comment is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values.comment);
      resetForm();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        fullWidth
        id="comment"
        name="comment"
        label="Comment"
        multiline
        rows={4}
        variant="outlined"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.comment && Boolean(formik.errors.comment)}
        helperText={formik.touched.comment && formik.errors.comment}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        style={{ marginTop: '16px' }}
        
      >
        Submit
      </Button>
    </form>
  );
};

export default PostInput;