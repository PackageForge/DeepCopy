export function deepCopy(...args: any[]): any {
  return doDeepCopy([], args);
}
type Ref = { orig: any; copy: any; }
function doDeepCopy(refs: Ref[], args: any[]): any {
  const last = args.reduce(getLast, undefined);
  if (last !== null && last !== undefined) {
    if (Array.isArray(last)) {
      let copy: any[] = checkRefs(refs, last);
      if (copy !== undefined)
        return copy;
      const length = args.reduce(maxLength, 0);
      copy = [];
      refs.push({ orig: last, copy: copy });
      for (let i = 0; i < length; i++)
        copy[i] = doDeepCopy(refs, args.map(nextLevelArray, i));
      return copy;
    }
    if (typeof (last) === "object") {
      let copy: any = checkRefs(refs, last);
      if (copy !== undefined)
        return copy;
      const props = args.reduce(getAllProps, []);
      copy = {};
      refs.push({ orig: last, copy: copy });
      for (let i = 0; i < props.length; i++)
        copy[props[i]] = doDeepCopy(refs, args.map(nextLevelObject, props[i]));
      return copy;
    }
  }
  return last;
}
function checkRefs(refs: Ref[], orig: any) {
  for (let i = 0; i < refs.length; i++) {
    let ref = refs[i];
    if (ref.orig === orig)
      return ref.copy;
  }
}
function getLast(prev: any, val: any) {
  return val === undefined || val === null ? prev : val;
}
function maxLength(length: number, val: any) {
  return Math.max(length, Array.isArray(val) ? val.length : 0);
}
function nextLevelArray(this: number, val: any[]) {
  return Array.isArray(val) && this < val.length ? val[this] : undefined;
}
function getAllProps(allProps: string[], val: any) {
  if (val !== null && val !== undefined && typeof (val) === "object") {
    const props = Object.getOwnPropertyNames(val);
    for (let i = 0; i < props.length; i++) {
      const prop = props[i];
      if (allProps.indexOf(prop)<0)
        allProps.push(prop);
    }
  }
  return allProps;
}
function nextLevelObject(this: string, val: any) {
  return val !== null && val !== undefined && typeof (val) === "object" && val.hasOwnProperty(this) ? val[this] : undefined;
}