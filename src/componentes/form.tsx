import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/lib/isEmail';
import '../App.css'; 

type FormData = {
  first_name: string;
  last_name: string;
  email: string;
  query_type: string;
  mensagem: string;
  privacyTerms: boolean;
};

const Formulario: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [queryType, setQueryType] = useState<string>('');

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryType(event.target.value);
  };

  return (
    <div className="app-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>First Name</label>
          <input
            className={errors.first_name ? "input-error" : ""}
            type="text"
            placeholder="Your first name"
            {...register("first_name", { required: true })}
          />
          {errors.first_name && (
            <p className="error-message">First Name is required.</p>
          )}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            className={errors.last_name ? "input-error" : ""}
            type="text"
            placeholder="Your last name"
            {...register("last_name", { required: true })}
          />
          {errors.last_name && (
            <p className="error-message">Last Name is required.</p>
          )}
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            className={errors.email ? "input-error" : ""}
            type="email"
            placeholder="Your e-mail"
            {...register("email", {
              required: true,
              validate: (value) => isEmail(value),
            })}
          />
          {errors.email && (
            <p className="error-message">Email is required and should be valid.</p>
          )}
        </div>

        <div className="form-group">
          <label>Query Type</label>
          <div className='query-type-group'>
            <div className='query-type-option'>
              <input
                type="radio"
                value="General Enquiry"
                checked={queryType === 'General Enquiry'}
                onChange={handleChange}
              />
              General Enquiry
            </div>
            <div className='query-type-option'>
              <input
                type="radio"
                value="Support Request"
                checked={queryType === 'Support Request'}
                onChange={handleChange}
              />
              Support Request
            </div>
          </div>
          {errors.query_type && (
            <p className="error-message">Select one option.</p>
          )}
        </div>

        <div className="form-group">
          <label>Message</label>
          <textarea
            className={errors.mensagem ? "input-error" : ""}
            placeholder="Your message"
            {...register("mensagem", { required: true, minLength: 7 })}
          />
          {errors.mensagem && (
            <p className="error-message">Message is required and should have at least 7 characters.</p>
          )}
        </div>

        <div className="form-group">
          <div className="checkbox-group">
            <input
              type="checkbox"
              {...register("privacyTerms", {
                validate: (value) => value === true,
              })}
            />
            <label>I consent to being contacted by the team.</label>
          </div>
          {errors.privacyTerms && (
            <p className="error-message">You must agree with the privacy terms.</p>
          )}
        </div>

        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Formulario;