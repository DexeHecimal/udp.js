A proof of concept User Datagram Protocol (UDP) flood coded in the programming language NodeJS. This attack method was developed as part of an experimental approach, and during the testing phase, all attacks were strictly executed within a controlled environment. It is worth noting that this script generates data randomly and transmits it to the designated target.

## Features

- Random dest ports (or as specified)
- Random strings (of size and data)
- Multithreading via `node:cluster`

## Installation

Install with `git clone`

```bash
  git clone https://github.com/DexeHecimal/udp.js.git
  cd udp.js
```

    
## Usage/Examples

```bash
node udp.mjs [host] [port, (0 for random), [size, (0 for random)], [time] [threads]
```


## Bandwidth performance (GCP docker container)
![App Screenshot](https://cdn.discordapp.com/attachments/948759932415656016/1088949052160348250/image.png)

