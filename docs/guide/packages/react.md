# React

Implementation icon library for react applications

## Installation

::: code-group

```sh [yarn]
yarn add @123done/universal-icon-set-react
```

```sh [npm]
npm install @123done/universal-icon-set-react
```

```sh [pnpm]
pnpm install @123done/universal-icon-set-react
```

:::

### Example

Additional props can be passed to adjust the icon:

```jsx
import { Expand } from '@123done/universal-icon-set-react';

// Usage
const App = () => {
  return <Expand color="red" size={48} />;
};

export default App;
```

## Props

| name                  | type      | default      |
| --------------------- | --------- | ------------ |
| `size`                | *number*  | 24           |
| `color`               | *string*  | currentColor |
| `strokeWidth`         | *number*  | 2            |
