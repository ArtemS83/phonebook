import { render } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('Button should render properly without props', () => {
    const { container } = render(<Button />);
    expect(container).toMatchSnapshot();
  });

  it('Button should render properly type, title, onClick', () => {
    const testClick = jest.fn();
    const { container } = render(
      <Button title="Hello" type="submit" onClick={testClick} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Button  should call  onClick-buttonRef', () => {
    const testClick = jest.fn();

    const { container } = render(
      <Button title="Hello click" onClick={testClick} />,
    );
    //типа костыль, если не знаем как определить элемент
    const buttonRef = container.querySelector('button');
    buttonRef.click();
    expect(testClick).toBeCalled();
  });

  it('Button  should call  onClick data-testId', () => {
    const testClick = jest.fn();

    const { getByTestId } = render(<Button onClick={testClick} />);

    getByTestId('onClickFn').click();

    expect(testClick).toBeCalled();
  });

  it('The default title should be Click me', () => {
    const { getByTestId } = render(<Button />);

    const title = getByTestId('onClickFn').textContent;

    expect(title).toBe('Click me');
  });

  it('title should be Add', () => {
    const { getByTestId } = render(<Button title="Add" />);

    const title = getByTestId('onClickFn').textContent;

    expect(title).toBe('Add');
  });
});
