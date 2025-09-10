#!/usr/bin/env node

const { spawn } = require('child_process');

// Run vite build in development mode
{
 "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0"
  }
}

});
