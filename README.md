A proof of concept User Datagram Protocol (UDP) flood coded in the programming language NodeJS. This attack method was developed as part of an experimental approach, and during the testing phase, all attacks were strictly executed within a controlled environment. It is worth noting that this script generates data randomly and transmits it to the designated target. It will soon be available to utilize as an npm package.

## Features

- Random dest ports (or as specified)
- Random strings (of size and data)
- Multithreading via `node:cluster`

## Installation

Install with `git clone`

```bash
  npm i cluster
  git clone https://github.com/DexeHecimal/udp.js.git; cd udp.js
```

    
## Usage/Examples

```bash
node udp.mjs [host] [port, (0 for random)] [size, (0 for random)] [time] [threads]
```


## Bandwidth performance (GCP docker container)
![App Screenshot](https://cdn.discordapp.com/attachments/948759932415656016/1088949052160348250/image.png)

## License 

> Copyright (C) 2023 Zachery T. Eritano (eritanozach@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated 
documentation files (the "Software"), to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, 
and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions 
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED 
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL 
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF 
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.

