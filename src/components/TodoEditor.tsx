import styled from 'styled-components';
import { useMountEffect } from '../hooks';

interface TodoEditorPropsType {
  value?: any;
  onComplete?: () => void;
}

const TodoEditor = (props: TodoEditorPropsType) => {
  const { value, onComplete } = props;

  useMountEffect(
    () =>
      !value &&
      (document.querySelector(Input.toString()) as HTMLInputElement).focus()
  );

  return (
    <Box>
      <Input defaultValue={value} onBlur={onComplete} />
    </Box>
  );
};

export default TodoEditor;

const Box = styled.div`
  &:not(:first-of-type) {
    margin-top: 12px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 0 0 6px;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => theme.color['grey-200']};
  box-sizing: border-box;
  transition: border-bottom 200ms;

  &:focus {
    outline: 0;
    border-bottom: 1px solid ${({ theme }) => theme.color['grey-400']};
  }
`;
