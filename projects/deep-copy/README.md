# @packageforge/deep-copy

A TypeScript deep copy and deep merge for objects and arrays.

Add the package to your project on the command line:
```
npm install @packageforge/deep-copy --save
```

Import the `deepCopy` function into your code file:
```typescript
import { deepCopy } from '@packageforge/deep-copy';
```

To deep copy an object or array:

```typescript
copy = deepCopy(original);
```

To deep merge two or more objects:

```typescript
merged = deepCopy(obj1, obj2, ...);
```

When deep copying an object, for properties that refer to a common object, the same properties on the copied object will refer to the same copy of that common object.
```typescript
const a = {
  aProp: "aProp"
};
const b = {
  a: a,
  c: {
    a: a
  }
};
const d = deepCopy(b);
console.log(d.a === d.c.a); // true, the two properties refer to the same object, just like the original.
console.log(d.a === b.a);   // false, the value is deep copy of the original.
```