import React, { useReducer } from 'react';
import PropTypes from 'prop-types';

import { Form, FormGroup, Label, Col, Input, Button } from 'reactstrap';

export const SimpleForm = ({ data, spec, onSubmit, submitText, children }) => {
  const [state, dispatch] = useReducer((_state, { key, value }) => ({ ..._state, [key]: value }), data);

  const _validate = (state) => {
    for (const { key, validate } of spec.filter(({ validate }) => validate)) {
      if (!validate(state[key])) {
        return false;
      }
    }

    return true;
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (_validate(state)) {
          onSubmit(state);
        }
      }}
    >
      {spec.map(({ key, label, type, props }) => (
        <FormGroup key={key} row>
          <Label for={key} sm={2} className="text-right">{label}</Label>
          <Col sm={10}>
            <Input
              type={type}
              id={key}
              name={key}
              value={state[key]}
              onChange={e => dispatch({ key, value: e.target.value })}
              placeholder={data[key] || label}
              {...(props || {})}
            />
          </Col>
        </FormGroup>
      ))}
      <FormGroup className="text-right">
        {children}
        <Button disabled={!_validate(state)} color="primary" className="ml-3">{submitText}</Button>
      </FormGroup>
    </Form>
  );
};

SimpleForm.propTypes = {
  data: PropTypes.object.isRequired,
  spec: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      props: PropTypes.object,
      validate: PropTypes.func,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string.isRequired,
  children: PropTypes.element,
};
