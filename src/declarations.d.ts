// Tells TypeScript: importing a .module.css file gives you an object of string class names
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// Tells TypeScript: importing an SVG file with ?react gives you a React component
declare module '*.svg?react' {
  import React from 'react';
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}
