# Interfaces এবং Types এর মধ্যে পার্থক্য কি?

Interface এবং Type দুটোই দেখতে একই রকম মনে হয় এবং দুটোই স্ট্রাকচার শেপ সঙ্গায়িত করার ক্ষেত্রে ব্যবহার করা যায়। কিন্তু এদের মধ্যে কিছু পার্থক্য রয়েছে:

### ১. Declaration Merging:

`interface` কীওয়ার্ড এর মাধ্যমে যদি একটি টাইপ বারবার ডিফাইন করা হয় তাহলে এগুলো Typescript একসাথে merge করে দেয়।

#### Example:

```ts
interface User {
  name: string;
}

interface User {
  phone: number;
}

const person: User = {
  name: "Adam",
  age: 960,
};
```

কিন্তু `type` কীওয়ার্ড এর মাধ্যমে এমনটি করা যায় না। এটা শুধু `interface` এর মাধ্যমেই সম্ভব।

#### Example:

```ts
type User = {
  name: string;
};

type User = { // ❌ Error: Duplicate identifier 'User'
  name: string; 
};
```

### ২. Extends vs Intersection:

`interface` কীওয়ার্ড এর মাধ্যমে ডিফাইন করা এক বা একাধিক টাইপ এক্সটেন্ড করার মাধ্যমে নতুন property যোগ করা যায়।

#### Example:

```ts
interface A {
  x: number;
}

interface B {
  y: number;
}

interface C extends A, B {
  z: number;
}
```

একই কাজ `type` কীওয়ার্ড এর ক্ষেত্রে তা Intersection এর মাধ্যমে করা যায়।

#### Example:

```ts
type A = {
  x: number;
};

type B = {
  y: number;
};

type C = A &
  B & {
    z: number;
  };
```

### ৩. Versatility:

**Interface** কেবল অবজেক্ট এর সেপ ডিফাইন করতে পারে। অপরদিকে **Type** primitive, union, function সবই ডিফাইন করতে পারে।

#### Example:

```ts
type IDType = string | number;
type FuncType = () => void;
```

# `any`, `unknown`, `never` এর মধ্যে পার্থক্য কি?

### any:

যখন কোনো ভ্যারিয়েবল কে `any` টাইপ দেয়া হয়, তখন Typescript সেই ভ্যারিয়েবল এর উপর কোনো ধরণের টাইপ চেক পারফর্ম করে না। এটি যেকোনো মান ধারণ করতে পারে এবং এর উপর যেকোনো ধরণের অপারেশন পারফর্ম করা যায়। এটি মূলত JavaScript এর মতোই হয়ে যায় এবং Typescript এর যে মূল সুবিধা, অর্থাৎ কম্পাইল টাইম এ ত্রুটি চেক, তার সুবিধা পাওয়া যায় না এবং রান টাইম এ ভুল হওয়ার ঝুঁকি থাকে।

#### Example:

```ts
function cap(str: any) {
  return str.toUpperCase();
}

console.log(cap("programming hero")); // ✅ OK
console.log(cap(6)); // ❌ Error: Uncaught TypeError: str.toUpperCase is not a function
```

### unknown:

এই টাইপ টিও যেকোনো মান ধারণ করতে পারে `any` এর মতো। তবে, এর উপর কোনো অপারেশন পারফর্ম করার আগে অবশ্যই টাইপ গার্ড ব্যবহার করতে হয়। অর্থাৎ, `typeof` বা `instanceof` ব্যবহার করে টাইপ সম্পর্কে নিশ্চিৎ হয়ে নিতে হয়। এ কারণে এই টাইপ টি `any` এর তুলনায় অনেক বেশি নিরাপদ হয়ে থাকে প্ৰডাকশন অ্যাপ্লিকেশন এর জন্য।

#### Example without type guard:

```ts
function square(arg: unknown) {
  return Math.sqrt(arg); // ❌ Error: Argument of type 'unknown' is not assignable to parameter of type 'number'
}
```

#### Example with type guard:

```ts
function square(arg: unknown) {
  if (typeof arg === "number") {
    return Math.sqrt(arg); // ✅ OK
  }
}
```

### never:

এই টাইপ টি নিৰ্দেশ করে যে একটি ভেরিএবল কখনো কোনো ম্যান ধারণ করবেনা বা একটি ফাংশন কখনো তার কাজ শেষ করবেনা এবং কোনো মান রিটার্ন করবে না।

#### Example:

```ts
function throwError(message: string): never {
  throw new Error(message);
}
```
