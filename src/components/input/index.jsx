import { Input as ReactstrapInput, FormGroup, Label } from "reactstrap";

export const Input = ({ label, id, ...props }) => {
  return (
    <FormGroup>
      {label && <Label for={id}>{label}</Label>}
      <ReactstrapInput {...props} id={id} />
    </FormGroup>
  );
};
